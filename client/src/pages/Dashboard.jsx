import { Sparkles, Gem } from 'lucide-react'
import { useState, useEffect } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'

const Dashboard = () => {
  const [creations, setCreations] = useState([])

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* total creations card */}
        <div className='flex justify-between items-center bg-white p-4 rounded-lg shadow-md w-64'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* active plan card */}
        <div className='flex justify-between items-center bg-white p-4 rounded-lg shadow-md w-64'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              <Protect plan='Premium' fallback='free'>Premium</Protect>
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>
      </div>

      <div className='space-y-3 mt-10'>
        <p className='mt-6 mb-4 text-lg font-semibold'>Recent Creations</p>
        {creations.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
