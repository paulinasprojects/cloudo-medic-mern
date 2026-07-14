import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export interface MultiSelectContextProps {
  values: string[];
  toggleValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface MultiSelectProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  children: React.ReactNode;
}

export interface MultiSelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  className?: string;
}

export interface MultiSelectContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface MultiSelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  className?: string;
}