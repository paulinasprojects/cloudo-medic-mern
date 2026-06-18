import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/types";
import { editUserByAdmin } from "@/services/admin-service";

interface Props {
  onSuccess: () => void;
  data: User;
}



export default function EditUserForm({ onSuccess, data }: Props) {
  const [firstName, setFirstName] = useState(data.firstName ?? "");
  const [lastName, setLastName] = useState(data.lastName ?? "");
  const [email, setEmail] = useState(data.email ?? "");
  const queryClient = useQueryClient();

  const { mutate: editUserMutation, isPending, error } = useMutation({

    mutationFn: (userData: {
      email: string; firstName: string, lastName: string
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
    });
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
