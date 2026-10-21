import { useState } from "react";
import { X } from "lucide-react";
import categoriesService from "../../services/categoriesService";

export default function CategoryActionModal({ category, mode, onClose, onModeChange }) {
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isDelete = mode === "delete";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!isDelete && !trimmedName) {
      setError("Enter a category name.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (isDelete) await categoriesService.remove(category.id);
      else await categoriesService.update(category.id, trimmedName);
      onClose();
    } catch (actionError) {
      setError(actionError.code === "category/name-already-exists"
        ? "A category with this name already exists."
        : `Could not ${isDelete ? "delete" : "update"} the category. Please try again.`);
    } finally {
      setSaving(false);
    }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="category-action-title" className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-overlay">
      <header className="mb-5 flex items-start justify-between"><div><h2 id="category-action-title" className="text-xl font-bold text-on-surface">{isDelete ? "Delete category" : "Edit category"}</h2><p className="mt-1 text-sm text-on-surface-variant">{isDelete ? "Confirm that you want to delete this category." : "Update the category name or delete this category."}</p></div><button type="button" aria-label="Close dialog" onClick={onClose} className="rounded-md p-2 text-outline hover:bg-surface-container"><X size={20} /></button></header>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="category-name" className="mb-2 block text-sm font-medium text-on-surface">Category name</label>
          <input id="category-name" autoFocus={!isDelete} disabled={isDelete} value={name} onChange={(event) => setName(event.target.value)} maxLength={60} className="h-11 w-full rounded-md border border-outline-variant bg-background px-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-surface-container disabled:text-on-surface-variant" />
          {error && <p role="alert" className="mt-2 text-sm text-error">{error}</p>}</div>
        <div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={onClose} className="rounded-md border border-outline-variant px-4 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container">Cancel</button>{!isDelete && <button type="button" onClick={() => onModeChange("delete")} className="mr-auto rounded-md border border-error/40 px-4 py-2.5 text-sm font-semibold text-error hover:bg-error/5">Delete</button>}<button type="submit" disabled={saving} className={`rounded-md px-4 py-2.5 text-sm font-semibold text-on-primary disabled:cursor-wait disabled:opacity-60 ${isDelete ? "bg-error" : "bg-primary hover:bg-primary-dark"}`}>{saving ? "Saving…" : isDelete ? "Delete category" : "Save changes"}</button></div>
      </form>
    </section>
  </div>;
}
