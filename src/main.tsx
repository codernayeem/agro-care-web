import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import bn from "javascript-time-ago/locale/bn";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(bn);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
