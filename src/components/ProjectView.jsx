import { useSignals } from "@preact/signals-react/runtime";
import { format, formatDistanceToNow } from "date-fns";
import {
  activeProjectID,
  projects,
  tasksByProject,
  settings,
  openModal,
  deleteProject,
} from "../modules/store";
import { Trash2, PencilLine } from "lucide-react";
import Tooltip from "./Tooltip";
import TaskList from "./TaskList";
import CompletionBadge from "./CompletionBadge";

export default function ProjectView() {
  useSignals();
  const project = projects.value[activeProjectID.value];

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="w-full border-b p-2 px-4 border-(--color-text)/20 bg-(--color-sec)">
        <div className="flex justify-between items-center">
          <span className="text-(--color-brand) text-3 font-bold">
            {project?.title}
          </span>
          <CompletionBadge item={project} className={"size-10"} />
        </div>
        <div className="font-semibold">
          <span className="italic font-normal">{"Due: "}</span>
          {format(
            project?.deadline || new Date(),
            settings.value.dateFormatDue,
          )}
        </div>
        <div className="leading-tight h-15 font-normal">{project?.desc}</div>
        <div className="italic text--1 flex justify-between items-center">
          <p className="text--1">
            <span className="text--1">{"Created: "}</span>
            {format(
              project?.created || new Date(),
              settings.value.dateFormatCreated,
            )}
          </p>
          <div className="flex gap-4">
            <Tooltip content={"Edit Project"}>
              <button onClick={() => openModal("project", { ...project })}>
                <PencilLine />
              </button>
            </Tooltip>
            <Tooltip content={"Delete Project"}>
              <button
                onClick={() =>
                  openModal("confirm", {
                    title: "Delete Project",
                    action: () => deleteProject(project.id),
                  })
                }
              >
                <Trash2 />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <TaskList className={"p-2"} projectID={activeProjectID.value} />
    </div>
  );
}
