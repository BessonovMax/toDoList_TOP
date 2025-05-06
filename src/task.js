import { v4 as uuidv4 } from "uuid";
import { Storage } from "./storage";
import { format } from "date-fns";

export class toDoTask {
  constructor(data) {
    this.id = data.id ? data.id : uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.dueDate = format(data.dueDate, "yyyy-MM-dd");
    this.priority = data.priority;
    this.projectId = data.projectId;
    this.projectName = data.projectName;
    this.completed = data.completed ? data.completed : false;
  }

  completeToDo() {
    this.completed = this.completed ? false : true;
  }
}

export const toDoList = Storage.loadRawTasks().map((raw) => new toDoTask(raw));

export function createTask(data) {
  const newTask = new toDoTask(data);
  toDoList.push(newTask);

  Storage.saveTasks(toDoList);
}

export function toggleComplete(id) {
  const toDo = toDoList.find((task) => task.id === id);
  toDo.completeToDo();
  Storage.saveTasks(toDoList);
}

export function deleteTask(id) {
  const indx = toDoList.findIndex((task) => task.id === id);
  if (indx > -1) {
    toDoList.splice(indx, 1);
    Storage.saveTasks(toDoList);
  }
}

export function deleteProjectTasks(projectId) {
  const remainingTasks = toDoList.filter(
    (task) => task.projectId !== projectId
  );
  toDoList.length = 0; // clear the original array
  toDoList.push(...remainingTasks); // repopulate with filtered tasks
  Storage.saveTasks(toDoList);
}
