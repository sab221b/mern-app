import { forwardRef, useEffect, useRef } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = forwardRef((props: any, ref: any) => {
  const { onMenuClick } = props;

  return (
    <header ref={ref} className="app-header">
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            C-Shell
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={onMenuClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/products"}>
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;
