// Load saved data or use defaults
let userTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
let xp = parseInt(localStorage.getItem('xp')) || 0;
let questsCompleted = parseInt(localStorage.getItem('questsCompleted')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;

const XP_TO_LEVEL_UP = 25;

// Get references
const rollButton = document.getElementById('roll-btn');
const taskOutput = document.getElementById('task-output');
const addTaskButton = document.getElementById('add-task-btn');
const userTaskInput = document.getElementById('user-task');
const xpBar = document.getElementById('xp-bar');
const xpText = document.getElementById('xp-text');
const levelText = document.getElementById('level-text');
const completeQuestButton = document.getElementById('complete-quest-btn');
const taskList = document.getElementById('task-list');
const characterSprite = document.getElementById('character-sprite');

// Roll a random task
function rollTask() {
  if (userTasks.length === 0) {
    taskOutput.textContent = "Please add some tasks first!";
    return;
  }
  const randomTask = userTasks[Math.floor(Math.random() * userTasks.length)];
  taskOutput.textContent = randomTask;
}

// Add a new task
function addUserTask() {
  const task = userTaskInput.value.trim();
  if (task) {
    userTasks.push(task);
    userTaskInput.value = '';
    updateTaskList();
    taskOutput.textContent = `You added: ${task}`;
    saveProgress();
  } else {
    taskOutput.textContent = "Please enter a valid task.";
  }
}

// Show task list
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

// Remove a task
function removeTask(index) {
  userTasks.splice(index, 1);
  updateTaskList();
  saveProgress();
}

// Complete quest
function completeQuest() {
  if (questsCompleted < XP_TO_LEVEL_UP) {
    xp += 1;
    questsCompleted += 1;
  }

  if (xp >= XP_TO_LEVEL_UP) {
    xp = 0;
    questsCompleted = 0;
    level += 1;
    alert("🎉 You've leveled up!");
  }

  updateXPBar();
  updateLevelText();
  updateCharacterSprite();
  saveProgress();
}

// XP and level display
function updateXPBar() {
  xpBar.style.width = (xp / XP_TO_LEVEL_UP) * 100 + '%';
  xpText.textContent = `XP: ${xp} / ${XP_TO_LEVEL_UP}`;
}

function updateLevelText() {
  levelText.textContent = `Level: ${level}`;
}

// Optional: Character sprite evolves with level
function updateCharacterSprite() {
  if (level >= 5) {
    characterSprite.src = 'sprites/level5.png';
  } else if (level >= 3) {
    characterSprite.src = 'sprites/level3.png';
  } else {
    characterSprite.src = 'sprites/level1.png';
  }
}

// Save all progress
function saveProgress() {
  localStorage.setItem('userTasks', JSON.stringify(userTasks));
  localStorage.setItem('xp', xp);
  localStorage.setItem('questsCompleted', questsCompleted);
  localStorage.setItem('level', level);
}

// Load everything on start
updateTaskList();
updateXPBar();
updateLevelText();
updateCharacterSprite();

// Event listeners
rollButton.addEventListener('click', rollTask);
addTaskButton.addEventListener('click', addUserTask);
completeQuestButton.addEventListener('click', completeQuest);
