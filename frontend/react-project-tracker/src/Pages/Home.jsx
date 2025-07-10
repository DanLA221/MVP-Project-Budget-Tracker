import { NavLink, useNavigate } from "react-router-dom";
import '../App.css';
import { useEffect, useState } from "react";
import { getProjects } from "./api";
import ProjectCard from "./ProjectCard";


const Home = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProjects() {
            const result = await getProjects();
            if (result instanceof Error) {
                setError(result);
                return;
            }
            setProjects(result.sort((a, b) => a.id - b.id));
        }
        fetchProjects();
    }, []);

    const handleAddProjectClick = () => {
        navigate("/create");
    };

    if (error) {
        return <h1>{error.message}</h1>;
    }

    const projectElements = projects.map((project) => (
        <ProjectCard key={project.id ?? project.name} project={project} />
    ));


    return (
     <div className="background">
         <div className="content-container">
      <h1 className="header">Project Budget Tracker</h1>
      <div className="project-container">
                <button onClick={handleAddProjectClick} className="add-button">
                    Add a project
                </button>
            <div className="project-list">{projectElements}</div>
        </div>
        </div>
      </div>
    );
  };

  export default Home;
