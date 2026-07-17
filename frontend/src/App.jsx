import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardCards from './components/DashboardCards';
import Analytics from './components/Analytics';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { fetchTasks, addTask, updateTask, deleteTask } from './api';
import './index.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Load tasks on mount
    useEffect(() => {
        loadTasks();
    }, []);

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

    const filteredTasks = tasks.filter(t => t.task.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="container">
            <Header />
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
}

export default App;
