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

export function addTask(title, desc, deadline, projectID) {
  const newTask = new Task({ title, desc, deadline, projectID });
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

export function addProject(title, desc, deadline, workspaceID) {
  const newProj = new Project({ title, desc, deadline, workspaceID });
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
  const projs = { ...projects.value };
  delete projs[id];
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
