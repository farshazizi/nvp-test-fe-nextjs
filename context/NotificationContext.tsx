"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

type Notification = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type NotificationContextType = {
  notifications: Notification[];
  removeNotification: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  removeNotification: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Connect ke backend port 3000
    const socket: Socket = io("http://localhost:3000");

    socket.on("connect", () => console.log("Socket connected", socket.id));
    socket.on("notification", (data: Omit<Notification, "id">) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { ...data, id }]);
      setTimeout(
        () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
        5000
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
