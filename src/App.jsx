import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Root from "./pages/Root";
import Login from "./components/Login/Login";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import "./App.css";
import ProductsList from "./components/ProductsList/ProductsList";

const App = () => {
  const { loggedIn } = useSelector((state) => state.login);

  const publicRoutes = [
    {
      path: "/login",
      element: !loggedIn ? <Root /> : <Navigate to="/" />,
      children: [{ index: true, element: <Login /> }],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];

  const privateRoutes = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <CreateProduct />,
        },
        {
          path: "/products",
          element: <ProductsList />,
        },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];

  const router = createBrowserRouter([
    ...(loggedIn ? privateRoutes : []),
    ...publicRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default App;
