import "./TaskerUI.css";
import React, { useState, useEffect, useRef } from "react";
import { Tasker } from "../../modules/tasker/tasker";
import { useToast } from "../ToastContext/ToastContext";
import WorkspaceUI from "./WorkspaceUI";
import ProjectUI from "./ProjectUI";
import { SquareX, SquarePlus } from "lucide-react";

const testProj = {
  id: 49382881,
  title: "Project Title #1",
  desc: "A short description about Project Title #1",
  created: new Date(),
  deadline: new Date("2026-03-25T14:00Z"),
  tasks: new Map([
    [
      3245,
      {
        id: 3245,
        title: "Test Task #1",
        desc: "Another short description. This time for Test Task #1.",
        created: new Date(),
        deadline: new Date("2026-03-24T12:00Z"),
      },
    ],
    [
      4322,
      {
        id: 4322,
        title: "Test Task #2",
        desc: "Short description number whatever, for Test Task #2",
        created: new Date(),
        deadline: new Date("2026-03-22T08:00Z"),
      },
    ],
  ]),
};

export default function TaskerUI() {
  const [tasker, setTasker] = useState(null);
  const [selectedProj, setSelectedProj] = useState(testProj);
  const [addProjOpen, setAddProjOpen] = useState(false);
  const notify = useToast();

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const inst = await Tasker.init(notify);
      if (!cancelled) setTasker(inst);
    };
    init();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!tasker) return <div className="tasker-loading">Loading...</div>;

  return (
    <div className="tasker">
      <div className="tasker-sidebar">
        <img className="tasker-logo" src="/logo.webp" alt="Tasker Logo" />
        <button type="button" className="tasker-settings-btn">
          Settings
        </button>
        <WorkspaceUI
          tasker={tasker}
          onSelectProj={setSelectedProj}
          onOpenAddProj={() => setAddProjOpen(true)}
        />
      </div>
      <div className="tasker-content">
        <ProjectUI tasker={tasker} project={selectedProj} />
        <TaskUI tasker={tasker} />
      </div>
      <footer>Copyright © 2026 Lane Robey</footer>
      <AddProjectUI open={addProjOpen} onClose={() => setAddProjOpen(false)} />
    </div>
  );
}

function AddProjectUI({ open, onClose }) {
  const title = useRef(null);
  const desc = useRef(null);
  const deadline = useRef(null);

  return (
    <div className={`tasker-addproj${open ? " open" : ""}`}>
      <div className="addproj-titlebar">
        New Project
        <button onClick={onClose}>
          <SquareX />
        </button>
      </div>
      <input
        type="text"
        name="title"
        id="addproj-input-title"
        ref={title}
        placeholder="Title"
      />
      <input
        type="text"
        name="desc"
        id="addproj-input-desc"
        ref={desc}
        placeholder="Description"
      />
      <label>Due By</label>
      <input
        type="datetime-local"
        name="deadline"
        id="addproj-input-deadline"
        ref={deadline}
      />
      <button>
        <SquarePlus />
      </button>
    </div>
  );
}

function TaskUI({ tasker }) {
  return <div className="tasker-taskui"></div>;
}
