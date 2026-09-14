import { Plus } from "lucide-react";
import MealsSection from "../components/meals/MealsSection";
import { mealsAtom, mealsLoadingAtom } from "../atoms/meals/mealAtoms";

function Dashboard() {


  return (
    <div className="space-y-8 pt-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl text-primary font-bold">
          </h1>

          <p className="mt-2 text-md text-on-surface-variant">
          </p>
        </div>
      </div>

      {/* Filters + Table */}
      <section>
      </section>

      {/* Statistics */}
      <section>
        {/* We'll build this next */}
      </section>
    </div>
  );
}

export default Dashboard;