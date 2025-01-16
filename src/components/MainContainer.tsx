import React from "react";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

interface MainContainerProps {
  activePage: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ activePage }) => {
  const renderComponent = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "allProducts":
        return <Home />;
      case "productDetails":
        return <ProductDetails />;
      case "cart":
        return <Cart />;
      default:
        return <Home />;
    }
  };

  return <>{renderComponent()}</>;
};

export default MainContainer;
