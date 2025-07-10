from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from db_models import DBUser
from auth import get_current_user
from auth_routes import router as auth_router
from schemas import ProjectOut, ProjectCreate, ProjectUpdate
import db

app = FastAPI()
app.include_router(auth_router)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/projects")
async def get_projects(
    current_user: DBUser = Depends(get_current_user),
) -> list[ProjectOut]:
    return db.get_projects(current_user.id)


@app.get("/api/projects/{project_id}")
async def get_project(
    project_id: int, current_user: DBUser = Depends(get_current_user)
) -> ProjectOut:
    project = db.get_project(project_id, current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.post("/api/projects")
async def create_project(
    project: ProjectCreate, current_user: DBUser = Depends(get_current_user)
) -> ProjectOut:
    return db.create_project(project, current_user.id)


@app.delete("/api/projects/{project_id}", status_code=204)
async def delete_project(
    project_id: int, current_user: DBUser = Depends(get_current_user)
):
    success = db.delete_project(project_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return


@app.put("/api/projects/{project_id}")
async def update_project(
    project_id: int,
    project: ProjectUpdate,
    current_user: DBUser = Depends(get_current_user),
) -> ProjectOut:
    updated_project = db.update_project(project_id, current_user.id, project)
    if updated_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project


@app.get("/{file_path}", response_class=FileResponse)
def get_static_file(file_path: str):
    if Path("static/" + file_path).is_file():
        return "static/" + file_path
    raise HTTPException(status_code=404, detail="Item not found")
