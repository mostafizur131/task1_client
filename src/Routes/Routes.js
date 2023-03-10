import { createBrowserRouter } from "react-router-dom";
import Selection from "../components/Selection";
import Main from "../Layout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivetRoutes from "./PrivetRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivetRoutes>
            <Selection />
          </PrivetRoutes>
        ),
      },
      {
        path: "/home",
        element: (
          <PrivetRoutes>
            <Selection />
          </PrivetRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
