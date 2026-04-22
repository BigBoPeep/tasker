import HeroSection from "./HeroSection";
import { ListTodo, Square, Plus } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col items-center gap-4 w-full p-4 overflow-y-auto">
      <HeroSection
        className={"w-[min(800px,60dvw)]"}
        text={
          <span className="text-4">
            Welcome to{" "}
            <span className="text-(--color-brand) text-4">Tasker</span>!
          </span>
        }
        subtext={
          <span className="text-1 *:text-(--color-brand) *:font-light *:text-1 font-light">
            Get more done by utilizing <span>Organization </span>
            and
            <span> Visualization</span>
          </span>
        }
      >
        <ListTodo className="size-20 md:size-30 bg-(--color-pri) p-2 rounded-md stroke-(--color-brand)" />
      </HeroSection>

      <div
        className="bg-(--color-sec) p-4 flex flex-col gap-4 max-w-prose text-center 
          text-balance rounded-md"
      >
        <p className="bg-(--color-pri) p-2 px-6 rounded-md">
          Most productivity apps make you think like they do. Rigid systems,
          overwhelming features, and workflows designed for someone else. Tasker
          gets out of your way.
        </p>
        <p className="bg-(--color-pri) p-2 px-6 rounded-md *:text-(--color-brand)">
          Organize <span>your work</span> the way it actually exists — by the
          <span> places</span> you go, the <span>people</span> you work with,
          and the <span>things</span> you're building. Whether you're managing a
          job site, juggling clients, or just trying to get the house in order,{" "}
          <span>Tasker</span> fits around <span>your life</span> instead of the
          other way around.
        </p>
        <p className="bg-(--color-pri) p-2 px-6 rounded-md *:text-(--color-brand)">
          <span>Everything</span> in one place. <span>Nothing</span> you don't
          need.
        </p>
      </div>

      <details className="group/det max-w-prose w-full bg-(--color-sec) rounded-md">
        <summary className="flex justify-center items-center gap-2 p-2 cursor-pointer text-1 hover:bg-(--color-overlay-1)">
          <div className="relative">
            <Square className="stroke-1" />
            <Plus
              className="absolute top-0 left-0 group-open/det:rotate-720 stroke-(--color-brand)
                transition-transform duration-500 ease-bounce transform-gpu"
            />
          </div>
          How To Use
        </summary>
        <div className="pt-2 p-4 flex flex-col gap-4 mx-auto max-w-prose">
          <p className="italic font-light text--1">
            If you're on a device with a smaller screen, the menu sidebar will
            start collapsed. Click the button on the left side of the screen to
            toggle the menu open/closed. You can get back to this page by
            clicking the Tasker logo in the sidebar.
          </p>

          <div className="font-normal bg-(--color-pri) p-2 px-3 rounded-md">
            <span className="text-1 font-semibold text-(--color-brand)">
              Workspaces{" "}
            </span>
            are the top-level way to organize your work. Each Workspace
            represents a distinct area of your life or work — somewhere that has
            its own self-contained set of goals. A Workspace could be a
            location, a client, a vehicle, a hobby, or anything else that groups
            related work together.
            <div className="mt-2">
              — Create a new Workspace with the button in the menu sidebar.
            </div>
          </div>

          <div className="font-normal bg-(--color-pri) p-2 px-3 rounded-md">
            <span className="text-1 font-semibold text-(--color-brand)">
              Projects{" "}
            </span>
            live inside a Workspace and represent a specific goal or body of
            work within it. A Project has a title, description, and deadline to
            keep you focused. Inside your Home workspace you might have projects
            like 'Repaint the Kitchen' or 'Fix the Fence'. Inside a client
            workspace, a Project might be a specific deliverable or contract
            milestone.
            <div className="mt-2">
              — Create a new Project using the button inside each Workspace in
              the sidebar.
            </div>
          </div>

          <div className="font-normal bg-(--color-pri) p-2 px-3 rounded-md">
            <span className="text-1 font-semibold text-(--color-brand)">
              Tasks{" "}
            </span>
            are the individual steps that make up a Project. They're the
            actionable items — the things you actually sit down and do. Breaking
            a Project into Tasks makes large goals feel manageable and gives you
            a clear picture of your progress. A Task can have a deadline of its
            own, so nothing slips through the cracks.
            <div className="mt-2">
              — Create a new Task by first selecting a Project. In the new view
              you'll find controls for filtering, sorting, and a button for
              adding a new Task.
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
