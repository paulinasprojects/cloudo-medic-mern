import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store"

const LoginForm = () => {
  const { login, error, isLoading, clearError } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(email, password);
    const { isAuthenticated, user } = useAuthStore.getState();


    if (isAuthenticated && user) {
      toast.success("Logged in successfully")
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "patient":
          navigate("/patient");
          break;
        default:
          navigate("/");
      }
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  };


  return (
    <section className="w-full mx-auto px-4 py-4 sm:px-4">
      <div className="border border-[#e8e8e8] rounded-xl p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <span className="text-red-400 text-sm">
              {error}
            </span>
          )}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">Email</label>
              <input
                type="email"
                id="email"
                placeholder="E.g, email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white  placeholder:text-sm placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-black dark:text-white ">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-sm  placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-full dark:bg-white dark:text-black bg-black text-white  transition-colors cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              "Signing In"
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-5 text-sm font-normal">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[12px] text-black dark:text-white transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LoginForm