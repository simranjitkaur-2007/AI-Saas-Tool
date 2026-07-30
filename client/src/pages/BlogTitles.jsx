import { Hash, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
//copied the content from WriteArticle.jsx as the layout is similar.but there are many changes.
const BlogTitles = () => {
  const blogCategories = ['General', 'Technology', 'Health', 'Lifestyle', 'Business', 'Travel', 'Food', 'Education']
  const articleLengths = [
    { length: 800, text: 'short (800-1000 words)' },
    { length: 1000, text: 'medium (1000-1200 words)' },
    { length: 1200, text: 'long (1200+ words)' },
  ]

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0])
  const [selectedLength, setSelectedLength] = useState(articleLengths[0])
  const [input, setInput] = useState('') 
 const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    // Add title generation logic here
  try {
      setLoading(true);
      const prompt = `Write a blog title for the keyword ${input} in the categoty ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );

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
        {blogCategories.map((item) => (
          <button
            type='button'
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`text-xs px-4 py-3 border rounded-full cursor-pointer transition ${
              selectedCategory === item
                ? 'bg-purple-100 text-purple-700 border-purple-200'
                : 'text-gray-500 border-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className='mt-6 text-sm font-medium'>Article Length</p>
      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%]'>
        {articleLengths.map((item) => (
          <button
            type='button'
            key={item.length}
            onClick={() => setSelectedLength(item)}
            className={`text-xs px-4 py-3 border rounded-full cursor-pointer transition ${
              selectedLength.text === item.text
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : 'text-gray-500 border-gray-300'
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>
      <div className='mt-6'>
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate Title
        </button>
      </div>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[24rem]'>
        <div className='flex items-center gap-3 mb-4'>
          <Hash className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Titles</h1>
        </div>
        {!content ? (
          <div className="min-h-80 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="w-9 h-9" />
              <p>Enter a topic and click "Generate Title" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 max-h-[500px] overflow-y-auto text-sm text-slate-600">
            <div className="prose whitespace-pre-wrap">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;