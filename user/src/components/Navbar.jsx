import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));

  const location = useLocation();
  const isLoggedIn = !!userEmail;
  const currentPath = location.pathname;

  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("email");
      setUserEmail(email);
    };

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("authchange", checkLoginStatus);
    checkLoginStatus();

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authchange", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
    setNavActive(false);
  }, [currentPath]);

  const shouldShowSignIn =
    !isLoggedIn && currentPath !== "/start" && currentPath !== "/signup";

  return (
    <header className="fixed top-0 z-50 flex h-18 w-full items-center justify-between border-b border-slate-200/80 bg-gradient-to-b from-stone-50 via-white to-slate-100/90 px-4 shadow-sm backdrop-blur-sm sm:px-6 md:grid md:grid-cols-[auto_1fr_auto] md:gap-6 md:px-8 lg:px-12 xl:px-16">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "block rounded-full px-3 py-2 font-semibold md:px-0 md:bg-transparent md:text-sky-700"
            : "block rounded-full px-3 py-2 transition-transform duration-300 hover:scale-110 md:px-0"
        }
        onClick={() => setNavActive(false)}
      >
        <div className="select-none text-2xl font-extrabold text-black sm:text-3xl md:whitespace-nowrap">
          Nourish <span className="text-[var(--theme-accent-deep)]">Next</span>
        </div>
      </NavLink>

      <div className="flex items-center gap-3 md:hidden">
        {shouldShowSignIn && (
          <NavLink
            to="/start"
            className="whitespace-nowrap rounded-full border border-slate-300 bg-gradient-to-b from-slate-700 to-sky-700 px-4 py-2 text-sm font-bold text-white shadow-md transition duration-200 hover:scale-95 hover:from-slate-600 hover:to-sky-600"
            onClick={() => setNavActive(false)}
          >
            Sign In
          </NavLink>
        )}

        <button
          type="button"
          className="hamburger block cursor-pointer rounded-md p-1 md:hidden"
          onClick={() => setNavActive(!navActive)}
          aria-label="Toggle navigation menu"
        >
          <div className="my-1 h-0.5 w-7 bg-slate-700"></div>
          <div className="my-1 h-0.5 w-7 bg-slate-700"></div>
          <div className="my-1 h-0.5 w-7 bg-slate-700"></div>
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center md:flex-none md:justify-self-center">
        <nav
          className={`nav-bar absolute left-0 top-18 w-full overflow-hidden bg-slate-700/95 backdrop-blur-sm transition-[height] duration-200 ease-in md:static md:w-auto md:bg-transparent md:flex md:items-center ${navActive ? "h-[180px]" : "h-0"} md:h-auto`}
        >
          <ul className="text-center text-lg text-white md:flex md:space-x-6 md:text-black">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block rounded-full bg-white/10 px-6 py-2 font-semibold text-white md:bg-transparent md:text-sky-700"
                    : "block rounded-full px-6 py-2 transition hover:bg-white/10 hover:text-white md:hover:bg-slate-100 md:hover:text-slate-800"
                }
                onClick={() => setNavActive(false)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded-full bg-white/10 px-6 py-2 font-semibold text-white md:bg-transparent md:text-sky-700"
                    : "block rounded-full px-6 py-2 transition hover:bg-white/10 hover:text-white md:hover:bg-slate-100 md:hover:text-slate-800"
                }
                onClick={() => setNavActive(false)}
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded-full bg-white/10 px-6 py-2 font-semibold text-white md:bg-transparent md:text-sky-700"
                    : "block rounded-full px-6 py-2 transition hover:bg-white/10 hover:text-white md:hover:bg-slate-100 md:hover:text-slate-800"
                }
                onClick={() => setNavActive(false)}
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block rounded-full bg-white/10 px-6 py-2 font-semibold text-white md:bg-transparent md:text-sky-700"
                    : "block rounded-3xl px-6 py-2 transition hover:bg-white/10 hover:text-white md:hover:bg-slate-100 md:hover:text-slate-800"
                }
                onClick={() => setNavActive(false)}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {shouldShowSignIn && (
        <NavLink
          to="/start"
          className="hidden rounded-full border border-slate-300 bg-gradient-to-b from-slate-700 to-sky-700 px-5 py-1.5 font-bold text-white shadow-md transition duration-200 hover:scale-95 hover:from-slate-600 hover:to-sky-600 md:block md:justify-self-end"
          onClick={() => setNavActive(false)}
        >
          Sign In
        </NavLink>
      )}
    </header>
  );
};

export default Navbar;
