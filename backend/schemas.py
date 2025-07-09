from pydantic import BaseModel
from typing import List


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
