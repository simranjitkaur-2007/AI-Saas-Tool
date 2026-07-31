import { useState, useEffect, useCallback } from "react";
import { Sparkles, Gem } from "lucide-react";
import { useAuth, Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

// Fixed property casing: baseURL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCreations(data.creations || []);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    const loadDashboard = async () => {
      await getDashboardData();
    };

    loadDashboard();
  }, [getDashboardData]);

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* Total creations card */}
        <div className='flex justify-between items-center bg-white p-4 rounded-lg shadow-md w-64'>
          <div className='text-blue-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* Active plan card */}
        <div className='flex justify-between items-center bg-white p-4 rounded-lg shadow-md w-64'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              <Protect plan='Premium' fallback='Free'>Premium</Protect>
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#518DCD] to-[#518DCD] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-3/4 min-h-[200px]">
          <div className="animate-spin rounded-full h-11 w-11 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          <p className="font-medium text-slate-700">Recent Creations</p>
          {creations.length > 0 ? (
            creations.map((item) => (
              <CreationItem key={item.id || item._id} item={item} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No creations found yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;