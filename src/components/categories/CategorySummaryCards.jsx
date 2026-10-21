import { BellRing, Dot, FolderKanban, Layers3, TrendingUp } from "lucide-react";

export default function CategorySummaryCards({ categories, uncategorizedMealCount }) {
  const popularCategory = [...categories].sort((a, b) => (b.mealCount ?? 0) - (a.mealCount ?? 0))[0];
  const cards = [
    { title: "Most popular category", mode: "primary", subtitle: popularCategory?.name ?? "No categories yet", footer: popularCategory?.mealCount ? `+${popularCategory.mealCount}% orders this week` : "No categories yet", Icon: TrendingUp },
    { title: "Recently Edited", mode: "secondary", subtitle: "Signature Desserts", footer: "Edited by shif Marco 2h ago", Icon: Layers3 },
    { title: "Needs Review", mode: "primary", subtitle: "Seasonal Specials", footer: "3 items Missing pricing data", Icon: BellRing },
  ];

  return <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 " aria-label="Category summary">
    {cards.map(({ title, subtitle, footer, Icon, mode }) =>
      <article key={title} className="relative overflow-hidden flex min-h-48 flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-5 last:border-l-3 last:border-l-primary">
        <span className={`absolute h-30 w-30 -top-4 -right-4 rounded-full ${mode == "primary" ? "bg-on-primary-container/30" : "bg-surface-variant/30"}`}></span>
        <div className="flex flex-col gap-4 items-start justify-between">
          <span className={`rounded-full p-2.5 ${mode == "primary" ? "bg-on-primary-container/30  text-primary" : "bg-surface-variant/30 "}`}>
            <Icon size={20} />
          </span>
          <p className="text-sm font-medium text-black">{title}</p>
        </div>
        <p className="mt-3 truncate text-2xl font-bold text-primary-dark">{subtitle}</p>
        <footer className={`mt-auto pt-3 text-sm font-semibold ${mode == "primary" ? "text-on-primary-fixed-variant" : "text-outline"}`}>{footer}</footer>
      </article>)}
  </section>;
}
