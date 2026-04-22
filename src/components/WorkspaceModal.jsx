import { useSignals } from "@preact/signals-react/runtime";
import { useSignal } from "@preact/signals-react";
import { addWorkspace, updateWorkspace, closeModal } from "../modules/store";
import { SquareCheckBig, OctagonX } from "lucide-react";
import Tooltip from "./Tooltip";
import { addToast } from "../modules/store";

export default function WorkspaceModal({ data }) {
  useSignals();
  const title = useSignal(data?.title ?? "");

  function handleSubmit() {
    if (title.value.trim().length < 3) {
      addToast("Workspace name must be at least three characters", "warning");
      return;
    }
    data?.id
      ? updateWorkspace(data.id, title.value)
      : addWorkspace(title.value);
    closeModal();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-(--color-pri) rounded-lg p-4 w-12/12 flex flex-col gap-4">
        <h2>{data?.id ? "Edit Workspace" : "New Workspace"}</h2>
        <input
          className="w-full"
          value={title.value}
          onChange={(e) => (title.value = e.target.value)}
          placeholder="Workspace Name"
        />
        <div className="flex justify-evenly">
          <Tooltip content={"Cancel"}>
            <button onClick={closeModal}>
              <OctagonX />
            </button>
          </Tooltip>
          <Tooltip content={"Submit"}>
            <button onClick={handleSubmit}>
              <SquareCheckBig />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
