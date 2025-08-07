import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create the context
const GeneralContext = createContext();

// Create the provider component
export const GeneralContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState({ name: 'User', id: 'USERID' });
  
  // Get current user from AuthContext
  const { currentUser } = useAuth();
  
  // Update user information when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.username,
        id: currentUser._id || currentUser.username
      });
    }
  }, [currentUser]);
  
  const value = {
    watchlist,
    setWatchlist,
    user,
    setUser
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};

// Custom hook to use the context
export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a GeneralContextProvider');
  }
  return context;
};

export default GeneralContext;