import { useEffect, useRef, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/utils/utils";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";


interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  classNameTwo?:string;
  id?: string;
}

const DatePicker = ({
  value,
  id,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  classNameTwo
}: DatePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const formattedDate = value ? value.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) : null;

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn("px-4 py-1 w-full flex justify-between items-center text-left border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors", disabled && "opacity-50 cursor-not-allowed")}
      >
        <span className={value ? "dark:text-white text-sm" : "text-gray-400 text-[11px]"}>
          {formattedDate || placeholder}
        </span>
        <Calendar className="size-4" />
      </button>
      {open && (
        <div className={cn("absolute z-50 left-0 top-full bg-gray-900 border border-gray-700 rounded-md shadow-lg", classNameTwo)}>
          <DayPicker
            animate
            id={id}
            mode="single"
            navLayout="around"
            captionLayout="dropdown"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false)
            }}
            className="custom-animate p-3"
            classNames={{
              today: `border border-white rounded-full`,
              selected: `dark:bg-black/10 text-white rounded-full`,
              day: `text-white dark:text-black hover:bg-gray-800 dark:hover:text-white rounded-md`,
              caption: `text-gray-200`,
              nav_button: `text-gray-400 hover:text-white`,
              chevron: `fill-white dark:fill-black size-5`,
              month: `text-white dark:text-black`,
              root: `${defaultClassNames.root} bg-black dark:bg-white`
            }}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker