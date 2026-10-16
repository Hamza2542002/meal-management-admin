export const initialOrders = [
  { id: "#VG-1048", customer: "Olivia Rhye", initials: "OR", email: "olivia.rhye@example.com", phone: "+1 (555) 010-2048", address: "28 Green Street, New York", items: [{ name: "Grilled Chicken Bowl", quantity: 2, price: 12.5 }, { name: "Garden Salad", quantity: 1, price: 9.5 }], date: "Oct 10, 2026 · 11:42 AM", total: 34.5, status: "Pending" },
  { id: "#VG-1047", customer: "Phoenix Baker", initials: "PB", email: "phoenix.baker@example.com", phone: "+1 (555) 010-2047", address: "14 Market Lane, New York", items: [{ name: "Classic Beef Burger", quantity: 1, price: 14 }, { name: "Truffle Fries", quantity: 1, price: 8 }], date: "Oct 10, 2026 · 11:18 AM", total: 22, status: "Pending" },
  { id: "#VG-1046", customer: "Lana Steiner", initials: "LS", email: "lana.steiner@example.com", phone: "+1 (555) 010-2046", address: "7 River Road, New York", items: [{ name: "Creamy Mushroom Pasta", quantity: 2, price: 14.5 }], date: "Oct 10, 2026 · 10:56 AM", total: 29, status: "Accepted" },
  { id: "#VG-1045", customer: "Demi Wilkinson", initials: "DW", email: "demi.wilkinson@example.com", phone: "+1 (555) 010-2045", address: "52 Oak Avenue, New York", items: [{ name: "Crispy Chicken Wrap", quantity: 1, price: 12.5 }, { name: "Fresh Lemonade", quantity: 2, price: 3.5 }], date: "Oct 10, 2026 · 10:31 AM", total: 19.5, status: "Preparing" },
  { id: "#VG-1044", customer: "Candice Wu", initials: "CW", email: "candice.wu@example.com", phone: "+1 (555) 010-2044", address: "19 Elm Street, New York", items: [{ name: "Mediterranean Grain Bowl", quantity: 1, price: 16 }], date: "Oct 10, 2026 · 10:08 AM", total: 16, status: "Refused" },
  { id: "#VG-1043", customer: "Natali Craig", initials: "NC", email: "natali.craig@example.com", phone: "+1 (555) 010-2043", address: "36 Pine Street, New York", items: [{ name: "Classic Beef Burger", quantity: 2, price: 14 }, { name: "Garden Salad", quantity: 1, price: 4 }], date: "Oct 10, 2026 · 9:46 AM", total: 32, status: "Delivered" },
  { id: "#VG-1042", customer: "Drew Cano", initials: "DC", email: "drew.cano@example.com", phone: "+1 (555) 010-2042", address: "80 Lakeview Drive, New York", items: [{ name: "Grilled Chicken Bowl", quantity: 1, price: 18.5 }], date: "Oct 10, 2026 · 9:22 AM", total: 18.5, status: "Ready" },
];

export const orderFilters = ["All orders", "Pending", "Accepted", "Preparing", "Ready", "Delivered", "Refused"];
export const currency = (amount) => `$${amount.toFixed(2)}`;
export const ORDER_PAGE_SIZE = 6;



