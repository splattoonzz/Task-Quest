// Initialize task and XP data
let userTasks = [];
let xp = 0;
let questsCompleted = 0;
let level = 1; // Start level at 1
const XP_TO_LEVEL_UP = 25;

// Get references to elements
const rollButton = document.getElementById('roll-btn');
const taskOutput = document.getElementById('task-output');
const addTaskButton = document.getElementById('add-task-btn');
const userTaskInput = document.getElementById('user-task');
const xpBar = document.getElementById('xp-bar');
const xpText = document.getElementById('xp-text');
const levelText = document.getElementById('level-text'); // Level text display
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
        userTasks.push(task);  // Add task to the array
        userTaskInput.value = '';  // Clear input field
        updateTaskList();  // Update the task list display
        taskOutput.textContent = `You added: ${task}`;  // Show the task added
    } else {
        taskOutput.textContent = "Please enter a valid task.";  // Show a message if input is empty
    }
}

// Function to update the task list on the UI
function updateTaskList() {
    taskList.innerHTML = ''; // Clear the list
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
    userTasks.splice(index, 1);  // Remove the task from the array
    updateTaskList();  // Update the task list display
}

// Function to handle quest completion
function completeQuest() {
    if (questsCompleted < XP_TO_LEVEL_UP) {
        xp += 1;  // Increase XP by 1 for each quest completed
        questsCompleted += 1;
    }

    if (xp >= XP_TO_LEVEL_UP) {
        xp = 0;  // Reset XP
        questsCompleted = 0;  // Reset quest count
        level += 1;  // Increment level by 1
        alert("Congratulations! You've leveled up!");
    }

    updateXPBar();  // Update the XP bar and text
    updateLevelText();  // Update the level text
}

// Function to update the XP bar display
function updateXPBar() {
    xpBar.style.width = (xp / XP_TO_LEVEL_UP) * 100 + '%';  // Set the XP bar width
    xpText.textContent = `XP: ${xp} / ${XP_TO_LEVEL_UP}`;  // Update the XP text
}

// Function to update the level text
function updateLevelText() {
    levelText.textContent = `Level: ${level}`;  // Display current level
}

// Event listeners
rollButton.addEventListener('click', rollTask);
addTaskButton.addEventListener('click', addUserTask);
completeQuestButton.addEventListener('click', completeQuest);
