import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_URL = 'https://taskflow-dashboard-93nr.onrender.com/auth';
    // Fallback to localhost if needed during development
    // const API_URL = 'http://localhost:3000/auth'; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Error connecting to server");
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1a73e8' }}>Welcome Back</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <button type="submit" style={{ padding: '0.8rem', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Login
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Don't have an account? <Link to="/signup" style={{ color: '#1a73e8', textDecoration: 'none' }}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
