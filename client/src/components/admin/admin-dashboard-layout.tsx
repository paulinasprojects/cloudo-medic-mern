import { HugeiconsIcon } from "@hugeicons/react";
import { useAuthStore } from "@/store/auth-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../common/dropdown-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Moon, Sun } from "lucide-react";
import { cn } from "@/utils/utils";
import AdminMobileMenu from "./admin-mobile-menu";
import { CloudoLogoLight, CloudoLogoDark } from "../common/cloudo-logo";
import { links } from "@/types/header-links";
import { useTheme } from "@/store/theme-store";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();



  function handleLogout() {
    logout();
    navigate("/")
  }

  return (
    <header className=" xl:px-12.5 xl:py-8.5 py-6 px-5">
      <div className="flex items-center gap-4 justify-between">
        <AdminMobileMenu />
        <nav className="bg-white dark:bg-[#0e121b] px-3 py-4 rounded-full xl:block hidden">
          <div className="flex gap-6 items-center">
            {theme === "dark" ? (
              <CloudoLogoLight width={150} height={150} />
            ) : (
              <CloudoLogoDark width={150} height={150} />
            )}
            <div>
              <ul className="flex gap-6.75">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={cn("text-gray-400 hover:text-black dark:hover:text-white duration-300 transition flex items-center gap-2", pathname === link.href && "text-black dark:text-white dark:hover:text-gray-500")}>
                      <HugeiconsIcon icon={link.icon} size={20} />
                      <span className="xl:text-[16px] lg:text-[13px]">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/5 duration-300 transition-colors">
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-2 sm:py-3 max-sm:py-2 bg-white dark:bg-[#0e121b] rounded-full data-[state=open]:rounded-none data-[state=open]:rounded-tl-md data-[state=open]:rounded-tr-md">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="profile image" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col items-start">
                  <span className="text-black dark:text-white capitalize text-[16px] font-mono font-bold">{user?.firstName} {" "} {user?.lastName} </span>
                  <span className="text-[12px] text-black dark:text-white">{user?.email}</span>
                </div>
                <ChevronDown className="size-5 dark:text-white text-black" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={0} className="flex flex-col min-w-38.75 gap-4 bg-white dark:bg-black text-black dark:text-white rounded-bl-md rounded-br-md">
              <DropdownMenuItem className="bg-white dark:bg-black dark:focus:bg-white dark:focus:text-black focus:bg-black/10 focus:text-black transition duration-300">
                <Link to="/admin" className="flex w-full items-center justify-between">
                  Go to Dashboard
                  <ChevronRight />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="bg-white dark:bg-black dark:focus:bg-white dark:focus:text-black focus:bg-black/10 focus:text-black transition duration-300">
                <button
                  className="rounded-full transition-colors cursor-pointer">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
    </header>
  )
}