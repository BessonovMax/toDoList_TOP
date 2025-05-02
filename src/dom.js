import { deleteTask, toDoList, toggleComplete } from "./task";

const listEl = document.querySelector(".list");

export function printTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.id;
  const titleEl = document.createElement("h1");
  titleEl.textContent = task.title;

  const checkEl = document.createElement("input");
  checkEl.type = "checkbox";
  checkEl.checked = task.completed;
  checkEl.addEventListener("change", () => {
    toggleComplete(task.id);
  });

  const descriptionEl = document.createElement("p");
  descriptionEl.textContent = task.description;

  const dateEl = document.createElement("p");
  dateEl.textContent = task.dueDate;

  const priorityEl = document.createElement("div");
  priorityEl.textContent = task.priority;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
    printList();
  });

  taskDiv.appendChild(titleEl);
  taskDiv.appendChild(checkEl);
  taskDiv.appendChild(descriptionEl);
  taskDiv.appendChild(dateEl);
  taskDiv.appendChild(priorityEl);
  taskDiv.appendChild(deleteBtn);
  listEl.appendChild(taskDiv);
}

export function printList() {
  listEl.innerHTML = "";
  toDoList.forEach((task) => printTask(task));
}
