import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getProject } from "./api";
import { deleteProject } from "./api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ProjectDetail() {
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            if (!projectId) {
                setError("No Project Id");
                return;
            }
            const project = await getProject(projectId);
            if (project instanceof Error) {
                setError("Project Not Found");
                return;
            }
            setProject(project);
        })();

    }, [projectId]);

    if (!projectId) {
        return <h1>Project Not Found</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!project) {
        return <h1>Loading...</h1>;
    }

    const handleEditProjectClick = () => {
        navigate(`/edit/${projectId}`);
    };

    const handleDeleteProjectClick = async () => {
      if (!window.confirm("Are you sure you want to delete this project?")) return;

      const result = await deleteProject(projectId);

      if (result === true) {
        navigate("/");
      } else {
        alert("Error deleting project");
      }
    };

    let totalEstimate = 0;
    let totalActual = 0;

    const chartData = project.budgets.map((budget) => {
      let budgetEstimate = 0;
      let budgetActual = 0;

      budget.expenses.forEach((exp) => {
        budgetEstimate += exp.estimate;
        budgetActual += exp.actual;
      });

    return {
      name: budget.name,
      Estimate: Number(budgetEstimate.toFixed(2)),
      Actual: Number(budgetActual.toFixed(2))
    };
});

    project.budgets.forEach((budget) => {
        let budgetEstimate = 0;
        let budgetActual = 0;

        budget.expenses.forEach((exp) => {
          budgetEstimate += exp.estimate;
          budgetActual += exp.actual;
        });

    totalEstimate += budgetEstimate;
    totalActual += budgetActual;
    });

return (
    <div className="background">
      <div className="project-detail-wrapper">
    <div className="project-detail-container">
      <h2>{project.name}</h2>
      <div className="edit-delete-project-buttons">
        <button onClick={handleEditProjectClick} className="edit-project-button">
    Edit Project
    </button>
    <button onClick={handleDeleteProjectClick} className="delete-project-button">Delete Project</button>
    </div>
    <div className="project-totals">
        <h3>Project Totals</h3>
        <p><strong>Estimate:</strong> ${totalEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p><strong>Actual:</strong> ${totalActual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div className="progress-bar" style={{ marginTop: "0.5rem" }}>
  <div
    className={`progress-fill ${totalActual > totalEstimate ? "red" : "green"}`}
    style={{ width: `${Math.min((totalActual / totalEstimate) * 100, 100)}%` }}
  ></div>
</div>
      </div>
      {project.budgets.map((budget, bIdx) => {
        let budgetEstimate = 0;
        let budgetActual = 0;

        budget.expenses.forEach(exp => {
          budgetEstimate += exp.estimate;
          budgetActual += exp.actual;
        });

        const budgetPercent = budgetEstimate
            ? Math.min((budgetActual / budgetEstimate) * 100, 100)
            : 0;
        const budgetColor = budgetActual > budgetEstimate ? "red" : "green";

        return (
          <div key={bIdx} className="budget-card">
            <h3>{budget.name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Estimate</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {budget.expenses.map((expense, eIdx) => {
                    const percent = expense.estimate
                        ? Math.min((expense.actual / expense.estimate) * 100, 100)
                        : 0;
                    const color = expense.actual > expense.estimate ? "red" : "green";

                    return (
                  <tr key={eIdx}>
                    <td>{expense.name}</td>
                    <td>${expense.estimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${expense.actual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <div className="progress-bar">
                        <div
                            className={`progress-fill ${color}`}
                            style={{ width: `${percent}%` }}
                        ></div>
                        </div>
                        </td>
                  </tr>
                );
                })}
              </tbody>
            </table>

            <div className="budget-totals">
              <strong>Total Estimate:</strong> ${budgetEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br />
              <strong>Total Actual:</strong> ${budgetActual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <div className="progress-bar" style={{ marginTop: "0.5rem"}}>
                <div
                className={`progress-fill ${budgetColor}`}
                style={{ width: `${budgetPercent}%` }}
            ></div>
          </div>
          </div>
          </div>
        );
      })}
    </div>
    <div className="chart-container">
    <h3>Budget Comparison</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#fff"/>
        <YAxis stroke="#fff"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="Estimate" fill="#8884d8" />
        <Bar dataKey="Actual" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
  );
}
