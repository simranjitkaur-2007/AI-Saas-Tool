import { Heart, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import {dummyPublishedCreationData} from '../assets/assets';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();
const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const toggleLike = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/toggle-like-creations",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        // Optimistically update local state
        setCreations((prev) =>
          prev.map((c) => {
            if (c.id !== id) return c;
            const likes = c.likes || [];
            const userId = user?.id;
            if (likes.includes(userId)) {
              return { ...c, likes: likes.filter((u) => u !== userId) };
            } else {
              return { ...c, likes: [...likes, userId] };
            }
          })
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

useEffect(() => {
  if (user) {
    fetchCreations()
  }
}, [user]
)
return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6 bg-[#F4F7FB]">
      <h2 className="text-xl font-semibold text-slate-700">Community Creations</h2>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll min-h-[300px]">
        {creations.length > 0 ? (
          creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{(creation.likes || []).length}</p>
                <Heart
                  onClick={() => toggleLike(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${(creation.likes || []).includes(user?.id) ? "fill-red-500 text-red-600" : "text-white"}`}
                />
              </div>
            </div>
          </div>
        ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
            <Users className="w-12 h-12 mb-3" />
            <p className="text-sm">No published creations yet.</p>
            <p className="text-xs mt-1">Generate images and publish them to see them here!</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full bg-[#F4F7FB]">
      <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;