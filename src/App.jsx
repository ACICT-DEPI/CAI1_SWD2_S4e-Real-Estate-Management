import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import Listing from "./pages/Listing";
import ContactUs from "./pages/ContactUsPage";
import About from "./pages/About";
import EditProperty from "./pages/EditProperty";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/property/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/AddProperty",
        element: <AddProperty />,
      },
      {
        path: "/MyProperty",
        element: <Listing />,
      },
      {
        path: "/MyProperty/edit/:id",
        element: <EditProperty />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/About",
        element: <About />,
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
