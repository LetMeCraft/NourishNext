import React from 'react';
import { NavLink } from "react-router-dom";
const Start = () => {
  return (
    <div className="pb-28 w-full bg-gradient-to-t from-green-50 to-white flex flex-col items-center font-poppins px-4">
      {/* Title */}
      <p className="text-3xl md:text-5xl font-bold mb-6 mt-32 text-center text-black">
        Welcome to Nourish <span className="text-[#06C167] font-extrabold">Next</span>
      </p>

      {/* Subtitle */}
      <p className="text-3xl mb-12 mt-10 font-bold text-center text-black">Login as</p>

      {/* Buttons stacked vertically */}
      <div className="flex flex-col items-center gap-7">
        <NavLink
          to="/signup"
          className="bg-[#03512b] font-bold text-white px-9 py-2.5 tracking-[2px] text-lg transition-all duration-200"
          style={{ letterSpacing: '2px' }}
          onMouseEnter={e => (e.currentTarget.style.letterSpacing = '6px')}
          onMouseLeave={e => (e.currentTarget.style.letterSpacing = '2px')}
        >
          User
        </NavLink>

        <a
          onClick={() => (window.location.href = import.meta.env.VITE_API_ADMIN)}
          className="bg-[#058547] cursor-pointer font-semibold text-white px-11 py-2.5 tracking-[2px] text-xl transition-all duration-200"
          style={{ letterSpacing: '2px' }}
          onMouseEnter={e => (e.currentTarget.style.letterSpacing = '6px')}
          onMouseLeave={e => (e.currentTarget.style.letterSpacing = '2px')}
        >
          Admin
        </a>

        <a
          onClick={() => (window.location.href = import.meta.env.VITE_API_DELIVERY)}
          className="bg-[#06C167] font-normal cursor-pointer text-white px-13 py-2.5 tracking-[2px] text-2xl transition-all duration-200"
          style={{ letterSpacing: '2px' }}
          onMouseEnter={e => (e.currentTarget.style.letterSpacing = '6px')}
          onMouseLeave={e => (e.currentTarget.style.letterSpacing = '2px')}
        >
          Delivery
        </a>


      </div>
    </div>
  );
};

export default DashboardLogins;
