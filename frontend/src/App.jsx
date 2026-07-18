import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/login" 
                    element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} 
                />
                <Route 
                    path="/signup" 
                    element={token ? <Navigate to="/" /> : <Signup setToken={setToken} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
