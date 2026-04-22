import { format } from "date-fns";
import { settings } from "../modules/store";
import CompletionBadge from "./CompletionBadge";

export default function TaskEntry({ task }) {
  return (
    <div
      className="flex flex-col gap-1 p-1 px-2 bg-(--color-sec) rounded-md 
      hover:bg-(--color-overlay-1) transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <span className="text-(--color-brand) text-2 font-bold">
          {task.title}
        </span>
        <CompletionBadge item={task} />
      </div>
      <div className="font-semibold">
        <span className="italic font-normal">{"Due: "}</span>
        {format(task.deadline || new Date(), settings.value.dateFormatDue)}
      </div>
      <div className="line-clamp-2 leading-tight font-normal">{task.desc}</div>
      <div className="italic text--1">
        {"Created: "}
        {format(task.created || new Date(), settings.value.dateFormatCreated)}
      </div>
    </div>
  );
}
