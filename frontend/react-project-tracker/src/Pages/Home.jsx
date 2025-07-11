import '../App.css';
import { useAuth } from '../Context/AuthContext.jsx';


export default function Home() {
    return (
        <div className="background">
            <div className="content-container">
                <h1 className="header">Project Budget Tracker</h1>
                <p>Track your budgets, expenses, and project progress. Please login to get started.</p>
            </div>
        </div>
    );
  };
