import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";

const mainAppUrl =
  import.meta.env.VITE_MAIN_APP_URL || "https://nourish-next-user.vercel.app/start";

const getStoredAdminName = () =>
  localStorage.getItem("name") || sessionStorage.getItem("name") || "Arpit Sharma";

const clearAdminSession = () => {
  ["role", "isLoggedIn", "name", "email", "gender", "location"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

const Header = () => {
  const { isDarkMode, setIsLoggedIn } = useContext(AppContext);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [adminName, setAdminName] = useState(getStoredAdminName());
  const profileRef = useRef(null);

  const syncAdminName = () => {
    setAdminName(getStoredAdminName());
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsLoggedIn(false);
    document.body.classList.add("admin-logout-fade");
    window.setTimeout(() => {
      window.location.href = mainAppUrl;
    }, 220);
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileCard(false);
        setShowLogoutConfirm(false);
      }
    };

    const handleScroll = () => {
      setShowProfileCard(false);
      setShowLogoutConfirm(false);
    };

    window.addEventListener("storage", syncAdminName);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("scroll", handleScroll, true);
    syncAdminName();

    return () => {
      window.removeEventListener("storage", syncAdminName);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    if (!showProfileCard) return undefined;

    const timer = setTimeout(() => {
      setShowProfileCard(false);
      setShowLogoutConfirm(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showProfileCard, showLogoutConfirm]);

  return (
    <header
      className={`sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 shadow-sm backdrop-blur-sm transition-all duration-300 sm:px-6 ${
        isDarkMode
          ? "border-slate-700 bg-slate-900 text-slate-100"
          : "border-sky-900 bg-gradient-to-t from-green-50 to-blue-50 text-sky-900"
      }`}
    >
      <div className="min-w-0 flex flex-1 items-center space-x-2">
        <span className="truncate whitespace-nowrap text-[15px] font-bold sm:hidden">
          Nourish <b className="text-emerald-400">Next</b> - Admin
        </span>
        <span className="hidden text-2xl font-bold sm:block">
          Nourish <b className="text-emerald-400">Next</b>
        </span>
        <h1 className="hidden text-2xl font-bold sm:block">- Admin</h1>
      </div>

      <div className="relative ml-auto flex shrink-0 items-center gap-3" ref={profileRef}>
        <span
          className={`hidden whitespace-nowrap text-sm font-semibold lg:inline ${
            isDarkMode ? "text-slate-100" : "text-slate-800"
          }`}
        >
          Status: Logged In -
          <span className="text-green-500"> {adminName}</span>
        </span>

        <button
          type="button"
          onClick={() => {
            setShowProfileCard((prev) => !prev);
            setShowLogoutConfirm(false);
          }}
          className="h-10 w-10 shrink-0 rounded-full border-0 p-0 leading-none transition-transform active:scale-95 focus:outline-none focus:ring-0"
          aria-label="Open profile details"
        >
          <img
            className="admin-glow h-10 w-10 rounded-full object-cover ring-2 ring-white/30"
            src="img/admin.png"
            alt="profile pic"
          />
        </button>

        {showProfileCard && (
          <div
            className={`absolute right-0 top-full z-30 mt-2 min-w-[190px] rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg ${
              isDarkMode
                ? "border-slate-700 bg-slate-800 text-slate-100"
                : "border-sky-200 bg-white text-sky-900"
            }`}
          >
            <p className="text-sm font-semibold sm:hidden">{adminName}</p>
            {!showLogoutConfirm ? (
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className={`admin-interactive mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isDarkMode
                    ? "bg-rose-500/20 text-rose-200 hover:bg-rose-500/30"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                }`}
              >
                Logout
              </button>
            ) : (
              <div className="mt-2">
                <p className="text-xs font-medium opacity-90">Confirm logout?</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`admin-interactive flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isDarkMode
                        ? "bg-rose-500/25 text-rose-100 hover:bg-rose-500/35"
                        : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      setShowProfileCard(false);
                    }}
                    className={`admin-interactive flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
