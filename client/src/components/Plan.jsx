import { PricingTable } from '@clerk/clerk-react'
import React from 'react'


const plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
            <h2 className='text-3xl font-bold mb-4'>Choose Your Plan</h2>
            <p className='text-gray-600'>Select the plan that best fits your needs and start creating amazing content with our AI-powered tools.</p>
        </div>
        <div className='mt-8'>
           <PricingTable/> 
        </div>
      
    </div>
  )
}

export default plan
