import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "@config/configureMobX";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

if (module.hot) {
  module.hot.accept();
}
