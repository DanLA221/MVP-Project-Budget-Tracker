import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getProject, editProject } from "./api";

export default function EditProject() {
    const { projectId } = useParams();
    const [projectName, setProjectName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([
        { name: "", expenses: [] },
    ]);

    useEffect(() => {
        async function fetchProject() {
            if (!projectId) {
                setError("Missing project ID");
            return;
    }

    const project = await getProject(projectId);
    if (project instanceof Error) {
        setError("Couldn't load the project");
        return;
    }
    // Prepopulate nested budgets and expenses
    setProjectName(project.name);
    setBudgets(project.budgets || []);
}
    fetchProject();
}, [projectId]);

async function submitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");

    if (!name || typeof name !== "string") {
            setError("Invalid Name");
            return;
        }

    const budgetsPayload = budgets.map((_, bIdx) => {
        const budgetName = formData.get(`budget-${bIdx}`);
        const expenses = [];
        let eIdx = 0;
        while (true) {
            const expenseName = formData.get(`expense-${bIdx}-${eIdx}-name`);
            const estimate = formData.get(`expense-${bIdx}-${eIdx}-estimate`);
            const actual = formData.get(`expense-${bIdx}-${eIdx}-actual`);
            if (!expenseName) break;
            expenses.push({ name: expenseName, estimate, actual });
            eIdx++;
        }
        return { name: budgetName, expenses };
    });

    const project = await editProject({
        id: projectId,
        name,
        budgets: budgetsPayload,
    });

    if (project instanceof Error) {
            setError("Couldn't update the project. Try again later.");
            return;
        }
    navigate(`/projects/${projectId}`);
    }

    const handleAddBudgetField = () => {
        setBudgets([...budgets, { name: "", expenses: [] }]);
    };

    const handleDeleteBudget = (budgetIdx) => {
        const updatedBudgets = [...budgets];
        updatedBudgets.splice(budgetIdx, 1);
        setBudgets(updatedBudgets);
      };

    const handleAddExpense = (budgetIdx) => {
        const updatedBudgets = [...budgets];
        updatedBudgets[budgetIdx].expenses.push({ name: "", estimate: "", actual: "" });
        setBudgets(updatedBudgets);
    };

    const handleDeleteExpense = (budgetIdx, expenseIdx) => {
        const updatedBudgets = [...budgets];
        updatedBudgets[budgetIdx].expenses.splice(expenseIdx, 1);
        setBudgets(updatedBudgets);
    };

    return (
        <div className="background">
        <div className="edit-project-container">
            <h2>Edit Project</h2>
            {error && <p>{error}</p>}
            <form onSubmit={submitForm} className="edit-project-form">
            <div className="project-header-row">
        <span>Project Name:</span>
      </div>
                <input
                    type="text"
                    placeholder="Project Name"
                    name="name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
               {budgets.map((budget, bIdx) => (
        <div key={bIdx} className="budget-section">
            <div className="budget-name-row">
            <input
                type="text"
                placeholder={`Budget ${bIdx + 1} Name`}
                name={`budget-${bIdx}`}
                value={budget.name}
                onChange={(e) => {
                    const updatedBudgets = [...budgets];
                    updatedBudgets[bIdx].name = e.target.value;
                    setBudgets(updatedBudgets);
                }}
                required
            />
            {budgets.length > 1 && (
    <button
      type="button"
      className="delete-budget-button"
      onClick={() => handleDeleteBudget(bIdx)}
    >
      Delete Budget
    </button>
  )}
</div>
             <div className="expense-table">
      <div className="expense-header-row">
        <span>Expense Name</span>
        <span>Estimate</span>
        <span>Actual</span>
      </div>

            {budget.expenses.map((expense, eIdx) => (
                <div key={eIdx} className="expense-row">
                    <input
                         type="text"
                         placeholder="Expense Name"
                         name={`expense-${bIdx}-${eIdx}-name`}
                         value={expense.name}
                         onChange={(e) => {
                             const updatedBudgets = [...budgets];
                             updatedBudgets[bIdx].expenses[eIdx].name = e.target.value;
                             setBudgets(updatedBudgets);
                         }}
                         required
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Estimated Amount"
                        name={`expense-${bIdx}-${eIdx}-estimate`}
                        value={expense.estimate}
                        onChange={(e) => {
                            const updatedBudgets = [...budgets];
                            updatedBudgets[bIdx].expenses[eIdx].estimate = e.target.value;
                            setBudgets(updatedBudgets);
                        }}
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Actual Amount"
                        name={`expense-${bIdx}-${eIdx}-actual`}
                        value={expense.actual}
                        onChange={(e) => {
                            const updatedBudgets = [...budgets];
                            updatedBudgets[bIdx].expenses[eIdx].actual = e.target.value;
                            setBudgets(updatedBudgets);
                        }}
                        required
                    />
                    <button
                    type="button"
                    onClick={() => handleDeleteExpense(bIdx, eIdx)}
                    className="delete-expense-button">
                    Delete expense
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() => handleAddExpense(bIdx)}
                className="add-expense-button"
            >
                Add an expense
            </button>
            </div>
        </div>
    ))}

    <button type="button" onClick={handleAddBudgetField} className="add-budget-button">
        Add a budget
    </button>

                <button className="save-project-button" type="submit">Save Project</button>
            </form>
        </div>
        </div>
    );
}
