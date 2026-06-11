import { Link } from "react-router-dom";
import OuterNavbar from "@/components/common/outer-navbar";


const DoctoProfilePage = () => {
  return (
    <div className="background">
      <OuterNavbar />
      <div className="flex flex-col gap-6 items-center justify-center px-0 max-sm:px-7 py-10">
        <h1 className="text-4xl font-bold">Complete your profile</h1>
        <p className="text-2xl font-medium max-sm:text-center">Before you can access the dashboard, we need a few details about you.</p>
        <Link
          to="/doctor/profile/personal-info"
          className="px-5 py-2 mt-10 hover:bg-black/70 dark:hover:bg-white/60 bg-black dark:bg-white text-white dark:text-black rounded-full transition-colors duration-300"
        >
          Get started
        </Link>
      </div>
    </div>
  )
}

export default DoctoProfilePage