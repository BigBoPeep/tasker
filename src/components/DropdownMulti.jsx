import { useState, useEffect } from "react";
import { settings } from "../modules/store";
import { Check, ChevronLeft, Square } from "lucide-react";

export default function DropdownMulti({
  options,
  defaultSelected,
  onChange,
  className,
}) {
  const [selected, setSelected] = useState(defaultSelected);
  const [selectedStr, setSelectedStr] = useState("");

  useEffect(() => {
    if (typeof onChange === "function") onChange(selected);
    if (selected.length <= 0) setSelectedStr("None Selected...");
    else setSelectedStr(selected.map((sel) => options[sel]).join(", "));
  }, [selected]);

  return (
    <div
      className={`relative group/ms shadow-btn/20 rounded-md 
        hover:rounded-b-none transition-all transform-gpu duration-300 ease-bounce 
        cursor-default hover: ${className}`}
    >
      <div className="flex justify-between p-1 px-2 items-center">
        <p
          className="h-5 leading-tight text-ellipsis whitespace-nowrap 
            overflow-hidden"
        >
          {selectedStr}
        </p>
        <div className="relative shrink-0">
          <Square
            className={`stroke-transparent group-hover/ms:stroke-(--color-text)
              transition-all duration-300 ease-bounce`}
          />
          <ChevronLeft
            className={`absolute top-0 left-0 group-hover/ms:-rotate-90 transition-transform 
              ease-bounce scale-90`}
          />
        </div>
      </div>
      <div
        className="absolute scale-x-90 scale-y-0 group-hover/ms:scale-x-100 
          group-hover/ms:scale-y-100 transition-transform duration-300 ease-bounce
          origin-top bg-inherit w-full z-50 shadow-btn/20 rounded-b-md p-2 flex 
          flex-col gap-2"
      >
        {Object.entries(options).map(([opt, text]) => (
          <div
            key={opt}
            className={`flex justify-between cursor-pointer hover:bg-(--color-overlay-1) 
              p-1 px-2 rounded-md
              ${selected.includes(opt) ? "bg-(--color-overlay-1) hover:bg-(--color-overlay-2)" : ""}`}
            onClick={() => {
              if (selected.includes(opt))
                setSelected(selected.filter((v) => v !== opt));
              else setSelected([...selected, opt]);
            }}
          >
            {text}
            <div className="shrink-0 relative">
              <Square />
              <Check
                className={`absolute inset-0 stroke-5 origin-left -skew-x-12 
                  transition-all duration-100
                  ${selected.includes(opt) ? "scale-x-125 -left-1/8" : "scale-x-0"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
