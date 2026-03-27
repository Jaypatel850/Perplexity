import React, { useEffect } from 'react'
import { useChat} from '../hooks/usechat';
import { useSelector } from 'react-redux'
const Dashboard = () => {
  const chat = useChat();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("🚀 Dashboard mounted, starting socket services...");
    chat.socket()
  },[]);
  console.log("Dashboard user:", user);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard