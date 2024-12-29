import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactFlowProvider>
      <div className="h-screen w-screen">
        <App />
      </div>
    </ReactFlowProvider>
  </StrictMode>
);
