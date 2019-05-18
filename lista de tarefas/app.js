//DEFINE UI VARIABLES
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const taskAdd = document.querySelector("#taskAdd");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load EVENT
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear task event
    clearBtn.addEventListener("click", clearTasks);
    // Filter tasks
    filter.addEventListener("keyup", filterTasks);
    // check display button
    taskInput.addEventListener("input", checkInput);
}

// Get tasks for LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement("li");
        //Add class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = "<i class='fas fa-trash'></i>";
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}
// check input
taskAdd.style.display = "none";
function checkInput() {
    if (taskInput.value != "") {
        taskAdd.style.display = "block";
    } else {
        taskAdd.style.display = "none";
    }
}

// Add Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Adicione uma Tarefa!");
    }

    // Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = "<i class='fas fa-trash'></i>";
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = "";
    taskAdd.style.display = "none";
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Você tem certeza?")) {
            // remove from the DOM
            e.target.parentElement.parentElement.remove();
            // remove from LS
            removeFromLS(e.target.parentElement.parentElement);
        }
    }
}
// remove from LS
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    //taskList.innerHTML = "";

    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTaskLS();
    // https://jsperf.com/innerhtml-vs-removechild
}

//clear tas from LS
function clearTaskLS() {
    localStorage.clear();
}
// Filter Tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
