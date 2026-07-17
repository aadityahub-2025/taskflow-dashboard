import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState("Study");
    const [priority, setPriority] = useState("High");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = () => {
        if (task.trim() === "" || dueDate === "") {
            alert("Please fill all required fields.");
            return;
        }

        const newTask = {
            task: task.trim(),
            category,
            priority,
            dueDate,
            completed: false
        };

        onAddTask(newTask);
        setTask("");
        setDueDate("");
    };

    return (
        <section className="add-task">
            <input 
                type="text" 
                placeholder="Enter Task" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Study</option>
                <option>Work</option>
                <option>Personal</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            />
            <button id="addTaskBtn" onClick={handleSubmit}>
                Add Task
            </button>
        </section>
    );
};

export default TaskForm;
