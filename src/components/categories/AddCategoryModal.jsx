import { useState } from "react";
import { X } from "lucide-react";
import categoriesService from "../../services/categoriesService";
import CategoryIconPicker from "./CategoryIconPicker";

export default function AddCategoryModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [iconName, setIconName] = useState("Tags");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Enter a category name.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await categoriesService.create(trimmedName, iconName);
      onCreated();
    } catch (saveError) {
      setError(saveError.code === "category/name-already-exists"
        ? "A category with this name already exists."
        : "Could not save the category. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="add-category-title" className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-overlay">
      <header className="mb-5 flex items-start justify-between"><div><h2 id="add-category-title" className="text-xl font-bold text-on-surface">Add category</h2><p className="mt-1 text-sm text-on-surface-variant">Create a category for organizing your meals.</p></div><button type="button" aria-label="Close dialog" onClick={onClose} className="rounded-md p-2 text-outline hover:bg-surface-container"><X size={20} /></button></header>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><label htmlFor="category-name" className="mb-2 block text-sm font-medium text-on-surface">Category name</label><input id="category-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Main courses" maxLength={60} className="h-11 w-full rounded-md border border-outline-variant bg-background px-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />{error && <p role="alert" className="mt-2 text-sm text-error">{error}</p>}</div>
        <CategoryIconPicker value={iconName} onChange={setIconName} />
        <div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-md border border-outline-variant px-4 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container">Cancel</button><button type="submit" disabled={saving} className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark disabled:cursor-wait disabled:opacity-60">{saving ? "Saving…" : "Add category"}</button></div>
      </form>
    </section>
  </div>;
}
