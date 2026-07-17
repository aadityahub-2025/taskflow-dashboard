import React, { useState } from 'react';

const TaskTable = ({ tasks, onToggleComplete, onDeleteTask, onUpdateTask }) => {
    const [editId, setEditId] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [editCategory, setEditCategory] = useState("Study");
    const [editPriority, setEditPriority] = useState("High");
    const [editDueDate, setEditDueDate] = useState("");

    const handleEditClick = (task) => {
        setEditId(task._id);
        setEditTask(task.task);
        setEditCategory(task.category);
        setEditPriority(task.priority);
        setEditDueDate(task.dueDate);
    };

    const handleSaveClick = (task) => {
        onUpdateTask(task._id, {
            ...task,
            task: editTask,
            category: editCategory,
            priority: editPriority,
            dueDate: editDueDate
        });
        setEditId(null);
    };

    return (
        <section className="task-table">
            <table>
                <thead>
                    <tr>
                        <th>✔</th>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    className="task-check"
                                    checked={task.completed}
                                    onChange={(e) => onToggleComplete(task, e.target.checked)}
                                />
                            </td>
                            <td className={task.completed ? "completed-task" : ""}>
                                {editId === task._id ? (
                                    <input value={editTask} onChange={e => setEditTask(e.target.value)} />
                                ) : (
                                    task.task
                                )}
                            </td>
                            <td>
                                {editId === task._id ? (
                                    <select value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                                        <option>Study</option>
                                        <option>Work</option>
                                        <option>Personal</option>
                                    </select>
                                ) : (
                                    task.category
                                )}
                            </td>
                            <td>
                                {editId === task._id ? (
                                    <select value={editPriority} onChange={e => setEditPriority(e.target.value)}>
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </select>
                                ) : (
                                    <span className={task.priority.toLowerCase()}>{task.priority}</span>
                                )}
                            </td>
                            <td>
                                {editId === task._id ? (
                                    <input type="date" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} />
                                ) : (
                                    task.dueDate
                                )}
                            </td>
                            <td>
                                <span className={`status ${task.completed ? "completed" : "pending"}`}>
                                    {task.completed ? "Completed" : "Pending"}
                                </span>
                            </td>
                            <td>
                                {editId === task._id ? (
                                    <button className="edit-btn" onClick={() => handleSaveClick(task)}>Save</button>
                                ) : (
                                    <button className="edit-btn" onClick={() => handleEditClick(task)}>Edit</button>
                                )}
                                {' '}
                                <button className="delete-btn" onClick={() => onDeleteTask(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{textAlign: "center"}}>No tasks found. Add a task above!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default TaskTable;
