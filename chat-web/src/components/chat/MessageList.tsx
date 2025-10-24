import React from "react";
import { List } from "react-virtualized";
import { useAppSelector } from "../../app/hooks";
import { selectFilteredMessages } from "../../features/messages/messagesSlice";

const MessageList: React.FC = () => {
  const filteredMessages = useAppSelector(selectFilteredMessages);
  const selectedChannel = useAppSelector((state) => state.ui.selectedChannel);
  const channels = useAppSelector((state) => state.channel.list);

  const getChannelName = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    return channel ? channel.name : 'Unknown Channel';
  };

  const rowRenderer = ({ index, key, style }: any) => {
    const message = filteredMessages[index];
    return (
      <div key={key} style={style} className="p-2 border-b border-gray-100">
        <div className="bg-gray-100 p-3 rounded max-w-md">
          {/* Show channel info if viewing all channels */}
          {!selectedChannel && message.channelId && (
            <div className="text-xs text-blue-600 mb-1 font-medium">
              #{getChannelName(message.channelId)}
            </div>
          )}
          
          {/* Message content */}
          <div className="text-gray-800">{message.body || message.content}</div>
          
          {/* Message metadata */}
          <div className="text-xs text-gray-500 mt-1 flex justify-between">
            <span>{message.sender || message.username || 'Anonymous'}</span>
            {message.timestamp && (
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (filteredMessages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-lg mb-2">📭</div>
          <div>
            {selectedChannel 
              ? `Chưa có tin nhắn trong kênh ${getChannelName(selectedChannel)}`
              : 'Chưa có tin nhắn nào'
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Header showing current filter */}
      <div className="p-3 bg-gray-50 border-b text-sm text-gray-700">
        {selectedChannel ? (
          <span>Kênh: <strong>#{getChannelName(selectedChannel)}</strong> ({filteredMessages.length} tin nhắn)</span>
        ) : (
          <span>Tất cả kênh ({filteredMessages.length} tin nhắn)</span>
        )}
      </div>
      
      {/* Messages list */}
      <List
        width={600}
        height={540} // Reduced height to account for header
        rowCount={filteredMessages.length}
        rowHeight={80} // Increased height for better display
        rowRenderer={rowRenderer}
      />
    </div>
  );
};

export default MessageList;
