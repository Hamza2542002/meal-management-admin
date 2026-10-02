import { collection, getDocs } from "firebase/firestore";
import { getDefaultStore } from "jotai";
import { db } from "../config/firebase";
import { sidesAtom } from "../atoms/meals/sidesAtom";

const store = getDefaultStore();
const sidesService = {
  getAll: async () => {
    try {
      const snapshot = await getDocs(collection(db, "sideOption"));
      let data = snapshot.docs.map((sideDocument) => {
        const side = sideDocument.data();
        return {
          ...side,
          name : side.name,
          cost: side.cost
        };
      });
      store.set(sidesAtom, data);
    }
    catch (error) {
      console.log(error);
      return;
    }
  }
}

export default sidesService;