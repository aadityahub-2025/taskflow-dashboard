document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const dateDisplay = document.getElementById('date-display');

    // Display current date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Initialize
    renderTasks();

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    clearCompletedBtn.addEventListener('click', clearCompleted);

    // Functions
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        const newTask = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        saveAndRender();
        taskInput.value = '';
        taskInput.focus();
    }

    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveAndRender();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    }

    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveAndRender();
    }

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        
        let incompleteCount = 0;

        tasks.forEach(task => {
            if (!task.completed) incompleteCount++;

            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-content" data-id="${task.id}">
                    <div class="checkbox">
                        <i class="ph ph-check"></i>
                    </div>
                    <span class="task-text">${escapeHTML(task.text)}</span>
                </div>
                <button class="delete-btn" data-id="${task.id}" aria-label="Delete task">
                    <i class="ph ph-trash"></i>
                </button>
            `;

            taskList.appendChild(li);
        });

        // Add event listeners to dynamically created elements
        document.querySelectorAll('.task-content').forEach(content => {
            content.addEventListener('click', () => toggleTask(content.getAttribute('data-id')));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(btn.getAttribute('data-id'));
            });
        });

        // Update count
        taskCount.textContent = `${incompleteCount} task${incompleteCount !== 1 ? 's' : ''} left`;
    }

    // Utility to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
