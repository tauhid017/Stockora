import React from "react";
import logo from "../assets/stockora.png";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>

        <nav className="navbar navbar-expand-lg bg-white border-bottom">
          <div className="container p-1">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}  
                alt="logo"
                style={{width: "25%" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/products">
                    Products
                  </Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link active" to="/pricing">
                    Pricing
                  </Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link active" to="/support">
                    Support
                  </Link>
                </li>
                
                
              </ul>
            </div>
          </div>
        </nav>

    </>
  );
}

export default Navbar;
