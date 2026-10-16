import { atom } from "jotai";
import { initialOrders } from "../../data/orders";

export const ordersAtom = atom(initialOrders);
export const orderFilterAtom = atom("All orders");
export const orderSearchAtom = atom("");
export const orderPageAtom = atom(1);
export const selectedOrderIdAtom = atom(null);
export const printKindAtom = atom("kitchen");

export const filteredOrdersAtom = atom((get) => {
  const orders = get(ordersAtom);
  const filter = get(orderFilterAtom);
  const query = get(orderSearchAtom).trim().toLowerCase();
  return orders.filter((order) => {
    const matchesFilter = filter === "All orders" || order.status === filter;
    const searchable = `${order.id} ${order.customer} ${order.email} ${order.items.map((item) => item.name).join(" ")}`.toLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });
});

export const orderCountsAtom = atom((get) => {
  const orders = get(ordersAtom);
  return {
    all: orders.length,
    pending: orders.filter((order) => order.status === "Pending").length,
    active: orders.filter((order) => ["Accepted", "Preparing", "Ready"].includes(order.status)).length,
    delivered: orders.filter((order) => order.status === "Delivered").length,
  };
});

export const selectedOrderAtom = atom((get) =>
  get(ordersAtom).find((order) => order.id === get(selectedOrderIdAtom))
);

export const updateOrderStatusAtom = atom(null, (get, set, { id, status }) => {
  set(ordersAtom, get(ordersAtom).map((order) => order.id === id ? { ...order, status } : order));
});
