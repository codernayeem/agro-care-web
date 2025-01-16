import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import bn from "javascript-time-ago/locale/bn";
import NewsSection from "./components/NewsSection.tsx";
import Cart from "./components/Cart.tsx";
import NewsDetails from "./components/NewsDetails.tsx";
import LoginPage from "./components/Login.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(bn);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* Main App Routes */}
      <Route path="/" element={<App />}>
        <Route index element={<NewsSection />} />
        <Route path="news" element={<NewsSection />} />
        <Route path="news/:id" element={<NewsDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
