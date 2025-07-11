import { useNavigate } from "react-router-dom";
import '../App.css';
import './Dashboard.css';
import { useEffect, useState } from "react";
import { getProjects } from "./api";
import ProjectCard from "../Components/ProjectCard";
import { useAuth } from "../Context/AuthContext";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        async function fetchProjects() {
            const result = await getProjects();
            if (result instanceof Error) {
                setError(result);
            } else {
                setProjects(result.sort((a, b) => a.id - b.id));
        }
    }
    fetchProjects();
    }, []);

    const handleAddProjectClick = () => {
        navigate("/create");
    };

    if (error) {
        return <h1 style={{ color: "red" }}>{error.message}</h1>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Your Projects</h2>
                <button onClick={handleAddProjectClick}>Add New Project</button>
            </div>

            {projects.length === 0 ? (
                <p>You don’t have any projects yet. Click “Add New Project” to get started.</p>
            ) : (
                <div className="project-list">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
      );
    }
