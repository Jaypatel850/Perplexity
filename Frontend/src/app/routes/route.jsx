import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Login from "../../features/auth/pages/Login.jsx";
import Register from "../../features/auth/pages/Register.jsx";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute.jsx";
import Dashboard from "../../features/chat/page/Dashboard.jsx";
export const route = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
                        path: "/",
                        element: <h1>Welcome to the Home Page</h1>,
                    },
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    }
                ]
            }
        ],
    },
]);

export default route;
