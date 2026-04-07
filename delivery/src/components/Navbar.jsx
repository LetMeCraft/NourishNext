import React, { useState, useEffect, useRef } from "react";
import {
  UserPlus,
  Package,
  Info,
  Mail,
  File,
  LogOut,
  Menu,
  X,
  ChevronRight,
  LogIn
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const mainAppUrl =
  import.meta.env.VITE_MAIN_APP_URL ||
  "http://localhost:5173/start";

const Header = ({ isLoggedIn = false, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userName, setUserName] = useState("");
  const logoutConfirmRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const syncUserName = () => {
    const nameFromStorage =
      localStorage.getItem("name") || sessionStorage.getItem("name") || "";
    setUserName(nameFromStorage.trim());
  };

  useEffect(() => {
    window.addEventListener("storage", syncUserName);
    syncUserName();

    return () => {
      window.removeEventListener("storage", syncUserName);
    };
  }, []);

  useEffect(() => {
    syncUserName();
  }, [isLoggedIn, location.pathname, isMenuOpen]);

  useEffect(() => {
    if (!showLogoutConfirm) return undefined;

    const timer = window.setTimeout(() => {
      setShowLogoutConfirm(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [showLogoutConfirm]);

  useEffect(() => {
    if (!showLogoutConfirm) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showLogoutConfirm]);

  useEffect(() => {
    if (!showLogoutConfirm) return undefined;

    const handlePointerDown = (event) => {
      if (logoutConfirmRef.current && !logoutConfirmRef.current.contains(event.target)) {
        setShowLogoutConfirm(false);
      }
    };

    const handleScroll = () => {
      setShowLogoutConfirm(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [showLogoutConfirm]);

  const isSignupPage = location.pathname === "/signup";

  const loggedInNavItems = [
    { name: "Orders", path: "/orders", icon: Package },
    { name: "History", path: "/past-orders", icon: File },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const loggedOutNavItems = [
    { name: "About Us", path: "/about", icon: Info },
    { name: "Orders", path: "/orders", icon: Package },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const activeNavItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;
  const isActivePath = (path) =>
    path === "/about"
      ? location.pathname === "/" || location.pathname === "/about"
      : location.pathname === path;

  const getLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm transition-colors flex items-center 
     ${isActivePath(path)
      ? "text-emerald-600 font-bold"
      : "hover:bg-emerald-50 text-gray-600 font-medium hover:text-emerald-700"}`;

  const getMobileLinkClass = (path) =>
    `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center 
     ${isActivePath(path)
      ? "bg-emerald-100 text-emerald-700 font-bold"
      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`;

  const logout = () => {
    ["email", "name", "gender", "location"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    if (onLogout) onLogout();
    window.location.href = mainAppUrl;
  };

  const requestLogout = () => {
    setShowLogoutConfirm(true);
  };

  const goToAdminUserLogin = () => {
    window.location.href = mainAppUrl;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-1 border-white bg-transparent shadow-lg backdrop-blur-2xl overflow-x-clip">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:gap-6">
          <div
            className="min-w-0 flex-shrink text-xl font-extrabold text-gray-800 cursor-pointer sm:text-2xl md:justify-self-start md:whitespace-nowrap"
            onClick={() => navigate(isLoggedIn ? "/orders" : "/")}
          >
            Nourish <b className="text-emerald-500">Next</b>
          </div>

          <nav className="hidden items-center justify-center space-x-6 md:flex">
            {activeNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={getLinkClass(item.path)}
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.name}
              </button>
            ))}

            <div className="flex items-center space-x-4 md:justify-self-end">
              {!isLoggedIn && !isSignupPage && (
                <button
                  onClick={() => navigate("/signup")}
                  className="ml-2 bg-emerald-500 text-sm text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-emerald-600 transition"
                >
                  <UserPlus className="w-4 h-4 inline-block mr-1" />
                  Join Us
                </button>
              )}

              {(!isLoggedIn || isSignupPage) && (
                <button
                  onClick={goToAdminUserLogin}
                  className="ml-3 bg-gradient-to-tl from-sky-500 via-indigo-500 to-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                >
                  <LogIn className="w-5 h-5 text-red-400 inline-block mr-2" />
                  Go To Start Page
                </button>
              )}

              {isLoggedIn && (
                <>
                  <span className="text-sm font-semibold text-gray-700 ml-4">
                    Hi, {userName || "User"}
                  </span>
                  <div className="relative" ref={logoutConfirmRef}>
                    <button
                      onClick={requestLogout}
                      className="!w-auto !py-1 !px-3 !text-sm flex items-center bg-red-500 text-white font-semibold rounded-md transition duration-200 shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                    >
                      <LogOut className="w-4 h-4 mr-1" /> Logout
                    </button>

                    {showLogoutConfirm && (
                      <div className="absolute right-0 top-full mt-2 z-[60] w-[12.5rem] rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-[0_18px_42px_rgba(15,23,42,0.22)] sm:w-[13.5rem] md:w-[14.5rem]">
                        <p className="text-[0.98rem] font-semibold text-rose-700">Confirm logout</p>
                        <div className="mt-3 flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={logout}
                            className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 md:px-3 md:py-1.5"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowLogoutConfirm(false)}
                            className="rounded-lg bg-slate-200/90 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 md:px-3 md:py-1.5"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </nav>

          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isMenuOpen) setShowLogoutConfirm(false);
            }}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-emerald-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white/95 shadow-xl border-t border-gray-100 backdrop-blur">
          <div className="px-3 pt-3 pb-4 space-y-2">
            {isLoggedIn && (
              <div className="px-1 py-1 text-sm font-semibold text-teal-700">
                Hello, {userName || "User"}
              </div>
            )}
            {activeNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                  setShowLogoutConfirm(false);
                }}
                className={getMobileLinkClass(item.path)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </button>
            ))}

            {!isLoggedIn && !isSignupPage && (
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 px-3 mt-2 bg-emerald-500 text-white font-semibold rounded-md shadow hover:bg-emerald-600 transition flex justify-center items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" /> Join Us
              </button>
            )}

            {!isLoggedIn && (
              <button
                onClick={() => {
                  goToAdminUserLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full py-2 px-3 mt-2 bg-gradient-to-tl from-sky-500 via-indigo-500 to-blue-700 text-white font-semibold rounded-md shadow transition flex justify-center items-center hover:opacity-95"
              >
                <LogIn className="w-4 h-4 mr-2 text-red-300" /> Go To Start Page
              </button>
            )}

            {isLoggedIn && (
              <div className="relative" ref={logoutConfirmRef}>
                <button
                  onClick={requestLogout}
                  className="!w-full !py-2 !px-3 !text-base mt-2 flex justify-center items-center bg-red-500 text-white font-semibold rounded-md transition duration-200 shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </button>

                {showLogoutConfirm && (
                  <div className="mx-auto mt-2 w-[12.5rem] rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-[0_18px_42px_rgba(15,23,42,0.22)] sm:w-[13.5rem]">
                    <p className="text-sm font-semibold text-rose-700">Confirm logout</p>
                    <div className="mt-3 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={logout}
                        className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLogoutConfirm(false)}
                        className="rounded-lg bg-slate-200/90 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
