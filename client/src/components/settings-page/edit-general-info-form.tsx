import { useAuthStore } from "@/store/auth-store"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditGeneralInfoForm() {
const { editUser, user, error, isLoading } = useAuthStore();
const [email, setEmail] = useState<string>(user?.email || "")
const [password, setPassword] = useState<string>("");
const [showPassword, setShowPassword] = useState<boolean>(false);

function togglePasswordVisibility() {
	setShowPassword((prev) => !prev)
};


async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  	
		const updateData: {email:string, password?:string} = {
        email
    };

    if (password) {
			updateData.password = password
    }
  
    await editUser(updateData); 

		const { error: currentError }  = useAuthStore.getState();

		if (!currentError) {
			toast.success("User updated successfully")
		}
}

  return (
    <div className="mt-5">
			<div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <span className="mt-5 text-red-500 text-sm">{error}</span>
          )}
           <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label-class">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E.g, email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="input-class"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="label-class">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full input-class"
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
        <div className="flex justify-end mt-3">
          <button 
            disabled={isLoading} 
            type="submit" 
            className="w-fit px-6 py-3 rounded-full dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              "Saving..."
            ) : (
              "Save changes"
            )}
          </button>

        </div>
        </form>
      </div>
		</div>
  )
}
