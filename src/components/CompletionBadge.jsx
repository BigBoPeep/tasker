import { settings } from "../modules/store";
import { formatDistanceToNow, format } from "date-fns";
import Tooltip from "./Tooltip";
import { BadgeCheck, ClockAlert, ClockFading } from "lucide-react";

export default function CompletionBadge({ item, className }) {
  return (
    <div className={`${className}`}>
      {item?.overdue ? (
        <Tooltip content={`Overdue by ${formatDistanceToNow(item.deadline)}`}>
          <div
            className="flex justify-center items-center p-[2px] rounded-full bg-(--color-overdue)/50
            opacity-60"
          >
            <ClockAlert />
          </div>
        </Tooltip>
      ) : item?.completed === false ? (
        <Tooltip content={"In Progress..."}>
          <div
            className="flex justify-center items-center p-[2px] rounded-full bg-(--color-inProgress)/50
          opacity-60"
          >
            <ClockFading />
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          content={`Completed on ${format(
            item?.completed || new Date(),
            settings.value.dateFormatCompleted,
          )}`}
        >
          <div
            className="flex justify-center items-center p-[2px] rounded-full bg-(--color-completed)/50
          opacity-60"
          >
            <BadgeCheck />
          </div>
        </Tooltip>
      )}
    </div>
  );
}
