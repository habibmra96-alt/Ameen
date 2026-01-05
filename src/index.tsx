import { Buffer } from "buffer";
import process from "process";
import React from "react";
import ReactDOM from "react-dom/client";

// --- CRITICAL FIXES ---
window.global = window;
window.process = process;
window.Buffer = Buffer;

import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
