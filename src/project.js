import { Storage } from "./storage";

export const Projects = Storage.loadProjects();

export const createProject = function (name) {
  const project = name;
  project.push(project);
  Storage.saveProjects(Projects);
};
