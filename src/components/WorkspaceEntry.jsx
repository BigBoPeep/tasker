import React from "react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  projectsByWorkspace,
  deleteWorkspace,
  openModal,
  activeProjectID,
} from "../modules/store";
import ProjectEntry from "./ProjectEntry";
import { Trash2, ChevronRight } from "lucide-react";

export default function WorkspaceEntry({ workspace }) {
  useSignals();

  return (
    <details className="w-full flex flex-col items-center relative group/ws">
      <summary
        className="flex justify-center items-center w-full overflow-hidden
        hover:bg-(--color-overlay-2) cursor-pointer rounded-md"
      >
        <ChevronRight className="group-open/ws:rotate-45 transition-transform duration-400" />
        <p className="p-2 px-2 mx-auto">{workspace.title}</p>
        <ChevronRight className="rotate-180 group-open/ws:rotate-135 transition-transform duration-400" />
        <div
          className="absolute flex items-center inset-0 my-auto ml-auto mr-2
            h-full w-fit scale-x-0 group-hover/ws:scale-x-100 origin-right 
            transition-transform duration-300"
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
      <div>
        {Object.values(projectsByWorkspace.value[workspace.id]).map((proj) => {
          return <ProjectEntry project={proj} />;
        })}
      </div>
    </details>
  );
}
