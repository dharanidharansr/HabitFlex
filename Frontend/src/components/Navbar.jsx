import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 left-0 right-0 z-40 px-6">
      <motion.nav
        className={`max-w-4xl mx-auto px-6 py-3.5 rounded-full transition-all duration-300 backdrop-blur-md border border-[rgb(var(--border-primary))]/30 shadow-lg ${isScrolled
            ? "bg-[rgb(var(--bg-secondary))]/95 shadow-xl"
            : "bg-[rgb(var(--bg-secondary))]/70"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl font-bold text-[rgb(var(--text-primary))]">HabitFlex</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              className="text-[rgb(var(--text-primary))]/80 hover:text-[rgb(var(--accent-primary))] transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </motion.button>
            <motion.button
              className="bg-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-primary))]/90 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
