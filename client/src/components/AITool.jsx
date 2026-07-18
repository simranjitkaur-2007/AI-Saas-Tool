import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiToolsData } from '../assets/assets'
import { useUser } from '@clerk/clerk-react'



const AITool = () => {

    const navigate = useNavigate()
    const user = useUser()
    return (
        <div className='px-4 py-16 bg-white'>
            <div className='text-center max-w-3xl mx-auto'>
                <h2 className='text-slate-800 text-3xl font-bold mb-3 '>Powerful AI Tools</h2>
                <p className='text-slate-600 mt-4'>Transform your ideas into reality with our powerful AI-powered content creation tools.</p>
            </div>
            <div className='max-w-3xl mx-auto mt-15'>
                {AiToolsData.map((tool, index) => (
                    <div
                        key={index}
                        onClick={() => user && navigate(tool.path)}
                        className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 cursor-pointer flex flex-col md:flex-row items-center gap-5 mt-6"
                    >
                        <tool.Icon className='w-12 h-12 text-blue-500'
                            style={{
                                backgroundColor: 'linear-gradient(to bottom,${tool.bg.from},${tool.bg.to})'
                            }} />
                        <h3>{tool.title}</h3>
                        <p>{tool.description}</p>
                        
                    </div>
                ))}
                 <div className='flex justify-center mt-40'>
            </div>
        </div>

            </div>
    )
}

export default AITool
