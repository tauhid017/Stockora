import React, { useState } from 'react';
import logo from "../../assets/stockora.png";
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css'
const dashboardurl = import.meta.env.VITE_DASHBOARD_URL || 'https://stockora-9xwj.vercel.app';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!username.trim() || !email.trim() || !password.trim()) {
            return setError('Please fill in all fields');
        }
        
        if (password.length < 6) {
            return setError('Password must be at least 6 characters long');
        }
        
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        
        try {
            setError('');
            setLoading(true);
            const response = await register(username, email, password);
            
            // Only redirect after successful registration
            if (response && response.user) {
                // Redirect to the dashboard application
                window.location.href = `${dashboardurl}`;
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create an account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h2>Create Your Account</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="signup-form">
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" disabled={loading} className="signup-button">
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                
                <div className="login-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
            
            <div className="signup-image-container">
                <img src="/src/assets/stockora.png" alt="Stockora Trading" className="signup-image" />
                <div className="image-overlay">
                    
                    <h3>Start Your Trading Journey</h3>
                    <p>Join thousands of traders using Stockora for their investment needs</p>
                </div>
            </div>
        </div>
    );
}

export default Signup;