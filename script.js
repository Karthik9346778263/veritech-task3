document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            priority: false,
            completed: false
        };

        saveTask(task);
        loadTasks();
        taskInput.value = "";
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <input type="checkbox" onclick="toggleCompleted(${index})" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        if (task.priority) {
            li.querySelector('span').classList.add('priority-high');
        }

        taskList.appendChild(li);
    });
}

function toggleCompleted(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
