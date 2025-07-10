from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    projects = relationship(
        "DBProject", back_populates="user", cascade="all, delete-orphan"
    )


class DBProject(Base):
    __tablename__ = "project"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("DBUser", back_populates="projects")
    budgets = relationship(
        "DBBudget", back_populates="project", cascade="all, delete-orphan"
    )


class DBBudget(Base):
    __tablename__ = "budget"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    project_id = Column(Integer, ForeignKey("project.id"))
    project = relationship("DBProject", back_populates="budgets")
    expenses = relationship(
        "DBExpense", back_populates="budget", cascade="all, delete-orphan"
    )


class DBExpense(Base):
    __tablename__ = "expense"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    estimate = Column(Float)
    actual = Column(Float)
    budget_id = Column(Integer, ForeignKey("budget.id"))
    budget = relationship("DBBudget", back_populates="expenses")
