import { settings } from "../modules/store";
import { formatDistanceToNow, format } from "date-fns";
import Tooltip from "./Tooltip";
import { BadgeCheck, ClockAlert, ClockFading } from "lucide-react";

export default function CompletionBadge({ item, className }) {
  return (
    <div className={`${className}`}>
      <Tooltip
        content={
          item?.overdue
            ? `Overdue by ${formatDistanceToNow(item.deadline)}`
            : item?.completed
              ? `Completed ${format(item.completed, settings.value.dateFormatCompleted)}`
              : `In Progress...`
        }
      >
        <div
          className={`flex justify-center items-center p-[2px] rounded-full opacity-70 size-full 
              ${
                item?.overdue
                  ? "bg-(--color-overdue)/70"
                  : item?.completed
                    ? "bg-(--color-completed)/70"
                    : "bg-(--color-inProgress)/70"
              }`}
        >
          {item?.overdue ? (
            <ClockAlert className="size-full" />
          ) : item?.completed ? (
            <BadgeCheck className="size-full" />
          ) : (
            <ClockFading className="size-full" />
          )}
        </div>
      </Tooltip>
    </div>
  );
}
