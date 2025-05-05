import { Projects } from "./project";
import { deleteTask, toDoList, toggleComplete, createTask } from "./task";

// listing all projects in form options
const listProjectOptions = (function () {
  const projectsOptions = document.querySelector("#project");
  Projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    projectsOptions.appendChild(option);
  });
})();

//collecting data from form and creating task with this data
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  createTask(data);
  printList();
});

const listEl = document.querySelector(".list");

function printProject(project) {
  const projectsEl = document.querySelector(".projects");
  const projectWrapper = document.createElement("span");
  projectWrapper.addEventListener("click", () => {
    printProjectTasks(project);
  });
  projectWrapper.className = "project-wrapper";
  projectWrapper.textContent = `# ${project}`;
  projectsEl.appendChild(projectWrapper);
}

function printTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.id = task.id;
  taskDiv.classList.add("task");
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

  const projectEl = document.createElement("p");
  projectEl.textContent = `# ${task.project}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
    printList();
  });

  taskDiv.appendChild(checkEl);
  taskDiv.appendChild(titleEl);
  taskDiv.appendChild(descriptionEl);
  taskDiv.appendChild(dateEl);
  taskDiv.appendChild(priorityEl);
  taskDiv.appendChild(projectEl);
  taskDiv.appendChild(deleteBtn);
  listEl.appendChild(taskDiv);
}

export function printList() {
  listEl.innerHTML = "";
  toDoList.forEach((task) => printTask(task));
}

export function printProjects() {
  Projects.forEach((project) => printProject(project));
}

function printProjectTasks(project) {
  const projectTasks = toDoList.filter((task) => task.project === project);
  console.log(projectTasks);
  listEl.innerHTML = "";
  projectTasks.length
    ? projectTasks.forEach((task) => printTask(task))
    : (listEl.textContent = "No tasks left");
}
