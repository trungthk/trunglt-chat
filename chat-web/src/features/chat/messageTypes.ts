export interface MessagePayload {
  id?: string;
  chatId?: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "file" | "video";
  replyTo?: string;
  tags?: string[];
  createdAt?: string;
}

export interface ChatMessage extends MessagePayload {
  isOwn: boolean;
  senderName: string;
  senderAvatar?: string;
}
