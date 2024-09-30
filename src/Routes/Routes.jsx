import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

import Home from "../components/Home/Home";
import About from "../Pages/About/About";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddPodCast from "../Pages/Podcast/AddPodCast";
import MiddleNavbar from "../components/dashboard-component/MiddleNavbar";
import Statistics from "../components/dashboard-component/Statistics/Statistics";
import AllUsers from "../components/dashboard-component/allUsers/AllUsers";
import AllArticles from "../components/dashboard-component/articles/AllArticles";
import AddPublisher from "../components/dashboard-component/addPublisher/AddPublisher";
import AllRecentEpisodes from "../components/Home/AllRecentEpisodes";
import UserProfile from "./../Pages/UserProfile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },

      {
        path: "/about-us",
        element: <About></About>,
      },
      {
        path: "/allrecentepisodes",
        element: <AllRecentEpisodes />,
      },

      {
        path: "/addpodcast",
        element: <AddPodCast />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: "Error element",
    children: [
      {
        path: "",
        element: <MiddleNavbar />,
      },
      {
        path: "home",
        element: <MiddleNavbar />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "add-publisher",
        element: <AddPublisher />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-articles",
        element: <AllArticles />,
      },
    ],
  },
]);

export default router;