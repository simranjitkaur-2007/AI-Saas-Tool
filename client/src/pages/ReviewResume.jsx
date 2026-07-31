import { useState } from "react"
import { FileText, Sparkles } from "lucide-react"
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);
      formData.append("notes", object);

      const token = await getToken();
      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left Column - Form */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-2'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Review Resume</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input 
          onChange={(e) => setInput(e.target.files[0])}  
          type="file" 
          accept='application/pdf' 
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'   
          required 
        />
        <p className='mt-1 text-xs text-gray-400'>Supports PDF resumes only</p>

        <p className='mt-6 text-sm font-medium'>Additional Notes / Focus Areas</p>
        <textarea 
          onChange={(e) => setObject(e.target.value)} 
          value={object} 
          rows={4} 
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
          placeholder='Specify any specific feedback or improvements you want...' 
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#3588F2] to-[#0BB0D7] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <FileText className="w-5 h-5" />
          )}
          Review Resume
        </button>
      </form>

      {/* Right Column - Results */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[24rem]'>
        <div className='flex items-center gap-3 mb-4'>
          <FileText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Analysis Result</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-3 text-gray-500'>
              <FileText className='w-9 h-9' />
              <p>Upload a PDF resume to generate feedback.</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 max-h-[500px] overflow-y-auto text-sm text-slate-600 whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;