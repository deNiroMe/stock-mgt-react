// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import products from "../views/Products/store"
import statementLine from "../views/Products/ProductStatementLine/store"
import items from "../views/ItemLines/store"
import clients from "../views/Clients/store"
import suppliers from "../views/Suppliers/store"
import cart from "../views/Cart/store"
import invoices from "../views/Sales/store"
import purchases from "../views/Purchases/store"
import payments from "../views/Payments/store"

import users from "../views/Users/store"

const rootReducer = { 
    navbar, 
    layout, 
    products,
    statementLine,
    items,
    clients,
    suppliers,
    cart,
    invoices,
    purchases,
    payments,
    users
}

export default rootReducer
