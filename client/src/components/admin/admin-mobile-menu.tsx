import { Menu01FreeIcons, } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/utils";
import { CloudoLogoDark, CloudoLogoLight } from "@/components/common/cloudo-logo";
import { links } from "@/types/header-links";
import { useTheme } from "@/store/theme-store";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/common/sheet";

const AdminMobileMenu = () => {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
    <div className="xl:hidden block">
      <Sheet>
        <SheetTrigger asChild>
          <HugeiconsIcon icon={Menu01FreeIcons} className="text-black dark:text-white cursor-pointer" width={25} height={25} />
        </SheetTrigger>
        <SheetContent side="left" showCloseButton={false}>
          <SheetHeader className="hidden">
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <div className="my-10 flex items-center justify-center">
            {theme === "dark" ? (
              <CloudoLogoLight width={150} height={150} />
            ) : (
              <CloudoLogoDark width={150} height={150} />
            )}
          </div>
          <ul className="flex flex-col items-center gap-12">
            {links.map((link) => (
              <li key={link.href} >
                <Link to={link.href} className={cn(
                  "text-gray-400 hover:text-black dark:hover:text-white duration-300 transition flex items-center gap-4",
                  pathname === link.href && "text-black dark:text-white dark:hover:text-gray-500"
                )}>
                  <HugeiconsIcon icon={link.icon} size={25} />
                  <span className="text-2xl">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AdminMobileMenu