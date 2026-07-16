// ======================================
// TaskFlow - Student Productivity Dashboard
// Script.js (Part 1)
// ======================================

// ----------------------------
// Live Date and Time
// ----------------------------

const dateElement = document.getElementById("current-date");
const timeElement = document.getElementById("current-time");

function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateElement.innerText = now.toLocaleDateString("en-IN", options);
    timeElement.innerText = now.toLocaleTimeString("en-IN");

}

updateDateTime();
setInterval(updateDateTime, 1000);


// ----------------------------
// Form Elements
// ----------------------------

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const addTaskButton = document.getElementById("addTaskBtn");
const taskBody = document.getElementById("taskBody");
const searchInput = document.getElementById("searchTask");


// ----------------------------
// Dashboard Cards
// ----------------------------

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const todayTasks = document.getElementById("todayTasks");


// ----------------------------
// Dark Mode Button
// ----------------------------

const darkModeBtn = document.getElementById("darkModeBtn");


// =========================
// Pie Chart
// =========================



function updatePieChart() {

    let completed = 0;
    let pending = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {
            completed++;
        } else {
            pending++;
        }

    }

    const ctx = document.getElementById("pieChart");

    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: ["Completed", "Pending"],

            datasets: [{

                data: [completed, pending],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}


// ----------------------------
// Global Variables
// ----------------------------

let tasks = [];
let editIndex = -1;

// =========================
// Chart Variables
// =========================

let pieChart = null;
let barChart = null;


// ----------------------------
// Dashboard Function
// ----------------------------

function updateDashboard() {

    let total = tasks.length;
    let completed = 0;
    let pending = 0;
    let today = 0;

    const currentDate = new Date().toISOString().split("T")[0];

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {

            completed++;

        } else {

            pending++;

        }

        if (tasks[i].dueDate === currentDate) {

            today++;

        }

    }

    totalTasks.innerText = total;
    completedTasks.innerText = completed;
    pendingTasks.innerText = pending;
    todayTasks.innerText = today;

}

console.log("TaskFlow Loaded Successfully");
// ----------------------------
// Display Tasks Function
// ----------------------------

function displayTasks() {

    taskBody.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        let status = "Pending";

        if (tasks[i].completed) {

            status = "Completed";

        }

        let row = `

        <tr>

            <td>
                <input type="checkbox" class="task-check" data-index="${i}" ${tasks[i].completed ? "checked" : ""}>
            </td>

             <td class="${tasks[i].completed ? "completed-task" : ""}">
    ${tasks[i].task}
</td>

            <td>${tasks[i].category}</td>

             <td>
    <span class="${tasks[i].priority.toLowerCase()}">
        ${tasks[i].priority}
    </span>
</td>

            <td>${tasks[i].dueDate}</td>

             <td>
                <span class="status ${tasks[i].completed ? "completed" : "pending"}">
                    ${status}
                </span>
            </td>

            <td>

                <button class="edit-btn" data-index="${i}">Edit</button>

                <button class="delete-btn" data-index="${i}">Delete</button>

            </td>

        </tr>

        `;

        taskBody.innerHTML += row;

    }

    updateDashboard();

    saveTasks();

    addDeleteEvents();

    addCheckboxEvents();

    addEditEvents();

    updatePieChart();

    updateBarChart();
}


// ----------------------------
// Add Task Button
// ----------------------------

addTaskButton.addEventListener("click", function () {

    const task = taskInput.value.trim();

    const category = categoryInput.value;

    const priority = priorityInput.value;

    const dueDate = dueDateInput.value;

    if (task === "" || dueDate === "") {

        alert("Please fill all required fields.");

        return;

    }

    const taskObject = {

        task: task,

        category: category,

        priority: priority,

        dueDate: dueDate,

        completed: false

    };


    if (editIndex === -1) {

        tasks.push(taskObject);

    }

    else {

        taskObject.completed = tasks[editIndex].completed;

        tasks[editIndex] = taskObject;

        editIndex = -1;

        addTaskButton.innerText = "Add Task";

    }

    displayTasks();

    taskInput.value = "";

    dueDateInput.value = "";

});
// ----------------------------
// Delete Function
// ----------------------------

function addDeleteEvents() {

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = this.dataset.index;
            let confirmDelete = confirm("Are you sure you want to delete this task?");

            if (confirmDelete) {

                tasks.splice(index, 1);

                displayTasks();

            }

        });

    });

}


// ----------------------------
// Checkbox Function
// ----------------------------

function addCheckboxEvents() {

    const checkboxes = document.querySelectorAll(".task-check");

    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            const index = this.dataset.index;

            tasks[index].completed = this.checked;

            displayTasks();

        });

    });

}
// ----------------------------
// Edit Function
// ----------------------------

function addEditEvents() {

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = this.dataset.index;

            taskInput.value = tasks[index].task;

            categoryInput.value = tasks[index].category;

            priorityInput.value = tasks[index].priority;

            dueDateInput.value = tasks[index].dueDate;

            editIndex = index;

            addTaskButton.innerText = "Update Task";

        });

    });

}
// ----------------------------
// Save Tasks
// ----------------------------

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// ----------------------------
// Load Tasks
// ----------------------------

function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks != null) {

        tasks = JSON.parse(savedTasks);

        displayTasks();

    }

}

loadTasks();


// ----------------------------
// Search Task
// ----------------------------

searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();

    const rows = taskBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const taskName = rows[i].cells[1].innerText.toLowerCase();

        if (taskName.indexOf(filter) > -1) {

            rows[i].style.display = "";

        }

        else {

            rows[i].style.display = "none";

        }

    }

});
// =========================
// Dark Mode
// =========================

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});
// =========================
// PIE CHART
// =========================

function updatePieChart() {

    let completed = 0;
    let pending = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {
            completed++;
        }
        else {
            pending++;
        }

    }

    const ctx = document.getElementById("pieChart");

    if (pieChart != null) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: ["Completed", "Pending"],

            datasets: [{

                data: [completed, pending],

                backgroundColor: [

                    "#22c55e",
                    "#ef4444"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// =========================
// WEEKLY BAR CHART
// =========================

function updateBarChart() {

    let days = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].dueDate != "") {

            let date = new Date(tasks[i].dueDate);

            let day = date.getDay();

            days[day]++;

        }

    }

    const ctx = document.getElementById("barChart");

    if (barChart != null) {

        barChart.destroy();

    }

    barChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],

            datasets: [{

                label: "Tasks",

                data: days

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 1

                    }

                }

            }

        }

    });

}