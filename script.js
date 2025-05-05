// Load saved data or defaults
let userTasks = JSON.parse(localStorage.getItem("userTasks")) || [];
let xp = parseInt(localStorage.getItem("xp")) || 0;
let questsCompleted = parseInt(localStorage.getItem("questsCompleted")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;

const XP_TO_LEVEL_UP = 25;

// DOM elements
const addTaskBtn = document.getElementById("add-task-btn");
const rollBtn = document.getElementById("roll-btn");
const completeBtn = document.getElementById("complete-quest-btn");
const userTaskInput = document.getElementById("user-task");
const taskList = document.getElementById("task-list");
const taskOutput = document.getElementById("task-output");
const xpBar = document.getElementById("xp-bar");
const xpText = document.getElementById("xp-text");
const levelText = document.getElementById("level-text");

// Save function
function saveProgress() {
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
  localStorage.setItem("xp", xp);
  localStorage.setItem("questsCompleted", questsCompleted);
  localStorage.setItem("level", level);
}

// Display task list
function updateTaskList() {
  taskList.innerHTML = "";
  userTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(${index})">Remove</button>`;
    taskList.appendChild(li);
  });
  saveProgress();
}

// Remove task
function removeTask(index) {
  userTasks.splice(index, 1);
  updateTaskList();
}

// Add task
function addUserTask() {
  const task = userTaskInput.value.trim();
  if (task) {
    userTasks.push(task);
    userTaskInput.value = "";
    updateTaskList();
    taskOutput.textContent = `You added: ${task}`;
  } else {
    taskOutput.textContent = "Please enter a valid task.";
  }
}

// Roll random quest
function rollTask() {
  if (userTasks.length === 0) {
    taskOutput.textContent = "Please add some tasks first!";
    return;
  }
  const randomTask = userTasks[Math.floor(Math.random() * userTasks.length)];
  taskOutput.textContent = randomTask;
}

// Complete quest + XP
function completeQuest() {
  xp += 1;
  questsCompleted += 1;

  if (questsCompleted >= XP_TO_LEVEL_UP) {
    level += 1;
    xp = 0;
    questsCompleted = 0;
    alert("🎉 You leveled up!");
  }

  updateXPBar();
  saveProgress();
}

// Update XP visuals
function updateXPBar() {
  xpBar.style.width = (xp / XP_TO_LEVEL_UP) * 100 + "%";
  xpText.textContent = `XP: ${xp} / ${XP_TO_LEVEL_UP}`;
  levelText.textContent = `Level: ${level}`;
}

// Initialize
updateXPBar();
updateTaskList();

// Event listeners
addTaskBtn.addEventListener("click", addUserTask);
rollBtn.addEventListener("click", rollTask);
completeBtn.addEventListener("click", completeQuest);

// For global access to removeTask
window.removeTask = removeTask;
