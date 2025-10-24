import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutAsync } from "../../features/auth/authSlice";
import { useTranslations } from "../../utils/translations";
import Avatar from "../ui/Avatar";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const conv = useAppSelector((s: any) => s.conversations.items);
  const user = useAppSelector((state) => state.auth.user);
  const loggingOut = useAppSelector((state) => state.auth.loggingOut);
  const language = useAppSelector((state) => state.ui.language);
  
  const t = useTranslations(language);

  const handleQuickLogout = async () => {
    if (window.confirm(t.logoutDescription)) {
      try {
        await dispatch(logoutAsync()).unwrap();
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Logout error:", error);
        navigate("/login", { replace: true });
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <Avatar src={user?.avatar} alt={user?.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">
              {user?.name || "Anonymous"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "No email"}
            </p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Link
            to="/settings"
            className="flex-1 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-center"
          >
            {t.settings}
          </Link>
          <button
            onClick={handleQuickLogout}
            disabled={loggingOut}
            className="flex-1 text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
          >
            {loggingOut ? "..." : t.logout}
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b">
        <input 
          placeholder="Search conversations..." 
          className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {conv && conv.length > 0 ? (
            <ul className="space-y-1">
              {conv.map((c: any) => (
                <li 
                  key={c.id} 
                  className="p-3 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {c.title || "Conversation"}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {c.lastMessage || "No messages yet"}
                      </div>
                    </div>
                    {c.unread_count > 0 && (
                      <div className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {c.unread_count}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm">No conversations yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
