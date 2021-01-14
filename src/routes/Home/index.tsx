import React, { useState } from "react";
import { motion } from "framer-motion";

import "./index.css";
interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const titleList = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.02
      }
    },
    hidden: { opacity: 1 }
  };

  const descriptionList = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.02
      }
    },
    hidden: { opacity: 1 }
  };

  const titleItem = {
    visible: { top: 0 },
    hidden: { top: 70 }
  };
  const descriptionItem = {
    visible: { top: 0 },
    hidden: { top: 100 }
  };
  const title = "Hi, I'm Brian";
  const description =
    "3B Systems Design Engineering Student at the University of Waterloo";
  const titleItems = title.split("").map((char, i) => (
    <motion.span key={i} variants={titleItem}>
      {char}
    </motion.span>
  ));
  const descriptionItems = description.split(" ").map((char, i) => (
    <motion.span key={i} variants={descriptionItem}>
      {" "}
      {char}
    </motion.span>
  ));
  return (
    <div className="home__container">
      <div className="home__header">
        <motion.div
          className="home__title"
          initial="hidden"
          animate="visible"
          variants={titleList}
        >
          {titleItems}
        </motion.div>
        <motion.div
          className="home__description"
          initial="hidden"
          animate="visible"
          variants={descriptionList}
        >
          {descriptionItems}
        </motion.div>
      </div>
    </div>
  );
};
