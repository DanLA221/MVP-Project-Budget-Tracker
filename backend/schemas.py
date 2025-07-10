from pydantic import BaseModel, EmailStr
from typing import List


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProjectCreate(BaseModel):
    name: str


class ExpenseIn(BaseModel):
    name: str
    estimate: float
    actual: float


class ExpenseOut(ExpenseIn):
    name: str
    estimate: float
    actual: float


class BudgetIn(BaseModel):
    name: str
    expenses: List[ExpenseIn] = []


class BudgetOut(BaseModel):
    name: str
    expenses: List[ExpenseOut]


class ProjectOut(BaseModel):
    id: int
    name: str
    budgets: List[BudgetOut]


class ProjectUpdate(BaseModel):
    name: str
    budgets: List[BudgetIn] = []
