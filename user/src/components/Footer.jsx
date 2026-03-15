import React from "react";
import { Github, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[rgba(79,127,125,0.16)] bg-[linear-gradient(180deg,#335f5e_0%,#284a4a_100%)] px-4 py-5 text-sm text-[#f3ebdf] md:px-10">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="select-none text-2xl font-extrabold text-[var(--theme-ink)] sm:text-3xl md:whitespace-nowrap">
            Nourish <span className="text-[#dfeee7]">Next</span>
          </h2>
        </div>

        <div className="text-center text-sm text-[#d4e4de]">
          &copy; 2025 Nourish Next - All rights reserved.
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/LetMeCraft"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(255,250,243,0.18)] p-2 text-[#eef5f0] transition-all hover:border-[#d7e8e1] hover:bg-[rgba(255,250,243,0.08)] hover:text-[#fffaf3]"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/arpitsharma_ikr?igsh=MXd6eTNvNnJ2cGRiaQ=="
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(255,250,243,0.18)] p-2 text-[#eef5f0] transition-all hover:border-[#d7e8e1] hover:bg-[rgba(255,250,243,0.08)] hover:text-[#fffaf3]"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/916006495865"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(255,250,243,0.18)] p-2 text-[#eef5f0] transition-all hover:border-[#d7e8e1] hover:bg-[rgba(255,250,243,0.08)] hover:text-[#fffaf3]"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
