import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/notfound/notfound";
import Cart from "./components/Cart/Cart";
import UserContextProvider from "./context/TokenContext";
import ProtedtedRoute from "./components/ProtedtedRoute/ProtedtedRoute";
import Details from "./components/Details/Details";
import CartContextProvider from "./context/cartContext";
import { ToastContainer } from "react-toastify";
import Checkout from "./components/checkout/checkout";
import Allorders from './components/allorders/allorders';
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtedtedRoute>
            <Home />
          </ProtedtedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtedtedRoute>
            <Home />
          </ProtedtedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtedtedRoute>
            <Products />
          </ProtedtedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtedtedRoute>
            <Category />
          </ProtedtedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtedtedRoute>
            <Allorders/>
          </ProtedtedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtedtedRoute>
            <Checkout/>
          </ProtedtedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtedtedRoute>
            <Brands />
          </ProtedtedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtedtedRoute>
            <Cart />
          </ProtedtedRoute>
        ),
      },
    
      {
        path: "details/:id",
        element: (
          <ProtedtedRoute>
            <Details />
          </ProtedtedRoute>
        ),
      },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
       <ToastContainer theme="colored"/>
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
