import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./Pages/LandingPage";
import AddOrder from "./Pages/AddOrder";
import OrderComponent from "./Pages/loadOrders";
import ContactUs from "./Pages/ContactUsPage";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/AddOrder",
        element: <AddOrder />,
      },
      {
        path: "/loadOrders",
        element: <OrderComponent />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
how
export default App;

