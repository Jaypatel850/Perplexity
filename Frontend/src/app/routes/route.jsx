import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Login from "../../features/auth/pages/Login.jsx";
import Register from "../../features/auth/pages/Register.jsx";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute.jsx";
import Dashboard from "../../features/chat/page/Dashboard.jsx";
import Landingpage from "../../features/landing/page/Landingpage.jsx";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
       {
        path: "/",
        element: <Landingpage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />, // Wrap children that need protection
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/chat/:id",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default route;
