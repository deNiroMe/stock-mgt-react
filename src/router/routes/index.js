// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"

// ** Utils
import { isObjEmpty } from "@utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Stock Manager App"

// ** Default Route
const DefaultRoute = "/home"

const Home = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const Error = lazy(() => import("../../views/Error"))

const Products = lazy(() => import("../../views/Products/Products"))
const ProductView = lazy(() => import("../../views/Products/view/index"))
const CreateCart = lazy(() => import("../../views/Cart/CreateCart/index"))
const CreatePurchaseCart = lazy(() => import("../../views/PurchaseCart/CreateCart/index"))
const Clients = lazy(() => import("../../views/Clients/Clients"))
const ClientView = lazy(() => import("../../views/Clients/view/index"))
const Suppliers = lazy(() => import("../../views/Suppliers/Suppliers"))
const SupplierView = lazy(() => import("../../views/Suppliers/view/index"))
const Payments = lazy(() => import("../../views/Payments/Payments"))
const Users = lazy(() => import("../../views/Users/Users"))
const Sales = lazy(() => import("../../views/Sales/Sales"))
const InvoiceView = lazy(() => import("../../views/Sales/view/index"))
const InvoiceEdit = lazy(() => import("../../views/Sales/edit/index"))
const Purchases = lazy(() => import("../../views/Purchases/Purchases"))
const PurchaseView = lazy(() => import("../../views/Purchases/view/index"))
const PurchaseEdit = lazy(() => import("../../views/Purchases/edit/index"))
const Benefits = lazy(() => import("../../views/Benefits/Benefits"))


// ------------
const Demo = lazy(() => import("../../views/Wheel/Demo"))

// ** Merge Routes
const Routes = [
  {
    path: "/demo",
    element: <Demo />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/second-page",
    element: <SecondPage />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/products/view/:id",
    element: <ProductView />
  },
  {
    path: "/create-cart",
    element: <CreateCart />
  },
  {
    path: "/create-purchase-cart",
    element: <CreatePurchaseCart />
  },
  {
    path: "/clients",
    element: <Clients />
  },
  {
    path: '/clients/view/:id',
    element: <ClientView />
  },
  {
    path: "/suppliers",
    element: <Suppliers />
  },
  {
    path: '/suppliers/view/:id',
    element: <SupplierView />
  },
  {
    path: "/sales",
    element: <Sales />
  },
  {
    path: "/sales/view/:id",
    element: <InvoiceView />
  },
  {
    path: "/sales/edit/:id",
    element: <InvoiceEdit />
  },
  {
    path: "/purchases",
    element: <Purchases />
  },
  {
    path: "/purchases/view/:id",
    element: <PurchaseView/>
  },
  {
    path: "/purchases/edit/:id",
    element: <PurchaseEdit />
  },
  {
    path: "/payments",
    element: <Payments />
  },
  {
    path: "/benefits",
    element: <Benefits />
  },
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  }
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
