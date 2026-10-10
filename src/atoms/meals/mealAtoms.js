import { atom } from "jotai";
import { toppingsAtom } from "./toppingAtom";

// Meals returned from the API
export const mealsAtom = atom([]);

// Pagination
export const mealPaginationData = atom({
  pageNumber: 1,
  totalPages: 0,
  pageSize: 5,
  totoalRecords: 0,
});

// Category filter
// null means "All"
export const selectedMealCategoryAtom = atom("all");

// Loading state
export const mealsLoadingAtom = atom(false);

export const setMealPageAtom = atom(
  null,
  (get, set, pageNumber) => {
    const pagination = get(mealPaginationData);

    if (pageNumber < 1 || pageNumber > pagination.totalPages) {
      return;
    }

    set(mealPaginationData, {
      ...pagination,
      pageNumber,
    });
  }
);


export const setMealCategoryAtom = atom(
  null,
  (get, set, category) => {
    set(selectedMealCategoryAtom, category);
    set(mealPaginationData, {
      ...get(mealPaginationData),
      pageNumber: 1,
    });
  }
);
export const mealToppingsAtom = atom([]);
export const setSelectedToppingsAtom = atom(
  (get) => get(mealToppingsAtom),
  (get, set, selectedToppings) => {
    const { checked, value } = selectedToppings.target;
    const currentToppings = get(mealToppingsAtom);

    if (checked) {
      const topping = get(toppingsAtom).find((item) => item.name === value);

      if (topping && !currentToppings.some((item) => item.name === value)) {
        set(mealToppingsAtom, [...currentToppings, topping]);
      }
    } else {
      set(
        mealToppingsAtom,
        currentToppings.filter((item) => item.name !== value)
      );
    }
  });