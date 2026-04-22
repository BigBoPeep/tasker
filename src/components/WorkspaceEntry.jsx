import React from "react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  projectsByWorkspace,
  deleteWorkspace,
  openModal,
  activeProjectID,
  sidebarOpen,
} from "../modules/store";
import ProjectEntry from "./ProjectEntry";
import Tooltip from "./Tooltip";
import { Trash2, ChevronRight, DiamondPlus, PencilLine } from "lucide-react";

export default function WorkspaceEntry({ workspace }) {
  useSignals();

  return (
    <details
      className="w-full relative group/ws bg-(--color-sec) 
        rounded-md"
    >
      <summary
        className="flex justify-center items-center w-full overflow-hidden relative
        hover:bg-(--color-overlay-1) cursor-pointer rounded-md px-1 group/sum"
      >
        <p className="p-2 px-2 mx-auto">{workspace.title}</p>
        <ChevronRight className="rotate-180 group-open/ws:rotate-135 transition-transform duration-400" />
      </summary>
      <div className="p-1 pb-2 flex flex-col items-center gap-2">
        <div className="w-full px-2">
          {Object.values(projectsByWorkspace.value[workspace.id]).map(
            (proj) => {
              return (
                <ProjectEntry
                  key={proj.id}
                  project={proj}
                  selected={activeProjectID.value === proj.id}
                  onClick={() => {
                    activeProjectID.value = proj.id;
                    sidebarOpen.value = false;
                  }}
                />
              );
            },
          )}
        </div>
        <div className="flex gap-4 my-1">
          <Tooltip content={"Edit Workspace"}>
            <button
              onClick={() =>
                openModal("workspace", {
                  id: workspace.id,
                  title: workspace.title,
                })
              }
            >
              <PencilLine />
            </button>
          </Tooltip>
          <Tooltip content={"Delete Workspace"}>
            <button
              onClick={() =>
                openModal("confirm", {
                  title: "Delete Workspace",
                  action: () => deleteWorkspace(workspace.id),
                })
              }
            >
              <Trash2 />
            </button>
          </Tooltip>
          <Tooltip content={"New Project"}>
            <button
              onClick={() =>
                openModal("project", { workspaceID: workspace.id })
              }
            >
              <DiamondPlus />
            </button>
          </Tooltip>
        </div>
      </div>
    </details>
  );
}
