import { v4 as uuidv4 } from "uuid";
import { Storage } from "./storage";

export class ToDoTask {
  constructor(data) {
    this.id = uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.priority = data.priority;
    this.completed = data.completed;
  }

  completeToDo() {
    this.completed = this.completed ? false : true;
  }
}
export const toDoList = Storage.loadTasks();

export function createTask(data) {
  const newTask = new ToDoTask(data);
  toDoList.push(newTask);

  Storage.saveTasks(toDoList);
}

export function toggleComplete(id) {
  const toDo = toDoList.find((task) => task.id === id);
  toDo.completeToDo();
  Storage.saveTasks(toDoList);
}

export function deleteTask(id) {
  toDoList.splice(
    toDoList.indexOf(toDoList.filter((task) => task.id === id)),
    1
  );
  Storage.saveTasks(toDoList);
}
