import React, { createContext, useContext, useState } from 'react';

// Create the context
const GeneralContext = createContext();

// Create the provider component
export const GeneralContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState({ name: 'User', id: 'USERID' });
  
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