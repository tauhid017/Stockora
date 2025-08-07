import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If no user is logged in, redirect to login page
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!currentUser) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo">Stockora</div>
                <div className="user-info">
                    <span>Welcome, {currentUser.username}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <ul>
                            <li className="active"><a href="#">Dashboard</a></li>
                            <li><a href="#">Portfolio</a></li>
                            <li><a href="#">Watchlist</a></li>
                            <li><a href="#">Orders</a></li>
                            <li><a href="#">Funds</a></li>
                            <li><a href="#">Profile</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="main-content">
                    <div className="welcome-section">
                        <h1>Welcome to Your Dashboard, {currentUser.username}!</h1>
                        <p>This is your personalized trading dashboard. Here you can manage your portfolio, track your investments, and make informed trading decisions.</p>
                    </div>

                    <div className="dashboard-widgets">
                        <div className="widget">
                            <h3>Portfolio Summary</h3>
                            <div className="widget-content">
                                <p>Total Value: ₹0.00</p>
                                <p>Today's P&L: ₹0.00 (0.00%)</p>
                                <p>Overall P&L: ₹0.00 (0.00%)</p>
                            </div>
                        </div>

                        <div className="widget">
                            <h3>Watchlist</h3>
                            <div className="widget-content">
                                <p>No stocks in your watchlist yet.</p>
                                <button className="add-button">Add Stocks</button>
                            </div>
                        </div>

                        <div className="widget">
                            <h3>Recent Orders</h3>
                            <div className="widget-content">
                                <p>No recent orders.</p>
                            </div>
                        </div>

                        <div className="widget">
                            <h3>Market Overview</h3>
                            <div className="widget-content">
                                <div className="market-index">
                                    <span>NIFTY 50</span>
                                    <span className="index-value">19,500.00</span>
                                    <span className="index-change positive">+0.75%</span>
                                </div>
                                <div className="market-index">
                                    <span>SENSEX</span>
                                    <span className="index-value">65,000.00</span>
                                    <span className="index-change positive">+0.80%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;