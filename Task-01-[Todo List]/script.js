document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const errorMessage = document.getElementById("errorMessage");
  
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      const filteredTasks = tasks.filter((task) => {
        if (currentFilter === "all") return true;
        return currentFilter === "active" ? !task.completed : task.completed;
      });
  
      if (filteredTasks.length === 0) {
        taskList.innerHTML = `
          <div class="empty-state">
            <p>No tasks found. Add your first task!</p>
          </div>
        `;
        return;
      }
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span class="task-text">${task.text}</span>
          <div class="task-actions">
            <button class="complete-btn" title="${task.completed ? "Mark as incomplete" : "Mark as complete"}">
              <svg viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </button>
            <button class="delete-btn" title="Delete task">
              <svg viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        `;
  
        const completeBtn = li.querySelector(".complete-btn");
        completeBtn.addEventListener("click", () => toggleComplete(index));
  
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => deleteTask(index));
  
        taskList.appendChild(li);
      });
    }
  
    function addTask() {
      const text = taskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        errorMessage.textContent = "";
        errorMessage.style.opacity = "0";
        saveTasks();
        renderTasks();
      } else {
        showError("Please enter a task before adding.");
      }
    }
  
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.opacity = "1";
      setTimeout(() => {
        errorMessage.style.opacity = "0";
      }, 3000);
    }
  
    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    addTaskBtn.addEventListener("click", addTask);
  
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask();
      }
    });
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.tab;
        renderTasks();
      });
    });
  
    // Initial render
    renderTasks();
  });