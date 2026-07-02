import { toast } from "sonner";
import { Tabs } from "radix-ui";
import { useState } from "react";
import { ChevronRight, Trash2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserSharingIcon, SquareLock01Icon } from "@hugeicons/core-free-icons";
import { useAuthStore } from "@/store/auth-store";
import { UserImageModal } from '@/components/auth/user-image-modal';
import DeleteUserImageConfirmationModal from "@/components/auth/delete-user-image-confirmation-modal";
import EditUserInfoForm from "./edit-user-info-form";
import EditGeneralInfoForm from "./edit-general-info-form";

const SettingsTabs = () => {
  const { user, deleteUserImage, isLoading } = useAuthStore();
  	const [isUserImageModalOpen, setIsUserImageModalOpen] = useState<boolean>(false);
    const [isDeletingImageModalOpen, setIsDeletingImageModalOpen] = useState<boolean>(false);
    
    function handleEditUserImage() {
      setIsUserImageModalOpen(true)
    }

	 function handleCloseImageModal() {
    setIsUserImageModalOpen(false);
  }

  function handleDeleteUserImage() {
    setIsDeletingImageModalOpen(true)
  }

  function handleCloseDeletingUserImageModal() {
    setIsDeletingImageModalOpen(false);
  }


  async function confirmDeleteUserImage() {
    await deleteUserImage();
    const { error } = useAuthStore.getState();
    if (!error) {
      setIsDeletingImageModalOpen(false)
      toast.success("Image deleted successfuly")
    }
  }

  return (
    <>
    <Tabs.Root className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6" defaultValue="tab1">
      <Tabs.List className="flex flex-col items-start gap-5" aria-label="Manage your account">
        <Tabs.Trigger value="tab1" className="bg-white text-black border border-gray-200 dark:hover:text-black hover:text-white hover:bg-black dark:hover:bg-white/90 transition-colors duration-500 p-2 rounded-full flex justify-between md:min-w-80.25">
          <div className="inline-flex items-center gap-2 text-sm">
          <HugeiconsIcon icon={UserSharingIcon}/>
              General
          </div>
          <ChevronRight/>
        </Tabs.Trigger>
        <Tabs.Trigger value="tab2"  className="bg-white text-black border border-gray-200 dark:hover:text-black hover:text-white hover:bg-black  dark:hover:bg-white/90 transition-colors duration-500 p-2 rounded-full flex justify-between md:min-w-80.25">
          <div className="inline-flex items-center gap-2 text-sm">
            <HugeiconsIcon icon={SquareLock01Icon}/>
             {user?.role === "doctor" && (
              <div>
                Work Info
              </div>
              )}
             {user?.role === "patient" && (
              <div>
                Medical Info
              </div>
              )}
             {user?.role === "admin" && (
              <div>
                Admin Info
              </div>
              )}
          </div>
          <ChevronRight/>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div>
        <div className="flex gap-3">
          <HugeiconsIcon icon={UserSharingIcon} className="size-7"/>
          <span className="text-lg font-medium">General Settings</span>
        </div>
        <div className="flex lg:items-center max-sm:items-start lg:flex-row sm:flex-col  max-sm:flex-col gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <span>Image</span>
            <span className="text-sm font-normal text-gray-400">Change your image</span>
          </div>
          <div className="flex  flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={user?.image ?? "/placeholder.png"} alt="" className="size-11.25 object-cover rounded-full" />
              <button className="hover:underline underline-offset-4" onClick={handleEditUserImage}>Upload image</button>
                {user?.image && (
              <button onClick={handleDeleteUserImage}>
                <Trash2 className="text-red-500"/> 
              </button>
                )}
            </div>
            <div>
              <span className="text-sm font-normal text-center text-gray-400">We only support JPG, JPEG, PNG or WEBP file. 5MB max</span>
            </div>
          </div>  
        </div>
          <EditGeneralInfoForm/>
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div>
          <EditUserInfoForm/>
        </div>
      </Tabs.Content>
    </Tabs.Root>
    <UserImageModal
      isOpen={isUserImageModalOpen}
      onClose={handleCloseImageModal}
    />
    <DeleteUserImageConfirmationModal
      onConfirm={confirmDeleteUserImage}
      isOpen={isDeletingImageModalOpen}
      onCancel={handleCloseDeletingUserImageModal}
      isDeleting={isLoading}
    />
    </>
  )
};

export default SettingsTabs;
