import { CalendarDays, Check, Printer, X } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { printKindAtom, selectedOrderAtom, selectedOrderIdAtom, updateOrderStatusAtom } from "../../atoms/orders/orderAtoms";
import { currency } from "../../data/orders";
import StatusBadge from "./StatusBadge";

const nextAction = { Accepted: ["Start preparing", "Preparing"], Preparing: ["Mark ready", "Ready"], Ready: ["Mark delivered", "Delivered"] };

export default function OrderDetailsDrawer() {
  const order = useAtomValue(selectedOrderAtom);
  const close = useSetAtom(selectedOrderIdAtom);
  const setPrintKind = useSetAtom(printKindAtom);
  const updateOrder = useSetAtom(updateOrderStatusAtom);
  if (!order) return null;
  const update = (status) => updateOrder({ id: order.id, status });
  const printTicket = (kind) => { setPrintKind(kind); window.setTimeout(() => window.print(), 50); };

  return <>
    <button type="button" aria-label="Close order details" onClick={() => close(null)} className="fixed inset-0 z-40 min-h-full cursor-default bg-black/30" />
    <aside aria-labelledby="order-detail-title" className="fixed inset-y-0 right-0 z-50 flex min-h-full w-full max-w-md flex-col border-l border-outline-variant bg-surface-container-lowest shadow-overlay transition-transform duration-1000 ease-in-out">
      <header className="flex items-start justify-between border-b border-outline-variant px-6 py-5"><div><p className="text-sm font-semibold text-primary">{order.id}</p><h2 id="order-detail-title" className="mt-1 text-xl font-bold text-on-surface">Order details</h2></div><button type="button" aria-label="Close order details" onClick={() => close(null)} className="rounded-md p-2 text-outline hover:bg-surface-container"><X size={20} /></button></header>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{order.initials}</span><div><p className="font-semibold text-on-surface">{order.customer}</p><p className="mt-1 text-sm text-on-surface-variant">{order.email}</p></div></div><StatusBadge status={order.status} /></div>
        <div className="mt-6 space-y-3 text-sm"><p className="flex items-center gap-2 text-on-surface-variant"><CalendarDays size={16} />{order.date}</p><p className="text-on-surface-variant">{order.phone}</p><p className="text-on-surface-variant">{order.address}</p></div>
        <div className="mt-7"><p className="text-label text-tertiary">ORDER ITEMS</p><ul className="mt-2 divide-y divide-outline-variant">{order.items.map((item) => <li key={item.name} className="flex justify-between gap-3 py-3 text-sm"><span className="text-on-surface">{item.name} <span className="text-outline">× {item.quantity}</span></span><span className="shrink-0 text-on-surface">{currency(item.price * item.quantity)}</span></li>)}</ul></div>
        <div className="mt-4 flex items-center justify-between border-t border-outline-variant pt-4"><span className="font-semibold text-on-surface">Total</span><span className="text-lg font-bold text-primary">{currency(order.total)}</span></div>
        <div className="mt-7 grid grid-cols-2 gap-3">{["kitchen", "customer"].map((kind) => <button key={kind} type="button" onClick={() => printTicket(kind)} className="flex items-center justify-center gap-2 rounded-md border border-outline-variant px-3 py-3 text-sm font-semibold text-on-surface transition hover:border-primary hover:text-primary"><Printer size={16} />{kind === "kitchen" ? "Kitchen ticket" : "Customer ticket"}</button>)}</div>
      </div>
      <footer className="border-t border-outline-variant p-6">{order.status === "Pending" ? <div className="flex gap-3"><button type="button" onClick={() => update("Accepted")} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-on-primary"><Check size={17} />Accept order</button><button type="button" onClick={() => update("Refused")} className="flex flex-1 items-center justify-center gap-2 rounded-md border border-secondary/40 px-4 py-3 text-sm font-semibold text-secondary"><X size={17} />Refuse</button></div> : nextAction[order.status] ? <button type="button" onClick={() => update(nextAction[order.status][1])} className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-on-primary">{nextAction[order.status][0]}</button> : <p className="text-center text-sm text-on-surface-variant">This order is {order.status.toLowerCase()}.</p>}</footer>
    </aside>
  </>;
}
