import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import {
  ArrowRight,
  ClipboardList,
  Clock3,
  DollarSign,
  Flame,
  Plus,
  Utensils,
} from "lucide-react";
import { ordersAtom } from "../atoms/orders/orderAtoms";
import { currency } from "../data/orders";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-sky-50 text-sky-700",
  Preparing: "bg-violet-50 text-violet-700",
  Ready: "bg-emerald-50 text-emerald-700",
  Delivered: "bg-slate-100 text-slate-600",
  Refused: "bg-rose-50 text-rose-700",
};

function Dashboard() {
  const orders = useAtomValue(ordersAtom);

  const { pendingCount, activeCount, orderValue, popularMeals } = useMemo(() => {
    const mealCounts = new Map();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        mealCounts.set(item.name, (mealCounts.get(item.name) ?? 0) + item.quantity);
      });
    });

    return {
      pendingCount: orders.filter((order) => order.status === "Pending").length,
      activeCount: orders.filter((order) => ["Accepted", "Preparing", "Ready"].includes(order.status)).length,
      orderValue: orders.reduce((total, order) => total + order.total, 0),
      popularMeals: [...mealCounts.entries()]
        .sort((first, second) => second[1] - first[1])
        .slice(0, 4),
    };
  }, [orders]);

  const stats = [
    { label: "Total orders", value: orders.length, detail: "Across all statuses", icon: ClipboardList, color: "bg-blue-50 text-blue-700" },
    { label: "Needs attention", value: pendingCount, detail: "Orders waiting for review", icon: Clock3, color: "bg-amber-50 text-amber-700" },
    { label: "In the kitchen", value: activeCount, detail: "Accepted, preparing, or ready", icon: Utensils, color: "bg-emerald-50 text-emerald-700" },
    { label: "Order value", value: currency(orderValue), detail: "Total of listed orders", icon: DollarSign, color: "bg-violet-50 text-violet-700" },
  ];

  return (
    <div className="space-y-8 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary/70">Overview</p>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-sm text-on-surface-variant sm:text-base">
            A quick look at what’s happening in your kitchen.
          </p>
        </div>
        <Link
          to="/meals"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary transition hover:bg-primary-dark"
        >
          <Plus size={17} />
          Manage menu
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Order summary">
        {stats.map(({ label, value, detail, icon: Icon, color }) => (
          <article key={label} className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-on-surface-variant">{label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-on-surface">{value}</p>
              </div>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon size={19} />
              </span>
            </div>
            <p className="mt-3 text-xs text-outline">{detail}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-xl border border-outline-variant bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-outline-variant px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-on-surface">Recent orders</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Keep track of the latest requests.</p>
            </div>
            <Link to="/orders" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
              All orders <ArrowRight size={16} />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-outline">No orders to show yet.</div>
          ) : (
            <div className="divide-y divide-outline-variant">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-xs font-semibold text-primary">
                      {order.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-on-surface">{order.customer}</p>
                      <p className="mt-0.5 text-xs text-outline">{order.id} · {order.items.length} {order.items.length === 1 ? "item" : "items"}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {order.status}
                    </span>
                    <span className="w-16 text-right text-sm font-semibold text-on-surface">{currency(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-outline-variant bg-white">
          <div className="border-b border-outline-variant px-5 py-4">
            <div className="flex items-center gap-2">
              <Flame size={19} className="text-secondary" />
              <h2 className="text-lg font-semibold text-on-surface">Popular meals</h2>
            </div>
            <p className="mt-1 text-sm text-on-surface-variant">Most ordered from the current list.</p>
          </div>

          {popularMeals.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-outline">Meal activity will appear here.</div>
          ) : (
            <ol className="divide-y divide-outline-variant px-5">
              {popularMeals.map(([name, quantity], index) => (
                <li key={name} className="flex items-center gap-3 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-on-surface">{name}</span>
                  <span className="shrink-0 text-xs text-outline">{quantity} ordered</span>
                </li>
              ))}
            </ol>
          )}
          <div className="border-t border-outline-variant px-5 py-3">
            <Link to="/meals" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View menu <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
