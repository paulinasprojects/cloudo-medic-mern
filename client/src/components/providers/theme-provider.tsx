import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

type Theme = "light" | "dark";

export function ThemeProvider({
  defaultTheme = "dark"
}: {
  defaultTheme?: Theme;
}) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = (localStorage.getItem("cloudo-theme") as Theme) || defaultTheme;
    setTheme(storedTheme);
  }, [defaultTheme, setTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  return null;
}