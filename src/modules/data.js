import { isPast } from "date-fns";

export class Task {
  constructor({
    title,
    desc,
    deadline,
    projectID,
    completed = false,
    id = null,
    created = null,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.deadline = deadline;
    this.projectID = projectID;
    this.completed = completed ?? false;
    this.created = created ?? new Date().toISOString();
  }

  get overdue() {
    if (this.completed === false && isPast(this.deadline)) return true;
    else return false;
  }

  get incomplete() {
    if (this.completed === false) return true;
    else return false;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      desc: this.desc,
      deadline: this.deadline,
      projectID: this.projectID,
      completed: this.completed,
      created: this.created,
    };
  }
}

export class Project {
  constructor({
    title,
    desc,
    deadline,
    workspaceID,
    completed = false,
    id = null,
    created = null,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.deadline = deadline;
    this.workspaceID = workspaceID;
    this.completed = completed ?? false;
    this.created = created ?? new Date().toISOString();
  }

  get overdue() {
    if (this.completed === false && isPast(this.deadline)) return true;
    else return false;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      desc: this.desc,
      deadline: this.deadline,
      workspaceID: this.workspaceID,
      completed: this.completed,
      created: this.created,
    };
  }
}

export class Workspace {
  constructor({ title, id = null, created = null }) {
    this.title = title;
    this.id = id ?? crypto.randomUUID();
    this.created = created ?? new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      created: this.created,
    };
  }
}
