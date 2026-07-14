import { useRef, useEffect } from "react";
import { cn } from "@/utils/utils";
import { MultiSelectContentProps } from "./multi-select-types";
import { useMultiSelectContext } from "./multi-select";

const MultiSelectContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & MultiSelectContentProps) => {
  const { open, setOpen } = useMultiSelectContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="listbox"
      aria-multiselectable="true"
      className={cn(
        "absolute left-0 top-full mt-1 z-50 w-full max-h-56 overflow-y-auto rounded-sm border shadow-md",
        "bg-white dark:bg-black border-slate-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { MultiSelectContent };