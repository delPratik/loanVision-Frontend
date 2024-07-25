import React from 'react'
import Headers from '../component/Header'

export const NotAcceptPage = () => {
  return (
   <>
   <Headers/>
   <div className='h-[90vh] mt-40'>
     <div className='flex-col flex items-center'>
       <h1 className='font-bold text-[40px]'>Unfortunately, Your Loan Was Not Accepted</h1>
       <h2 className='font-bold text-[32px] mt-4'>Thank You for Applying</h2>
       <h3 className='text-[24px] mt-2'>Please review your financial information and try again later.</h3>
       <h3 className='text-[24px] mt-2'>If you have any questions, contact our support team.</h3>
     </div>
   </div>
   </>
  )
}