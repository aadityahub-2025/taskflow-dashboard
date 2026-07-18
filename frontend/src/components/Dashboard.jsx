import React, { useState, useEffect } from 'react';
import Header from './Header';
import DashboardCards from './DashboardCards';
import Analytics from './Analytics';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api';

const Dashboard = ({ token, setToken }) => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (token) {
            loadTasks();
        }
    }, [token]);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        }
    };

    const handleAddTask = async (task) => {
        try {
            const newTask = await addTask(task);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const handleToggleComplete = async (task, isCompleted) => {
        try {
            const updated = await updateTask(task._id, { ...task, completed: isCompleted });
            setTasks(tasks.map(t => (t._id === task._id ? updated : t)));
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleUpdateTask = async (id, updatedData) => {
        try {
            const updated = await updateTask(id, updatedData);
            setTasks(tasks.map(t => (t._id === id ? updated : t)));
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            try {
                await deleteTask(id);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (error) {
                console.error("Failed to delete task:", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
    };

    const filteredTasks = tasks.filter(t => t.task.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Get user info
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Header />
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontWeight: 'bold' }}>Hi, {user.name || 'User'}</span>
                    <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
            
            <DashboardCards tasks={tasks} />
            <Analytics tasks={tasks} />
            
            <section className="search-section">
                <input 
                    type="text" 
                    id="searchTask" 
                    placeholder="Search Task..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </section>

            <TaskForm onAddTask={handleAddTask} />
            
            <TaskTable 
                tasks={filteredTasks} 
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />

            <footer>
                <p>&copy; 2026 TaskFlow - React Migration</p>
            </footer>
        </div>
    );
};

export default Dashboard;
