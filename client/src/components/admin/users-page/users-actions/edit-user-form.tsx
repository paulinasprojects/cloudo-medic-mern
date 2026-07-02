import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserRole } from "@/types/types";
import { editUserByAdmin } from "@/services/admin-service";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";

interface Props {
  onSuccess: () => void;
  data: User;
}



export default function EditUserForm({ onSuccess, data }: Props) {
  const [firstName, setFirstName] = useState(data.firstName ?? "");
  const [lastName, setLastName] = useState(data.lastName ?? "");
  const [email, setEmail] = useState(data.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string | UserRole>(data.role ?? "");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: editUserMutation, isPending, error } = useMutation({

    mutationFn: (userData: {
      email: string; firstName: string, lastName: string, password: string, role: string
    }) => editUserByAdmin(data.id, userData),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] })
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update the user")
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editUserMutation({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      role: role,
    });
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <span className="text-red-500">{error.message}</span>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="first-name" className="text-sm font-medium text-black dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isPending}
              required
              className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white  placeholder:text-sm placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last-name" className="text-sm font-medium text-black dark:text-white">Last Name</label>
          <input
            type="text"
            id="last-name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isPending}
            required
            className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white  placeholder:text-sm placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E.g, email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
            className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white  placeholder:text-sm placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required
              className="w-full px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-sm  placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
            />
            <button 
              onClick={togglePasswordVisibility}
              type="button"
              disabled={isPending}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff className="size-5"/>
              ) : (
                <Eye className="size-5"/>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-medium text-black dark:text-white">
              Role
          </label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
          >
              <SelectTrigger placeholder="Select role"/>
              <SelectContent>
                {Object.values(UserRole).map((role) => (
                  <SelectOption value={role} key={role}>
                    {role}
                  </SelectOption>
                ))}
              </SelectContent>
          </Select>
        </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            "Updating..."
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  )
}
