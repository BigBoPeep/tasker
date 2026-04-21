import { useSignals } from "@preact/signals-react/runtime";
import Sidebar from "./components/Sidebar";
import WorkspaceList from "./components/WorkspaceList";
import ProjectView from "./components/ProjectView";
import Landing from "./components/Landing";
import ModalRouter from "./components/ModalRouter";
import ToastList from "./components/ToastList";
import { addWorkspace, sidebarOpen, activeProjectID } from "./modules/store";
import { Cog } from "lucide-react";

function App() {
  useSignals();

  return (
    <>
      <ModalRouter />
      <ToastList />
      <div className="bg-(--color-pri) h-dvh w-dvw flex flex-col overflow-hidden">
        <div className="flex grow overflow-hidden relative">
          <Sidebar
            className={`p-2 pt-4 shrink-0 h-full gap-4 border-r border-(--color-text)/20 
                bg-(--color-pri)`}
            open={sidebarOpen}
          >
            <button>
              <Cog />
              Settings
            </button>
            <WorkspaceList />
          </Sidebar>
          {activeProjectID.value ? <ProjectView /> : <Landing />}
        </div>
        <footer className="border-t border-(--color-text)/20 text-center p-0.5">
          Copyright © 2026 Lane Robey
        </footer>
      </div>
    </>
  );
}

export default App;
