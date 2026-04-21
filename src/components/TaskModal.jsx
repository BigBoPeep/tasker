import { useSignals } from "@preact/signals-react/runtime";
import { useSignal } from "@preact/signals-react/runtime";
import { addTask, updateTask, closeModal, addToast } from "../modules/store";
import { SquareCheckBig, OctagonX } from "lucide-react";
import Tooltip from "./Tooltip";
import Checkbox from "./Checkbox";
import { format, isValid } from "date-fns";

export default function TaskModal({ data }) {
  useSignals();
  const title = useSignal(data?.title ?? "");
  const desc = useSignal(data?.desc ?? "");
  const deadline = useSignal(
    format(data?.deadline || new Date(), "yyyy-MM-dd'T'HH:mm"),
  );
  const completed = useSignal(data?.completed ?? false);

  function handleSubmit() {
    if (!data?.projectID) return;
    if (title.value.trim().length < 3) {
      addToast("Task name must be at least three characters", "warning");
      return;
    } else if (desc.value.length > 1000) {
      addToast("Task description must be 1000 characters or less", "warning");
      return;
    } else if (!isValid(new Date(deadline.value))) {
      addToast("Task deadline required", "warning");
      return;
    }
    data.id
      ? updateTask(data.id, {
          title: title.value,
          desc: desc.value,
          deadline: new Date(deadline.value).toISOString(),
          completed: completed.value,
        })
      : addTask(
          title.value,
          desc.value,
          new Date(deadline.value).toISOString(),
          completed.value,
          data.projectID,
        );
    closeModal();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-(--color-pri) rounded-lg p-4 w-full flex flex-col gap-4">
        <h2>{data.id ? "Edit Task" : "New Task"}</h2>
        <input
          className="w-full"
          type="text"
          value={title.value}
          onChange={(e) => (title.value = e.target.value)}
          placeholder="Task Name"
        />
        <textarea
          className="w-full"
          value={desc.value}
          onChange={(e) => (desc.value = e.target.value)}
          placeholder="Task Description/Details"
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
