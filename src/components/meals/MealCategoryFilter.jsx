import { useAtom } from "jotai";
import { selectedMealCategoryAtom, setMealCategoryAtom } from "../../atoms/meals/mealAtoms";
import { categoriesAtom } from "../../atoms/meals/categoryAtom";


function MealCategoryFilter() {
  const [selectedCategory] = useAtom(selectedMealCategoryAtom);
  const [_, setSelectedCategory] = useAtom(setMealCategoryAtom);
  const [categories] = useAtom(categoriesAtom);
  const allCategories = [{ id: "all", name: "All" }, ...categories];


  return (
    <div className="w-250 no-scrollbar rounded-md overflow-x-auto border-r border-outline-variant  overscroll-x-contain" aria-label="Filter meals by category">
      <div className="flex w-max min-w-full flex-nowrap gap-2 rounded-md border border-outline-variant bg-surface-container-lowest p-1.5">
        {allCategories.sort((a, b) => a.name.localeCompare(b.name)).map((category) => {
          const isActive = selectedCategory.toLowerCase() === category.name.toLowerCase();
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.name.toLocaleLowerCase())}
              className={[
                "shrink-0 whitespace-nowrap rounded-md px-5 py-1.5 text-sm font-semibold transition-colors",
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
