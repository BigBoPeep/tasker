import { useSignals } from "@preact/signals-react/runtime";
import { modalState, modalVisible, closeModal } from "../modules/store";
import WorkspaceModal from "./WorkspaceModal";
import ProjectModal from "./ProjectModal";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

export default function ModalRouter() {
  useSignals();

  if (!modalState.value) return null;

  const { type, data } = modalState.value;
  const isVisible = modalVisible.value;

  const content =
    type === "workspace" ? (
      <WorkspaceModal data={data} />
    ) : type === "project" ? (
      <ProjectModal data={data} />
    ) : type === "task" ? (
      <TaskModal data={data} />
    ) : type === "confirm" ? (
      <ConfirmModal data={data} />
    ) : null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-500 
        ${isVisible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"} z-999 transform-gpu`}
      onClick={closeModal}
    >
      <div
        className={`rounded-lg w-96 transition-all duration-500 z-1000 
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"} transform-gpu`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
}
