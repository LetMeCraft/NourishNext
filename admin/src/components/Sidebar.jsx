import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { Home, BarChart, Users, MessageSquare, Briefcase, Menu, Sun, Moon, LogOut } from 'lucide-react';
import { AppContext } from './AppContext';

const mainAppUrl =
  import.meta.env.VITE_MAIN_APP_URL || "https://nourish-next-user.vercel.app/start";

const Sidebar = () => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const { isSidebarOpen, setIsSidebarOpen, isDarkMode, setIsDarkMode, setIsLoggedIn } = useContext(AppContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    ["role", "isLoggedIn", "name", "email", "gender", "location"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    document.body.classList.add("admin-logout-fade");
    window.setTimeout(() => {
      window.location.href = mainAppUrl;
    }, 220);
  };
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Donations', icon: Briefcase, path: '/donations' },
    { name: 'Feedback', icon: MessageSquare, path: '/feedback' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncIsMobile = (event) => {
      setIsMobile(event.matches);
    };

    syncIsMobile(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncIsMobile);
      return () => mediaQuery.removeEventListener("change", syncIsMobile);
    }

    mediaQuery.addListener(syncIsMobile);
    return () => mediaQuery.removeListener(syncIsMobile);
  }, []);

  useEffect(() => {
    if (!isSidebarOpen || !isMobile) return;

    const closeSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    const closeOnScroll = () => {
      setIsSidebarOpen(false);
    };

    document.addEventListener("pointerdown", closeSidebar);
    document.addEventListener("scroll", closeOnScroll, true);

    return () => {
      document.removeEventListener("pointerdown", closeSidebar);
      document.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [isSidebarOpen, isMobile, setIsSidebarOpen]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    setShowLogoutConfirm(false);
  }, [location.pathname, isMobile, setIsSidebarOpen]);

  useEffect(() => {
    if (!showLogoutConfirm) return undefined;
    const timer = window.setTimeout(() => setShowLogoutConfirm(false), 5000);
    return () => window.clearTimeout(timer);
  }, [showLogoutConfirm]);

  return (
    <nav ref={sidebarRef} className={`fixed top-0 left-0 border-r h-full ${isSidebarOpen ? 'w-52 sm:w-56 md:w-64' : 'w-14 sm:w-16 md:w-20'} 
      ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gradient-to-r from-slate-50 to-sky-50 bg-gradient-to-b from-indigo-50 to-sky-100 text-sky-900 border-sky-800'}
      p-4 transition-all duration-300 z-30 shadow-xl md:shadow-none`}>

      <div className="flex items-center space-x-3 cursor-pointer overflow-hidden">
        <button onClick={() => setIsSidebarOpen(prev => !prev)} className={`admin-interactive ${isSidebarOpen ? 'ml-1 rounded-xl p-3 pr-24 sm:pr-32 md:pr-36' : 'p-2 md:p-3'} rounded-lg ml-0 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-100'}`}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <ul className="space-y-4 mt-10">
        {navItems.map(item => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `admin-interactive flex items-center p-3 rounded-xl transition duration-100 
                  ${isActive ? 'text-emerald-500' : 'hover:bg-sky-700 hover:text-white'}
                  ${isSidebarOpen ? '' : 'justify-center'}`
              }
              onClick={() => {
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <item.icon className="w-8 h-6 shrink-0" />
              <span className={`ml-4 text-lg font-medium ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-200`}>
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

     <div className="absolute bottom-6 left-4 right-4 space-y-2">
  <div
    className={`admin-interactive flex items-center p-3 rounded-xl cursor-pointer
      ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-sky-500 hover:text-white'}
      ${isSidebarOpen ? 'justify-start' : ''}`}
    onClick={() => setIsDarkMode(prev => !prev)}
  >
    {/* Icon container with fixed width to prevent shift */}
    <div style={{ minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
      {isDarkMode ? <Sun className="w-8 mr-2 h-6 text-yellow-300" /> : <Moon className="w-8 mr-2 h-6 text-black" />}
    </div>
    {/* Label with smooth opacity + width transition */}
    <span
      className="ml-2 text-base font-medium"
      style={{
        opacity: isSidebarOpen ? 1 : 0,
        width: isSidebarOpen ? 'auto' : 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        transition: 'opacity 0.3s ease, width 0.3s ease',
      }}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </span>
  </div>

  <div className="relative">
    <button
      onClick={() => setShowLogoutConfirm(true)}
      className={`admin-interactive flex items-center p-3 rounded-xl w-full
        ${isDarkMode ? 'hover:bg-red-700' : 'hover:bg-red-600 hover:text-white'}
        ${isSidebarOpen ? 'justify-start' : ''}`}
    >
      <div style={{ minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
        <LogOut className="w-8 h-6 mr-2 text-red-400" />
      </div>
      <span
        className="ml-2 text-base font-medium"
        style={{
          opacity: isSidebarOpen ? 1 : 0,
          width: isSidebarOpen ? 'auto' : 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.3s ease, width 0.3s ease',
        }}
      >
        Logout
      </span>
    </button>

    {showLogoutConfirm && (
      <div
        className={`absolute z-40 w-[12.5rem] rounded-2xl border border-white/60 bg-white/30 p-3 shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:w-[13.5rem] md:w-[14.5rem] ${
          isSidebarOpen ? "bottom-full left-2 mb-2" : "left-full bottom-0 ml-3"
        }`}
      >
        <p className={`text-center text-[0.98rem] font-semibold ${isDarkMode ? "text-gray-200" : "text-rose-600"}`}>
          Confirm logout
        </p>
        <div className="mt-3 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 md:px-3 md:py-1.5"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(false)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition md:px-3 md:py-1.5 ${
              isDarkMode
                ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                : "bg-slate-200/90 text-slate-700 hover:bg-slate-300"
            }`}
          >
            No
          </button>
        </div>
      </div>
    )}
  </div>
</div>

    </nav>
  );
};

export default Sidebar;
