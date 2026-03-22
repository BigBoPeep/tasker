import "./Tasker.css";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
import { openDB } from "idb";
import { Workspace, Project, Task } from "./taskerUtil";
import { useToast } from "../ToastContext/ToastContext";
import WorkspaceUI from "./WorkspaceUI";
import ProjectUI from "./ProjectUI";

const DB_VERSION = 1;
const DB_NAME = "tasker-db";

export default function Tasker() {
  enableMapSet();
  const [loaded, setLoaded] = useState(false);
  const [workspaces, updateWorkspaces] = useImmer(new Map());
  const [projects, updateProjects] = useImmer(new Map());
  const [tasks, updateTasks] = useImmer(new Map());
  const [selectedProject, setSelectedProject] = useState(null);
  const [db, setDB] = useState(null);
  const notify = useToast();

  if (!db) {
    openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("workspaces", { keyPath: "id" });
        db.createObjectStore("projects", { keyPath: "id" });
        db.createObjectStore("tasks", { keyPath: "id" });
        db.createObjectStore("settings");
      },
    }).then((dbi) => {
      setDB(dbi);
    });
  } else {
    Promise.all([
      db.getAll("workspaces"),
      db.getAll("projects"),
      db.getAll("tasks"),
      db.getAll("settings"),
    ]).then((loaded) => {
      updateWorkspaces(
        (draft) =>
          (draft = new Map(loaded[0].map((w) => [w.id, new Workspace(w)]))),
      );
      updateProjects(
        (draft) =>
          (draft = new Map(loaded[1].map((p) => [p.id, new Project(p)]))),
      );
      updateTasks(
        (draft) => (draft = new Map(loaded[2].map((t) => [t.id, new Task(t)]))),
      );
      setLoaded(true);
    });
  }

  if (!loaded) return <div className="loading">Loading Tasker...</div>;

  return (
    <div className="tasker">
      <div className="sidebar">
        <img src="/logo.webp" alt="Tasker Logo" className="logo" />
        <button>Settings</button>
        <WorkspaceUI
          workspaces={workspaces}
          projects={projects}
          onAdd={(info) => handleAdd(info)}
          onDelete={(info) => handleDelete(info)}
          onUpdate={(info) => handleUpdate(info)}
          onSelectProject={setSelectedProject}
        />
      </div>
      <div className="content">
        <ProjectUI selectedProject={selectedProject} tasks={tasks} />
      </div>
      <footer>Copyright © 2026 Lane Robey</footer>
    </div>
  );

  function handleAdd(data = { type }) {
    switch (data.type) {
      case "workspace": {
        const newWS = new Workspace(data);
        db.put("workspaces", newWS.toObject()).then(
          updateWorkspaces((draft) => draft.set(newWS.id, newWS)),
        );
        break;
      }
      case "project": {
        const workspace = workspaces.get(data.workspaceID);
        const newProj = new Project(data);
        workspace.projectIDs.push(newProj.id);
        const trans = db.transaction(["workspaces", "projects"], "readwrite");
        Promise.all([
          trans.objectStore("projects").put(newProj.toObject()),
          trans.objectStore("workspaces").put(workspace.toObject()),
          trans.done,
        ]).then(updateProjects((draft) => draft.set(newProj.id, newProj)));
        break;
      }
      case "task": {
        const project = projects.get(data.projectID);
        const newTask = new Task(data);
        project.taskIDs.push(newTask.id);
        const trans = db.transaction(["projects", "tasks"], "readwrite");
        Promise.all([
          trans.objectStore("tasks").put(newTask.toObject()),
          trans.objectStore("projects").put(project.toObject()),
          trans.done,
        ]).then(updateTasks((draft) => draft.set(newTask.id, newTask)));
        break;
      }
    }
  }
  function handleDelete(type, id) {}
  function handleUpdate(type, data) {}
}
