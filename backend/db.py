from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, joinedload
from db_models import DBProject, DBBudget, DBExpense
from schemas import ProjectOut, ProjectCreate, BudgetOut, ExpenseOut, ProjectUpdate

DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/projects"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_projects(user_id: int) -> list[ProjectOut]:
    db = SessionLocal()
    db_projects = (
        db.query(DBProject)
        .filter(DBProject.user_id == user_id)
        .order_by(DBProject.name)
        .all()
    )
    projects = []
    for db_project in db_projects:
        projects.append(
            ProjectOut(
                id=db_project.id,
                name=db_project.name,
                budgets=[],
            )
        )
    db.close()
    return projects


def get_project(project_id: int, user_id: int) -> ProjectOut | None:
    db = SessionLocal()
    db_project = (
        db.query(DBProject)
        .options(joinedload(DBProject.budgets).joinedload(DBBudget.expenses))
        .filter(DBProject.id == project_id, DBProject.user_id == user_id)
        .first()
    )

    if db_project is None:
        db.close()
        return None

    project = ProjectOut(
        id=db_project.id,
        name=db_project.name,
        budgets=[
            BudgetOut(
                name=budget.name,
                expenses=[
                    ExpenseOut(
                        name=expense.name,
                        estimate=expense.estimate,
                        actual=expense.actual,
                    )
                    for expense in budget.expenses
                ],
            )
            for budget in db_project.budgets
        ],
    )
    db.close()
    return project


def create_project(project: ProjectCreate, user_id: int) -> ProjectOut:
    db = SessionLocal()
    db_new_project = DBProject(**project.model_dump(), user_id=user_id)
    db.add(db_new_project)
    db.commit()
    db.refresh(db_new_project)
    new_project = ProjectOut(
        id=db_new_project.id,
        name=db_new_project.name,
        budgets=[],
    )
    db.close()
    return new_project


def delete_project(project_id: int, user_id: int) -> bool:
    db = SessionLocal()
    db_project = (
        db.query(DBProject)
        .filter(DBProject.id == project_id, DBProject.user_id == user_id)
        .first()
    )
    if not db_project:
        db.close()
        return False

    # Delete related expenses and budgets first due to foreign key constraints
    db.query(DBExpense).filter(
        DBExpense.budget_id.in_([budget.id for budget in db_project.budgets])
    ).delete(synchronize_session=False)

    db.query(DBBudget).filter(DBBudget.project_id == project_id).delete(
        synchronize_session=False
    )

    db.delete(db_project)
    db.commit()
    db.close()
    return True


def update_project(
    project_id: int, user_id: int, project_data: ProjectUpdate
) -> ProjectOut | None:
    db = SessionLocal()
    db_project = (
        db.query(DBProject)
        .filter(DBProject.id == project_id, DBProject.user_id == user_id)
        .first()
    )
    if db_project is None:
        db.close()
        return None

    db_project.name = project_data.name

    # Clear and recreate budgets and expenses
    db.query(DBExpense).filter(
        DBExpense.budget_id.in_(
            [budget.id for budget in db_project.budgets if budget.id]
        )
    ).delete(synchronize_session=False)

    db.query(DBBudget).filter(DBBudget.project_id == db_project.id).delete(
        synchronize_session=False
    )

    # Add new budgets and nested expenses
    for budget_data in project_data.budgets:
        db_budget = DBBudget(name=budget_data.name, project=db_project)
        db.add(db_budget)

        for expense_data in budget_data.expenses:
            db_expense = DBExpense(
                name=expense_data.name,
                estimate=expense_data.estimate,
                actual=expense_data.actual,
                budget=db_budget,
            )
            db.add(db_expense)

    db.commit()
    db.refresh(db_project)

    updated_project = ProjectOut(
        id=db_project.id,
        name=db_project.name,
        budgets=[
            BudgetOut(
                name=budget.name,
                expenses=[
                    ExpenseOut(
                        name=expense.name,
                        estimate=expense.estimate,
                        actual=expense.actual,
                    )
                    for expense in budget.expenses
                ],
            )
            for budget in db_project.budgets
        ],
    )
    db.close()
    return updated_project
