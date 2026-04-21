import { useSignals } from "@preact/signals-react/runtime";
import { SORT_OPTIONS, SORT_ORDERS, FILTERS } from "../config";
import { settings, updateSettings } from "../modules/store";
import Dropdown from "./Dropdown";
import DropdownMulti from "./DropdownMulti";

export default function TaskControls() {
  useSignals();

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-2">
      <div className="flex lg:block w-full gap-2 items-center">
        <p className="">Filters</p>
        <DropdownMulti
          className={"bg-(--color-pri) w-full z-51"}
          options={FILTERS}
          defaultSelected={settings.value.filters}
          onChange={(values) => updateSettings({ filters: values })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 lg:block">
          <p className="shrink-0">Sort By</p>
          <Dropdown
            className={"bg-(--color-pri) w-full"}
            options={SORT_OPTIONS}
            defaultSelected={settings.value.sortBy}
            onChange={(value) => updateSettings({ sortBy: value })}
          />
        </div>
        <div className="flex items-center gap-2 lg:block">
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
  );
}
