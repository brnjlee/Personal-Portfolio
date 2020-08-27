import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useApolloClient, useQuery } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";
// import { useHistory, useRouteMatch } from "react-router-dom";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Project } from "../../components/Project";

import "./index.css";

// const GET_PLANS = gql`
//   {
//     plans {
//       _id
//       title
//       description
//       displayImageId
//     }
//   }
// `;

// const GET_LOGGED_IN = gql`
//   {
//     isLoggedIn @client
//   }
// `;

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
    createdAt: "1598297320",
    github: "https://github.com/brnjlee/Zepplan",
    live: "https://zepplan.now.sh/"
  },
  {
    _id: "loochat",
    title: "LooChat",
    description: "test",
    images: [],
    displayImageId: "/assets/loochat1.png",
    createdAt: "1598297320",
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
            // history={history}
            createdAt={"1598468701"}
            isSelected={match.params.id === project._id}
          />
        ))}
      </div>
    </div>
  );
};
