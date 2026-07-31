import { useState } from 'react'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'
    >
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='text-l'>{item.prompt}</h2>
          <p className='text-gray-500'>
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="px-4 py-1 rounded-full bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium transition">
          {item.type}
        </button>
      </div>

      {expanded && (
        <div className='mt-4'>
          {item.type === 'image' ? (
            <div>
              <img src={item.content} alt='Generated content' className='mt-3 w-full max-w-md rounded-md' />
            </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
              <div className='reset-tw whitespace-pre-wrap'>
                {item.content}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
