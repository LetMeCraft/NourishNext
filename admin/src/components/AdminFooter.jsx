import React, { useContext } from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { AppContext } from "./AppContext";

const Footer = () => {
  const { isDarkMode } = useContext(AppContext);
  const currentYear = new Date().getFullYear();
  const socialIconClass = isDarkMode
    ? "rounded-full border border-emerald-300/35 bg-cyan-100/5 p-2 text-cyan-50 shadow-[0_8px_18px_rgba(20,184,166,0.15)] transition hover:-translate-y-0.5 hover:text-emerald-300"
    : "rounded-full border border-sky-300/70 bg-white/85 p-2 text-sky-700 shadow-[0_8px_16px_rgba(14,116,144,0.12)] transition hover:-translate-y-0.5 hover:text-emerald-600 hover:border-emerald-400/80";

  return (
    <footer
      className={`px-4 py-3 text-sm transition-all duration-300 md:px-8 ${
        isDarkMode
          ? "border-t border-slate-700 bg-slate-900 text-gray-400"
          : "border-t border-sky-900 bg-gradient-to-l from-indigo-50 to-sky-100 text-sky-900"
      }`}
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2
          className={`admin-fade-up text-2xl font-semibold ${
            isDarkMode ? "text-slate-200" : "text-sky-900"
          }`}
        >
          Nourish <span className="text-green-500">Next</span>
        </h2>

        <div className="admin-fade-up text-center text-sm leading-tight">
          <p>&copy; {currentYear} Nourish Next - All rights reserved.</p>
          <p className="mt-1 text-[0.82rem] italic opacity-95">
            Keep every donation visible, coordinated, and moving with care.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/LetMeCraft"
            target="_blank"
            rel="noreferrer"
            className={socialIconClass}
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/arpitsharma_ikr?igsh=MXd6eTNvNnJ2cGRiaQ=="
            target="_blank"
            rel="noreferrer"
            className={socialIconClass}
            aria-label="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:meetarpit.codes@gmail.com"
            className={socialIconClass}
            aria-label="Email"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/916006495865"
            target="_blank"
            rel="noreferrer"
            className={socialIconClass}
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
