import React, { useState } from "react";
import { getSocket } from "../../services/socket";

const MessageInput: React.FC<{ conversationId: number }> = ({
  conversationId,
}) => {
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;
    // optimistic UI could dispatch addMessage with client id
    const socket = getSocket();
    socket?.emit("message:create", {
      conversation_id: conversationId,
      type: "text",
      body: text,
    });
    setText("");
  };

  return (
    <div className="p-3 border-t flex">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={send}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
