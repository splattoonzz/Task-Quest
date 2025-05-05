let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let xp = parseInt(localStorage.getItem('xp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;

const taskList = document.getElementById("taskList");
const xpBar = document.getElementById("xpBar");
const levelDisplay = document.getElementById("level");
const taskInput = document.getElementById("taskInput");

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.classList.add("task-item");
    li.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveProgress();
      renderTasks();
    });
    taskList.appendChild(li);
  });
}

// Add task
document.getElementById("addTask").addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = "";
    saveProgress();
    renderTasks();
  }
});

// Roll to choose task
document.getElementById("rollTask").addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("No tasks to choose from!");
    return;
  }
  const randomIndex = Math.floor(Math.random() * tasks.length);
  alert(`🎲 Your quest is: "${tasks[randomIndex]}"`);
});

// Complete quest (gain XP)
document.getElementById("completeQuest").addEventListener("click", () => {
  gainXP(4); // 25 tasks x 4xp = 100xp to level up
});

// XP gain and level up logic
function gainXP(amount) {
  xp += amount;
  if (xp >= 100) {
    xp -= 100;
    level++;
  }
  saveProgress();
  updateXPDisplay();
}

function updateXPDisplay() {
  xpBar.style.width = `${xp}%`;
  xpBar.textContent = `${xp} XP`;
  levelDisplay.textContent = level;
}

// Save everything
function saveProgress() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('xp', xp.toString());
  localStorage.setItem('level', level.toString());
}

// Initial load
renderTasks();
updateXPDisplay();
