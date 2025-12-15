import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppLayout from "./components/Layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Students from "./pages/Students";
import Teachers from "./pages/TEachers";
import Contact from "./pages/Contact";
import MainFacultyDetails from "./components/Layout/MainFacultyDetails";
import AllAchievements from "./pages/AllAchievements";
import TeacherDetails from "./components/Layout/TeacherDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/mainFaculty/:id",
        element: <MainFacultyDetails />,
      },
      {
        path: "achievements",
        element: <AllAchievements />,
      },
      {
        path:"/teacher/:id",
        element:<TeacherDetails/>
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
