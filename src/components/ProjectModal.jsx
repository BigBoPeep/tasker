import { useSignals } from "@preact/signals-react/runtime";
import { useSignal } from "@preact/signals-react/runtime";
import { addProject, updateProject, closeModal } from "../modules/store";
import { SquareCheckBig, OctagonX } from "lucide-react";
import Tooltip from "./Tooltip";
import Checkbox from "./Checkbox";
import { format, isValid } from "date-fns";
import { addToast } from "../modules/store";

export default function ProjectModal({ data }) {
  useSignals();
  const title = useSignal(data?.title ?? "");
  const desc = useSignal(data?.desc ?? "");
  const deadline = useSignal(
    format(data?.deadline || new Date(), "yyyy-MM-dd'T'HH:mm"),
  );
  const completed = useSignal(data?.completed ?? false);

  function handleSubmit() {
    if (!data?.workspaceID) return;
    if (title.value.trim().length < 3) {
      addToast("Project name must be at least three characters", "warning");
      return;
    } else if (desc.value.length > 1000) {
      addToast(
        "Project description must be less than 1000 characters",
        "warning",
      );
      return;
    } else if (!isValid(new Date(deadline.value))) {
      addToast("Project deadline required", "warning");
      return;
    }
    data.id
      ? updateProject(data.id, {
          title: title.value,
          desc: desc.value,
          deadline: new Date(deadline.value).toISOString(),
          completed: completed.value,
        })
      : addProject(
          title.value,
          desc.value,
          new Date(deadline.value).toISOString(),
          completed.value,
          data.workspaceID,
        );
    closeModal();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-(--color-pri) rounded-lg p-4 w-full flex flex-col gap-4">
        <h2>{data.id ? "Edit Project" : "New Project"}</h2>
        <input
          className="w-full"
          type="text"
          value={title.value}
          onChange={(e) => (title.value = e.target.value)}
          placeholder="Project Name"
        />
        <textarea
          className="w-full"
          value={desc.value}
          onChange={(e) => (desc.value = e.target.value)}
          placeholder="Project Description/Details"
        />
        <input
          type="datetime-local"
          value={deadline.value}
          onChange={(e) => (deadline.value = e.target.value)}
        />
        <Checkbox
          className="self-center"
          label={"Completed"}
          checked={completed.value !== false}
          onChange={() => {
            completed.value = completed.value
              ? false
              : new Date().toISOString();
          }}
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
