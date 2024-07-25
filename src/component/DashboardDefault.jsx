import React from 'react'
import { Sidebar } from './Sidebar'
import Header from './Headers'





export const Dashboard_default = () => {
  return (
   <>
   <div className="flex flex-row  bg-neutral-100 h-screen w-screen  top-0 left-0 overflow-hidden">
      <div className="bg-black">
    <Sidebar/>
      </div>
      <div className=''>
      <div className="  mt-0 overflow-y-auto w-full mr-2 ">
      <div className='bg-teal-200'><Header/></div>
      </div>
    
      </div>
    </div>
   </>
  )
}
