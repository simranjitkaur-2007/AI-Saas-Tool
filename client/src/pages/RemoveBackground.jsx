import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  
   
    const [input , setInput] = useState('')
    const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const { getToken } = useAuth()
  
    const onsubmitHandler = async (e) => {
      e.preventDefault()
      // Add title generation logic here
     try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post("/api/ai/remove-background", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
   <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border'>
        <div>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'> Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'> Upload image</p>
        {/* p is padding and px and py is padding in x and y direction
        md= */}
    <input onChange={(e)=> setInput(e.target.files[0])}  type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border
     border-gray-300'   required/>
    
      { /* flex-Changes the layout from vertical to horizontal.
            mt is margin
            with flex wrap, items automatically move to the next row when needed. */}
      <p className='text-xs text-gray-500 font-light mt-1'> supports jpg,png and other formats</p>
      
      <div className='mt-6'>
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove Background
        </button>
      </div>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[24rem]'>
        <div className='flex items-center gap-3 mb-4'>
          <Eraser className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Titles</h1>
        </div>
        {!content ? (
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Eraser className='w-9 h-9' />
            <p>Upload an image and get the background removed.</p>
          </div>
        </div>
       ) : (
          <div className="mt-3 max-h-[500px] overflow-y-auto text-sm text-slate-600">
            <div className="mt-3 h-full">
              <img
                src={content}
                alt="image"
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;