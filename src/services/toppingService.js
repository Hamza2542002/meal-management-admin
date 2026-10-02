import { collection, getDocs } from "firebase/firestore";
import { getDefaultStore } from "jotai";
import { db } from "../config/firebase";
import { toppingsAtom } from "../atoms/meals/toppingAtom";

const store = getDefaultStore();
const toppingsService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, "topping"));
      let data = snapshot.docs.map((toppingDocument) => {
        const topping = toppingDocument.data();
        return {
          ...topping,
          name : topping.name,
          cost: topping.cost
        };
      });
      store.set(toppingsAtom, data);
    }
    catch (error) {
      console.log(error);
      return;
    }
  }
}

export default toppingsService;