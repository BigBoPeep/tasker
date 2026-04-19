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
import { Trash2, ChevronRight, DiamondPlus } from "lucide-react";

export default function WorkspaceEntry({ workspace }) {
  useSignals();

  return (
    <details
      className="w-full relative group/ws bg-(--color-overlay-1) 
        rounded-md"
    >
      <summary
        className="flex justify-center items-center w-full overflow-hidden
        hover:bg-(--color-overlay-2) cursor-pointer rounded-md px-1 group/sum"
      >
        <p className="p-2 px-2 mx-auto">{workspace.title}</p>
        <ChevronRight className="rotate-180 group-open/ws:rotate-135 transition-transform duration-400" />
        <div
          className="absolute flex inset-0 ml-auto mr-2 mt-2
            h-fit w-fit scale-x-0 group-hover/sum:scale-x-100 origin-right 
            transition-transform duration-300 ease-bounce"
        >
          <button
            className="opacity-50 hover:opacity-80"
            onClick={() =>
              openModal("confirm", {
                title: "Delete Workspace",
                action: () => deleteWorkspace(workspace.id),
              })
            }
          >
            <Trash2 className="size-5" />
          </button>
        </div>
      </summary>
      <div className="p-1 pb-2 flex flex-col items-center gap-2">
        <div className="w-full">
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
        <button
          onClick={() => openModal("project", { workspaceID: workspace.id })}
        >
          <DiamondPlus />
          New Project
        </button>
      </div>
    </details>
  );
}
