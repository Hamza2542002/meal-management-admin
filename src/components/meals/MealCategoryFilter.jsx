import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { selectedMealCategoryAtom, setMealCategoryAtom } from "../../atoms/meals/mealAtoms";
import { categoriesAtom } from "../../atoms/meals/categoryAtom";


function MealCategoryFilter() {
  const [selectedCategory] = useAtom(selectedMealCategoryAtom);
  const [_, setSelectedCategory] = useAtom(setMealCategoryAtom);
  const [categories] = useAtom(categoriesAtom);
  let allCategories = [{ id: "all", name: "All" }, ...categories];


  return (
    <div className="overflow-x-auto">
      <div className="flex w-fit gap-2 rounded-md border border-outline-variant bg-surface-container-lowest p-1.5">
        {allCategories.map((category) => {
          const isActive = selectedCategory.toLowerCase() === category.name.toLowerCase();
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.name.toLocaleLowerCase())}
              className={[
                "px-5.5 py-1.5 rounded-md text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              ].join(" ")}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MealCategoryFilter;