import { useState, useEffect, useRef } from "react";
import { Check, Square, ChevronLeft } from "lucide-react";

export default function Dropdown({
  options,
  defaultSelected,
  onChange,
  className,
}) {
  const [selected, setSelected] = useState(defaultSelected);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof onChange === "function") onChange(selected);
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
      className={`relative rounded-md cursor-default z-0 shadow-btn/20 min-w-0
        ${open ? "rounded-b-none z-50" : ""} 
        transition-all transform-gpu duration-300 ease-in-out ${className}`}
    >
      <div
        className="flex justify-between items-center px-2 py-1 overflow-hidden"
        onClick={() => setOpen(!open)}
      >
        <p className="w-full shrink whitespace-nowrap text-ellipsis overflow-hidden">
          {options[selected]}
        </p>
        <div className="relative">
          <Square
            className={`transition-all duration-300 ease-in-out shrink-0
              ${open ? "stroke-(--color-text)" : "stroke-transparent"}`}
          />
          <ChevronLeft
            className={`absolute top-0 left-0 transition-transform duration-300 ease-in-out
              ${open ? "-rotate-90" : ""}`}
          />
        </div>
      </div>

      <div
        className={`absolute bg-inherit w-full p-2 rounded-b-md origin-top
          transition-transform duration-300 ease-in-out shadow-btn/20 z-50 gap-1
          overflow-y-auto max-h-48
          ${open ? "scale-y-100 scale-x-100" : "scale-y-0 scale-x-90"}`}
      >
        {Object.entries(options).map(([opt, text]) => (
          <div
            key={opt}
            className={`flex cursor-pointer py-1 px-2 overflow-hidden justify-between
              hover:bg-(--color-overlay-1) rounded-md items-center
              ${selected == opt ? "bg-(--color-overlay-1) hover:bg-(--color-overlay-2)" : ""}`}
            onClick={() => {
              setSelected(opt);
              setOpen(false);
            }}
          >
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {text}
            </p>
            <Check
              className={`shrink-0 ${opt === selected ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
