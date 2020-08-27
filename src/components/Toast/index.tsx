import React from "react";
import { motion } from "framer-motion";

import "./index.css";

interface ToastProps {
  text: String;
}

export const Toast: React.FC<ToastProps> = ({ text }) => {
  return (
    <div className="toast__container">
      <motion.div
        className="toast__notification"
        animate={{ translateY: 75 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.div>
    </div>
  );
};
