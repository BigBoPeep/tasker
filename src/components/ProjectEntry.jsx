import { Trash2 } from "lucide-react";
import { deleteProject, openModal } from "../modules/store";

export default function ProjectEntry({ project, onClick }) {
  return (
    <div
      className="cursor-pointer hover:bg-(--color-overlay-1) w-full p-1 px-2
        rounded-md text-center group/pe relative"
      onClick={onClick}
    >
      {project.title}
      <div
        className="absolute origin-right scale-x-0 group-hover/pe:scale-x-100 
          flex inset-0 ml-auto mr-2 w-fit h-fit my-auto transition-transform 
          duration-300 ease-bounce"
      >
        <button
          className="opacity-50 hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            openModal("confirm", {
              title: "Delete Project",
              action: () => deleteProject(project.id),
            });
          }}
        >
          <Trash2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
