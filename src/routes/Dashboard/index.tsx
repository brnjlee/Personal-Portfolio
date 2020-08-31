import React, { useEffect, useState } from "react";
import { Project } from "../../components/Project";

import "./index.css";

interface DashboardProps {
  match: any;
  history: any;
}

const data = [
  {
    _id: "zepplan",
    title: "Zepplan",
    description: "test",
    displayImageId: "/assets/zepplan1.png",
    images: [
      "/assets/zepplan2.png",
      "/assets/zepplan3.png",
      "/assets/zepplan4.png"
    ],
    createdAt: "1593529919763",
    github: "https://github.com/brnjlee/Zepplan",
    live: "https://zepplan.now.sh/"
  },
  {
    _id: "loochat",
    title: "LooChat",
    description: "test",
    images: [],
    displayImageId: "/assets/loochat1.png",
    createdAt: "1547921101000",
    github: "https://github.com/brnjlee/LooChat",
    live: "https://loochat.herokuapp.com/"
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ match }) => {
  return (
    <div className="dashboard__container">
      <div className="dashboard__header">
        <span className="header__title">Projects</span>
      </div>
      <div className="dashboard__pinned-projects">
        {data.map(project => (
          <Project
            key={project._id}
            id={project._id}
            title={project.title}
            description={project.description}
            displayImageId={project.displayImageId}
            images={project.images}
            github={project.github}
            live={project.live}
            createdAt={project.createdAt}
            isSelected={match.params.id === project._id}
          />
        ))}
      </div>
    </div>
  );
};
