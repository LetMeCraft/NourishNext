import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm py-4 px-4 md:px-10 border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Title */}
        <h2 className="text-2xl font-semibold text-white">
          Feeding <span className="text-green-500">Futures</span>
        </h2>
        <div className="text-center text-gray-400 text-sm">
          © 2025 Nourish Next - All rights reserved.
        </div>
        {/* Social Links */}
        <div className="flex space-x-4 gap-3">
          <a href="https://www.facebook.com/" >
            <img className='w-7' src="img/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/">
            <img className='w-7' src="img/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/">

            <img className='w-7' src="img/youtube.png" alt="Youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;