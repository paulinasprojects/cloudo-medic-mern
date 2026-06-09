import { create } from "zustand";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark",
  setTheme: (theme: Theme) => {
    localStorage.setItem("cloudo-theme", theme);
    set({ theme })
  },
   toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem("cloudo-theme", next);
    set({ theme: next });
  },
}));

export const useTheme = useThemeStore;