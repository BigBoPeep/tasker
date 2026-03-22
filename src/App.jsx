import Tasker from "./components/Tasker/Tasker";
import { ToastProvider } from "./components/ToastContext/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Tasker />
    </ToastProvider>
  );
}

export default App;
