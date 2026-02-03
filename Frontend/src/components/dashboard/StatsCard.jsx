import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon: Icon, iconColor }) => {
  return (
    <motion.div
      className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl p-4"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="text-2xl" style={{ color: iconColor }} />
        <h3 className="font-medium text-[rgb(var(--text-primary))]/60">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
};

export default StatsCard;
