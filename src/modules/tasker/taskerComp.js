export class Task {
  #id;
  #title;
  #desc;
  #created;
  #deadline;

  constructor(taskData) {
    this.#id = taskData.id || Date.now();
    this.#created = taskData.created || new Date();
    this.#deadline = taskData.deadline;
    this.#title = taskData.title;
    this.#desc = taskData.desc || "";
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(newTitle) {
    if (typeof newTitle === "string" && newTitle.length > 2) {
      this.#title = newTitle;
      return true;
    } else {
      // Error: Title too short
      return new Error("appEr");
    }
  }

  get desc() {
    return this.#desc;
  }
}

export class Project {
  #id;
  #tasks;

  constructor(projectData) {
    this.#id = projectData.id || Date.now();
    this.created = projectData.created || new Date();
    this.title = projectData.title || "";
    this.desc = projectData.desc || "";
    this.deadline = projectData.deadline || new Date() + 15; //sdfgdgf
  }
}

export class Workspace {
  #id;
  #projects;

  constructor(workspaceData) {
    this.#id = workspaceData.id || Date.now();
    this.created = workspaceData.created || new Date();
    this.title = workspaceData.title || "";
    this.desc = workspaceData.desc || "";
    this.#projects = workspaceData.projects
      ? new Map(
          workspaceData.projects.map((proj) => [proj.id, new Project(proj)]),
        )
      : new Map();
  }

  get id() {
    return this.#id;
  }

  get projects() {
    return new Map(this.#projects);
  }

  addProject(project) {
    this.#projects.set(project.id, project);
  }

  deleteProject(projectID) {
    this.#projects.delete(projectID);
  }

  toObject() {
    return {
      id: this.#id,
      created: this.created,
      title: this.title,
      desc: this.desc,
      projects: this.#projects,
    };
  }
}
