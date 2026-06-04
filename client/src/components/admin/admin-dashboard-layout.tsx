import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardBrowsingIcon, Doctor01Icon, PatientIcon, Invoice01Icon, Settings02Icon } from "@hugeicons/core-free-icons";
import { useAuthStore } from "@/store/auth-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../common/dropdown-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/utils/utils";
import AdminMobileMenu from "./admin-mobile-menu";
import { CloudoLogo } from "../common/cloudo-logo";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: DashboardBrowsingIcon,
    },
    {
      title: "Doctors",
      href: "/admin/doctors",
      icon: Doctor01Icon,
    },
    {
      title: "Patients",
      href: "/admin/patients",
      icon: PatientIcon,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: Invoice01Icon,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings02Icon,
    },
  ]

  function handleLogout() {
    logout();
    navigate("/")
  }

  return (
    <header className="text-white xl:px-12.5 py-8.5 px-5">
      <div className="flex items-center gap-4 justify-between">
        <AdminMobileMenu />
        <nav className="bg-dark-purple-900 px-3 py-4 rounded-full lg:block hidden">
          <div className="flex gap-6 items-center">
            <div>
              <CloudoLogo />
            </div>
            <div>
              <ul className="flex gap-6.75">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className={cn("text-gray-500 hover:text-white duration-300 transition flex items-center gap-2", pathname === link.href && "text-white hover:text-gray-500")}>
                      <HugeiconsIcon icon={link.icon} size={20} />
                      <span className="xl:text-[16px] lg:text-[13px]">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </nav>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-2 sm:py-3 max-sm:py-2 bg-dark-purple-900 rounded-full data-[state=open]:rounded-none data-[state=open]:rounded-tl-md data-[state=open]:rounded-tr-md">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="profile image" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col items-start">
                  <span className="text-white capitalize text-[16px] font-mono font-bold">{user?.firstName} {" "} {user?.lastName} </span>
                  <span className="text-[12px] text-white">{user?.email}</span>
                </div>
                <ChevronDown className="size-5 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={0} className="flex flex-col min-w-38.75 gap-4 bg-dark-blue-900 text-white rounded-bl-md rounded-br-md">
              <DropdownMenuItem className="focus:bg-white focus:text-black transition duration-300">
                <Link to="/admin" className="flex w-full items-center justify-between">
                  Go to Dashboard
                  <ChevronRight />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white focus:text-black transition duration-300">
                <button
                  onClick={handleLogout}
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