import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
const hero = () => {
    const navigate = useNavigate()
  return (
    <>
    
      <div className='text-center mb-6'>
        <h1 className='text-5xl font-bold mb-4 text-blue-900'>Create amazing content with AI tools</h1>
        <p className='text-lg text-blue-700'>Transform your ideas into reality with our powerful AI-powered content creation tools.</p>
      </div>
      <div className='flex justify-center gap-4 mt-4'>
        <button onClick={() => navigate('/ai')} className='bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 mt-10 rounded'>Get Started</button>
        <button onClick={() => navigate('/demo')} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-10 rounded'>Watch Demo</button>
      </div>
      <div className='flex justify-center items-center gap-2 mt-4 text-blue-700'>
        <img src={assets.user_group} alt='user group' className='h-8' />Trusted by 10k people worldwide
      </div>
      {/*for space */}
      <div className='mt-25 flex justify-center'>
        </div>
  
    </>
  )
}

export default hero