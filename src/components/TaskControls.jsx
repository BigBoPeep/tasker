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
import { ListPlus } from "lucide-react";
import Tooltip from "./Tooltip";

export default function TaskControls() {
  useSignals();

  return (
    <div
      className="outline-1 outline-(--color-text)/20 rounded-md p-3 flex w-full 
      items-center gap-3 max-w-full"
    >
      <Tooltip content={"New Task"}>
        <button
          onClick={() => {
            openModal("task", { projectID: activeProjectID.value });
          }}
        >
          <ListPlus className="size-8" />
        </button>
      </Tooltip>

      <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-3 grow min-w-0">
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
          <div className="flex items-center gap-3 lg:block min-w-0">
            <p className="shrink-0">Sort By</p>
            <Dropdown
              className={"bg-(--color-pri) w-full"}
              options={SORT_OPTIONS}
              defaultSelected={settings.value.sortBy}
              onChange={(value) => updateSettings({ sortBy: value })}
            />
          </div>
          <div className="flex items-center gap-3 lg:block min-w-0">
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
    </div>
  );
}
