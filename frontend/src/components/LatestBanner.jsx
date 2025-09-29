import React from 'react'
import { assests } from '../assets/assests';


const LatestBanner = () => {
  return (
    <div className='flex flex-col sm:flex-row border boder-gray-400 mb-3'>
      {/* LatestBanner left side */}
      <div className='w-full sm:w-1/1 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
             <div className='flex items-center gap-2'>
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                  <p className='font-medium text-5m md:text-base '>OUR BESTSELLER</p>
             </div>
             <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-green-600'>Latest Arrivals</h1>
             <div className='flex items-center gap-2'>
                  <p className='font-semibold text-5m md:text-base'>SHOP NOW</p>
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
             </div>
        </div>
      </div>
      {/* LatestBanner right side */}
      <img className='w-full sm:w-1/3' src={assests.lemonplant} alt="" />
    </div>
  )
}

export default LatestBanner;