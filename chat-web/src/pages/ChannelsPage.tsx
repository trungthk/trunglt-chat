import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadChannels } from "../features/channel/channelSlice";
import { setSelectedChannel } from "../features/ui/uiSlice";
import { useTranslations } from "../utils/translations";

const ChannelsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: channels, loading } = useAppSelector((state) => state.channel);
  const selectedChannel = useAppSelector((state) => state.ui.selectedChannel);
  const language = useAppSelector((state) => state.ui.language);
  
  const t = useTranslations(language);

  useEffect(() => {
    dispatch(loadChannels());
  }, [dispatch]);

  const handleChannelSelect = (channelId: string | null) => {
    dispatch(setSelectedChannel(channelId));
  };

  const getChannelItemClass = (channelId: string | null) => {
    const baseClass = "border p-3 rounded cursor-pointer transition-colors duration-200";
    const isActive = selectedChannel === channelId;
    
    if (isActive) {
      return `${baseClass} bg-blue-100 border-blue-300 text-blue-800`;
    }
    return `${baseClass} hover:bg-gray-50 hover:border-gray-300`;
  };

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">{t.channels}</h2>
        <div className="text-gray-500">
          {language === 'vi' ? 'Đang tải kênh...' : 'Loading channels...'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">{t.channels}</h2>
      
      {/* All button */}
      <div className="mb-4">
        <div
          onClick={() => handleChannelSelect(null)}
          className={getChannelItemClass(null)}
        >
          <div className="font-medium flex items-center">
            <span className="mr-2">📋</span>
            {language === 'vi' ? 'Tất cả' : 'All'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {language === 'vi' ? 'Hiển thị tin nhắn từ tất cả kênh' : 'Show messages from all channels'}
          </div>
        </div>
      </div>

      {/* Channels list */}
      <ul className="space-y-2">
        {channels.map((channel) => (
          <li
            key={channel.id}
            onClick={() => handleChannelSelect(channel.id)}
            className={getChannelItemClass(channel.id)}
          >
            <div className="font-medium flex items-center">
              <span className="mr-2">#</span>
              {channel.name}
            </div>
            {channel.source && (
              <div className="text-xs text-gray-500 mt-1">{channel.source}</div>
            )}
            {channel.description && (
              <div className="text-xs text-gray-600 mt-1">{channel.description}</div>
            )}
          </li>
        ))}
      </ul>

      {/* Selected channel indicator */}
      {selectedChannel && (
        <div className="mt-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
          {language === 'vi' ? 'Đang xem kênh:' : 'Viewing channel:'} <strong>
            {channels.find(c => c.id === selectedChannel)?.name || 'Unknown'}
          </strong>
        </div>
      )}
      
      {!selectedChannel && (
        <div className="mt-4 p-2 bg-gray-50 rounded text-sm text-gray-700">
          {language === 'vi' ? 'Đang xem:' : 'Viewing:'} <strong>{t.allChannels}</strong>
        </div>
      )}
    </div>
  );
};

export default ChannelsPage;
