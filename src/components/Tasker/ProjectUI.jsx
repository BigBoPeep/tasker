import "./ProjectUI.css";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";

export default function ProjectUI({
  workspaces,
  selectedProjID,
  selectedWsID,
}) {
  let project = null;
  if (selectedWsID && selectedProjID) {
    const ws = workspaces.get(selectedWsID);
    project = ws.projects.get(selectedProjID);
  }

  if (!project)
    return <div className="projectui-loading">No Project Selected</div>;

  return (
    <div className="projectui">
      <div className="title-bar">
        {project.title}
        <button>
          <SquarePen />
        </button>
      </div>
      <div className="deadline">
        {`Due: `}
        <span>{format(project.deadline, `EEE, MMM do ''yy 'at' h:mmaaa`)}</span>
      </div>
      <div className="desc">{project.desc}</div>
      <div className="created">
        {`Created: `}
        <span>{format(project.created, `MM/dd/yyyy h:mmaaa`)}</span>
      </div>
    </div>
  );
}
