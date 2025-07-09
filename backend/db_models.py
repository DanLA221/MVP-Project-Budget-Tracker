from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class DBProject(Base):
    __tablename__ = "project"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
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
