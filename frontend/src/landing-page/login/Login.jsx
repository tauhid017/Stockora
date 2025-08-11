import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/stockora.png';

const dashboardurl = import.meta.env.VITE_DASHBOARD_URL || 'https://stockora-9xwj.vercel.app';
function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }
        
        try {
            setError('');
            setLoading(true);
            const response = await login(username, password);
            
            // Only redirect after successful login
            if (response && response.user) {
                console.log('Login successful, redirecting to dashboard...');
                // Small delay to ensure state is updated
                setTimeout(() => {
                    window.location.href = `${dashboardurl}`;
                }, 500);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2>Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" disabled={loading} className="login-button">
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
                
                <div className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
            
            <div className="login-image-container">
                <img src={logo} alt="Stockora Trading" className="login-image" />
                <div className="image-overlay">
                    <h3>Access Your Portfolio</h3>
                    <p>Log in to manage your investments and track your performance</p>
                </div>
            </div>
        </div>
    );
}

export default Login;