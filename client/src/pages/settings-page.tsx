import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import SettingsTabs from '@/components/settings-page/settings-tabs';



const SettingsPage = () => {
  const { isAuthenticated} = useAuthStore();
  const navigate = useNavigate();


  if (!isAuthenticated) {
    navigate("/login")
  }

  return (
    <div className='py-10 px-5'>
      <h1 className='font-medium text-2xl xl:text-[42px]'>
        Settings
      </h1>
      <div className=" bg-white dark:bg-[#0d121d] rounded-3xl py-6 px-4 max-sm:px-9 mt-8">
        <div className='pb-8'>
          <h2 className='text-[20px] font-medium text-black dark:text-white'>Settings</h2>
          <p className='text-sm text-gray-400'>View and edit your personal information</p>
        </div>
        <div>
          <SettingsTabs/>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage