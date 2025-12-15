import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Country from "./pages/Country";
import CountryDetails from "./components/Layout/CountryDetails";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/country",
        element: <Country />,
      },
      {
        path: "/country/:id",
        element: <CountryDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
