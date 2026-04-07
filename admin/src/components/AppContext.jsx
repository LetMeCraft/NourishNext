// AppContext.jsx
import React, { createContext, useState, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('mode') !== 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  const providerValue = useMemo(() => ({
    isDarkMode, setIsDarkMode,
    isSidebarOpen, setIsSidebarOpen,
    activePage, setActivePage,
  }), [isDarkMode, isSidebarOpen, activePage]);

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
