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

// ===============================
// Task Form Elements
// ===============================

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const addTaskButton = document.getElementById("addTaskBtn");

addTaskButton.addEventListener("click", function () {

    const task = taskInput.value.trim();
    const category = categoryInput.value;
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (task === "" || dueDate === "") {

        alert("Please fill all required fields.");
        return;

    }

    const taskData = {
        task: task,
        category: category,
        priority: priority,
        dueDate: dueDate
    };

    console.log(taskData);

    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>${taskData.task}</td>
            <td>${taskData.category}</td>
            <td>${taskData.priority}</td>
            <td>${taskData.dueDate}</td>
            <td>Pending</td>
            <td>Edit | Delete</td>
        </tr>
    `;

    document.getElementById("taskBody").innerHTML += newRow;

    taskInput.value = "";
    dueDateInput.value = "";

});