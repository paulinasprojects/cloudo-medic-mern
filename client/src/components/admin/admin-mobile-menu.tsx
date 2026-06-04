import { Menu01FreeIcons, } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../common/sheet";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/utils";
import { } from "radix-ui";
import { CloudoLogo } from "../common/cloudo-logo";
import { links } from "@/types/header-links";

const AdminMobileMenu = () => {
  const { pathname } = useLocation();

  return (
    <div className="lg:hidden block">
      <Sheet>
        <SheetTrigger asChild>
          <HugeiconsIcon icon={Menu01FreeIcons} className="text-white" width={25} height={25} />
        </SheetTrigger>
        <SheetContent side="left" showCloseButton={false}>
          <SheetHeader className="hidden">
            <SheetTitle className="hidden">
              this content here
            </SheetTitle>
            <SheetDescription>this content here</SheetDescription>
          </SheetHeader>
          <div className="my-10 flex items-center justify-center">
            <CloudoLogo />
          </div>
          <ul className="flex flex-col items-center gap-12">
            {links.map((link) => (
              <li key={link.href} >
                <Link to={link.href} className={cn("text-gray-500 hover:text-white duration-300 transition flex items-center gap-4", pathname === link.href && "text-white hover:text-gray-500")}>
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