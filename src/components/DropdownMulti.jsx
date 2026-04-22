import { useState, useEffect, useRef } from "react";
import { Check, ChevronLeft, Square } from "lucide-react";

export default function DropdownMulti({
  options,
  defaultSelected,
  onChange,
  className,
}) {
  const [selected, setSelected] = useState(defaultSelected);
  const [selectedStr, setSelectedStr] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof onChange === "function") onChange(selected);
    if (selected.length <= 0) setSelectedStr("None Selected...");
    else setSelectedStr(selected.map((sel) => options[sel]).join(", "));
  }, [selected]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative shadow-btn/20 rounded-md cursor-default
        ${open ? "rounded-b-none z-50" : "z-0"}
        transition-all transform-gpu duration-300 ease-in-out ${className}`}
    >
      <div
        className="flex justify-between p-1 px-2 items-center"
        onClick={() => setOpen(!open)}
      >
        <p className="h-5 text-ellipsis whitespace-nowrap overflow-hidden">
          {selectedStr}
        </p>
        <div className="relative shrink-0">
          <Square
            className={`transition-all duration-300 ease-in-out
              ${open ? "stroke-(--color-text)" : "stroke-transparent"}`}
          />
          <ChevronLeft
            className={`absolute top-0 left-0 transition-transform ease-in-out scale-90
              ${open ? "-rotate-90" : ""}`}
          />
        </div>
      </div>

      <div
        className={`absolute origin-top bg-inherit w-full z-50 shadow-btn/20 
          rounded-b-md p-2 gap-2 overflow-y-auto max-h-48
          transition-transform duration-300 ease-in-out
          ${open ? "scale-x-100 scale-y-100" : "scale-x-90 scale-y-0"}`}
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
                  transition-all duration-100 stroke-(--color-brand)
                  ${selected.includes(opt) ? "scale-x-125 -left-1/8" : "scale-x-0"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
