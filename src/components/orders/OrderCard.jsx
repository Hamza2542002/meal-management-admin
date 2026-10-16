import { Check, X } from "lucide-react";
import { currency } from "../../data/orders";
import StatusBadge from "./StatusBadge";

const nextStatus = { Accepted: ["Start preparing", "Preparing"], Preparing: ["Mark ready", "Ready"], Ready: ["Mark delivered", "Delivered"] };

export default function OrderCard({ order, onSelect, onUpdate }) {
  const advance = nextStatus[order.status];
  return <article role="button" tabIndex={0} onClick={() => onSelect(order.id)} onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(order.id); }
  }} className="cursor-pointer rounded-lg border border-outline-variant bg-surface-container-lowest p-5 text-left shadow-sm transition hover:border-primary/50 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-primary/40">
    <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-primary">{order.id}</p><p className="mt-1 text-xs text-outline">{order.date}</p></div><StatusBadge status={order.status} /></div>
    <div className="mt-4 flex items-center gap-3 border-b border-outline-variant pb-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{order.initials}</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-on-surface">{order.customer}</p><p className="truncate text-xs text-outline">{order.email}</p></div></div>
    <div className="py-4"><p className="text-label text-tertiary">ORDER SUMMARY</p><ul className="mt-2 space-y-1.5">{order.items.slice(0, 2).map((item) => <li key={item.name} className="flex justify-between gap-3 text-sm"><span className="truncate text-on-surface-variant">{item.quantity} × {item.name}</span><span className="shrink-0 text-on-surface">{currency(item.price * item.quantity)}</span></li>)}</ul>{order.items.length > 2 && <p className="mt-1 text-xs text-outline">+{order.items.length - 2} more items</p>}</div>
    <div className="flex items-center justify-between border-t border-outline-variant pt-3"><span className="text-sm text-on-surface-variant">Order total</span><span className="text-lg font-bold text-on-surface">{currency(order.total)}</span></div>
    <div className="mt-4 flex flex-wrap gap-2" onClick={(event) => event.stopPropagation()}>
      {order.status === "Pending" ? <><button type="button" onClick={() => onUpdate(order.id, "Accepted")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-dark"><Check size={16} />Accept order</button><button type="button" onClick={() => onUpdate(order.id, "Refused")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-secondary/40 px-3 py-2.5 text-sm font-semibold text-secondary transition hover:bg-secondary/5"><X size={16} />Refuse</button></> : order.status === "Refused" || order.status === "Delivered" ? <p className="w-full py-2 text-center text-xs font-medium text-outline">{order.status === "Refused" ? "This order was refused" : "This order is complete"}</p> : <div className="flex w-full items-center justify-between"><p className="text-xs text-on-surface-variant">{order.status === "Accepted" ? "Accepted · ready to prepare" : order.status === "Preparing" ? "Kitchen is preparing" : "Ready for pickup"}</p><button type="button" onClick={() => onUpdate(order.id, advance[1])} className="rounded-md border border-primary px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white">{advance[0]}</button></div>}
    </div>
  </article>;
}
