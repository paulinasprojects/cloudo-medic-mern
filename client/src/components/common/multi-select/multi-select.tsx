/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { MultiSelectProps, MultiSelectContextProps } from "./multi-select-types";

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const MultiSelect = ({
  values,
  onValuesChange,
  children,
  ...props
}: React.ComponentProps<"div"> & MultiSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleValue = (value: string) => {
    const next = values.includes(value) 
      ? values.filter((v) => v !== value) 
      : [...values, value];
    onValuesChange(next)
  };

  return (
    <MultiSelectContext.Provider value={{values, toggleValue, open, setOpen}}>
      <div className="relative w-full" {...props}>
        {children}
      </div>
    </MultiSelectContext.Provider>
  );
};

function useMultiSelectContext() {
  const ctx = useContext(MultiSelectContext);
  if (!ctx) throw new Error("MultiSelect subcomponents must be inside MultiSelect");
  return ctx;
}

export {
  MultiSelect,
  useMultiSelectContext
};