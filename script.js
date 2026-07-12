// ===============================
// TaskFlow - Student Productivity Dashboard
// JavaScript File
// ===============================


// Step 1: Basic Setup Check

console.log("TaskFlow JavaScript Connected");


// Step 2: Live Date and Time


// Selecting HTML Elements
const dateElement = document.getElementById("current-date");
const timeElement = document.getElementById("current-time");


// Function to update Date and Time
function updateDateTime() {

    const now = new Date();


    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };


    // Display Date
    dateElement.innerText =
        now.toLocaleDateString("en-IN", options);


    // Display Time
    timeElement.innerText =
        now.toLocaleTimeString("en-IN");

}


// Calling function first time
updateDateTime();


// Updating time every second
setInterval(updateDateTime, 1000);