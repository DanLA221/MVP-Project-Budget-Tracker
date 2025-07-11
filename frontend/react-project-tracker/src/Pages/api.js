const baseURL = "http://localhost:8000";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getProjects() {
    try {
        const response = await fetch(`${baseURL}/api/projects`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error(`${response.status}`);
        return await response.json();
    } catch (e) {
        console.error(e);
        return e instanceof Error ? e : new Error("Unexpected Error");
    }
}


export async function getProject(id) {
    try {
        const response = await fetch(`${baseURL}/api/projects/${id}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error(`${response.status}`);
        return await response.json();
    } catch (e) {
        console.error(e);
        return e instanceof Error ? e : new Error("Unexpected Error");
    }
}

export async function createProject(project) {
    try {
        const response = await fetch(`${baseURL}/api/projects`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(project),
        });
        if (!response.ok) throw new Error(`${response.status}`);
        return await response.json();
    } catch (e) {
        console.error(e);
        return e instanceof Error ? e : new Error("Unexpected Error");
    }
}

export async function deleteProject(id) {
    try {
      const response = await fetch(`${baseURL}/api/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to delete project");
      return true;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export async function editProject(project) {
    try {
        const response = await fetch(`${baseURL}/api/projects/${project.id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(project),
        });
        if (!response.ok) throw new Error(`${response.status}`);
        return await response.json();
    } catch (e) {
        console.error(e);
        return e instanceof Error ? e : new Error("Unexpected Error");
    }
}
