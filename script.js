document.addEventListener("DOMContentLoaded", function () {
  let userTasks = JSON.parse(localStorage.getItem("userTasks")) || [];
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  let questsCompleted = parseInt(localStorage.getItem("questsCompleted")) || 0;
  let level = parseInt(localStorage.getItem("level")) || 1;

  const XP_TO_LEVEL_UP = 25;

  const addTaskBtn = document.getElementById("add-task-btn");
  const rollBtn = document.getElementById("roll-btn");
  const completeBtn = document.getElementById("complete-quest-btn");
  const userTaskInput = document.getElementById("user-task");
  const taskList = document.getElementById("task-list");
  const taskOutput = document.getElementById("task-output");
  const xpBar = document.getElementById("xp-bar");
  const xpText = document.getElementById("xp-text");
  const levelText = document.getElementById("level-text");

  function saveProgress() {
    localStorage.setItem("userTasks", JSON.stringify(userTasks));
    localStorage.setItem("xp", xp);
    localStorage.setItem("questsCompleted", questsCompleted);
    localStorage.setItem("level", level);
  }

  function updateTaskList() {
    taskList.innerHTML = "";
    userTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${task} <button onclick="removeTask(${index})">Remove</button>`;
      taskList.appendChild(li);
    });
    saveProgress();
  }

  window.removeTask = function (index) {
    userTasks.splice(index, 1);
    updateTaskList();
  };

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

  function rollTask() {
    if (userTasks.length === 0) {
      taskOutput.textContent = "Please add some tasks first!";
      return;
    }
    const randomTask = userTasks[Math.floor(Math.random() * userTasks.length)];
    taskOutput.textContent = randomTask;
  }

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

  function updateXPBar() {
    xpBar.style.width = (xp / XP_TO_LEVEL_UP) * 100 + "%";
    xpText.textContent = `XP: ${xp} / ${XP_TO_LEVEL_UP}`;
    levelText.textContent = `Level: ${level}`;
  }

  updateXPBar();
  updateTaskList();

  addTaskBtn.addEventListener("click", addUserTask);
  rollBtn.addEventListener("click", rollTask);
  completeBtn.addEventListener("click", completeQuest);

  const restartBtn = document.getElementById("restart-btn");  // Add this line to get the button reference

// Reset progress (clear all saved data)
function restartProgress() {
  localStorage.removeItem("userTasks");
  localStorage.removeItem("xp");
  localStorage.removeItem("questsCompleted");
  localStorage.removeItem("level");

  // Reset variables to their initial state
  userTasks = [];
  xp = 0;
  questsCompleted = 0;
  level = 1;

  // Update the UI after reset
  updateXPBar();
  updateTaskList();
}

// Add this event listener for the restart button
restartBtn.addEventListener("click", restartProgress);

});
