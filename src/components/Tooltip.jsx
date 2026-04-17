import { useSignal } from "@preact/signals-react";
import {
  useFloating,
  flip,
  shift,
  offset,
  autoUpdate,
} from "@floating-ui/react";

export default function Tooltip({ content, children }) {
  const open = useSignal(false);
  const { refs, floatingStyles } = useFloating({
    open: open.value,
    onOpenChange: (o) => (open.value = o),
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <div
        ref={refs.setReference}
        onMouseEnter={() => (open.value = true)}
        onMouseLeave={() => (open.value = false)}
      >
        {children}
      </div>

      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="z-100 pointer-events-none"
      >
        <div
          className={`px-2 py-1 text-sm bg-(--color-tooltip-bg)/40 rounded-md shadow-md 
            origin-center transition-transform duration-150 ease-bounce transform-gpu
            text-tooltip-text ${open.value ? "scale-x-100" : "scale-x-0"}`}
        >
          {content}
        </div>
      </div>
    </>
  );
}
