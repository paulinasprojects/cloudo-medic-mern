import { useAuthStore } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';


const SettingsPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login")
  }

  return (
    <div>
      {user?.firstName}
    </div>
  )
}

export default SettingsPage