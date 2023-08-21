// Function to fetch all tasks from the backend
async function fetchTasks() {
  try {
    const response = await axios.get("http://localhost:3000/tasks");
    const tasks = response.data;

    // Clear the list to ensure we don't have duplicate entries
    let list = document.getElementById("list");
    list.innerHTML = "";

    // Display each task in the list
    tasks.forEach((task) => {
      displayTask(task.description, task.id);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Function to display a single task in the list
function displayTask(value, taskId) {
  let list = document.getElementById("list");
  let item = document.createElement("li");
  item.classList.add("item");
  item.setAttribute("data-task-id", taskId);

  // Checkbox to mark the task as completed or not
  let checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", async function () {
    const taskId = item.getAttribute("data-task-id");
    const isChecked = checkbox.checked;

    try {
      await axios.put(`http://localhost:3000/tasks/${taskId}`, {
        completed: isChecked,
      });
    } catch (error) {
      console.error("Error updating task completion status:", error);
    }

    taskContent.classList.toggle("line-through");
  });

  // Span element to display the task's content
  let taskContent = document.createElement("span");
  taskContent.classList.add("task-content");
  taskContent.innerText = value;

  // Button to delete a task
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "Remove";
  deleteButton.addEventListener("click", async function () {
    const taskId = item.getAttribute("data-task-id");
    if (taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        console.log("Task deleted:", taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
    list.removeChild(item);
  });

  item.appendChild(checkbox);
  item.appendChild(taskContent);
  item.appendChild(deleteButton);
  list.appendChild(item);
}

// Function to create a new task in the backend and then display it in the list
async function createAndDisplayTask(value) {
  try {
    const response = await axios.post("http://localhost:3000/tasks", {
      description: value,
    });
    const task = response.data;
    displayTask(task.description, task.id);
  } catch (error) {
    console.error("Error saving task:", error);
  }
}

// Event listener for the Add button
document.getElementById("add-button").addEventListener("click", function () {
  let value = document.getElementById("task-input").value;
  if (value) {
    createAndDisplayTask(value);
    document.getElementById("task-input").value = "";
  }
});

// Event listener for pressing Enter in the input box
document
  .getElementById("task-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let value = document.getElementById("task-input").value;
      if (value) {
        createAndDisplayTask(value);
        document.getElementById("task-input").value = "";
      }
    }
  });

// Initially fetch all tasks and display them
fetchTasks();
