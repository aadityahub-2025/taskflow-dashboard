import React, { useState, useEffect } from 'react';

const Header = () => {
    const [dateString, setDateString] = useState('');
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            setDateString(now.toLocaleDateString("en-IN", options));
            setTimeString(now.toLocaleTimeString("en-IN"));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <header>
            <div className="logo">
                <h1>TaskFlow</h1>
                <p>Plan Smart. Track Progress. Achieve More.</p>
            </div>
            <div className="header-right">
                <div className="date-time">
                    <h3>{dateString}</h3>
                    <p>{timeString}</p>
                </div>
                <button id="darkModeBtn" onClick={toggleDarkMode}>
                    <i className="fa-solid fa-moon"></i>
                </button>
            </div>
        </header>
    );
};

export default Header;
