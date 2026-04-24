import { useSignals } from "@preact/signals-react/runtime";
import { useSignal } from "@preact/signals-react/runtime";
import {
  addTask,
  updateTask,
  closeModal,
  addToast,
  settings,
  tasks,
} from "../modules/store";
import { format, isValid } from "date-fns";
import Tooltip from "./Tooltip";
import Checkbox from "./Checkbox";
import CompletionBadge from "./CompletionBadge";
import { SquareCheckBig, OctagonX, PencilLine } from "lucide-react";

export default function TaskModal({ data }) {
  useSignals();
  const title = useSignal(data?.title ?? "");
  const desc = useSignal(data?.desc ?? "");
  const deadline = useSignal(
    format(data?.deadline || new Date(), "yyyy-MM-dd'T'HH:mm"),
  );
  const completed = useSignal(data?.completed ?? false);
  const mode = useSignal(data?.mode ?? "view");

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
    if (mode.value === "new") closeModal();
    else mode.value = "view";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-(--color-pri) rounded-lg p-4 w-full flex flex-col gap-4">
        {mode.value === "view" ? (
          <>
            <div className="flex justify-between items-center">
              <h2
                className="text-1 font-bold text-(--color-brand) 
                max-h-15 overflow-auto"
              >
                {title}
              </h2>
              <CompletionBadge
                item={tasks.value[data.id]}
                className={"size-10"}
              />
            </div>
            <p className="py-1 p-2 rounded-md bg-(--color-sec) leading-tight">
              <span className="italic font-light">{"Due: "}</span>
              {format(deadline, settings.value.dateFormatDue)}
            </p>
            <p
              className="h-24 leading-tight overflow-y-auto bg-(--color-sec) 
                py-1 p-2 rounded-md"
            >
              {desc}
            </p>
            <div className="flex justify-evenly">
              <Tooltip content={"Close"}>
                <button onClick={closeModal}>
                  <OctagonX />
                </button>
              </Tooltip>
              <Tooltip content={"Edit Task"}>
                <button onClick={() => (mode.value = "edit")}>
                  <PencilLine />
                </button>
              </Tooltip>
            </div>
          </>
        ) : (
          <>
            <h2>{data.id ? "Edit Task" : "New Task"}</h2>
            <input
              className="w-full"
              type="text"
              value={title.value}
              onChange={(e) => (title.value = e.target.value)}
              placeholder="Task Name"
            />
            <textarea
              className="w-full leading-tight h-20"
              value={desc.value}
              onChange={(e) => (desc.value = e.target.value)}
              placeholder="Task Description/Details"
            />
            <div className="flex flex-col bg-(--color-sec) p-2 py-1 rounded-md">
              Deadline
              <input
                className="bg-(--color-pri)"
                type="datetime-local"
                value={deadline.value}
                onChange={(e) => (deadline.value = e.target.value)}
              />
            </div>
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
              <Tooltip
                content={
                  mode.value === "new" ? "Cancel New Task" : "Cancel Edit"
                }
              >
                <button
                  onClick={() => {
                    if (mode.value === "edit") mode.value = "view";
                    else closeModal();
                  }}
                >
                  <OctagonX />
                </button>
              </Tooltip>
              <Tooltip content={"Submit"}>
                <button onClick={handleSubmit}>
                  <SquareCheckBig />
                </button>
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
