import { getToken, onMessage } from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";
import { messaging } from "./firebase";

export const requestPermission = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

export const subscribePushNotifications = () => {
  onMessage(messaging, (payload: MessagePayload) => {
    console.log("Message received. ", payload);
    // You can dispatch notification to Redux or show toast here.
  });
};
