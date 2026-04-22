import React from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { activeProjectID } from "../modules/store";
import { SidebarOpen, SidebarClose } from "lucide-react";

export default function Sidebar({ children, className, open }) {
  useSignals();

  return (
    <div
      className={`absolute lg:static h-full right-full
        transition-transform duration-500 ease-bounce transform-gpu flex flex-col 
        items-center gap-2 lg:translate-0 z-500
        ${open.value ? "translate-x-full" : "translate-0"} ${className}`}
    >
      <img
        src="/logo.webp"
        alt="Tasker Logo"
        className="bg-(--color-btn) w-40 lg:w-64 p-2 rounded-md 
                shadow-btn hover:shadow-btn-hover shadow-black/20 outline-1 
                outline-(--color-btn) cursor-pointer"
        onClick={() => {
          activeProjectID.value = null;
          open.value = false;
        }}
      />
      {children}
      <button
        className="absolute left-full top-[50%] lg:hidden z-1000 rounded-l-none 
          opacity-30 hover:opacity-60"
        onClick={() => {
          open.value = !open.value;
        }}
      >
        {open.value ? (
          <SidebarClose className="size-10" />
        ) : (
          <SidebarOpen className="size-10" />
        )}
      </button>
    </div>
  );
}
