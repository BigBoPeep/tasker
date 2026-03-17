import "./ProjectUI.css";
import React from "react";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";

export default function ProjectUI({ tasker, project }) {
  return (
    <div className="tasker-projectui">
      <div className="projectui-titlebar">
        {project.title}
        <button className="projectui-editproj-btn">
          <SquarePen />
        </button>
      </div>
      <p className="deadline">
        {`Due: `}
        <span className="date">
          {format(project.deadline, "EEE, MMM do y '@' h:mmaaa")}
        </span>
      </p>
      <p className="description">{project.desc}</p>
      <p className="created">
        {`Created: `}
        <span className="date">
          {format(project.created, "h:mmaaa EEE, MMM do y")}
        </span>
      </p>
    </div>
  );
}
