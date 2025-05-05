let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function updateXPBar() {
    const xpBar = document.getElementById("xp-bar");
    const xpPercent = (xp / 25) * 100;
    xpBar.style.width = xpPercent + "%";
    document.getElementById("level").innerText = level;
}

function completeQuest() {
    xp++;
    if (xp >= 25) {
        level++;
        xp = 0;
    }
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
    updateXPBar();
}

function addTask() {
    const input = document.getElementById("task-input");
    const task = input.value.trim();
    if (task !== "") {
        taskList.push(task);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        renderTaskList();
        input.value = "";
    }
}

function removeTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTaskList();
}

function renderTaskList() {
    const ul = document.getElementById("task-list");
    ul.innerHTML = "";
    taskList.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task;
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "❌";
        removeBtn.onclick = () => removeTask(index);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });
}

function rollTask() {
    if (taskList.length === 0) {
        alert("No tasks to choose from!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * taskList.length);
    const selectedTask = taskList[randomIndex];
    document.getElementById("rolled-task").innerText = `🎲 Today's Quest: ${selectedTask}`;
}

// On page load
renderTaskList();
updateXPBar();
