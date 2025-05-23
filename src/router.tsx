
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LogIn from "./pages/LogIn";

import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/Page-Not-Found";
import ProtectedRoute from "./components/ProtectedRoute";
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
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default appRouter;
