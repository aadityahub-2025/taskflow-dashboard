import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Analytics = ({ tasks }) => {
    let completed = 0;
    let pending = 0;
    let days = [0, 0, 0, 0, 0, 0, 0];

    tasks.forEach(task => {
        if (task.completed) {
            completed++;
        } else {
            pending++;
        }

        if (task.dueDate) {
            let date = new Date(task.dueDate);
            let day = date.getDay();
            days[day]++;
        }
    });

    const pieData = {
        labels: ["Completed", "Pending"],
        datasets: [
            {
                data: [completed, pending],
                backgroundColor: ["#22c55e", "#ef4444"],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    const barData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: "Tasks",
                data: days,
                backgroundColor: "#3b82f6"
            },
        ],
    };

    const barOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <section className="analytics">
            <div className="calendar-box">
                <h2>Calendar</h2>
                <div id="calendar">
                    {/* Placeholder for actual calendar widget if needed */}
                    <p>Calendar widget coming soon...</p>
                </div>
            </div>
            <div className="chart-box">
                <h2>Weekly Productivity</h2>
                <Bar data={barData} options={barOptions} />
            </div>
            <div className="chart-box">
                <h2>Task Status</h2>
                <Pie data={pieData} options={pieOptions} />
            </div>
        </section>
    );
};

export default Analytics;
