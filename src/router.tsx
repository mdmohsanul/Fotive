import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LogIn from "./pages/LogIn";
import PageNotFound from "./pages/Page-Not-Found";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import Photos from "./pages/Photos";
import Albums from "./pages/Albums";
import RecentlyAdded from "./pages/RecentlyAdded";
import Album_Images from "./pages/AlbumImages";
import PhotoDisplay from "./components/Photos/ImageDisplay";
import Favorites from "./pages/Favorites";
import SignUp from "./pages/SignUp";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LogIn /> },
      { path: "/login", element: <LogIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "/dashboard", element: <Photos /> },
          { path: "/dashboard/photos/:imageId", element: <PhotoDisplay /> },
          { path: "/dashboard/albums", element: <Albums /> },
          { path: "/dashboard/albums/:albumId", element: <Album_Images /> },
          { path: "/dashboard/favorites", element: <Favorites /> },
          { path: "/dashboard/recentlyAdded", element: <RecentlyAdded /> },
          {
            path: "/dashboard/albums/:albumId/image/:imageId",
            element: <PhotoDisplay />,
          },
        ],
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default appRouter;
