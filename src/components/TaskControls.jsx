import { useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { SORT_OPTIONS, SORT_ORDERS, FILTERS } from "../config";
import {
  settings,
  updateSettings,
  openModal,
  projects,
  activeProjectID,
} from "../modules/store";
import Dropdown from "./Dropdown";
import DropdownMulti from "./DropdownMulti";
import { ListPlus, PanelTopOpen, PanelTopClose } from "lucide-react";
import Tooltip from "./Tooltip";

export default function TaskControls() {
  useSignals();
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-(--color-sec) rounded-md w-full max-w-full relative`}>
      <div
        className={`lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-3 grow min-w-0 px-2
          transition-all transform-gpu duration-500 ease-bounce transition-discrete
          ${open ? "h-auto py-2" : "h-0 py-0 overflow-hidden"}`}
      >
        <div className="flex lg:block w-full gap-3 items-center">
          <p className="">Filters</p>
          <DropdownMulti
            className={"bg-(--color-pri) w-full z-51"}
            options={FILTERS}
            defaultSelected={settings.value.filters}
            onChange={(values) => updateSettings({ filters: values })}
          />
        </div>
        <div className="grid grid-cols-[0.8fr_1fr] gap-3 min-w-0">
          <div className="min-w-0">
            <p className="shrink-0">Sort By</p>
            <Dropdown
              className={"bg-(--color-pri) w-full"}
              options={SORT_OPTIONS}
              defaultSelected={settings.value.sortBy}
              onChange={(value) => updateSettings({ sortBy: value })}
            />
          </div>
          <div className="min-w-0">
            <p className="shrink-0">Sort Order</p>
            <Dropdown
              className={"bg-(--color-pri) w-full"}
              options={SORT_ORDERS}
              defaultSelected={settings.value.sortOrder}
              onChange={(value) => updateSettings({ sortOrder: value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-evenly p-2">
        <Tooltip content={"New Task"}>
          <button
            onClick={() => {
              openModal("task", { projectID: activeProjectID.value });
            }}
          >
            <ListPlus />
          </button>
        </Tooltip>

        <Tooltip content={"Toggle Filters Panel"}>
          <button onClick={() => setOpen(!open)}>
            {open ? <PanelTopClose /> : <PanelTopOpen />}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
