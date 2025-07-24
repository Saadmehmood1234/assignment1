import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CheckProvider } from "./context/CheckContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CheckProvider>
      <App />
    </CheckProvider>
  </StrictMode>
);
