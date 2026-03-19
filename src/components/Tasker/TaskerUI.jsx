import "./TaskerUI.css";
import React, { useState, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
import { Tasker } from "../../modules/tasker/tasker";
import { useToast } from "../ToastContext/ToastContext";
import WorkspaceUI from "./WorkspaceUI";
import ProjectUI from "./ProjectUI";
import TaskUI from "./TaskUI";

const testData = [
  {
    id: 2938583,
    title: "Test Workspace #1",
    desc: "A short description about Test Workspace #1 and its goal.",
    projects: new Map([
      [
        395960,
        {
          id: 395960,
          title: "Test Project #1",
          desc: "A short description about Test Project #1 and its goal.",
          created: new Date("2026-02-12T08:15Z"),
          deadline: new Date("2026-03-22T08:00Z"),
          completed: false,
          tasks: new Map([
            [
              395919,
              {
                id: 395919,
                title: "Test Task #1",
                desc: "A description about Test Task #1 and maybe how to complete it.",
                created: new Date("2026-02-12T08:25Z"),
                deadline: new Date("2026-03-30T10:00Z"),
                completed: false,
              },
            ],
            [
              465581,
              {
                id: 465581,
                title: "Test Task #2",
                desc: "A description about Test Task #2 and maybe how to complete it.",
                created: new Date("2026-02-12T18:25Z"),
                deadline: new Date("2026-03-30T11:00Z"),
                completed: true,
              },
            ],
          ]),
        },
      ],
      [
        789945,
        {
          id: 789945,
          title: "Test Project #2",
          desc: "A short description about Test Project #2 and its goal.",
          created: new Date("2026-01-12T07:15Z"),
          deadline: new Date("2026-05-22T08:00Z"),
          completed: false,
          tasks: new Map([
            [
              395919,
              {
                id: 395919,
                title: "Test Task #3",
                desc: "A description about Test Task #3 and maybe how to complete it.",
                created: new Date("2026-02-12T08:25Z"),
                deadline: new Date("2026-03-30T10:00Z"),
                completed: true,
              },
            ],
            [
              465581,
              {
                id: 465581,
                title: "Test Task #4",
                desc: "A description about Test Task #4 and maybe how to complete it.",
                created: new Date("2026-02-12T18:25Z"),
                deadline: new Date("2026-03-30T11:00Z"),
                completed: false,
              },
            ],
          ]),
        },
      ],
    ]),
  },
  {
    id: 123445,
    title: "Test Workspace #2",
    desc: "A description about Test Workspace #2.",
    projects: new Map([
      [
        994553,
        {
          id: 994553,
          title: "Test Project #3",
          desc: "A short description about Test Project #3",
          created: new Date("2026-01-12T07:15Z"),
          deadline: new Date("2026-05-22T08:00Z"),
          completed: false,
          tasks: new Map([
            [
              344456947,
              {
                id: 344456947,
                title: "Test Task #5",
                desc: "A description about Test Task #5 and maybe how to complete it.",
                created: new Date("2026-02-16T08:25Z"),
                deadline: new Date("2026-07-30T10:00Z"),
                completed: true,
              },
            ],
          ]),
        },
      ],
    ]),
  },
];

export default function TaskerUI() {
  enableMapSet();
  const [tasker, setTasker] = useState(null);
  const [workspaces, setWorkspace] = useImmer(new Map());
  const [selectedWsID, setSelectedWsID] = useState(null);
  const [selectedProjID, setSelectedProjID] = useState(null);
  const notify = useToast();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ti = await Tasker.init(notify);
      if (!cancelled) {
        setTasker(ti);
        testData.forEach((ws) => {
          setWorkspace((draft) => {
            draft.set(ws.id, ws);
          });
        });
        // setWorkspaces((draft) => {
        //   draft = tasker.workspaces;
        // });
        // setProjects((draft) => {
        //   draft = tasker.projects;
        // });
        // setTasks((draft) => {
        //   draft = tasker.tasks;
        // });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!tasker) return <div className="loading">Loading Tasker...</div>;

  return (
    <div className="tasker">
      <div className="sidebar">
        <img src="/logo.webp" alt="Tasker Logo" className="logo" />
        <button>Settings</button>
        <WorkspaceUI
          workspaces={workspaces}
          onProjSelected={handleProjSelect}
        />
      </div>
      <div className="content">
        <ProjectUI
          workspaces={workspaces}
          selectedProjID={selectedProjID}
          selectedWsID={selectedWsID}
        />
        <TaskUI
          workspaces={workspaces}
          selectedProjID={selectedProjID}
          selectedWsID={selectedWsID}
        />
      </div>
      <footer>Copyright © 2026 Lane Robey</footer>
    </div>
  );

  function handleProjSelect(workspaceID, projectID) {
    setSelectedWsID(workspaceID);
    setSelectedProjID(projectID);
  }
}
