import React, { useContext } from "react";
import Home from "../Home/Home";
import Layout from "../Layout/Layout";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Cart from "../Cart/Cart";
import Categories from "../Categories/Categories";
import Brands from "../Brands/Brands";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Error from "../Error/error";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "../ProductDetails/ProductDetails";
import Ycontext from "../../Contexts/Ycontext";
import Cartcontext from "../../Contexts/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "../CheckOut/CheckOut";
import EmailVerification from "../EmailVerification/EmailVerification";
import CodeVerification from "../CodeVerification/CodeVerification";
import ResetPassword from "../ResetPassword/ResetPassword";
import AllOrders from "../AllOrders/AllOrders";
import AllProducts from "../AllProducts/AllProducts";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Home",
        element: <Home />,
      },

      {
        path: "ProductDetails/:id",
        element: <ProductDetails />,
      },
      { path: "Login", element: <Login /> },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Cart",
        element: (
            <Cart />
        ),
      },

      {
        path: "AllProducts",
        element: (
            <AllProducts />
        ),
      },
      {
        path: "CheckOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "EmailVerification",
        element: <EmailVerification />,
      },
      {
        path: "ResetPassword",
        element: <ResetPassword />,
      },
      {
        path: "AllOrders",
        element: <AllOrders />,
      },

      {
        path: "CodeVerification",
        element: <CodeVerification />,
      },
      {
        path: "Brands",
        element: (
            <Brands />
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

const queryConfiq = new QueryClient({});

export default function App() {
  return (
    <>
      <Ycontext>
        <QueryClientProvider client={queryConfiq}>
          <Cartcontext>
            <RouterProvider router={router} />
            <Toaster />
          </Cartcontext>
        </QueryClientProvider>
      </Ycontext>
    </>
  );
}
