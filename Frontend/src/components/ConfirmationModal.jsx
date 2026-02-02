import React from "react";
import { motion } from "framer-motion";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // or "warning" or "info"
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[rgb(var(--bg-secondary))] rounded-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md border border-[rgb(var(--border-primary))]"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-[rgb(var(--text-primary))]/70 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <motion.button
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-lg font-bold ${type === "danger"
                ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
                : type === "warning"
                  ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20"
                  : "bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--accent-primary))]/90"
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {confirmText}
          </motion.button>

          <motion.button
            type="button"
            onClick={onClose}
            className="flex-1 border border-[rgb(var(--border-primary))] hover:border-[rgb(var(--accent-primary))] py-2 rounded-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cancelText}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;
