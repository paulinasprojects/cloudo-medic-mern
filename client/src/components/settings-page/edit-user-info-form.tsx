import { useAuthStore } from "@/store/auth-store"
import EditAdminForm from "./edit-admin-form";
import EditDoctorForm from "./edit-doctor-form";
import EditPatientForm from "./edit-patient-form";

export default function EditUserInfoForm() {
	const {user} = useAuthStore();
	
	if (user?.role === "admin") {
		 return (
				<div className="flex flex-col gap-2">
			<div className="mt-2.5">
				<h2 className="text-[20px] font-medium text-black dark:text-white">Admin Information</h2>
				<p className="text-sm text-gray-400">Edit Admin information</p>
			</div>
			<div className="mt-5">
			 <EditAdminForm/>
			</div>
		</div>
		 )
	} else if (user?.role === "doctor") {
		 return (
			<div className="flex flex-col gap-2">
			<div className="mt-2.5">
				<h2 className="text-[20px] font-medium text-black dark:text-white">Work Information</h2>
				<p className="text-sm text-gray-400">Edit your work information</p>
			</div>
			<div className="mt-5">
				<EditDoctorForm/>
			</div>
		</div>
		 )
	} else {
		return (
			 <div className="flex flex-col gap-2">
			<div className="mt-2.5">
				<h2 className="text-[20px] font-medium text-black dark:text-white">Medical Information</h2>
				<p className="text-sm text-gray-400">Edit your medical information</p>
			</div>
			<div className="mt-5">
				<EditPatientForm/>
			</div>
		</div>
		)
	}
}
