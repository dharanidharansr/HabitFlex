import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-[rgb(var(--border-primary))]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[rgb(var(--text-primary))]/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HabitFlex
          </p>
          <p className="text-[rgb(var(--text-primary))]/60 text-sm">Crafted by HalaMadrid</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
