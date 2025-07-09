import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createProject } from "./api";

export default function CreateProject() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function submitForm(formData) {
        const name = formData.get("name");
        if (!name || typeof name !== "string") {
            setError("Invalid Name");
            return;
        }
        const project = await createProject({
            name,
        });
        if (project instanceof Error) {
            setError("Couldn't add the project try again later");
            return;
        }
        navigate("/");
    }

    return (
        <div className="background">
        <div className="create-project-container">
            <nav>
        <NavLink className="nav-link semi-transparent-button" to="/" end>
          Home
        </NavLink>
      </nav>
            <h2>Create Project</h2>
            {error && <p>{error}</p>}
            <form
    onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        submitForm(formData);
    }}
    className="create-project-form"
>
                <input
                    type="text"
                    placeholder="Project Name"
                    name="name"
                    required={true}
                />
                <button type="submit">Add Project</button>
            </form>
        </div>
        </div>
    );
}
