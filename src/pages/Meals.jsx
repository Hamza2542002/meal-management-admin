import { Plus } from 'lucide-react'
import React from 'react'
import MealsSection from '../components/meals/MealsSection'

export default function Meals() {
  return (
    <div className="space-y-8 pt-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl text-primary font-bold">
            Meal Management
          </h1>

          <p className="mt-2 text-md text-on-surface-variant">
            Manage your meals, categories, and availability.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-primary-container px-4 py-3 text-sm font-semibold text-on-primary transition-colors "
        >
          <Plus size={18} />
          Add New Meal
        </button>
      </div>

      {/* Filters + Table */}
      <section>
        <MealsSection />
      </section>

      {/* Statistics */}
      <section>
        {/* We'll build this next */}
      </section>
    </div>
  )
}
