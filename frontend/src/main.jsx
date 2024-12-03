import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalState from "./context/index.jsx"; // Ensure this matches your file path

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalState>
    <App />
  </GlobalState>
);
