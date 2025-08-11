import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = "Loading your dashboard..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2>{message}</h2>
        <p>Please wait while we authenticate your session</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
