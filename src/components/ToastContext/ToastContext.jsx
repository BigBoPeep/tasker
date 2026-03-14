import "./ToastContext.css";
import { createContext, useState, useContext, useCallback } from "react";

const toastDuration = 4;
const fadeDuration = 0.5;
const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((msg, type = "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type, visible: true }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
      );
    }, toastDuration * 1000);
    setTimeout(
      () => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      },
      toastDuration * 1000 + fadeDuration * 1000,
    );
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast toast-${t.type} ${t.visible ? "visible" : ""}`}
            style={{ "--fade-duration": `${fadeDuration}s` }}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
