import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "@/types/types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { registerUserByAdmin } from "@/services/admin-service";

interface Props {
  onSuccess: () => void;
}


export default function AddUserForm({ onSuccess }: Props) {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<string | UserRole>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate: registerUserMutation, isPending, error } = useMutation({
    mutationFn: registerUserByAdmin,
    onSuccess: () => {
      toast.success("User created successfully");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create a user")
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUserMutation({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role,
    });
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  };


  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <span className="text-red-500">
             {axios.isAxiosError(error)
                ? error.response?.data?.error ?? error.message
                : error.message}
          </span>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="first-name" className="label-class">
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
              className="input-class"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last-name" className="label-class">Last Name</label>
          <input
            type="text"
            id="last-name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isPending}
            required
            className="input-class"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label-class">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E.g, email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
            className="input-class"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="label-class">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required
              className="w-full input-class"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isPending}
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
          <label htmlFor="role" className="label-class">Patient, Doctor or Admin?</label>
          <Select
            id="role"
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
          >
            <SelectTrigger placeholder="Select role" />
            <SelectContent>
              {Object.values(UserRole).map((role) => (
                <SelectOption value={role} key={role}>
                  {role}
                </SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            "Creating..."
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  )
}