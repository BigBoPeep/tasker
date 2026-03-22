import "./WorkspaceUI.css";
import React, { useRef, useState } from "react";
import { useToast } from "../ToastContext/ToastContext";
import { isValid } from "date-fns";
import {
  PenSquare,
  SquareArrowDownRight,
  Grid2x2Plus,
  SquareCheck,
  SquareX,
  CopyPlus,
} from "lucide-react";

export default function WorkspaceUI({
  workspaces,
  projects,
  onAdd,
  onDelete,
  onUpdate,
  onSelectProject,
}) {
  const notify = useToast();

  return (
    <div className="workspaceui">
      <AddDetails type={"workspace"} onAdd={onAdd} />
      {[...workspaces.values()].map((workspace) => {
        return (
          <details key={workspace.id} className="workspace-entry">
            <summary className="workspace-header">
              <SquareArrowDownRight className="marker" />
              {workspace.title}
              <button className="workspace-edit-btn">
                <PenSquare className="icon" />
              </button>
            </summary>
            {workspace.projectIDs.map((projectID) => {
              const project = projects.get(projectID);
              return (
                <button
                  key={projectID}
                  className="project-entry"
                  onClick={() => onSelectProject(project)}
                >
                  {project.title}
                </button>
              );
            })}
            <AddDetails
              type={"project"}
              onAdd={(data) => onAdd({ ...data, workspaceID: workspace.id })}
            />
          </details>
        );
      })}
    </div>
  );
}

function AddDetails({ type, onAdd }) {
  const detailsEl = useRef(null);
  const titleEl = useRef(null);
  const descEl = useRef(null);
  const deadlineEl = useRef(null);
  const formEl = useRef(null);
  const notify = useToast();

  return (
    <details className={`${type}-add`} ref={detailsEl}>
      <summary>
        {type === "workspace" && (
          <>
            <Grid2x2Plus className="marker" />
            New Workspace
          </>
        )}
        {type === "project" && (
          <>
            <CopyPlus className="marker" />
            New Project
          </>
        )}
      </summary>
      <form ref={formEl}>
        <input
          type="text"
          className={`${type}-add-title`}
          placeholder="Title"
          ref={titleEl}
        />
        <textarea
          className={`${type}-add-desc`}
          placeholder="Description"
          ref={descEl}
        />
        {type === "project" && (
          <>
            Deadline:
            <input type="datetime-local" ref={deadlineEl} />
          </>
        )}
        <div className="buttons">
          <button
            type="button"
            className={`${type}-add-cancel`}
            onClick={() => {
              formEl.current.reset();
              detailsEl.current.open = false;
            }}
          >
            <SquareX />
          </button>
          <button
            type="button"
            className={`${type}-add-submit`}
            onClick={() => {
              let data = { type };
              if (
                titleEl.current.value.length < 3 ||
                titleEl.current.value.length > 100
              ) {
                notify(`Title must be 3-100 characters long`);
                return;
              }
              if (type === "project") {
                const date = new Date(deadlineEl.current.value);
                if (!isValid(date)) {
                  notify(`Deadline is required`);
                  return;
                }
                data.deadline = date.toISOString();
              }
              formEl.current.reset();
              detailsEl.current.open = false;
              data.title = titleEl.current.value;
              data.desc = descEl.current.value;
              onAdd(data);
            }}
          >
            <SquareCheck />
          </button>
        </div>
      </form>
    </details>
  );
}
