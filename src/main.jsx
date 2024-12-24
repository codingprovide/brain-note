import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import "./index.css";
import App from "./App";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactFlowProvider>
      <div className="h-screen w-screen">
        <App />
      </div>
    </ReactFlowProvider>
  </StrictMode>
);
