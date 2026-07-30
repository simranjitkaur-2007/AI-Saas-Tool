import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { assets } from '../assets/assets'
import { useUser,SignIn} from '@clerk/clerk-react'
const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user}=useUser()


  return user ? (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <img
          src={assets.logo}
          alt="Logo"
          className="cursor-pointer"
          onClick={() => navigate('/')}
        />

        {sidebar ? (
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      <div className="flex-1 flex h-[calc(100vh-3.5rem)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn/>
    </div>
  )
}

export default Layout