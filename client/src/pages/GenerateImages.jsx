import { useState } from "react";
import { Sparkles, Image } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
   const imageStyle =['Realistic' , 'Ghibli Style','Anime Style']
  
    const [selectedStyle,setSelectedStyle]=useState(imageStyle[0])
    const [input,setInput]=useState('')
    const [publish] = useState(false)
    const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const { getToken } = useAuth()

  
    const onsubmitHandler=async(e)=> {
      e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-images",
        { prompt, publish },
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
     <div className='h-full overflow-y-scroll p-2 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border'>
        <div>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'> AI image generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'> Describe you image</p>
        {/* p is padding and px and py is padding in x and y direction
        md= */}
    <textarea onChange={(e)=> setInput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border
     border-gray-300' placeholder='describe what you want in the image...' required/>
     <p className='mt-6 text-sm font-medium'>Style</p>

      { /* flex-Changes the layout from vertical to horizontal.
            mt is margin
            with flex wrap, items automatically move to the next row when needed. */}
      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%]'>
        {imageStyle.map((item) => (
          <button
            type='button'
            key={item}
            onClick={() => setSelectedStyle(item)}
            className={`text-xs px-4 py-3 border rounded-full cursor-pointer transition ${
              selectedStyle === item
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
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#3588F2] to-[#0BB0D7] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Image className="w-5" />
          )}
          Generate Image
        </button>
      </div>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[24rem] max-h-[600px]'>
        <div className='flex items-center gap-3 mb-4'>
          <Image className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Image</h1>
        </div>
        {!content ?(
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <Image className='w-9 h-9' />
            <p>Enter a topic and click 'Generate Image' to get started.</p>
          </div>
        </div>
    
        ) : (
          <div className="mt-3 max-h-[500px] overflow-y-auto text-sm text-slate-600">
            <div className="mt-3 h-full">
              <img src={content} alt="image" className='w-full h-full rounded-lg' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
