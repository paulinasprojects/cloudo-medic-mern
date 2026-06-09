import { ChevronDown, ChevronRight, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { useTheme } from "@/store/theme-store";
import { CloudoLogoLight, CloudoLogoDark } from "./cloudo-logo";


interface Props {
  user: User | null
  isAuthenticated: boolean;
}

export default function Header({ user, isAuthenticated }: Props) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();

  function handleLogout() {
    logout();
    navigate("/")
  }

  return (
    <header className="p-5">
      <nav className="flex items-center justify-between">
        <Link to="/">
          {theme === "dark" ? (
            <CloudoLogoLight width={150} height={150} />
          ) : (
            <CloudoLogoDark width={150} height={150} />
          )}
        </Link>
        {isAuthenticated && user?.role === "admin" && (
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
                <DropdownMenuItem className="bg-white dark:bg-black dark:focus:bg-white dark:focus:text-black focus:bg-black/10 focus:text-black transition duration-300">
                  <button
                    onClick={handleLogout}
                    className="rounded-full transition-colors cursor-pointer">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {isAuthenticated && user?.role === "patient" && (
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
                  <Link to="/patient" className="flex w-full items-center justify-between">
                    Go to Dashboard
                    <ChevronRight />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-white dark:bg-black dark:focus:bg-white dark:focus:text-black focus:bg-black/10 focus:text-black transition duration-300">
                  <button
                    onClick={handleLogout}
                    className="rounded-full transition-colors cursor-pointer">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {isAuthenticated && user?.role === "doctor" && (
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
                  <Link to="/doctor" className="flex w-full items-center justify-between">
                    Go to Dashboard
                    <ChevronRight />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-white dark:bg-black dark:focus:bg-white dark:focus:text-black focus:bg-black/10 focus:text-black transition duration-300">
                  <button
                    onClick={handleLogout}
                    className="rounded-full transition-colors cursor-pointer">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/5 duration-300 transition-colors">
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <Link to="/login" className="px-6 py-2  bg-black text-white dark:bg-white dark:text-black rounded-full  transition-colors cursor-pointer" >Login</Link>
              <Link to="/signup" className="px-6 py-2  bg-black text-white dark:bg-white dark:text-black rounded-full cursor-pointer transition-colors duration-300">Sign up</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}