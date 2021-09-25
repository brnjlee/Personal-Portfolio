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
				staggerChildren: 0.02,
			},
		},
		hidden: { opacity: 0 },
	};

	const descriptionList = {
		visible: {
			opacity: 1,
			transition: {
				delay: 0.5,
				when: "beforeChildren",
				staggerChildren: 0.02,
			},
		},
		hidden: { opacity: 0 },
	};

	const linkedInList = {
		visible: {
			opacity: 1,
			transition: {
				delay: 0.9,
				when: "beforeChildren",
				staggerChildren: 0.02,
			},
		},
		hidden: { opacity: 0 },
	};

	const githubList = {
		visible: {
			opacity: 1,
			transition: {
				delay: 1.2,
				when: "beforeChildren",
				staggerChildren: 0.02,
			},
		},
		hidden: { opacity: 0 },
	};

	const titleItem = {
		visible: { top: 0 },
		hidden: { top: 70 },
	};
	const descriptionItem = {
		visible: { top: 0 },
		hidden: { top: 100 },
	};
	const title = "Hi, I'm Brian";
	const description =
		"4A Systems Design Engineering Student at the University of Waterloo";
	const linkedIn = "LinkedIn";
	const github = "Github";
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
	const linkedInItems = linkedIn.split("").map((char, i) => (
		<motion.span key={i} variants={titleItem}>
			{char}
		</motion.span>
	));
	const githubItems = github.split("").map((char, i) => (
		<motion.span key={i} variants={titleItem}>
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
				<motion.div
					className="home__link-container"
					initial="hidden"
					animate="visible"
					variants={linkedInList}
				>
					<a
						href="https://www.linkedin.com/in/brian-lee-2553a1149/"
						className="home__link"
						target="_blank"
						rel="noopener noreferrer"
					>
						{linkedInItems}
					</a>
				</motion.div>
				<motion.div
					className="home__link-container"
					initial="hidden"
					animate="visible"
					variants={githubList}
				>
					<a
						href="https://github.com/brnjlee"
						className="home__link"
						target="_blank"
						rel="noopener noreferrer"
					>
						{githubItems}
					</a>
				</motion.div>
			</div>
		</div>
	);
};
