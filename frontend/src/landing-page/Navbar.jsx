import React from "react";
import logo from "../assets/stockora.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
              
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {currentUser ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button 
                        onClick={handleLogout} 
                        className="nav-link active btn btn-link"
                        style={{ border: 'none', background: 'none', padding: '8px 16px' }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active btn btn-primary text-white" style={{ padding: '8px 16px', borderRadius: '4px' }} to="/signup">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

    </>
  );
}

export default Navbar;
