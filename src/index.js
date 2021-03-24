import React from "react";
import ReactDOM from "react-dom";

import LocalizationProvider from "./locale/LocalizationProvider";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <LocalizationProvider>
    <App />
  </LocalizationProvider>,
  document.getElementById("root")
);
