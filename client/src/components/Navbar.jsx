import React from 'react'
import { assets } from '../assets/assets'
//helps in navigating to different pages without reloading the page
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    //after clicking on image,it will navigate to home page(/)

    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
      <img src={assets.logo} alt='logo' className='w-20 cursor-pointer' onClick={() => navigate('/')} />

      {user ? (
        <UserButton />
      ) : (
        <button
          className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
          onClick={() => openSignIn()}
        >
          Get Started <ArrowRight className='w-4 h-4' />
        </button>
      )}
    </div>


  )
}

export default Navbar
