import MealCategoryFilter from './MealCategoryFilter'
import MealTable from './MealsTable'
import { mealsAtom, mealsLoadingAtom } from '../../atoms/meals/mealAtoms.js';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import mealsService from '../../services/mealService.js';
import MealsCardSection from './MealsCardSection.jsx';

export default function MealsSection() {
  return (
    <div className="flex flex-col gap-6">
      <MealCategoryFilter />
      <MealTable />
      <MealsCardSection />
    </div>
  )
}
