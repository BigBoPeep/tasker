import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  useFloating,
  flip,
  shift,
  offset,
  autoUpdate,
  FloatingPortal,
  useHover,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";

export default function Tooltip({ content, children }) {
  useSignals();
  const open = useSignal(false);

  const { refs, floatingStyles, context } = useFloating({
    open: open.value,
    onOpenChange: (o) => (open.value = o),
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
  });

  const hover = useHover(context, { move: false });
  const dismiss = useDismiss(context, {
    referencePress: false,
    outsidePress: false,
    ancestorScroll: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      <FloatingPortal>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-1001 pointer-events-none"
          {...getFloatingProps()}
        >
          <div
            className={`px-2 py-1 text-sm bg-(--color-tooltip-bg)/40 rounded-md shadow-md
              origin-center transition-transform duration-150 ease-bounce transform-gpu
              text-(--color-tooltip-text) ${open.value ? "scale-x-100" : "scale-x-0"}`}
          >
            {content}
          </div>
        </div>
      </FloatingPortal>
    </>
  );
}
