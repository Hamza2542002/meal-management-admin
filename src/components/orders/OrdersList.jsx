import { Search } from "lucide-react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { filteredOrdersAtom, orderFilterAtom, orderPageAtom, orderSearchAtom, ordersAtom, selectedOrderIdAtom, updateOrderStatusAtom } from "../../atoms/orders/orderAtoms";
import { ORDER_PAGE_SIZE, orderFilters } from "../../data/orders";
import Pagination from "../common/Pagination";
import OrderCard from "./OrderCard";

export default function OrdersList() {
  const orders = useAtomValue(ordersAtom);
  const visibleOrders = useAtomValue(filteredOrdersAtom);
  const [filter, setFilter] = useAtom(orderFilterAtom);
  const [search, setSearch] = useAtom(orderSearchAtom);
  const [page, setPage] = useAtom(orderPageAtom);
  const setSelectedId = useSetAtom(selectedOrderIdAtom);
  const updateOrder = useSetAtom(updateOrderStatusAtom);
  const totalPages = Math.max(1, Math.ceil(visibleOrders.length / ORDER_PAGE_SIZE));
  const pageNumber = Math.min(page, totalPages);
  const pageOrders = visibleOrders.slice((pageNumber - 1) * ORDER_PAGE_SIZE, pageNumber * ORDER_PAGE_SIZE);

  return <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
    <div className="flex flex-col gap-4 border-b border-outline-variant p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold text-on-surface">Orders</h2><p className="mt-1 text-sm text-on-surface-variant">Select an order to view its details and print tickets.</p></div><label className="flex h-10 w-full items-center gap-2 rounded-md border border-outline-variant bg-background px-3 sm:max-w-xs"><Search size={17} className="shrink-0 text-outline" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search orders or customers" className="min-w-0 flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-outline" /></label></div>
    <div className="flex gap-1 overflow-x-auto border-b border-outline-variant px-4 pt-2">{orderFilters.map((item) => <button key={item} type="button" onClick={() => { setFilter(item); setPage(1); }} className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors ${filter === item ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}>{item}<span className="ml-2 rounded-full bg-surface-container px-2 py-0.5 text-xs">{item === "All orders" ? orders.length : orders.filter((order) => order.status === item).length}</span></button>)}</div>
    <div className="grid grid-cols-1 gap-4 bg-surface-container-low p-4 md:grid-cols-2 2xl:grid-cols-3">{pageOrders.map((order) => <OrderCard key={order.id} order={order} onSelect={setSelectedId} onUpdate={(id, status) => updateOrder({ id, status })} />)}
      {visibleOrders.length === 0 && <div className="col-span-full rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-5 py-14 text-center"><Search size={24} className="mx-auto text-outline" /><p className="mt-3 font-medium text-on-surface">No orders found</p><p className="mt-1 text-sm text-on-surface-variant">Try another search or status filter.</p></div>}
    </div>
    {visibleOrders.length > 0 && <Pagination currentPage={pageNumber} totalPages={totalPages} totalCount={visibleOrders.length} pageSize={ORDER_PAGE_SIZE} itemLabel="orders" onPageChange={setPage} />}
  </section>;
}
