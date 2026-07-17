import React from 'react';

const DashboardCards = ({ tasks }) => {
    let total = tasks.length;
    let completed = 0;
    let pending = 0;
    let today = 0;

    const currentDate = new Date().toISOString().split("T")[0];

    tasks.forEach(task => {
        if (task.completed) {
            completed++;
        } else {
            pending++;
        }

        if (task.dueDate === currentDate) {
            today++;
        }
    });

    return (
        <section className="cards">
            <div className="card">
                <h2>Total Tasks</h2>
                <h1>{total}</h1>
            </div>
            <div className="card">
                <h2>Completed</h2>
                <h1>{completed}</h1>
            </div>
            <div className="card">
                <h2>Pending</h2>
                <h1>{pending}</h1>
            </div>
            <div className="card">
                <h2>Today's Tasks</h2>
                <h1>{today}</h1>
            </div>
        </section>
    );
};

export default DashboardCards;
