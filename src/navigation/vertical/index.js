import { Mail, Home, Package, List, DollarSign, ArrowDown, Users, Book, Edit2 } from "react-feather"

export default [
  {
    id: "home",
    title: "app.sidebar.home",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "products",
    title: "app.sidebar.products",
    icon: <Package size={20} />,
    navLink: "/products"
  },
  {
    id: "sales",
    title: "app.sidebar.sales",
    icon: <List size={20} />,
    navLink: "/sales"
  },
  {
    id: "createCart",
    title: "app.sidebar.create_cart",
    icon: <Edit2 size={20} />,
    navLink: "/create-cart"
  },
  {
    id: "benefits",
    title: "app.sidebar.benifits",
    icon: <DollarSign size={20} />,
    navLink: "/benefits"
  },
  {
    id: "createPurchaseCart",
    title: "app.sidebar.create_purchase_cart",
    icon: <Edit2 size={20} />,
    navLink: "/create-purchase-cart"
  },
  {
    id: "purchases",
    title: "app.sidebar.purchases",
    icon: <ArrowDown size={20} />,
    navLink: "/purchases"
  },
  {
    id: "payments",
    title: "app.sidebar.payments",
    icon: <Book size={20} />,
    navLink: "/payments"
  },
  {
    id: "createPayment",
    title: "app.sidebar.create_payment",
    icon: <Book size={20} />,
    navLink: "/create-payment"
  },
  {
    id: "clients",
    title: "app.sidebar.clients",
    icon: <Users size={20} />,
    navLink: "/clients"
  },
  {
    id: "suppliers",
    title: "app.sidebar.suppliers",
    icon: <Users size={20} />,
    navLink: "/suppliers"
  },
  {
    id: "users",
    title: "app.sidebar.users",
    icon: <Users size={20} />,
    navLink: "/users"
  }
]
