import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            const token = data.access_token;

            login(token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials");
        }
    }

return (
    <div className="login-page">
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Welcome back</h2>
            <input
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type= "email"
                placeholder="Email"
                required
            />
            <input
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                />
            <button type="submit" className="login-button">Login</button>
            {error && <p className="login-error">{error}</p>}
        </form>
    </div>
    );
}
