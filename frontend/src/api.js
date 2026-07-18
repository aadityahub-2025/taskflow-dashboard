const API_URL = 'https://taskflow-dashboard-93nr.onrender.com/tasks';

export const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
};

export const addTask = async (task) => {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
};

export const updateTask = async (id, updatedTask) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
};

export const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
};
