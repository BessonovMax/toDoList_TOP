import { ToDoTask } from "./task";

export const Storage = (function () {
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const data = localStorage.getItem("tasks");
    const rawTasks = data ? JSON.parse(data) : [];
    console.log(rawTasks);
    return rawTasks.map((taskData) => new ToDoTask(taskData));
  };

  return { saveTasks, loadTasks };
})();
