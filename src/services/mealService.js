import { getDefaultStore } from "jotai";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { mealPaginationData, mealsAtom, mealsLoadingAtom, selectedMealCategoryAtom } from "../atoms/meals/mealAtoms";
import { db, storage } from "../config/firebase";

const store = getDefaultStore();
const mealsService = {
  getAll: async (filters = {}) => {
    try {
      store.set(mealsLoadingAtom, true);
      const snapshot = await getDocs(collection(db, "products"));
      let data = snapshot.docs.map((productDocument) => {
        const product = productDocument.data();
        return {
          ...product,
          id: productDocument.id,
          price: product.price ?? 0,
          status: product.isAvilable === false ? "Inactive" : "Active",
        };
      });
      if (filters.category != null && filters.category !== "all") {
        const categoryFilter = filters.category.toLocaleLowerCase();
        data = data.filter((meal) => meal.category?.toLocaleLowerCase().includes(categoryFilter));
      }
      const pagination = store.get(mealPaginationData);
      const totalPages = pagination.pageSize > 0 ? Math.ceil(data.length / pagination.pageSize) : 0;
      const pageNumber = totalPages === 0 ? 1 : Math.min(pagination.pageNumber, totalPages);
      store.set(mealPaginationData, {
        ...pagination,
        totalRecords: data.length,
        totalPages,
        pageNumber,
      });
      const startIndex = pagination.pageSize * (pageNumber - 1);
      store.set(mealsAtom, data.slice(startIndex, startIndex + pagination.pageSize));
      return true;
    } catch (error) {
      console.log(error);
      return;
    } finally {
      store.set(mealsLoadingAtom, false);
    }
  },


  create: async (mealData) => {
    try {
      const imageValue = mealData.image;
      const imageFile = imageValue?.[0] ?? imageValue;
      if (!(imageFile instanceof File)) {
        throw new Error("A meal image is required.");
      }
      debugger;
      const imagePath = `products/${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const imageReference = ref(storage, imagePath);
      const uploadedImage = await uploadBytes(imageReference, imageFile, {
        contentType: imageFile.type,
      });
      const imageUrl = await getDownloadURL(uploadedImage.ref);
      const product = {
        name: mealData.name.trim(),
        category: mealData.category,
        description: mealData.description.trim(),
        image: imageUrl,
        price: String(mealData.basePrice).trim(),
        isAvilable: mealData.live !== false,
        rating: "0.0",
        reviews: 0,
        side : mealData.sideOption ? mealData.sideOption : "",
        toppings: mealData.toppings ?? []
      };
      const productDocument = await addDoc(collection(db, "products"), product);
      const meal = {
        ...product,
        id: productDocument.id,
        status: product.isAvilable ? "Active" : "Inactive",
      };

      store.set(selectedMealCategoryAtom, "all");
      store.set(mealPaginationData, {
        ...store.get(mealPaginationData),
        pageNumber: 1,
      });
      return meal;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}


export default mealsService;