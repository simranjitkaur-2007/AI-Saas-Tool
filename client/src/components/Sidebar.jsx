import { Protect, useUser, useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-objects", label: "Remove Objects", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

function Sidebar({ sidebar, setSidebar }) {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col h-screen fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}`}
    >
      <div className="my-7 w-full flex flex-col items-center flex-1 overflow-y-auto">
        {user && (
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
        )}

        <div className="w-full mt-8 px-3">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${isActive
                  ? "bg-blue-400 text-white"
                  : "text-gray-700 hover:bg-gray-100"}`}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
     <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
  <div
    onClick={openUserProfile}
    className="flex gap-2 items-center cursor-pointer"
  >
    <img
      src={user?.imageUrl}
      className="w-8 h-8 rounded-full"
      alt="User Avatar"
    />

    <div>
      <h1 className="text-sm text-gray-700 font-semibold">
        {user?.fullName}
      </h1>

      <p className="text-xs text-gray-500">
        <Protect plan="premium" fallback="Free">
          Premium
        </Protect>
      </p>
    </div>
  </div>

  <LogOut
    onClick={() => signOut()}
    className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer"
  />
</div>
</div>
  );
}
    
  
export default Sidebar