import { cn } from "@/utils/utils";
import { SelectOptionProps } from "./select-types";
import { useSelectContext } from "./select";


const SelectOption = ({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<"div"> & SelectOptionProps) => {
  const { setValue, value: selectedValue } = useSelectContext();

  const isSelected = selectedValue == value;

  return (
    <div
      role="option"
      onClick={() => setValue(value)}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer transition-colors  mx-0.5",
        isSelected ? "text-black bg-white" : "text-black bg-white hover:bg-gray-200",
        className,
      )}
      {...props}
      aria-selected={isSelected}
    >
      {children}
    </div>
  )
}


export {
  SelectOption
}