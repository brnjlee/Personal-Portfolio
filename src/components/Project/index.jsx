import React from "react";
import { motion, useMotionValue, useInvertedScale } from "framer-motion";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { LoremIpsum } from "react-lorem-ipsum";
import { format } from "date-fns";

import "./index.css";

export const Project = ({
  title,
  id,
  description,
  displayImageId,
  images,
  isSelected,
  github,
  live,
  createdAt
}) => {
  let { url } = useRouteMatch();
  const container = {
    hidden: {},
    show: {
      opacity: 1
    }
  };
  const date = format(new Date(parseInt(createdAt)), "MMM, d y");

  return (
    <div className="project__container">
      <div className={`card`}>
        <Overlay isSelected={isSelected} />
        <div className={`card-content-container ${isSelected && "open"}`}>
          <motion.div
            className={`card-content ${isSelected ? "open" : ""}`}
            layoutTransition={isSelected ? openSpring : closeSpring}
            variants={container}
            animate={isSelected ? "show" : "hidden"}
            initial={false}
          >
            <Title
              title={title}
              description={description}
              isSelected={isSelected}
            />
            <Links github={github} live={live} />
            <ProjectImage id={displayImageId} isSelected={isSelected} />
            <ContentPlaceholder images={images} />
          </motion.div>
        </div>
        {!isSelected && (
          <div className="card-open-link-container">
            <Link to={`${url}/${id}`} className={`card-open-link`} />
            <div className="card__details">
              <span className="card__title">{title}</span>
              {/* <span className="card__date">{date}</span> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Overlay = ({ isSelected }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
  ></motion.div>
);

const ContentPlaceholder = React.memo(images => {
  const inverted = useInvertedScale();
  const item = {
    hidden: {
      opacity: 0,
      display: "none",
      y: 50
      // maxHeight: 0
    },
    show: {
      display: "block",
      opacity: 1,
      y: 0,
      // maxHeight: 1000,
      transition: { delay: 0, ease: "easeOut" }
    }
  };

  const renderImages = images.images.map(image => (
    <img
      className="project__image detail_image"
      src={image}
      alt={image}
      width="100%"
    />
  ));

  return (
    <motion.div className="content-container" variants={item}>
      {renderImages}
    </motion.div>
  );
});

const Title = ({ title, description, isSelected }) => {
  const item = {
    hidden: { opacity: 0, display: "none" },
    show: {
      display: "block",
      opacity: 1,
      transition: { delay: 0.2 }
    }
  };

  return (
    <motion.div
      className="project__title-container"
      style={{ opacity: 0 }}
      variants={item}
    >
      <div className={`project__title ${isSelected ? "open" : ""}`}>
        {title}
      </div>
    </motion.div>
  );
};

const Links = ({ github, live }) => {
  const item = {
    hidden: { opacity: 0, display: "none", y: 10 },
    show: {
      display: "flex",
      opacity: 1,
      y: 0,
      transition: { delay: 0.35 }
    }
  };

  return (
    <motion.div
      className="project__links-container"
      style={{ opacity: 0 }}
      variants={item}
      transition={openSpring}
    >
      <a href={github} rel="noopener noreferrer" target="_blank">
        <div className="icon">
          <FiGithub />
        </div>
      </a>
      <a href={live} rel="noopener noreferrer" target="_blank">
        <div className="icon">
          <FiExternalLink />
        </div>
      </a>
    </motion.div>
  );
};

const ProjectImage = ({ id, isSelected }) => {
  const lgWidth =
    window.innerWidth > 1000 ? window.innerWidth / 2 : window.innerWidth - 100;
  const smWidth = window.innerWidth > 700 ? 550 : window.innerWidth - 70;
  const image = {
    hidden: { y: 70, width: smWidth },
    show: { y: 300, width: lgWidth }
  };
  const inverted = useInvertedScale();
  // const y = isSelected ? 180 : 20;
  // const width = isSelected ? lgWidth : 400;
  // const height = Math.floor(0.75 * width);

  return (
    <motion.div
      className={`project__image-container ${isSelected ? "open" : null}`}
      initial={false}
      style={{ ...inverted, originX: 0, originY: 0, x: "-50%" }}
      transformTemplate={({ x, y, scaleX, scaleY }) => {
        return `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;
      }}
      variants={image}
      transition={isSelected ? openSpring : closeSpring}
    >
      {/* <Image
        className="project__image"
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={id}
        width="100%"
      >
        <Transformation width={width} height={height} crop="fit" />
      </Image> */}
      <motion.img className="project__image" src={id} alt="" width="100%" />
      {/* <motion.img
        className="project__image"
        src={id}
        sizes="(max-width: 600px) 800px,
            2000px"
        srcset="/assets/macbook.png 800w,
        /assets/macbook.png 2000w"
        alt=""
        width="100%"
      /> */}
    </motion.div>
  );
};
const openSpring = { type: "spring", stiffness: 400, damping: 50 };
const closeSpring = { type: "spring", stiffness: 400, damping: 50 };
