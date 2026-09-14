import { atom } from "jotai";

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
  }
);
