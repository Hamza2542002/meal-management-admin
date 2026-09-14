function MealTableSkeleton({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr
          key={index}
          className="h-15 border-b border-outline-variant last:border-b-0"
        >
          {/* Meal */}
          <td className="px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded bg-surface-container-high" />

              <div className="h-4 w-32 animate-pulse rounded bg-surface-container-high" />
            </div>
          </td>

          {/* Category */}
          <td className="px-4 py-2">
            <div className="h-4 w-20 animate-pulse rounded bg-surface-container-high" />
          </td>

          {/* Price */}
          <td className="px-4 py-2">
            <div className="h-4 w-16 animate-pulse rounded bg-surface-container-high" />
          </td>

          {/* Status */}
          <td className="px-4 py-2">
            <div className="h-6 w-24 animate-pulse rounded-full bg-surface-container-high" />
          </td>

          {/* Actions */}
          <td className="px-4 py-2">
            <div className="flex gap-1">
              <div className="h-8 w-8 animate-pulse rounded bg-surface-container-high" />
              <div className="h-8 w-8 animate-pulse rounded bg-surface-container-high" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default MealTableSkeleton;