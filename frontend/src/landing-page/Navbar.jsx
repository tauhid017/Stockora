import React from "react";
import logo from "../assets/stockora.png";
function Navbar() {
  return (
    <>

        <nav className="navbar navbar-expand-lg bg-white border-bottom">
          <div className="container p-1">
            <a className="navbar-brand" href="#">
              <img
                src={logo}  
                alt="logo"
                style={{width: "25%" }}
              />
            </a>
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
                  <a className="nav-link active" aria-current="page" href="#">
                    Signup
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Products
                  </a>
                </li>
                 <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Pricing
                  </a>
                </li>
                 <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Support
                  </a>
                </li>
                
                
              </ul>
            </div>
          </div>
        </nav>

    </>
  );
}

export default Navbar;
