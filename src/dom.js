import { createProject, deleteProject, Projects } from "./project";
import { deleteTask, toDoList, toggleComplete, createTask } from "./task";
import {
  format,
  addDays,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  parseISO,
} from "date-fns";

const addProjectForm = (function () {
  const addProjectForm = document.querySelector(".project-add-form");
  const dialog = document.querySelector(".project-dialog");
  const openProjectBtn = document.querySelector(".open-project-btn");
  openProjectBtn.addEventListener("click", () => dialog.showModal());
  const closeProjectBtn = document.querySelector(".close-project-btn");
  closeProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
    addProjectForm.reset();
  });
  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectInput = e.target.projectInput.value;
    createProject(projectInput);
    printProjects();
    listProjectOptions();
    dialog.close();
    addProjectForm.reset();
  });
})();

const addTaskForm = (function () {
  const form = document.querySelector(".add-task-form");
  const dialog = document.querySelector(".task-dialog");
  const openTaskBtn = document.querySelector(".open-task-btn");
  const closeTaskBtn = document.querySelector(".close-task-btn");
  openTaskBtn.addEventListener("click", () => dialog.showModal());
  closeTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
    form.reset();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.projectName = Projects.find(
      (project) => project.id === data.projectId
    )?.name;
    console.log(data);
    createTask(data);
    printList();
    dialog.close();
    e.target.reset();
  });
  const dateInput = document.querySelector("#dueDate");
  const today = format(new Date(), "yyyy-MM-dd");
  dateInput.value = today;
})();

// listing all projects in form options
export const listProjectOptions = function () {
  const projectsOptions = document.querySelector("#project");
  projectsOptions.innerHTML = "";
  Projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    projectsOptions.appendChild(option);
  });
};

const listEl = document.querySelector(".list");
const projectList = document.querySelector(".project-list");

function printProject(project) {
  const projectWrap = document.createElement("div");
  projectWrap.className = "project-wrap";
  const projectEL = document.createElement("div");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  projectEL.addEventListener("click", () => {
    printProjectTasks(project);
  });
  deleteBtn.addEventListener("click", () => {
    if (project.name !== "Default") {
      deleteProject(project.id);
      printProjects();
      listProjectOptions();
      printList();
    }
  });
  projectEL.className = "project";
  projectEL.textContent = `# ${project.name}`;
  projectWrap.appendChild(projectEL);
  // you can delete any other project except default one
  project.name == "Default" ? null : projectWrap.appendChild(deleteBtn);
  projectList.appendChild(projectWrap);
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
  projectEl.textContent = `# ${task.projectName}`;

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

const initializeDateFilterList = (function () {
  function printTodayTasks() {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayTasks = toDoList.filter((task) => task.dueDate === today);
    listEl.innerHTML = "";
    todayTasks.length
      ? todayTasks.forEach((task) => printTask(task))
      : (listEl.textContent = "No tasks at the moment");
  }

  function printTomorrowTasks() {
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const tomorrowTasks = toDoList.filter((task) => task.dueDate === tomorrow);
    listEl.innerHTML = "";
    tomorrowTasks.length
      ? tomorrowTasks.forEach((task) => printTask(task))
      : (listEl.textContent = "No tasks at the moment");
  }

  function printWeekTasks() {
    const today = new Date();

    const start = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday
    const end = endOfWeek(today, { weekStartsOn: 1 });

    const isDueThisWeek = (task) => {
      const dueDate = parseISO(task.dueDate);
      return isWithinInterval(dueDate, { start, end });
    };
    const tasksThisWeek = toDoList.filter(isDueThisWeek);

    listEl.innerHTML = "";
    tasksThisWeek.length
      ? tasksThisWeek.forEach((task) => printTask(task))
      : (listEl.textContent = "No tasks at the moment");
  }

  function printExpiredTasks() {
    const today = format(new Date(), "yyyy-MM-dd");
    const expiredTasks = toDoList.filter(
      (task) => task.dueDate < today && task.completed === false
    );
    listEl.innerHTML = "";
    expiredTasks.length
      ? expiredTasks.forEach((task) => printTask(task))
      : (listEl.textContent = "No tasks at the moment");
  }

  const todayEl = document.querySelector(".today-tasks");
  todayEl.addEventListener("click", () => {
    printTodayTasks();
  });
  const tomorrowEl = document.querySelector(".tomorrow-tasks");
  tomorrowEl.addEventListener("click", () => {
    printTomorrowTasks();
  });
  const weekEl = document.querySelector(".week-tasks");
  weekEl.addEventListener("click", () => {
    printWeekTasks();
  });
  const allEl = document.querySelector(".all-tasks");
  allEl.addEventListener("click", () => {
    printList();
  });
  const expiredEl = document.querySelector(".expired-tasks");
  expiredEl.addEventListener("click", () => {
    printExpiredTasks();
  });
})();

export function printProjects() {
  projectList.innerHTML = "";
  Projects.forEach((project) => printProject(project));
}

function printProjectTasks(project) {
  const projectTasks = toDoList.filter((task) => task.projectId === project.id);
  listEl.innerHTML = "";
  projectTasks.length
    ? projectTasks.forEach((task) => printTask(task))
    : (listEl.textContent = "No tasks at the moment");
}
