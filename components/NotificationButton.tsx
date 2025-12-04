"use client";

import { useNotification } from "../context/NotificationContext";
import { useState } from "react";

export default function NotificationButton() {
  const { notifications } = useNotification();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <button onClick={() => setOpen(!open)}>
        Notifications ({notifications.length})
      </button>
      {open && (
        <div
          style={{
            marginTop: 10,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 10,
            width: 250,
          }}
        >
          {notifications.map((n, i) => (
            <div
              key={i}
              style={{
                padding: 5,
                marginBottom: 5,
                borderRadius: 4,
                background: n.type === "success" ? "#d4edda" : "#f8d7da",
              }}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
