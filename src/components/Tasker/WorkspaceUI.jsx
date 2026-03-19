import "./WorkspaceUI.css";
import React from "react";
import { useImmer } from "use-immer";
import { PenSquare, SquareArrowDownRight, Grid2x2Plus } from "lucide-react";

export default function WorkspaceUI({ workspaces, onProjSelected }) {
  return (
    <div className="workspaceui">
      <button className="ws-new-btn">
        <Grid2x2Plus className="icon" />
        New Workspace
      </button>
      {Array.from(workspaces.values()).map((ws) => {
        return (
          <details key={ws.id} className="ws-entry">
            <summary className="ws-header">
              <SquareArrowDownRight className="marker" />
              {ws.title}
              <button className="ws-edit-btn">
                <PenSquare className="icon" />
              </button>
            </summary>
            {Array.from(ws.projects.values()).map((proj) => {
              return (
                <button
                  key={proj.id}
                  className="proj-entry"
                  onClick={() => {
                    onProjSelected(ws.id, proj.id);
                  }}
                >
                  {proj.title}
                </button>
              );
            })}
          </details>
        );
      })}
    </div>
  );
}
