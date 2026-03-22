import { openDB } from "idb";
import { Task, Project, Workspace } from "./taskerUtil";

const DB_NAME = "tasker-db";
const DB_VERSION = 1;

class Tasker {
  constructor() {
    this.db = null;
    this.workspaces = {};
    this.projects = {};
    this.tasks = {};
    this._version = 0;
    this._listeners = new Set();
  }

  async init() {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("workspaces", { keyPath: "id" });
        db.createObjectStore("projects", { keyPath: "id" });
        db.createObjectStore("tasks", { keyPath: "id" });
      },
    });

    const [workspaces, projects, tasks] = await Promise.all([
      this.db.getAll("workspaces"),
      this.db.getAll("projects"),
      this.db.getAll("tasks"),
    ]);

    this.workspaces = Object.fromEntries(
      workspaces.map((w) => [w.id, new Workspace(w)]),
    );
    this.projects = Object.fromEntries(
      projects.map((p) => [p.id, new Project(p)]),
    );
    this.tasks = Object.fromEntries(tasks.map((t) => [t.id, new Task(t)]));
  }

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _notify() {
    this._version++;
    this._listeners.forEach((fn) => fn());
    console.log(
      "notify version: ",
      this._version,
      "listeners: ",
      this._listeners.size,
    );
  }

  async addWorkspace(data) {
    const workspace = new Workspace(data);
    await this.db.put("workspaces", workspace.toObject());
    this.workspaces[workspace.id] = workspace;
    this._notify();
    return workspace;
  }

  async updateWorkspace(id, changes) {
    const workspace = this.workspaces[id];
    Object.assign(workspace, changes);
    await this.db.put("workspaces", workspace.toObject());
    this._notify();
  }

  async deleteWorkspace(id) {
    const workspace = this.workspaces[id];
    for (const projectID of [...workspace.projectIDs]) {
      await this._deleteProjectCascade(projectID);
    }
    await this.db.delete("workspaces", id);
    delete this.workspaces[id];
    this._notify();
  }

  async addProject(workspaceID, data) {
    const project = new Project(data);
    const workspace = this.workspaces[workspaceID];
    workspace.projectIDs.push(project.id);
    const trans = this.db.transaction(["workspaces", "projects"], "readwrite");
    await Promise.all([
      trans.objectStore("projects").put(project.toObject()),
      trans.objectStore("workspaces").put(workspace.toObject()),
      trans.done,
    ]);
    this.projects[project.id] = project;
    this._notify();
    return project;
  }

  async updateProject(id, changes) {
    const project = this.projects[id];
    Object.assign(project, changes);
    await this.db.put("projects", project.toObject());
    this._notify();
  }

  async deleteProject(workspaceID, projectID) {
    const workspace = this.workspaces[workspaceID];
    workspace.projectIDs = workspace.projectIDs.filter(
      (id) => id !== projectID,
    );
    await this._deleteProjectCascade(projectID);
    await this.db.put("workspaces", workspace.toObject());
    this._notify();
  }

  async _deleteProjectCascade(projectID) {
    const project = this.projects[projectID];
    if (!project) return;
    const trans = this.db.transaction(["projects", "tasks"], "readwrite");
    const taskStore = trans.objectStore("tasks");
    await Promise.all([
      ...project.taskIDs.map((taskID) => taskStore.delete(taskID)),
      trans.objectStore("projects").delete(projectID),
      trans.done,
    ]);
    project.taskIDs.forEach((taskID) => delete this.tasks[taskID]);
    delete this.projects[projectID];
  }

  async addTask(projectID, data) {
    const task = new Task(data);
    const project = this.projects[projectID];
    project.taskIDs.push(task.id);
    const trans = this.db.transaction(["projects", "tasks"], "readwrite");
    await Promise.all([
      trans.objectStore("tasks").put(task.toObject()),
      trans.objectStore("projects").put(project.toObject()),
      trans.done,
    ]);
    this.tasks[task.id] = task;
    this._notify();
    return task;
  }

  async updateTask(id, changes) {
    const task = this.tasks[id];
    Object.assign(task, changes);
    await this.db.put("tasks", task.toObject());
    this._notify();
  }

  async deleteTask(projectID, taskID) {
    const project = this.projects[projectID];
    project.taskIDs = project.taskIDs.filter((id) => id !== taskID);
    const trans = this.db.transaction(["projects", "tasks"], "readwrite");
    await Promise.all([
      trans.objectStore("tasks").delete(taskID),
      trans.objectStore("projects").put(project.toObject()),
      trans.done,
    ]);
    delete this.tasks[taskID];
    this._notify();
  }
}

export const tasker = new Tasker();
