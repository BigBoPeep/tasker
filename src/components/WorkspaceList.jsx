import React from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { workspaces, openModal } from "../modules/store";
import WorkspaceEntry from "./WorkspaceEntry";
import { Diamond, Plus } from "lucide-react";

export default function WorkspaceList() {
  useSignals();
  return (
    <div className="h-full w-full pt-0.5 flex flex-col gap-3 items-center overflow-hidden">
      <button
        className="gap-2 py-1.5 px-2"
        onClick={() => openModal("workspace")}
      >
        <Diamond>
          <Plus className="scale-75 origin-center" />
        </Diamond>
        New Workspace
      </button>
      <div className="h-full w-full overflow-y-auto flex flex-col gap-2 -scale-x-100">
        <div className="-scale-x-100">
          {Object.values(workspaces.value).map((ws) => {
            return <WorkspaceEntry workspace={ws} key={ws.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
