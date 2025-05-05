// Initialize task and XP data from localStorage or set defaults
let userTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
let xp = parseInt(localStorage.getItem('xp')) || 0;
let questsCompleted = parseInt(localStorage.getItem('questsCompleted')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
const XP_TO_LEVEL_UP = 25;

// Get references to elements
const rollButton = document.getElementById('roll-btn');
const taskOutput = document.getElementById('task-output');
const addTaskButton = document.getElementById('add-task-btn');
const userTaskInput = document.getElementById('user-task');
const xpBar = document.getElementById('xp-bar');
const xpText = document.getElementById('xp-text');
const levelText = document.getElementById('level-text');
const completeQuestButton = document.getElementById('complete-quest-btn');
const taskList = document.getElementById('task-list');

// Function to roll and choose a task randomly from user tasks
function rollTask() {
    if (userTasks.length === 0) {
        taskOutput.textContent = "Please add some tasks first!";
        return;
    }
    const randomTask = userTasks[Math.floor(Math.random() * userTasks.length)];
    taskOutput.textContent = randomTask;
}

// Function to add a user task to the list
function addUserTask() {
    const task = userTaskInput.value.trim();
    if (task) {
        userTasks.push(task);
        userTaskInput.value = '';
        updateTaskList();
        taskOutput.textContent = `You added: ${task}`;
        saveProgress(); // ✅ Save tasks
    } else {
        taskOutput.textContent = "Please enter a valid task.";
    }
}

// Function to update the task list on the UI
function updateTaskList() {
    taskList.innerHTML = '';
    userTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task} <button onclick="removeTask(${index})">Remove</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to remove a task from the list
function removeTask(index) {
    userTasks.splice(index, 1);
    updateTaskList();
    saveProgress(); // ✅ Save after removing
}

// Function to handle quest completion
function completeQuest() {
    if (questsCompleted < XP_TO_LEVEL_UP) {
        xp += 1;
        questsCompleted += 1;
    }

    if (xp >= XP_TO_LEVEL_UP) {
        xp = 0;
        questsCompleted = 0;
        level += 1;
        alert("Congratulations! You've leveled up!");
    }

    updateXPBar();
    updateLevelText();
    saveProgress(); // ✅ Save progress after XP gain
}

// Function to update the XP bar display
function updateXPBar() {
    xpBar.style.width = (xp / XP_TO_LEVEL_UP) * 100 + '%';
    xpText.textContent = `XP: ${xp} / ${XP_TO_LEVEL_UP}`;
}

// Function to update the level text
function updateLevelText() {
    levelText.textContent = `Level: ${level}`;
}

// ✅ Function to save to localStorage
function saveProgress() {
    localStorage.setItem('userTasks', JSON.stringify(userTasks));
    localStorage.setItem('xp', xp.toString());
    localStorage.setItem('questsCompleted', questsCompleted.toString());
    localStorage.setItem('level', level.toString());
}

// ✅ Load everything on first load
updateTaskList();
updateXPBar();
updateLevelText();

// Event listeners
rollButton.addEventListener('click', rollTask);
addTaskButton.addEventListener('click', addUserTask);
completeQuestButton.addEventListener('click', completeQuest);
