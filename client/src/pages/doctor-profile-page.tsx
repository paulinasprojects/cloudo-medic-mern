import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/store/theme-store";
import { CloudoLogoDark, CloudoLogoLight } from "@/components/common/cloudo-logo";


const DoctoProfilePage = () => {

  const { toggleTheme, theme } = useTheme();
  return (
    <div className="bg-[#f6f7f9] dark:bg-[#0a0a0a]">
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
      <div className="flex flex-col gap-6 items-center justify-center px-0 max-sm:px-7 py-10">
        <h1 className="text-4xl font-bold">Complete your profile</h1>
        <p className="text-2xl font-medium max-sm:text-center">Before you can access the dashboard, we need a few details about you.</p>
        <Link
          to="/doctor/profile/personal-info"
          className="px-5 py-2 hover:bg-black/70 dark:hover:bg-white/60 bg-black dark:bg-white text-white dark:text-black rounded-full transition-colors duration-300"
        >
          Get started
        </Link>
      </div>
    </div>
  )
}

export default DoctoProfilePage