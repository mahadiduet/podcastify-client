import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home/Home";
import About from "../Pages/About/About";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MiddleNavbar from "../components/dashboard-component/MiddleNavbar";
import AllUsers from "../components/dashboard-component/allUsers/AllUsers";
import AddPublisher from "../components/dashboard-component/addPublisher/AddPublisher";
import AllRecentEpisodes from "../components/Home/AllRecentEpisodes";
import UserProfile from "./../Pages/UserProfile/UserProfile";
import AddMusic from "../Pages/Podcast/AddMusic";
import OurMusicCollectionsDetailsPage from "../Pages/OurMusicCollectionsDetailsPage/OurMusicCollectionsDetailsPage";
import MyMusic from "../Pages/Dashboard/Podcaster/MyMusic";
import EditPodcast from "../Pages/Dashboard/Podcaster/EditPodcast";
import AllPodCaster from "../Pages/Dashboard/Admin/AllPodCaster";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import Notifications from "../components/dashboard-component/notifications/Notifications";
import NotificationDetails from "../components/dashboard-component/notifications/NotificationDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: (
      <h1 className="text-center text-lg">Oops! something went wrong</h1>
    ),
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
        path: "/addmusic",
        element: (
          <PrivateRoute>
            <AddMusic />
          </PrivateRoute>
        ),
      },
      {
        path: "/podcast/:id",
        element: <OurMusicCollectionsDetailsPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: (
      <h1 className="text-center text-lg">Oops! something went wrong</h1>
    ),
    children: [
      {
        path: "",
        element: <MiddleNavbar />,
      },
      {
        path: "home",
        element: <MiddleNavbar />,
      },
      // Admin route only
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-podcasters",
        element: <AddPublisher />,
      },
      {
        path: "all-music",
        element: <AllPodCaster />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement />,
      },
      // for podcaster route;
      {
        path: "my-music",
        element: <MyMusic />,
      },
      {
        path: "my-music/edit/:id",
        element: <EditPodcast />,
      },
      {
        path: "release-new-music",
        element: <AddMusic />,
      },
      {
        path: "release-new-video",
        element: <h1>new video</h1>,
      },
      {
        path: "live-stream",
        element: "Live stream",
      },
      {
        path: "notification",
        element: <Notifications />,
      },
      {
        path: "notification/:id/details",
        element: <NotificationDetails />,
      },
    ],
  },
]);

export default router;
