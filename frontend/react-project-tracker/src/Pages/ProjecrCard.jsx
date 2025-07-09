import React from "react";
import "./ProjectCard.css";
import { Link } from "react-router";

const ProjectCard = ({ project }) => {
    return (
        <Link className="project-card" to={`/projects/${project.id}`}>
            <h2 className="project-name">{project.name}</h2>
        </Link>
    );
};

export default ProjectCard;
