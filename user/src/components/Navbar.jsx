import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const navigate = useNavigate();

  const location = useLocation(); // 👈 Get current path
  const isLoggedIn = !!userEmail;
  const currentPath = location.pathname;

  // Real-time login state check
  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("email");
      setUserEmail(email);
    };

    // Listen to localStorage changes (cross-tab)
    window.addEventListener("storage", checkLoginStatus);

    // Also check immediately on mount
    checkLoginStatus();

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [userEmail, navigate]);

  const shouldShowSignIn =
    !isLoggedIn && currentPath !== "/start" && currentPath !== "/signup";

  return (
    <header className="fixed top-0 z-50 flex h-18 w-full items-center justify-between bg-gradient-to-b from-white to-green-100 px-4 shadow-sm sm:px-6 md:px-12 lg:px-24">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "block rounded-full px-3 py-2 font-semibold md:px-6 md:bg-transparent md:text-green-600"
            : "block rounded-full px-3 py-2 transition-transform duration-300 hover:scale-110 md:px-6"
        }
        onClick={() => setNavActive(false)} // close nav on click
      >
        <div className="select-none text-2xl font-extrabold text-black sm:text-3xl md:whitespace-nowrap">
          Nourish <span className="text-green-600">Next </span>
        </div>
      </NavLink>

      <div className="flex items-center gap-3 md:hidden">
        {shouldShowSignIn && (
          <NavLink
            to="/start"
            className="whitespace-nowrap rounded-full border border-emerald-700 bg-gradient-to-b from-sky-500 to-black px-4 py-2 text-sm font-bold text-white transition duration-200 hover:scale-95 hover:bg-gradient-to-b hover:from-green-500 hover:to-black"
            onClick={() => setNavActive(false)}
          >
            Sign In
          </NavLink>
        )}

        {/* Hamburger for small screens */}
        <button
          type="button"
          className="hamburger block cursor-pointer rounded-md p-1 md:hidden"
          onClick={() => setNavActive(!navActive)}
          aria-label="Toggle navigation menu"
        >
          <div className="my-1 h-0.5 w-7 bg-black"></div>
          <div className="my-1 h-0.5 w-7 bg-black"></div>
          <div className="my-1 h-0.5 w-7 bg-black"></div>
        </button>
      </div>

      {/* Main container for navigation and Sign In */}
      <div className="flex flex-1 items-center justify-center">
        {/* Nav Bar */}
        <nav
          className={`nav-bar absolute left-0 top-18 w-full overflow-hidden bg-green-600 transition-[height] duration-200 ease-in md:static md:w-auto md:bg-transparent md:flex md:items-center ${navActive ? "h-[180px]" : "h-0"
            } md:h-auto ${shouldShowSignIn ? "" : "md:mr-25"}`}
        >
          <ul className="md:flex md:space-x-6 text-white md:text-black text-lg text-center">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-full hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-full hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full bg-black text-white md:bg-transparent md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-full hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block px-6 py-2 rounded-full text-white md:text-green-600 font-semibold"
                    : "block px-6 py-2 rounded-3xl hover:bg-gradient-to-t from-green-500 to-black hover:font-base hover:text-white transition"
                }
                onClick={() => setNavActive(false)} // close nav on click
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sign In Button (only if not logged in) */}
      {shouldShowSignIn && (
        <NavLink
          to="/start"
          className="hidden md:block px-5 py-1.5 rounded-full border-1 border-emerald-700  bg-gradient-to-b from-sky-500 to-black text-white font-bold hover:bg-gradient-to-b hover:from-green-500 hover:to-black hover:scale-95 transition duration-200"
          onClick={() => setNavActive(false)}
        >
          Sign In
        </NavLink>
      )}
    </header>

  );
};

export default Navbar;
