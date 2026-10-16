import { Check, Clock3, ShoppingBag } from "lucide-react";
import { useAtomValue } from "jotai";
import { orderCountsAtom } from "../../atoms/orders/orderAtoms";

export default function OrdersSummary() {
  const counts = useAtomValue(orderCountsAtom);
  const stats = [
    { label: "Total orders", value: counts.all, Icon: ShoppingBag, hint: "All orders received" },
    { label: "Awaiting response", value: counts.pending, Icon: Clock3, hint: "Accept or refuse these orders" },
    { label: "In progress", value: counts.active, Icon: Check, hint: "Accepted and being fulfilled" },
  ];
  return <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Order summary">
    {stats.map(({ label, value, Icon, hint }) => <article key={label} className="flex items-start justify-between rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
      <div><p className="text-sm font-medium text-on-surface-variant">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-primary">{value}</p><p className="mt-1 text-xs text-outline">{hint}</p></div>
      <span className="rounded-lg bg-primary/10 p-2.5 text-primary"><Icon size={20} /></span>
    </article>)}
  </section>;
}
