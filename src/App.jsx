import Sidebar from "./components/Sidebar";
import WorkspaceList from "./components/WorkspaceList";
import ModalRouter from "./components/ModalRouter";
import { addWorkspace, activeProjectID } from "./modules/store";
import { Cog } from "lucide-react";

function App() {
  return (
    <>
      <ModalRouter />
      <div className="bg-(--color-pri) h-dvh w-dvw flex flex-col overflow-hidden">
        <div className="flex grow overflow-hidden">
          <Sidebar className={"p-2 pt-4 shrink-0 overflow-hidden h-full gap-4"}>
            <img
              src="/logo.webp"
              alt="Tasker Logo"
              className="bg-(--color-btn) w-40 md:w-64 p-2 rounded-md 
                shadow-btn hover:shadow-btn-hover shadow-black/20 outline-1 
                outline-(--color-btn) cursor-pointer"
              onClick={() => (activeProjectID.value = null)}
            />
            <button>
              <Cog />
              Settings
            </button>
            <WorkspaceList />
          </Sidebar>
          Content
        </div>
        <footer>Copyright © 2026 Lane Robey</footer>
      </div>
    </>
  );
}

export default App;
