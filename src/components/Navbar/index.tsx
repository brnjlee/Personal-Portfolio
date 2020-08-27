import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./index.css";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="navbar__placeholder">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Brian Lee
        </Link>
        <NavLink
          activeClassName="selected"
          className={`navbar__link `}
          to={`/projects`}
          replace
        >
          projects
        </NavLink>
        <a
          href="/assets/resume.pdf"
          className="navbar__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          resume
        </a>
      </div>
    </div>
  );
};

const Dropdown = ({ open }) => {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: open ? 1 : 0, height: open ? 175 : 0 }}
      transition={{ duration: 0.2 }}
      className={`dropdown__container ${open ? "open" : null}`}
    >
      <div className="dropdown__link">Profile</div>
      <div className="dropdown__link">Settings</div>
      <div className="dropdown__link">Log out</div>
    </motion.div>
  );
};
