import DBI from "./dbi";

const CONFIG = {
  DB_NAME: "Tasker",
  VERSION: 1,
  STORES: ["prefs", "tasks", "projects", "workspaces"],
  KEYPATHS: {
    default: { autoInc: true },
    prefs: { keypath: "key", autoInc: false },
    tasks: { keypath: "id", autoInc: false },
    projects: { keypath: "id", autoInc: false },
    workspaces: { keypath: "id", autoInc: false },
  },
  INDEXES: {},
};

export const dbi = new DBI(CONFIG);
