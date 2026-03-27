import {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/hook/useAuth';
const App = () => {
  const { getMeUser } = useAuth();
  useEffect(() => {
    getMeUser();
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App