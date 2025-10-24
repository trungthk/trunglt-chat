import React from "react";
import Avatar from "../ui/Avatar";

interface MessageBubbleProps {
  message: {
    id: string;
    text?: string;
    senderName: string;
    senderAvatar?: string;
    type?: "text" | "image" | "file" | "video";
    createdAt: string;
    isOwn: boolean;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.isOwn ? "justify-end" : "justify-start"} mb-2`}
    >
      {!message.isOwn && (
        <Avatar src={message.senderAvatar} alt={message.senderName} size="sm" />
      )}
      <div
        className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-sm ml-2 ${
          message.isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.type === "text" && <p>{message.text}</p>}
        {message.type === "image" && (
          <img src={message.text} alt="image" className="rounded-md" />
        )}
        <span className="block text-xs text-gray-400 mt-1 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
