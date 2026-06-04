import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";


interface Props {
  user: User | null
  isAuthenticated: boolean;
}

export default function Header({ user, isAuthenticated }: Props) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/")
  }


  return (
    <header className="p-5">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img src="/claudo-medic-logo.svg" width={150} height={150} />
        </Link>
        {isAuthenticated && user?.role === "admin" && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-2 py-2 bg-white rounded-full data-[state=open]:rounded-none data-[state=open]:rounded-tl-md data-[state=open]:rounded-tr-md">
                  <img src="/default-user.png" alt="profile image" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col items-start">
                    <span className="text-black capitalize text-[16px] font-mono font-bold">{user?.firstName} {" "} {user?.lastName} </span>
                    <span className="text-[12px]">{user?.email}</span>
                  </div>
                  <ChevronDown className="size-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={0} className="flex flex-col min-w-38.75 gap-4 bg-white text-black rounded-bl-md rounded-br-md">
                <DropdownMenuItem>
                  <Link to="/admin" className="flex w-full items-center justify-between">
                    Go to Dashboard
                    <ChevronRight />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-4 py-2 max-sm:px-2 bg-white rounded-full data-[state=open]:rounded-none data-[state=open]:rounded-tl-md data-[state=open]:rounded-tr-md">
                  <img src="/default-user.png" alt="profile image" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col items-start">
                    <span className="text-black capitalize text-[16px] font-mono font-bold">{user?.firstName} {" "} {user?.lastName} </span>
                    <span className="text-[12px]">{user?.email}</span>
                  </div>
                  <ChevronDown className="size-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={0} className="flex flex-col min-w-38.75 gap-4 bg-white text-black rounded-bl-md rounded-br-md">
                <DropdownMenuItem>
                  <Link to="/patient" className="flex w-full items-center justify-between">
                    Go to Dashboard
                    <ChevronRight />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-4 py-2 max-sm:px-2 bg-white rounded-full data-[state=open]:rounded-none data-[state=open]:rounded-tl-md data-[state=open]:rounded-tr-md">
                  <img src="/default-user.png" alt="profile image" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col items-start">
                    <span className="text-black capitalize text-[16px] font-mono font-bold">{user?.firstName} {" "} {user?.lastName} </span>
                    <span className="text-[12px]">{user?.email}</span>
                  </div>
                  <ChevronDown className="size-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={0} className="flex flex-col min-w-38.75 gap-4 bg-white text-black rounded-bl-md rounded-br-md">
                <DropdownMenuItem>
                  <Link to="/doctor" className="flex w-full items-center justify-between">
                    Go to Dashboard
                    <ChevronRight />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className=" rounded-full transition-colors cursor-pointer">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {!isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-6 py-2 bg-white text-black rounded-full hover:bg-white/80 duration-300 transition-colors cursor-pointer" >Login</Link>
            <Link to="/signup" className="px-6 py-2  bg-dark-blue-900 hover:bg-dark-blue-900/70 text-white rounded-full cursor-pointer transition-colors duration-300 hover:text-white/70">Sign up</Link>
          </div>
        )}
      </nav>
    </header>
  )
}