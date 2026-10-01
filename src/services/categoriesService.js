import { getDefaultStore } from "jotai";
import { categoriesAtom } from "../atoms/meals/categoryAtom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const store = getDefaultStore();

const categoriesService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, "categories"));
      let data = snapshot.docs.map((categoriesDocument) => {
        const category = categoriesDocument.data();
        return {
          ...category,
          name : category.name,
        };
      });
      console.log("categoriesService.getAll() data:", data);
      store.set(categoriesAtom, data);
    }
    catch (error) {
      console.log(error);
      return;
    }
  }
}


export default categoriesService;