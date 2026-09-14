import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

export default function MealRow({ meal }) {
  return (
    <tr
      key={meal.id}
      className="h-15 border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low"
    >
      {/* Meal */}
      <td className="px-4 py-2">
        <div className="flex items-center gap-3">
          <img
            src={meal.image}
            alt={meal.name}
            className="h-10 w-10 rounded object-cover"
          />

          <span className="text-sm font-semibold text-on-surface">
            {meal.name}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="pl-4 text-sm text-on-surface-variant">
        <span className="bg-surface px-4 py-1.5 rounded-lg">
          {meal.category}
        </span>
      </td>

      {/* Price */}
      <td className="px-4 py-2 text-sm font-semibold text-on-surface">
        {meal.price} EGP
      </td>

      {/* Status */}
      <td className="px-4 py-2">
        <span className="inline-flex rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-on-primary-fixed-variant">
          {meal.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-2">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary"
            title="Edit meal"
          >
            <Edit size={17} />
          </button>

          <button
            type="button"
            className="rounded p-2 text-on-surface-variant hover:bg-error-container hover:text-error"
            title="Delete meal"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  )
}
