import PageHeader from "../components/common/PageHeader";
import OrderDetailsDrawer from "../components/orders/OrderDetailsDrawer";
import OrderPrintTicket from "../components/orders/OrderPrintTicket";
import OrdersList from "../components/orders/OrdersList";
import OrdersSummary from "../components/orders/OrdersSummary";

export default function Orders() {
  return <div className="space-y-7 py-8">
    <style>{`@media print { body * { visibility: hidden !important; } #order-ticket-print, #order-ticket-print * { visibility: visible !important; } #order-ticket-print { display: block !important; position: absolute; inset: 0 auto auto 0; width: 100%; padding: 24px; color: #111; background: #fff; } }`}</style>
    <PageHeader title="Orders" description="Review new orders and manage their progress." />
    <OrdersSummary />
    <OrdersList />
    <OrderDetailsDrawer />
    <OrderPrintTicket />
  </div>;
}
