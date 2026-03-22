import "./ProjectUI.css";
import React from "react";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";

export default function ProjectUI({ selectedProject, tasks }) {
  if (!selectedProject)
    return <div className="projectui-loading">No Project Selected</div>;

  return (
    <div className="projectui">
      <div className="projectui-info">
        <div className="title-bar">
          {selectedProject.title}
          <button className="project-edit-btn">
            <SquarePen />
          </button>
        </div>
        <div className="deadline">
          {`Due: `}
          <span>
            <em>
              {format(
                new Date(selectedProject.deadline),
                `EEE, MMM do ''yy 'at' h:mmaaa`,
              )}
            </em>
          </span>
        </div>
        <div className="desc">
          {/* {selectedProject.desc} */}A really long description to make test
          stretch and wrap and do all sorts of stuff. A really long description
          to make test stretch and wrap and do all sorts of stuff. A really long
          description to make test stretch and wrap and do all sorts of stuff. A
          really long description to make test stretch and wrap and do all sorts
          of stuff. A really long description to make test stretch and wrap and
          do all sorts of stuff.
        </div>
        <div className="created">
          {`Created: `}
          <span>
            {format(new Date(selectedProject.created), `MM/dd/yyyy h:mmaaa`)}
          </span>
        </div>
      </div>
      <div className="projectui-tasks">Tasks</div>
    </div>
  );
}
