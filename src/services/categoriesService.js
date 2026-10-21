import { getDefaultStore } from "jotai";
import { categoriesAtom, categoriesLoadedAtom, categoriesLoadingAtom, categoryStatsAtom } from "../atoms/meals/categoryAtom";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const store = getDefaultStore();
let categoriesRequest = null;

const getProductsInCategory = async (name) => {
  const snapshot = await getDocs(collection(db, "products"));
  const normalizedName = name.trim().toLowerCase();
  return snapshot.docs.filter((product) => product.data().category?.trim().toLowerCase() === normalizedName);
};

const ensureUniqueName = async (name, excludeId = null) => {
  const normalizedName = name.trim().toLowerCase();
  const snapshot = await getDocs(collection(db, "categories"));
  const duplicate = snapshot.docs.some((category) => {
    if (category.id === excludeId) return false;
    return category.data().name?.trim().toLowerCase() === normalizedName;
  });
  if (duplicate) {
    const error = new Error("A category with this name already exists.");
    error.code = "category/name-already-exists";
    throw error;
  }
};

const categoriesService = {
  getAll: async () => {
    if (store.get(categoriesLoadedAtom)) return store.get(categoriesAtom);
    if (categoriesRequest) return categoriesRequest;

    store.set(categoriesLoadingAtom, true);
    categoriesRequest = (async () => {
    try {
      const snapshot = await getDocs(collection(db, "categories"));
      const productsSnapshot = await getDocs(collection(db, "products"));
      const categoryCounts = productsSnapshot.docs.reduce((counts, productDocument) => {
        const category = productDocument.data().category?.trim().toLowerCase();
        if (category) counts[category] = (counts[category] ?? 0) + 1;
        return counts;
      }, {});
      const products = productsSnapshot.docs.map((document) => document.data());
      const data = snapshot.docs.map((categoriesDocument) => {
        const category = categoriesDocument.data();
        return {
          ...category,
          id: categoriesDocument.id,
          name: category.name,
          mealCount: categoryCounts[category.name?.trim().toLowerCase()] ?? 0,
        };
      });
      const stats = { uncategorizedMealCount: products.filter((product) => !product.category?.trim()).length };
      store.set(categoriesAtom, data);
      store.set(categoryStatsAtom, stats);
      store.set(categoriesLoadedAtom, true);
      return { categories: data, ...stats };
    }
    catch (error) {
      console.log(error);
      return;
    } finally {
      store.set(categoriesLoadingAtom, false);
      categoriesRequest = null;
    }
    })();
    return categoriesRequest;
  },
  create: async (name, iconName = "Tags") => {
    const trimmedName = name.trim();
    await ensureUniqueName(trimmedName);
    const category = { name: trimmedName, iconName, createdAt: serverTimestamp() };
    const document = await addDoc(collection(db, "categories"), category);
    const newCategory = { id: document.id, name: category.name, iconName: category.iconName };
    store.set(categoriesAtom, [...store.get(categoriesAtom), newCategory]);
    store.set(categoriesLoadedAtom, true);
    return newCategory;
  },
  update: async (id, name) => {
    const current = store.get(categoriesAtom).find((category) => category.id === id);
    if (!current) throw new Error("Category not found.");
    const trimmedName = name.trim();
    await ensureUniqueName(trimmedName, id);
    const matchingProducts = await getProductsInCategory(current.name);
    await Promise.all(matchingProducts.map((product) => updateDoc(product.ref, { category: trimmedName })));
    await updateDoc(doc(db, "categories", id), { name: trimmedName });
    store.set(categoriesAtom, store.get(categoriesAtom).map((category) => category.id === id ? { ...category, name: trimmedName } : category));
    return { ...current, name: trimmedName };
  },
  remove: async (id) => {
    const current = store.get(categoriesAtom).find((category) => category.id === id);
    if (!current) throw new Error("Category not found.");
    const matchingProducts = await getProductsInCategory(current.name);
    await Promise.all(matchingProducts.map((product) => updateDoc(product.ref, { category: "" })));
    await deleteDoc(doc(db, "categories", id));
    store.set(categoriesAtom, store.get(categoriesAtom).filter((category) => category.id !== id));
    store.set(categoryStatsAtom, {
      uncategorizedMealCount: store.get(categoryStatsAtom).uncategorizedMealCount + matchingProducts.length,
    });
    return current;
  }
}


export default categoriesService;
