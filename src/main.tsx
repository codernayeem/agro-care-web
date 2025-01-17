import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./layouts/MainLayout.tsx";

import LoginPage from "./pages/Login.tsx";
import NewsSection from "./pages/NewsSection.tsx";
import NewsDetails from "./pages/NewsDetails.tsx";
import MarketSection from "./pages/MarketSection.tsx";
import Cart from "./pages/Cart.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import bn from "javascript-time-ago/locale/bn";
import Home from "./pages/Home.tsx";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(bn);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="market" element={<MarketSection />} />
            <Route path="news" element={<NewsSection />} />
            <Route path="news/:id" element={<NewsDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
