/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from "react-router-dom";
import "./layout.scss";
import { useOnlineStatus } from '../hooks/useOnlineStatus';

// 
const Layout = () => {
  const isOnline = useOnlineStatus();

  return (
      <div className="app-container relative flex flex-col justify-between bg-[#F4F7FF] h-full py-10 min-h-screen">
          <Outlet></Outlet>
          <span className='absolute bottom-2 right-3'>{isOnline ? '✅ Online' : '❌ Disconnected'}</span>
      </div>
  )
}

export default Layout