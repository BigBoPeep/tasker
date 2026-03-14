import TaskerUI from "./components/Tasker/TaskerUI";
import { ToastProvider } from "./components/ToastContext/ToastContext";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <TaskerUI />
    </ToastProvider>
  );
}

export default App;
