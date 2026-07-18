import { Sparkles } from 'lucide-react'
import React from 'react'
 
//copied the content from WriteArticle.jsx as the layout is similar.but there are many changes.
const BlogTitles = () => {
  const blogCategories = ['General','Technology','Health','Lifestyle','Buisnees','Travel','Food','Education']
      { length: 800, text: 'short (800-1000 words)' },
      { length: 1000, text: 'medium (1000-1200 words)' },
      { length: 1200, text: 'long (1200+ words)' },
    ]
  
    const [selectedLength,setSelectedLength]=useState(general)
    const [input,setInput]=useState('')
  
    const onsubmitHandler=async(e)=> {
      e.preventDefault();
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border'>
        <div>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'> Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'> Keyword</p>
        {/* p is padding and px and py is padding in x and y direction
        md= */}
    <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border
     border-gray-300' placeholder='the future of ai is.....' required/>
     <p className='mt-6 text-sm font-medium'>Category</p>

      { /* flex-Changes the layout from vertical to horizontal.
            mt is margin
            with flex wrap, items automatically move to the next row when needed. */}
      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%]'>
        {blogCategories.map((item, index) => (
          <button
            type='button'
            key={index}
            onClick={() => setSelectedLength(item)}
            className={`text-xs px-4 py-3 border rounded-full cursor-pointer transition ${
              selectedLength.text === item.text
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : 'text-gray-500 border-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='mt-6'>
        <button
          type='submit'
          className='w-full flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] px-4 py-3 text-white shadow-sm'
        >
          <Edit className='w-5 h-5' />
          Generate Article
        </button>
      </div>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[24rem] max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Article</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Edit className='w-9 h-9' />
            <p>Enter a topic and click 'Generate Article' to get started.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles
