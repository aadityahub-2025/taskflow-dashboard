import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setToken }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_URL = 'https://taskflow-dashboard-93nr.onrender.com/auth';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                setError(data.message || "Signup failed");
            }
        } catch (err) {
            setError("Error connecting to server");
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1a73e8' }}>Create an Account</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
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
                    Sign Up
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Already have an account? <Link to="/login" style={{ color: '#1a73e8', textDecoration: 'none' }}>Login</Link>
            </p>
        </div>
    );
};

export default Signup;
