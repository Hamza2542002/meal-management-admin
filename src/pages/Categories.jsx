import { useEffect, useState } from "react";
import { Edit, Plus, Radiation, Search, Tags, Trash2, Zap } from "lucide-react";
import { useAtomValue } from "jotai";
import PageHeader from "../components/common/PageHeader";
import AddCategoryModal from "../components/categories/AddCategoryModal";
import CategoryActionModal from "../components/categories/CategoryActionModal";
import CategorySummaryCards from "../components/categories/CategorySummaryCards";
import Pagination from "../components/common/Pagination";
import {
  categoriesAtom,
  categoriesLoadedAtom,
  categoriesLoadingAtom,
  categoryStatsAtom,
} from "../atoms/meals/categoryAtom";
import categoriesService from "../services/categoriesService";
import DropDownInput from "../components/common/DropDownInput";
import CategoryIconPicker, { CategoryIcon } from "../components/categories/CategoryIconPicker";

const PAGE_SIZE = 6;

export default function Categories() {
  const categories = useAtomValue(categoriesAtom);
  const stats = useAtomValue(categoryStatsAtom);
  const categoriesLoaded = useAtomValue(categoriesLoadedAtom);
  const [showModal, setShowModal] = useState(false);
  const [actionCategory, setActionCategory] = useState(null);
  const [actionMode, setActionMode] = useState("edit");
  const loading = useAtomValue(categoriesLoadingAtom) || !categoriesLoaded;
  const [search, setSearch] = useState("");
  const [mealFilter, setMealFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [iconName, setIconName] = useState("Tags");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleQuickAdd = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter a category name.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await categoriesService.create(name, iconName);
      setName("");
      setIconName("Tags");
    } catch (saveError) {
      setError(saveError.code === "category/name-already-exists" ? "A category with this name already exists." : "Could not save the category. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!categoriesLoaded) categoriesService.getAll();
  }, [categoriesLoaded]);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      ?.toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesMealFilter =
      mealFilter === "all" ||
      (mealFilter === "with-meals"
        ? category.mealCount > 0
        : category.mealCount === 0);
    return matchesSearch && matchesMealFilter;
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / PAGE_SIZE),
  );
  const pageNumber = Math.min(currentPage, totalPages);
  const pageCategories = filteredCategories.slice(
    (pageNumber - 1) * PAGE_SIZE,
    pageNumber * PAGE_SIZE,
  );

  return (
    <div className="space-y-7 py-8">
      <PageHeader
        title="Categories"
        description="Organize your meals with categories."
        buttons={[
          {
            id: "add-category",
            text: "Add New Category",
            icon: Plus,
            onClick: () => setShowModal(true),
            mode: "primary-container",
          },
        ]}
      />
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
        <div className="col-span-1 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
          <div className="flex items-center gap-2 border-b border-outline-variant p-4 text-lg font-semibold text-on-surface"><Zap size={19} className="text-secondary" /> Quick Add</div>
          <form className="space-y-4 p-4" onSubmit={handleQuickAdd}>
            <div>
              <label htmlFor="quick-category-name" className="mb-2 block text-sm font-medium uppercase text-on-surface">Category name</label>
              <input id="quick-category-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} className="h-11 w-full rounded-md border border-outline-variant bg-background px-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <CategoryIconPicker value={iconName} onChange={setIconName} />
            {error && <p role="alert" className="text-sm text-error">{error}</p>}
            <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60"><Plus size={17} />{saving ? "Saving…" : "Add category"}</button>
          </form>
        </div>
        <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest col-span-2">
          <div className="flex flex-col gap-4 border-b border-outline-variant p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-on-surface">
                All categories
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                {filteredCategories.length}{" "}
                {filteredCategories.length === 1
                  ? "category"
                  : "categories"}
              </p>

            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex h-10 items-center gap-2 rounded-md border border-outline-variant bg-background px-3 sm:w-64">
                <Search
                  size={17}
                  className="shrink-0 text-outline"
                />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search categories"
                  className="min-w-0 flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-outline"
                />
              </label>
              <DropDownInput
                className="h-10 rounded-md border border-outline-variant bg-background px-3 text-sm text-on-surface outline-none focus:border-primary"
                register={null}
                error={null}
                onChange={(event) => {
                  setMealFilter(event);
                  setCurrentPage(1);
                }}
                value={mealFilter}
                label="Category Filter"
                options={[
                  { value: "all", label: "All categories" },
                  { value: "with-meals", label: "With meals" },
                  { value: "no-meals", label: "No meals" },
                ]}
              />
            </div>
          </div>
          {loading ? (
            <p className="px-5 py-12 text-center text-sm text-on-surface-variant">
              Loading categories…
            </p>
          ) : pageCategories.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-xs uppercase tracking-wide text-on-surface-variant">
                    <tr>
                      <th className="px-5 py-3 font-semibold">
                        Category
                      </th>
                      <th className="px-5 py-3 font-semibold">
                        Status
                      </th>
                      <th className="px-5 py-3 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {pageCategories.map(function (category, index) {
                      return (
                        <tr
                          key={
                            category.id ??
                            `${category.name}-${index}`
                          }
                          className="hover:bg-surface-container-low"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="rounded-lg bg-primary/10 p-2.5 text-primary">
                                <CategoryIcon name={category.iconName} size={18} />
                              </span>
                              <div className="flex flex-col">
                                <span className="font-medium text-on-surface">
                                  {category.name}
                                </span>
                                <span className="text-sm text-on-surface-variant">
                                  Active Items {category.mealCount ?? 0}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${category.mealCount ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}
                            >
                              {category.mealCount
                                ? "In use"
                                : "Empty"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                aria-label={`Edit ${category.name}`}
                                onClick={() => {
                                  setActionCategory(
                                    category,
                                  );
                                  setActionMode(
                                    "edit",
                                  );
                                }}
                                className="rounded-md p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary"
                              >
                                <Edit size={17} />
                              </button>
                              <button
                                type="button"
                                aria-label={`Delete ${category.name}`}
                                onClick={() => {
                                  setActionCategory(
                                    category,
                                  );
                                  setActionMode(
                                    "delete",
                                  );
                                }}
                                className="rounded-md p-2 hover:bg-error-container hover:text-error"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                totalCount={filteredCategories.length}
                pageSize={PAGE_SIZE}
                itemLabel="categories"
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="px-5 py-14 text-center">
              <Tags size={26} className="mx-auto text-outline" />
              <p className="mt-3 font-medium text-on-surface">
                {categories.length
                  ? "No matching categories"
                  : "No categories yet"}
              </p>
              <p className="mt-1 text-sm text-on-surface-variant">
                {categories.length
                  ? "Try another search or filter."
                  : "Add a category to start organizing your meals."}
              </p>
            </div>
          )}
        </section>
      </div>
      <CategorySummaryCards
        categories={categories}
        uncategorizedMealCount={stats.uncategorizedMealCount}
      />
      <section className="relative isolate flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-primary via-primary to-[#032c14] p-6 text-on-primary shadow-overlay sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full border-[28px] border-white/[0.06]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-36 -z-10 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="relative max-w-2xl space-y-2">
          <h2 className="text-4xl font-bold">Optimize Your Meal</h2>
          <p className="text-sm font-normal leading-relaxed text-on-primary/85 sm:text-base">
            Organizing Categories Helps Waiters Place Orders 24% Faster During Peak Hours.
          </p>
        </div>
        <button type="button" className="relative shrink-0 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
          Analytics Report
        </button>
      </section>
      {
        showModal && (
          <AddCategoryModal
            onClose={() => setShowModal(false)}
            onCreated={() => setShowModal(false)}
          />
        )
      }
      {
        actionCategory && (
          <CategoryActionModal
            category={actionCategory}
            mode={actionMode}
            onModeChange={setActionMode}
            onClose={() => setActionCategory(null)}
          />
        )
      }
    </div >
  );
}
