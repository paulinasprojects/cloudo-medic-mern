import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/types";
import { Link, useNavigate } from "react-router-dom";


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
          <img src="/claudo-logo.svg" width={150} height={150} />
        </Link>
        {isAuthenticated ? (
          <div className="flex  gap-6 items-center">
            <span>
              {user?.firstName}
            </span>
            <button onClick={handleLogout} className="bg-amber-600 p-2 rounded-md text-white hover:bg-amber-700 duration-300">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-4 py-2 text-white bg-black rounded-full hover:text-white/70 hover:bg-black/80 duration-300 transition-colors cursor-pointer" >Login</Link>
            <Link to="/signup" className="px-4 py-2  bg-amber-600 text-white rounded-full cursor-pointer transition-colors duration-300 hover:text-white/70">Sign up</Link>
          </div>
        )}
      </nav>
    </header>
  )
}