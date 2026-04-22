import { settings } from "../modules/store";
import { formatDistanceToNow, format } from "date-fns";
import Tooltip from "./Tooltip";
import { BadgeAlert, BadgeInfo, BadgeCheck } from "lucide-react";

export default function CompletionBadge({ item }) {
  return item?.overdue ? (
    <Tooltip content={`Overdue by ${formatDistanceToNow(item.deadline)}`}>
      <div
        className="flex justify-center items-center p-[2px] rounded-full bg-(--color-overdue)/50 
          opacity-60"
      >
        <BadgeAlert />
      </div>
    </Tooltip>
  ) : item?.completed === false ? (
    <div
      className="flex justify-center items-center p-[2px] rounded-full bg-(--color-inProgress)/50 
        opacity-60"
    >
      <Tooltip content={"In Progress..."}>
        <BadgeInfo />
      </Tooltip>
    </div>
  ) : (
    <div
      className="flex justify-center items-center p-[2px] rounded-full bg-(--color-completed)/50 
        opacity-60"
    >
      <Tooltip
        content={`Completed on ${format(
          item?.completed || new Date(),
          settings.value.dateFormatCompleted,
        )}`}
      >
        <BadgeCheck />
      </Tooltip>
    </div>
  );
}
