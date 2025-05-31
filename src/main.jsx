import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AIProvider } from "./context/AIContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AIProvider>
      <App />
    </AIProvider>
  </BrowserRouter>
);
