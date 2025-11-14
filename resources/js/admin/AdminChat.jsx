// AdminChat.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const messagesEndRef = useRef(null);

  const axiosConfig = () => ({
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  useEffect(() => {
    setToken(localStorage.getItem("auth_token"));
  }, []);

  useEffect(() => {
    if (!token) return;

    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "YOUR_PUSHER_KEY",
      cluster: "YOUR_PUSHER_CLUSTER",
      forceTLS: true,
      authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
      auth: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    window.Echo.channel("chat").listen(".message.sent", (e) => {
      if (e.user_id === selectedUserId) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: e.message,
            is_admin: !!e.admin_id,
            created_at: new Date().toISOString(),
          },
        ]);
      }
      fetchConversations();
    });

    return () => {
      if (window.Echo) window.Echo.disconnect();
    };
  }, [token, selectedUserId]);

  const fetchConversations = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/chat/conversations",
        axiosConfig()
      );
      setConversations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMessages = async (userId) => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/chat/${userId}/messages`,
        axiosConfig()
      );
      setMessages(res.data);
      setSelectedUserId(userId);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (ev) => {
    ev && ev.preventDefault();
    if (!text.trim() || !selectedUserId) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/send",
        { user_id: selectedUserId, message: text, is_admin: true },
        axiosConfig()
      );
      setMessages((prev) => [...prev, res.data]);
      setText("");
      scrollToBottom();
      fetchConversations();
    } catch (err) {
      console.error("Send failed", err.response?.data || err.message);
    }
  };

  const endChat = () => {
    if (window.confirm("Are you sure you want to end this chat?")) {
      setMessages([]);
      setSelectedUserId(null);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [token]);

  const scrollToBottom = () => {
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  };

  return (
    <div style={{ display: "flex", height: "600px", border: "1px solid #ddd" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 300,
          borderRight: "1px solid #eee",
          overflowY: "auto",
        }}
      >
        <h3 style={{ padding: 12 }}>Conversations</h3>
        {conversations.map((c) => (
          <div
            key={c.user_id}
            onClick={() => loadMessages(c.user_id)}
            style={{
              padding: 12,
              borderBottom: "1px solid #f4f4f4",
              cursor: "pointer",
              background: c.user_id === selectedUserId ? "#f0f8ff" : "#fff",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {c.user?.name || `User ${c.user_id}`}
            </div>
            <div style={{ color: "#666", fontSize: 13 }}>{c.last_message}</div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          <strong>
            {selectedUserId
              ? `Chat with ${conversations.find((x) => x.user_id === selectedUserId)?.user
                ?.name ?? selectedUserId
              }`
              : "Select a conversation"}
          </strong>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: 12,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={m.id || i}
              style={{
                alignSelf: m.is_admin ? "flex-start" : "flex-end",
                background: m.is_admin ? "#007bff" : "#28a745",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: 10,
                margin: "4px 0",
                maxWidth: "65%",
                fontSize: 14,
                wordBreak: "break-word",
              }}
            >
              <div>{m.message}</div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.8)",
                  marginTop: 4,
                  textAlign: "right",
                }}
              >
                {new Date(m.created_at).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        {/* Footer */}
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            padding: 12,
            borderTop: "1px solid #eee",
            alignItems: "center",
            gap: "8px", // space between elements
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              selectedUserId ? "Write a message..." : "Select a user to start"
            }
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 20,
              border: "1px solid #ccc",
              outline: "none",
              fontSize: 14,
            }}
            disabled={!selectedUserId}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!selectedUserId || !text.trim()}
            style={{
              padding: "10px 18px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              cursor: selectedUserId ? "pointer" : "not-allowed",
              fontWeight: 500,
            }}
          >
            Sends
          </button>

          {/* End Chat button (only when user selected) */}
          {selectedUserId && (
            <button
              type="button"
              onClick={endChat}
              style={{
                padding: "10px 18px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              End Chat
            </button>
          )}
        </form>

      </div>
    </div>
  );
};

export default AdminChat;
