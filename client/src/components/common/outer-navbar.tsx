import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/store/theme-store";
import { CloudoLogoDark, CloudoLogoLight } from "@/components/common/cloudo-logo";


const OuterNavbar = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="py-5 px-7 flex items-center justify-between">
      <div>
        {theme === "dark" ? (
          <CloudoLogoLight width={150} height={150} />
        ) : (
          <CloudoLogoDark width={150} height={150} />
        )}
      </div>
      <div>
        <button onClick={toggleTheme} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/5 duration-300 transition-colors">
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>
    </div>
  )
}

export default OuterNavbar