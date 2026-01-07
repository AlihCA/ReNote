import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import App from "./App.jsx";
import "./index.css";

import { ResourcesProvider } from "./contexts/ResourcesContext";
import { CollectionsProvider } from "./contexts/CollectionsContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
       <BrowserRouter>
        <ResourcesProvider>
          <CollectionsProvider>
            <App />
          </CollectionsProvider>
        </ResourcesProvider>
      </BrowserRouter>
    </ClerkProvider>  
  </React.StrictMode>
);
