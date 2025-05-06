import { Storage } from "./storage";
import { v4 as uuidv4 } from "uuid";
import { deleteProjectTasks } from "./task";

export const Projects = Storage.loadProjects();

function Project(name, id) {
  return { name, id };
}

export const createProject = function (project) {
  const newProject = Project(project, uuidv4());
  Projects.push(newProject);
  Storage.saveProjects(Projects);
};

export function deleteProject(id) {
  const indx = Projects.findIndex((project) => project.id === id);
  if (indx > -1) {
    deleteProjectTasks(id);
    Projects.splice(indx, 1);
    Storage.saveProjects(Projects);
  }
}

//creates initial default project if no projects are found in local storage
if (Projects.length === 0) {
  createProject("Default");
}
