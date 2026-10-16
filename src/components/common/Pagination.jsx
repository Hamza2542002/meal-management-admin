import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  itemLabel = "meals",
}) {
  const firstItem = totalCount === 0
    ? 0
    : (currentPage - 1) * pageSize + 1;

  const lastItem = Math.min(
    currentPage * pageSize,
    totalCount
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col gap-4 border-t border-outline-variant px-4 py-4 sm:flex-row sm:items-center sm:justify-between bg-surface-container-low">
      {/* Result information */}
      <p className="text-body-sm text-on-surface-variant">
        Showing{" "}
        <span className="font-semibold text-on-surface">
          {firstItem}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-on-surface">
          {lastItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-on-surface">
          {totalCount}
        </span>{" "}
        {itemLabel}
      </p>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded border-0 border-outline-variant text-on-surface-variant transition-colors bg-white hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={[
              "flex h-9 min-w-9 items-center justify-center rounded px-2 text-sm font-semibold transition-colors",
              currentPage === page
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant bg-white hover:bg-surface-container",
            ].join(" ")}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded border-0 border-outline-variant text-on-surface-variant transition-colors bg-white hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
