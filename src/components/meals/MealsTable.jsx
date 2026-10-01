import { Edit, Trash2, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import MealRow from "./MealRow";
import { mealPaginationData, mealsAtom, mealsLoadingAtom, selectedMealCategoryAtom, setMealPageAtom } from "../../atoms/meals/mealAtoms";
import { useAtom } from "jotai";
import mealsService from "../../services/mealService";
import MealTableSkeleton from "./MealSkelton";

function MealTable() {
  const [meals] = useAtom(mealsAtom);
  const [isLoadingMeals] = useAtom(mealsLoadingAtom);
  const [paginationModel] = useAtom(mealPaginationData);
  const [selectedCategory] = useAtom(selectedMealCategoryAtom);
  const [, setPage] = useAtom(setMealPageAtom);

  useEffect(() => {
    const loadMeals = async () => {
      await mealsService.getAll({
        category: selectedCategory,
      });
    };

    loadMeals();
  }, [paginationModel.pageNumber, selectedCategory]);
  return (
    <div className="overflow-hidden rounded border border-outline-variant bg-surface-container-lowest">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 border-collapse overflow-y-scroll">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              <th className="px-4 py-3 text-left text-label text-tertiary">
                Meal
              </th>

              <th className="px-4 py-3 text-left text-label text-tertiary">
                Category
              </th>

              <th className="px-4 py-3 text-left text-label text-tertiary">
                Price
              </th>

              <th className="px-4 py-3 text-left text-label text-tertiary">
                Status
              </th>

              <th className="px-4 py-3 text-right text-label text-tertiary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {
              meals.length === 0 ?
                isLoadingMeals ? (
                  <MealTableSkeleton rows={paginationModel.pageSize} />
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-3 text-center text-label text-tertiary">
                      No meals found.
                    </td>
                  </tr>
                ) : (
                  meals.map((meal) => (
                    <MealRow key={meal.id} meal={meal} />
                  )))
            }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginationModel &&
        <Pagination
          currentPage={paginationModel.pageNumber}
          totalPages={paginationModel.totalPages}
          totalCount={paginationModel.totalRecords}
          pageSize={paginationModel.pageSize}
          onPageChange={setPage}
        />
      }
    </div>
  );
}

export default MealTable;