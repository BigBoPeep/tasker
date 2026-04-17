import React from "react";
import { closeModal } from "../modules/store";
import { SquareCheckBig, OctagonX } from "lucide-react";
import Tooltip from "./Tooltip";

export default function ConfirmModal({ data }) {
  return (
    <div className="bg-(--color-pri) flex flex-col gap-4 z-50 p-4 rounded-md">
      <div>{`Confirm ${data?.title || ""}?`}</div>
      <div className="flex justify-evenly">
        <Tooltip content={"Cancel"}>
          <button onClick={closeModal}>
            <OctagonX />
          </button>
        </Tooltip>
        <Tooltip content={"Confirm"}>
          <button
            onClick={() => {
              data?.action();
              closeModal();
            }}
          >
            <SquareCheckBig />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
