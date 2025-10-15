// AdminChat.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const AdminChat = () => {
  const [conversations, setConversations] = useState([]); // [{user_id, user:{id,name}, last_message}]
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

    // init echo
    window.Pusher = Pusher;

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "YOUR_PUSHER_KEY", // replace
      cluster: "YOUR_PUSHER_CLUSTER",
      forceTLS: true,
      authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
      auth: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    window.Echo.channel("chat").listen(".message.sent", (e) => {
      // If message belongs to selected user, append to messages
      if (e.user_id === selectedUserId) {
        setMessages((prev) => [...prev, {
          id: Date.now(),
          message: e.message,
          is_admin: !!e.admin_id,
          created_at: new Date().toISOString()
        }]);
      }

      // Refresh conversations list to show latest preview
      fetchConversations();
    });

    return () => {
      if (window.Echo) window.Echo.disconnect();
    };
    // eslint-disable-next-line
  }, [token, selectedUserId]);

  // Get conversation list (admin)
  const fetchConversations = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/chat/conversations", axiosConfig());
      setConversations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // load messages for selected user
  const loadMessages = async (userId) => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/chat/${userId}/messages`, axiosConfig());
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

  useEffect(() => {
    fetchConversations();
  }, [token]);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div style={{ display: "flex", height: "600px", border: "1px solid #ddd" }}>
      <div style={{ width: 300, borderRight: "1px solid #eee", overflowY: "auto" }}>
        <h3 style={{ padding: 12 }}>Conversations</h3>
        {conversations.map((c) => (
          <div
            key={c.user_id}
            onClick={() => loadMessages(c.user_id)}
            style={{
              padding: 12,
              borderBottom: "1px solid #f4f4f4",
              cursor: "pointer",
              background: c.user_id === selectedUserId ? "#f0f8ff" : "#fff"
            }}
          >
            <div style={{ fontWeight: 600 }}>{c.user?.name || `User ${c.user_id}`}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{c.last_message}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          <strong>{selectedUserId ? `Chat with ${conversations.find(x=>x.user_id===selectedUserId)?.user?.name ?? selectedUserId}` : "Select a conversation"}</strong>
        </div>

        <div style={{ flex: 1, padding: 12, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {messages.map((m, i) => (
            <div key={m.id || i} style={{
              alignSelf: m.is_admin ? "flex-end" : "flex-start",
              background: m.is_admin ? "#d0f0ff" : "#f1f1f1",
              padding: "8px 12px",
              borderRadius: 8,
              margin: "6px 0",
              maxWidth: "70%"
            }}>
              <div>{m.message}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 6 }}>{new Date(m.created_at).toLocaleString()}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form style={{ display: "flex", padding: 12, borderTop: "1px solid #eee" }} onSubmit={sendMessage}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={selectedUserId ? "Write a message..." : "Select a user to start"}
            style={{ flex: 1, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" }}
            disabled={!selectedUserId}
          />
          <button disabled={!selectedUserId || !text.trim()} style={{ marginLeft: 8 }}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default AdminChat;
