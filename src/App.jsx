import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import Listing from "./pages/Listing";
import ContactUs from "./pages/ContactUsPage";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/PropertyDetails/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/AddProperty",
        element: <AddProperty />,
      },
      {
        path: "/Property",
        element: <Listing />,
      },
      Listing,
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
export default App;
