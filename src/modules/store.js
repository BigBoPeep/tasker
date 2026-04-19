import { signal, computed } from "@preact/signals-react";
import { STORE_KEY, DEFAULT_SETTINGS } from "../config";
import { Task, Project, Workspace } from "./data";

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY)) ?? {
      workspaces: {},
      projects: {},
      tasks: {},
      settings: { ...DEFAULT_SETTINGS },
    };
    if (saved.settings.schemeVer !== DEFAULT_SETTINGS.schemeVer)
      saved.settings = { ...DEFAULT_SETTINGS };
    return {
      workspaces: Object.fromEntries(
        Object.values(saved.workspaces).map((ws) => [ws.id, new Workspace(ws)]),
      ),
      projects: Object.fromEntries(
        Object.values(saved.projects).map((proj) => [
          proj.id,
          new Project(proj),
        ]),
      ),
      tasks: Object.fromEntries(
        Object.values(saved.tasks).map((tsk) => [tsk.id, new Task(tsk)]),
      ),
      settings: saved.settings,
    };
  } catch {
    return {
      workspaces: {},
      projects: {},
      tasks: {},
      settings: { ...DEFAULT_SETTINGS },
    };
  }
}

function persist() {
  localStorage.setItem(
    STORE_KEY,
    JSON.stringify({
      workspaces: workspaces.value,
      projects: projects.value,
      tasks: tasks.value,
      settings: settings.value,
    }),
  );
}

export const workspaces = signal(load().workspaces);
export const projects = signal(load().projects);
export const tasks = signal(load().tasks);
export const settings = signal(load().settings);

export const activeWorkspaceID = signal(null);
export const activeProjectID = signal(null);
export const modalState = signal(null);
export const modalVisible = signal(false);
export const sidebarOpen = signal(false);
export const toasts = signal([]);

export const activeProjects = computed(() =>
  Object.values(projects.value).filter(
    (p) => p.workspaceID === activeWorkspaceID.value,
  ),
);

export const activeTasks = computed(() =>
  Object.values(tasks.value).filter(
    (t) => t.projectID === activeProjectID.value,
  ),
);

export const projectsByWorkspace = computed(() => {
  const grouped = Object.fromEntries(
    Object.keys(workspaces.value).map((id) => [id, []]),
  );
  for (const proj of Object.values(projects.value)) {
    grouped[proj.workspaceID]?.push(proj);
  }
  return grouped;
});

export const tasksByProject = computed(() => {
  const grouped = Object.fromEntries(
    Object.keys(projects.value).map((id) => [id, []]),
  );
  for (const task of Object.values(tasks.value)) {
    grouped[task.projectID]?.push(task);
  }
  return grouped;
});

export function addTask(title, desc, deadline, completed, projectID) {
  const newTask = new Task({ title, desc, deadline, completed, projectID });
  tasks.value = {
    ...tasks.value,
    [newTask.id]: newTask,
  };
  persist();
}

export function updateTask(id, patch) {
  tasks.value = {
    ...tasks.value,
    [id]: new Task({ ...tasks.value[id], ...patch }),
  };
  persist();
}

export function deleteTask(id) {
  const tsks = { ...tasks.value };
  delete tsks[id];
  tasks.value = tsks;
  persist();
}

export function addProject(title, desc, deadline, completed, workspaceID) {
  const newProj = new Project({
    title,
    desc,
    deadline,
    completed,
    workspaceID,
  });
  projects.value = {
    ...projects.value,
    [newProj.id]: newProj,
  };
  persist();
}

export function updateProject(id, patch) {
  projects.value = {
    ...projects.value,
    [id]: new Project({ ...projects.value[id], ...patch }),
  };
  persist();
}

export function deleteProject(id) {
  if (id === activeProjectID.value) activeProjectID.value = null;
  const projs = { ...projects.value };
  delete projs[id];
  Object.keys(tasksByProject.value[id]).forEach((taskID) => deleteTask(taskID));
  projects.value = projs;
  persist();
}

export function addWorkspace(title) {
  const newWS = new Workspace({ title });
  workspaces.value = {
    ...workspaces.value,
    [newWS.id]: newWS,
  };
  persist();
}

export function updateWorkspace(id, title) {
  workspaces.value = {
    ...workspaces.value,
    [id]: new Workspace({ ...workspaces.value[id], title }),
  };
  persist();
}

export function deleteWorkspace(id) {
  const wses = { ...workspaces.value };
  delete wses[id];
  Object.keys(projectsByWorkspace.value[id]).forEach((projID) =>
    deleteProject(projID),
  );
  workspaces.value = wses;
  persist();
}

export function openModal(type, data = null) {
  modalState.value = { type, data };
  requestAnimationFrame(() => {
    modalVisible.value = true;
  });
}

export function closeModal() {
  modalVisible.value = false;
  setTimeout(() => {
    modalState.value = null;
  }, 500);
}

export function addToast(message, type = "info", duration = 3000) {
  const id = crypto.randomUUID();
  toasts.value = [...toasts.value, { id, message, type, visible: false }];
  requestAnimationFrame(() => {
    toasts.value = toasts.value.map((t) =>
      t.id === id ? { ...t, visible: true } : t,
    );
  });
  setTimeout(() => removeToast(id), duration);
}

export function removeToast(id) {
  toasts.value = toasts.value.map((t) =>
    t.id === id ? { ...t, visible: false } : t,
  );
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 300);
}
