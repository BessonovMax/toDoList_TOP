export const Storage = (function () {
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadRawTasks = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  };

  return { saveTasks, loadRawTasks };
})();
