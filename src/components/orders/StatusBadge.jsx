const colors = {
  Pending: "bg-amber-100 text-amber-800",
  Accepted: "bg-sky-100 text-sky-800",
  Preparing: "bg-rose-100 text-rose-700",
  Ready: "bg-violet-100 text-violet-800",
  Delivered: "bg-emerald-100 text-emerald-800",
  Refused: "bg-slate-100 text-slate-600",
};

export default function StatusBadge({ status }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{status}
  </span>;
}
