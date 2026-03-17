import React, { useState, useEffect, useRef } from "react";
import "./WorkspaceUI.css";
import { useToast } from "../ToastContext/ToastContext";
import {
  SquareX,
  SquarePen,
  CircleArrowRight,
  SquareCheck,
  CirclePlus,
} from "lucide-react";

export default function WorkspaceUI({ tasker, onSelectProj, onOpenAddProj }) {
  const [workspaces, setWorkspaces] = useState(
    Array.from(tasker.workspaces.values()),
  );
  const [addWSOpen, setAddWSOpen] = useState(false);
  const [editWSOpen, setEditWS] = useState(false);

  return (
    <div className="tasker-workspaceui">
      <button
        className="workspaceui-wsadd-btn"
        onClick={() => {
          setAddWSOpen(true);
        }}
      >
        New Workspace
      </button>
      {workspaces.map((ws) => {
        return (
          <details className="workspaceui-wsentry" key={ws.id} wsid={ws.id}>
            <summary className="wsentry-header">
              <CircleArrowRight className="entry-marker" />
              {ws.title}
              <button
                className="workspaceui-edit-btn"
                onClick={() => {
                  setEditWS(ws);
                }}
              >
                <SquarePen />
              </button>
            </summary>
            {Array.from(ws.projects.values()).map((proj) => {
              return (
                <button
                  className="wsentry-projentry"
                  key={proj.id}
                  projid={proj.id}
                  onClick={() => onSelectProj(proj)}
                >
                  {proj.title}
                </button>
              );
            })}
            <button className="wsentry-addproj-btn" onClick={onOpenAddProj}>
              <CirclePlus />
              New Project
            </button>
          </details>
        );
      })}
      <WorkspaceUIAdd
        tasker={tasker}
        open={addWSOpen}
        onClose={() => setAddWSOpen(false)}
        onAddWS={handleAddWS}
      />
      <WorkspaceUIEdit
        tasker={tasker}
        open={editWSOpen}
        onClose={() => setEditWS(false)}
        onEditWS={handleEditWS}
      />
    </div>
  );

  function handleAddWS() {
    setWorkspaces(Array.from(tasker.workspaces.values()));
  }

  function handleEditWS() {
    setWorkspaces(Array.from(tasker.workspaces.values()));
  }
}

function WorkspaceUIEdit({ tasker, open, onEditWS, onClose }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const notify = useToast();

  useEffect(() => {
    if (open) {
      titleRef.current.value = open.title;
      descRef.current.value = open.desc;
    }
  }, [open]);

  return (
    <div className={`workspaceui-edit${open ? " open" : ""}`}>
      <div className="wsedit-titlebar">
        Edit Workspace
        <button type="button" className="close" onClick={onClose}>
          <SquareX />
        </button>
      </div>
      <form action="">
        <input
          ref={titleRef}
          id="wsedit-title"
          name="wsedit-title"
          placeholder="Workspace Title"
        />
        <input
          ref={descRef}
          id="wsedit-desc"
          name="wsedit-desc"
          placeholder="Workspace Description"
        />
      </form>
      <button type="button" className="submit" onClick={handleSubmit}>
        <SquareCheck />
      </button>
    </div>
  );

  function handleSubmit() {
    if (
      titleRef.current.value.length < 3 ||
      titleRef.current.value.length > 100
    ) {
      notify("Title must be 3-100 characters long.");
    } else {
      try {
        open.title = titleRef.current.value;
        open.desc = descRef.current.value;
        tasker.addWorkspace(open);
        onEditWS();
        onClose();
      } catch (error) {
        notify(error);
      }
    }
  }
}

function WorkspaceUIAdd({ tasker, open, onClose, onAddWS }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const notify = useToast();

  useEffect(() => {
    if (open) {
      titleRef.current.value = "";
      descRef.current.value = "";
    }
  }, [open]);

  function handleSubmit() {
    const titleLength = titleRef.current.value.length;
    if (titleLength < 3 || titleLength > 100) {
      notify("Title must be 3-100 characters long.");
    } else {
      const result = tasker.addWorkspace({
        title: titleRef.current.value,
        desc: descRef.current.value || "",
      });
      if (result === true) {
        onAddWS();
        onClose();
      } else notify(result);
    }
  }

  return (
    <div className={`workspaceui-addws${open ? ` open` : ""}`}>
      <div className="wsadd-titlebar">
        Create Workspace
        <button className="close" onClick={onClose}>
          <SquareX />
        </button>
      </div>
      <form action="">
        <input
          type="text"
          name="wsadd-title"
          id="wsadd-title"
          placeholder="Workspace Title"
          ref={titleRef}
        />
        <input
          type="text"
          name="wsadd-desc"
          id="wsadd-desc"
          placeholder="Workspace Description"
          ref={descRef}
        />
      </form>
      <button type="button" className="submit" onClick={handleSubmit}>
        <SquareCheck />
      </button>
    </div>
  );
}
