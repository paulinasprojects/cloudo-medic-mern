import { ChevronDown, X } from "lucide-react";
import { cn } from "@/utils/utils";
import { MultiSelectTriggerProps } from "./multi-select-types";
import { useMultiSelectContext } from "./multi-select";

const MultiSelectTrigger = ({
  className,
  placeholder,
  ...props
}: React.ComponentProps<"button"> & MultiSelectTriggerProps) => {
  const { open, setOpen, values, toggleValue } = useMultiSelectContext();

  return (
    <button 
      type="button" 
      role="combobox"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        "flex items-center justify-between w-full min-h-9 px-3 py-1 border rounded-full text-sm",
        "border-slate-700 focus:outline-none focus:border-slate-300 transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap gap-1 flex-1">
        {values.length > 0 ? (
          values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-800 text-white"
            >
              {v}
              <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleValue(v)
              }}
              className="cursor-pointer hover:text-red-400 transition-colors"
            >
              <X className="size-3"/>
            </span>
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-[11px]">{placeholder}</span>
        )}
      </div>
      <ChevronDown
        className={cn("w-4 h-4 text-gray-500 transition-transform shrink-0 ml-1", open && "rotate-180")}
      />
    </button>
  )
}

export {
  MultiSelectTrigger
}