import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/index";

const app: HTMLElement | null = document.getElementById("app");
if (!app) {
  throw new Error("Unable to find HTML DOM entrypoint");
}
const root = createRoot(app);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
