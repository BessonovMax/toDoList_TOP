import { v4 as uuidv4 } from "uuid";
import { Storage } from "./storage";

export class toDoTask {
  constructor(data) {
    this.id = data.id ? data.id : uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.priority = data.priority;
    this.project = data.project;
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
