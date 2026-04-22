import { useState } from "react";
import { closeModal, updateSettings, settings } from "../modules/store";
import { THEMES, DATE_FORMATS } from "../config";
import { SquareCheckBig, OctagonX } from "lucide-react";
import Tooltip from "./Tooltip";
import Dropdown from "./Dropdown";

export default function SettingsModal() {
  const [theme, setTheme] = useState(settings.value.theme);
  const [dateFormatDue, setDateFormatDue] = useState(
    settings.value.dateFormatDue,
  );
  const [dateFormatCreated, setDateFormatCreated] = useState(
    settings.value.dateFormatCreated,
  );
  const [dateFormatCompleted, setDateFormatCompleted] = useState(
    settings.value.dateFormatCompleted,
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className=" bg-(--color-pri) rounded-lg p-3 w-full flex flex-col gap-4">
        <h4>Settings</h4>
        <div className="bg-(--color-sec) p-3 pt-1 rounded-md">
          Theme
          <Dropdown
            className={"bg-(--color-pri)"}
            options={THEMES}
            defaultSelected={settings.value.theme}
            onChange={(selected) => setTheme(selected)}
          />
        </div>
        <div className="bg-(--color-sec) p-3 pt-1 rounded-md">
          Date Formats
          <div className="px-2 pt-1 flex flex-col gap-3">
            <div className="mt-1">
              Due
              <Dropdown
                className={"bg-(--color-pri) mt-1"}
                options={DATE_FORMATS}
                defaultSelected={settings.value.dateFormatDue}
                onChange={(selected) => setDateFormatDue(selected)}
              />
            </div>
            <div>
              Created
              <Dropdown
                className={"bg-(--color-pri) mt-1"}
                options={DATE_FORMATS}
                defaultSelected={settings.value.dateFormatCreated}
                onChange={(selected) => setDateFormatCreated(selected)}
              />
            </div>
            <div>
              Completed
              <Dropdown
                className={"bg-(--color-pri) mt-1"}
                options={DATE_FORMATS}
                defaultSelected={settings.value.dateFormatCompleted}
                onChange={(selected) => setDateFormatCompleted(selected)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-evenly">
          <Tooltip content={"Cancel"}>
            <button onClick={closeModal}>
              <OctagonX />
            </button>
          </Tooltip>
          <Tooltip content={"Submit"}>
            <button
              onClick={() => {
                updateSettings({
                  theme,
                  dateFormatDue,
                  dateFormatCreated,
                  dateFormatCompleted,
                });
                closeModal();
              }}
            >
              <SquareCheckBig />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
