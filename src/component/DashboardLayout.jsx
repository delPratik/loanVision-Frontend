import React, { useState } from 'react'
import { Sidebar } from './Sidebar';
import DashboardHeaders from './Headers';
 
export const Dashboard_Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
<>
<div className="flex h-screen overflow-hidden fixed top-0 left-0">
      <Sidebar />
      <div className="flex flex-1 flex-col ">
        <DashboardHeaders sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </div>
</>
  )
}
