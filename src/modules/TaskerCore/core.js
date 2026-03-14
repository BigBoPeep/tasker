import { dbi } from "../Utils/dbi.config";

export class TaskerCore {
  #workspaces;
  #projects;
  #tasks;
  #errorHandler;

  constructor(savedData, errorHandler) {
    this.#workspaces = new Map(savedData.workspaces.map((ws) => [ws.id, ws]));
    this.#projects = new Map(savedData.projects.map((proj) => [proj.id, proj]));
    this.#tasks = new Map(savedData.tasks.map((task) => [task.id, task]));
    this.#errorHandler = errorHandler;
  }

  async init(errorHandler) {
    const savedData = {
      workspaces: await dbi.getAll("workspaces"),
      projects: await dbi.getAll("projects"),
      tasks: await dbi.getAll("tasks"),
    };

    return new TaskerCore(savedData, errorHandler);
  }

  get workspaces() {
    return new Map(this.#workspaces);
  }

  get workspacesArray() {
    return Array.from(this.#workspaces);
  }

  get projects() {
    return new Map(this.#projects);
  }

  get projectsArray() {
    return Array.from(this.#projects);
  }

  get tasks() {
    return new Map(this.#tasks);
  }

  get tasksArray() {
    return Array.from(this.#tasks);
  }

  addWorkspace(workspaceData) {}
}
