import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", inputValue);
    // Your axios call would go here
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logo}>
            <span style={styles.logoText}>Stockora</span>
          </div>
          <p style={styles.subtitle}>Join India's largest stock broker</p>
        </div>

        {/* Form Section */}
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Create your account</h2>
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#387ed1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#387ed1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#387ed1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>

            <button 
              type="submit" 
              style={styles.submitButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 8px 25px rgba(56, 126, 209, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(56, 126, 209, 0.2)';
              }}
              onClick={handleSubmit}
            >
              Create Account
            </button>

            <div style={styles.loginLink}>
              Already have an account? <span style={styles.link}><Link to="/login">Login</Link></span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  formWrapper: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(59, 130, 246, 0.12)',
    overflow: 'hidden',
    maxWidth: '480px',
    width: '100%',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    transition: 'all 0.3s ease',
  },
  logoSection: {
    background: 'linear-gradient(135deg, #387ed1 0%, #2563eb 100%)',
    padding: '48px 32px',
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '12px',
    position: 'relative',
    zIndex: 2,
  },
  logoText: {
    fontSize: '32px',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    opacity: 0.95,
    fontWeight: '500',
    position: 'relative',
    zIndex: 2,
  },
  formContainer: {
    padding: '48px 32px 32px',
    background: '#ffffff',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '32px',
    textAlign: 'center',
    margin: '0 0 36px 0',
    letterSpacing: '-0.02em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    letterSpacing: '-0.01em',
  },
  input: {
    padding: '16px 20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    backgroundColor: '#fafbfc',
    fontFamily: 'inherit',
    color: '#1f2937',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #387ed1 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    padding: '18px 32px',
    borderRadius: '12px',
    fontSize: '17px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '12px',
    boxShadow: '0 4px 15px rgba(56, 126, 209, 0.2)',
    letterSpacing: '-0.01em',
    fontFamily: 'inherit',
  },
  loginLink: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#6b7280',
    marginTop: '24px',
    fontWeight: '500',
  },
  link: {
    color: '#387ed1',
    textDecoration: 'none',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },

};

export default Signup;