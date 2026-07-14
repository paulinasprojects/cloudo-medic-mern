import { cn } from "@/utils/utils";
import { MultiSelectOptionProps } from "./multi-select-types";
import { useMultiSelectContext } from "./multi-select";
import { Check } from "lucide-react";

const MultiSelectOption = ({
  className,
  children,
  value,
  onClick,
  ...props
}: React.ComponentProps<"div"> & MultiSelectOptionProps) => {
  const { toggleValue, values } = useMultiSelectContext();

  const isSelected = values.includes(value);
  
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={(e) => {
        toggleValue(value);
        onClick?.(e);
      }}
       className={cn(
        "px-3 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2 mx-0.5",
        isSelected ? "text-black bg-white" : "text-black bg-white hover:bg-gray-200",
        className,
      )}
      {...props}
    >
      <span>{children}</span>

      {isSelected && (
        <Check className="size-4 text-green-500" />
      )}
    </div>
  );
}

export {
  MultiSelectOption
}