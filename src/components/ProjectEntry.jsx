import { deleteProject, openModal } from "../modules/store";
import CompletionBadge from "./CompletionBadge";
import { Trash2 } from "lucide-react";

export default function ProjectEntry({ project, onClick }) {
  return (
    <div
      className="cursor-pointer hover:bg-(--color-overlay-1) w-full p-2
        rounded-md text-center group/pe relative"
      onClick={onClick}
    >
      {project.title}
      {project.overdue && (
        <CompletionBadge
          item={project}
          className={"absolute inset-0 w-fit h-fit my-auto ml-2"}
        />
      )}
    </div>
  );
}
