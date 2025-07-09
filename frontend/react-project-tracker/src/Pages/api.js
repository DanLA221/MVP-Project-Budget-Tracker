const baseURL = "http://localhost:8000";

export async function getProjects() {
    try {
        const response = await fetch(`${baseURL}/api/projects`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = (await response.json());
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}


export async function getProject(id) {
    try {
        const response = await fetch(`${baseURL}/api/projects/${id}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = (await response.json());
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}

export async function createProject(project) {
    try {
        const response = await fetch(`${baseURL}/api/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = (await response.json());
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}

export async function deleteProject(id) {
    try {
      const response = await fetch(`${baseURL}/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

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
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        return e instanceof Error ? e : new Error("Unexpected Error");
    }
}
