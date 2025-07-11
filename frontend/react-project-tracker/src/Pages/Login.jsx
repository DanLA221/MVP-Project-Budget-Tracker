import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useUser();
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
                headers: {"Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    email,
                    password,
                }),
            });

            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            const token = data.access_token;

            login({ user: { email }, token });
            navigate("/");
        } catch (err) {
            setError("Invalid credentials");
        }
    }

return (
    <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type= "email" placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        </form>
    );
}
