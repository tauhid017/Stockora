import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

const Menu = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect back to the frontend application's login page
      window.location.href = `${frontendUrl}/login`;
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect even if logout fails on backend
      window.location.href = `${frontendUrl}/login`;
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src={logo} alt="logo" style={{width:"50px"}} />
      <div className="menus mt-4">
        <ul>
          <li>
            <Link style={{textDecoration:"none"}} to='/' onClick={()=>handleMenuClick(0)}>
            <p className={selectedMenu===0? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
           <Link style={{textDecoration:"none"}} to='/orders' onClick={()=>handleMenuClick(1)}> 
           <p className={selectedMenu===1? activeMenuClass : menuClass}>Orders</p>
           </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/holdings' onClick={()=>handleMenuClick(2)}>
            <p className={selectedMenu===2? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/positions' onClick={()=>handleMenuClick(3)}>
            <p className={selectedMenu===3? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/funds' onClick={()=>handleMenuClick(4)}>
            <p className={selectedMenu===4? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} to='/apps' onClick={()=>handleMenuClick(5)}>
            <p className={selectedMenu===5? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile mb-4">
          <div className="profile-info" onClick={handleProfileClick}>
            <div className="avatar">
              {loading ? '...' : (currentUser ? currentUser.username.substring(0, 2).toUpperCase() : 'GU')}
            </div>
            <p className="username">
              {loading ? 'Loading...' : (currentUser ? currentUser.username : 'Guest')}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout} disabled={loading}>
            {loading ? 'Please wait...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;