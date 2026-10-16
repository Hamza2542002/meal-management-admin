import { useAtomValue } from "jotai";
import { printKindAtom, selectedOrderAtom } from "../../atoms/orders/orderAtoms";
import { currency } from "../../data/orders";

export default function OrderPrintTicket() {
  const order = useAtomValue(selectedOrderAtom);
  const kind = useAtomValue(printKindAtom);
  if (!order) return null;
  return <div id="order-ticket-print" style={{ display: "none" }}>
    <h1>{kind === "kitchen" ? "Kitchen ticket" : "Customer receipt"}</h1><p>{order.id} · {order.date}</p><hr /><p><strong>{order.customer}</strong></p>{kind === "customer" && <p>{order.address}</p>}<ul>{order.items.map((item) => <li key={item.name}>{item.quantity} × {item.name} {kind === "customer" ? `— ${currency(item.price * item.quantity)}` : ""}</li>)}</ul>{kind === "customer" && <h2>Total: {currency(order.total)}</h2>}
  </div>;
}
