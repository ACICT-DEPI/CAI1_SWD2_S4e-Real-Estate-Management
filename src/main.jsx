import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import HouseContextProvider from "./components/Home/HouseContext"; // Import your context provider
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <HouseContextProvider>
      {/* <Router> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </Router> */}
    </HouseContextProvider>
  </ClerkProvider>
);
