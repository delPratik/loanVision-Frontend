import React from 'react'

import { Outlet } from 'react-router-dom'
import { Dashboard_Layout } from '../component/DashboardLayout'
export const Dashboard = () => {
  return (
 <>
     <div className="w-full h-full flex justify-between gap-16 ">
      <div className="z-9999">
        <Dashboard_Layout />
      </div>
      <div className="ml-10 overflow-y-auto py-4  h-[100vh] w-full mr-2">
        <Outlet/>
      </div>
    </div>
    </>
  )
}
