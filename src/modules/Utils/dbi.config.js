import DBI from "./dbi";

const CONFIG = {
  DB_NAME: "Tasker",
  VERSION: 2,
  STORES: ["prefs", "tasks", "projects", "workspaces"],
  KEYPATHS: {
    default: { autoIncrement: true },
    prefs: { keyPath: "key", autoIncrement: false },
    tasks: { keyPath: "id", autoIncrement: false },
    projects: { keyPath: "id", autoIncrement: false },
    workspaces: { keyPath: "id", autoIncrement: false },
  },
  INDEXES: {},
};

export const dbi = new DBI(CONFIG);
