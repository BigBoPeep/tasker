import "./TaskerUI.css";
import React, { useState, useEffect } from "react";
import { Tasker } from "../../modules/tasker/tasker";
import { useToast } from "../ToastContext/ToastContext";

export default function TaskerUI() {
  const [tasker, setTasker] = useState(null);
  const notify = useToast();

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const inst = await Tasker.init(notify);
      if (!cancelled) setTasker(inst);
    };
    init();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!tasker) return <div className="tasker-loading">Loading...</div>;

  return <div>Hello</div>;
}
