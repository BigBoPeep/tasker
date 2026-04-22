import { useSignals } from "@preact/signals-react/runtime";
import { useState, useMemo } from "react";
import { tasksByProject, tasks, settings } from "../modules/store";
import TaskControls from "./TaskControls";
import TaskEntry from "./TaskEntry";

export default function TaskList({ className, projectID }) {
  useSignals();

  const tasksToShow = useMemo(() => {
    const filtered =
      tasksByProject.value[projectID]?.filter((task) =>
        settings.value.filters.some((filt) => task[filt]),
      ) ?? [];

    const { sortBy, sortOrder } = settings.value;
    if (sortOrder === "random")
      return [...filtered].sort(() => Math.random() - 0.5);

    const sorted = [...filtered].sort((a, b) => {
      switch (settings.value.sortBy) {
        case "created":
          return new Date(a.created) - new Date(b.created);
        case "deadline":
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        case "completed":
          if (!a.completed && !b.completed) return 0;
          if (!a.completed) return -1;
          if (!b.completed) return 1;
          return new Date(a.completed) - new Date(b.completed);
        case "overdue":
          if (a.overdue === b.overdue)
            return new Date(a.deadline) - new Date(b.deadline);
          return a.overdue ? -1 : 1;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return sortOrder === "descending" ? sorted.reverse() : sorted;
  }, [tasks.value, settings.value]);

  return (
    <div className={`overflow-hidden flex flex-col gap-2 grow ${className}`}>
      <TaskControls />

      <div className="pr-4 flex flex-col gap-2 grow max-h-full overflow-y-auto">
        {tasksToShow.map((task) => (
          <TaskEntry key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
