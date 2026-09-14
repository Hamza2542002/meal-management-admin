import { useAtom } from "jotai";
import { useState } from "react";
import { selectedMealCategoryAtom, setMealCategoryAtom } from "../../atoms/meals/mealAtoms";

const categories = [
  { id: "all", name: "All" },
  { id: 1, name: "Burgers" },
  { id: 2, name: "Pizza" },
  { id: 3, name: "Pasta" },
  { id: 4, name: "Salads" },
  { id: 5, name: "Desserts" },
  { id: 6, name: "Drinks" },
];

function MealCategoryFilter() {
  const [selectedCategory] = useAtom(selectedMealCategoryAtom);
  const [_, setSelectedCategory] = useAtom(setMealCategoryAtom);
  return (
    <div className="overflow-x-auto">
      <div className="flex w-fit gap-2 rounded-md border border-outline-variant bg-surface-container-lowest p-1.5">
        {categories.map((category) => {
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