import React from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-400/20 bg-[linear-gradient(180deg,#0b1f3a_0%,#132b4f_100%)] px-4 py-4 text-sm text-slate-300 md:px-10">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <h2 className="text-2xl font-semibold text-white">
          Nourish <span className="text-cyan-300">Next</span>
        </h2>

        <div className="text-center text-sm text-slate-400">
          <p>&copy; {currentYear} Nourish Next. All Rights Reserved.</p>
          <p className="mt-1 italic text-slate-300">
            Every pickup can turn extra food into timely support.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/LetMeCraft"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/30 bg-transparent p-2 text-slate-300 shadow-[0_8px_18px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:text-cyan-200 active:text-cyan-300"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/arpitsharma_ikr?igsh=MXd6eTNvNnJ2cGRiaQ=="
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/30 bg-transparent p-2 text-slate-300 shadow-[0_8px_18px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:text-cyan-200 active:text-cyan-300"
            aria-label="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:meetarpit.codes@gmail.com"
            className="rounded-full border border-cyan-300/30 bg-transparent p-2 text-slate-300 shadow-[0_8px_18px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:text-cyan-200 active:text-cyan-300"
            aria-label="Email"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/916006495865"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/30 bg-transparent p-2 text-slate-300 shadow-[0_8px_18px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:text-cyan-200 active:text-cyan-300"
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
