export class Task {
  constructor({
    id,
    title,
    desc = "",
    created,
    deadline = null,
    completed = false,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.created = created ?? new Date().toISOString();
    this.deadline = deadline;
    this.completed = completed;
  }

  toObject() {
    const { id, title, desc, created, deadline, completed } = this;
    return { id, title, desc, created, deadline, completed };
  }
}

export class Project {
  constructor({
    id,
    title,
    desc = "",
    created,
    deadline = null,
    completed = false,
    taskIDs = [],
  }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.created = created ?? new Date().toISOString();
    this.deadline = deadline;
    this.completed = completed;
    this.taskIDs = taskIDs;
  }

  toObject() {
    const { id, title, desc, created, deadline, completed, taskIDs } = this;
    return { id, title, desc, created, deadline, completed, taskIDs };
  }
}

export class Workspace {
  constructor({ id, title, desc = "", created, projectIDs = [] }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.created = created ?? new Date().toISOString();
    this.projectIDs = projectIDs;
  }

  toObject() {
    const { id, title, desc, created, projectIDs } = this;
    return { id, title, desc, created, projectIDs };
  }
}
