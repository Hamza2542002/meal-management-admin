import { atom } from "jotai";

// Categories returned from the API
export const categoriesAtom = atom([]);
export const categoryStatsAtom = atom({ uncategorizedMealCount: 0 });
export const categoriesLoadedAtom = atom(false);
export const categoriesLoadingAtom = atom(false);
