import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import MessageList from "../components/chat/MessageList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchConversations } from "../features/chat/chatSlice";
import { initSocket } from "../services/socket";

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s: any) => s.auth.accessToken);

  useEffect(() => {
    dispatch(fetchConversations());
    if (token) initSocket(token);
  }, [dispatch, token]);

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
