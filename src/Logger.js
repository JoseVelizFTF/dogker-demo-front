import React, { useState, useEffect } from "react";
import { getSocket } from "./api/socket";
export const Logger = () => {
  const socket = getSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      messages.length > 0 &&
        setMessages(messages.splice(0, messages.length - 1));
    }, 2000);
    return () => clearInterval(setIntervalId);
  });

  useEffect(() => {
    socket &&
      socket.on("err", (msg) => {
        setMessages((msgs) => [...msgs, msg]);
      });
  }, [socket]);

  return (
    <div
      style={{
        display: "fixed",
        position: "absolute",
        top: 0,
        right: 0,
        background: "",
      }}
    >
      <ul
        style={{
          textDecoration: "none",
          padding: 0,
          margin: 0,
          backgroundColor: "transparent",
        }}
      >
        {messages.reverse().map((message, idx) => (
          <li
            style={{
              backgroundColor: "red",
              color: "white",
              margin: "0.5rem",
              borderRadius: "10px",
              padding: "8px 0.5rem",
              fontWeight: "600",
            }}
            key={idx}
          >
            Error: {message}
          </li>
        ))}
      </ul>
    </div>
  );
};
