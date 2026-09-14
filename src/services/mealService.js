import { getDefaultStore } from "jotai";
import { mealPaginationData, mealsAtom, mealsLoadingAtom } from "../atoms/meals/mealAtoms";
import { meals } from "../data/meals";

const store = getDefaultStore();
const mealsService = {
  getAll: async (filters = {}) => {
    try {
      store.set(mealsLoadingAtom, true);
      // const response = await apiClient.get("/meals?", { params: filters });
      // const data = response.data;
      // store.set(mealsAtom, data.data);

      var data = meals;
      if(filters.category != null && filters.category != "all") {
        data = data.filter(meal => meal.category.toLocaleLowerCase() === filters.category.toLocaleLowerCase());
      }
      store.set(mealPaginationData, 
        {
          totalRecords : data.length, 
          pageSize : 5, 
          pageNumber : store.get(mealPaginationData).pageNumber, 
          totalPages : store.get(mealPaginationData).pageSize > 0 ? Math.ceil(data.length / store.get(mealPaginationData).pageSize) : 0
        });
        store.set(mealsAtom, data.slice((store.get(mealPaginationData).pageSize * (store.get(mealPaginationData).pageNumber - 1))
        , ( store.get(mealPaginationData).pageNumber * store.get(mealPaginationData).pageSize)));
      return true;
    } catch (error) {
      console.log(error);
      return;
    } finally {
      store.set(mealsLoadingAtom, false);
    }
  },
}


export default mealsService;