import Header from "../../components/header/Header";
import { Route, Routes } from "react-router-dom";
import Products from "../products/ProductsPage";
import { createRef, useEffect, useState } from "react";
import Homepage from "../home-page/HomePage";

function Landing() {
  const headerRef = createRef<HTMLElement>();
  const [mainContentStyle, setMainContentStyle] = useState({});

  const onMenuClick = () => {
    setTimeout(() => {
      setMainContentStyle({
        ...mainContentStyle,
        top: Number(headerRef?.current?.offsetHeight),
      });
    }, 230);
  };

  return (
    <div className="landing">
      <div className="main-content" style={mainContentStyle}>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default Landing;
