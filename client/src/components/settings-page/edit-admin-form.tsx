import { useGetAdminUser } from "@/hooks/admins/admins"
import { editAdminUser } from "@/services/admin-service"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

export default function EditAdminForm() {
  const {data: admin} = useGetAdminUser();
  const [firstName, setFirstName] = useState<string>(admin?.data?.firstName ?? "")
  const [lastName, setLastName] = useState<string>(admin?.data?.lastName ?? "")
  const { mutate: editAdminUserMutation, isPending, error } = useMutation({
    mutationFn: (adminData: {
      firstName: string;
      lastName: string
    }) => editAdminUser(adminData),
      onSuccess: () => {
      toast.success("User information updated successfully");
    },
    onError: () => {
      toast.error("Failed to update your user information")
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editAdminUserMutation({
      firstName,
      lastName
    });
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <span className="text-sm text-red-500">
             {axios.isAxiosError(error)
                ? error.response?.data?.error ?? error.message
                : error.message}
          </span>
        )}
        <div className="flex flex-col gap-6">
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
      </div>
         <div className="flex justify-end">
         <button
          type="submit"
          disabled={isPending}
          className="edit-button"
        >
          {isPending ? (
            "Editing..."
          ) : (
            "Edit"
          )}
        </button>
        </div>
      </form>
    </div>
  )
}

