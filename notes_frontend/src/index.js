import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// PUBLIC_INTERFACE
// Entry point for the notes app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
