import { io, Socket } from "socket.io-client";
import store from "../app/store";
import { addMessage } from "../features/messages/messagesSlice";

let socket: Socket | null = null;

export const initSocket = (token?: string) => {
  if (socket) return socket;
  socket = io(import.meta.env.VITE_WS_URL || "http://localhost:6001", {
    auth: { token },
  });

  socket.on("connect", () => console.log("socket connected", socket?.id));

  socket.on("message:created", (payload: any) => {
    const { conversation_id, message } = payload;
    store.dispatch(addMessage({ conversationId: conversation_id, message }));
  });

  return socket;
};

export const getSocket = () => socket;
