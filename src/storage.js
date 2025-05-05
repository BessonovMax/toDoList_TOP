export const Storage = (function () {
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const saveProjects = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const loadRawTasks = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  };

  const loadProjects = () => {
    const data = localStorage.getItem("projects");
    return data ? JSON.parse(data) : ["Default", "yoba", "MATH", "123"];
  };

  return { saveTasks, loadRawTasks, saveProjects, loadProjects };
})();
