import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react';
import { UserRole } from "@/types/types";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignupForm() {
  const { signup, error, isLoading } = useAuthStore();
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const success = await signup(email, password, role, firstName, lastName);
    if (success) {
      toast.success("Signed up completed successfully")
      navigate("/login")
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  };

  return (
    <section className="w-full mx-auto px-4 py-4 sm:px-4">
      <div className="border border-[#EBEBEB] rounded-3xl p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <span className="mt-5 text-red-500 text-sm">
              {error}
            </span>
          )}
          <div className="flex flex-col gap-2 mt-6">
            <label htmlFor="first-name" className="text-sm font-medium text-white">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              className="px-4 py-1 border border-slate-700 rounded-full text-white placeholder:text-sm placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="last-name" className="text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                className="px-4 py-1 border border-slate-700 rounded-full text-white placeholder:text-sm placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                placeholder="E.g, email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="px-4 py-1 border border-slate-700 rounded-full text-white placeholder:text-sm placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-1 border border-slate-700 rounded-full text-white placeholder:text-sm placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
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
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="role" className="text-sm font-medium text-white">Are you a patient or doctor?</label>
              <select
                name="role" id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={isLoading}
                className="px-4 py-3 border border-slate-700 rounded-sm text-white placeholder:text-sm placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
              >
                {Object.values(UserRole).splice(1, 3).map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/80 transition-colors cursor-pointer font-medium"
          >
            {isLoading ? (
              "Signing up"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-5 text-sm font-normal">
          Already have an account?{" "}
          <Link to="/login" className="text-[12px] text-white hover:text-white/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}