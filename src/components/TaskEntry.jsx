import { format } from "date-fns";
import { settings } from "../modules/store";
import CompletionBadge from "./CompletionBadge";

export default function TaskEntry({ task }) {
  return (
    <div
      className="flex flex-col gap-1 p-1 px-2 shadow-btn/10 rounded-md 
      hover:bg-(--color-overlay-1) transition-all cursor-pointer"
    >
      <div className="text-1 font-semibold flex justify-between items-center">
        {task.title}
        <CompletionBadge item={task} />
      </div>
      <div className="font-semibold text-0">
        <span className="italic font-normal">{"Due: "}</span>
        {format(task.deadline || new Date(), settings.value.dateFormatDue)}
      </div>
      <div className="line-clamp-2 leading-tight">{task.desc}</div>
      <div className="italic text--1">
        {"Created: "}
        {format(task.created || new Date(), settings.value.dateFormatCreated)}
      </div>
    </div>
  );
}
