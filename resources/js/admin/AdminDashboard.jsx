import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  // Get admin token (either saved or hardcoded)
  const savedToken = localStorage.getItem("admin_token");
  const hardcodedToken = "59|jW3rhEkAJZdTdHQNEbI4ePNiw18cwinuoNZ0ClEm0aa4dffc";
  const token = savedToken || hardcodedToken;

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
  if (selectedUser) {
    const interval = setInterval(() => {
      fetchMessages(selectedUser);
    }, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }
}, [selectedUser]);


  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ Fetch dashboard with recent messages
  const fetchDashboard = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard");
      console.log("Dashboard Data:", res.data);
      setDashboard(res.data.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err.response?.data || err.message);
    }
  };

  // ✅ Fetch full message thread with a selected user
  const fetchMessages = async (userId) => {
    try {
      const res = await axiosInstance.get(`/admin/chat/${userId}/messages`);
      setMessages(res.data.data || []);
      setSelectedUser(userId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ✅ Send reply
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      await axiosInstance.post("/chat/send", {
        receiver_id: selectedUser,
        message: reply,
      });
      setReply("");
      fetchMessages(selectedUser);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!dashboard) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* LEFT PANEL — Admin Stats */}
      <div style={{ width: "30%", paddingRight: "20px" }}>
        <h2>Admin Dashboard</h2>
        <p><strong>Total Users:</strong> {dashboard?.total_users}</p>
        <p><strong>Total Messages:</strong> {dashboard?.total_messages}</p>
        <p><strong>Admin:</strong> {dashboard?.admin?.name}</p>

        {/* ✅ RECENT CHATS */}
        <h3>Recent Chats</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {dashboard?.recent_messages?.length > 0 ? (
            dashboard.recent_messages.map((chat) => (
              <li
                key={chat.id}
                onClick={() => fetchMessages(chat.user.id)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                  background:
                    selectedUser === chat.user.id ? "#e6f0ff" : "#f9f9f9",
                  border: "1px solid #ddd",
                }}
              >
                <strong>{chat.user?.name}</strong>
                <p style={{ margin: 0, color: "#555" }}>
                  {chat.message.length > 40
                    ? chat.message.slice(0, 40) + "..."
                    : chat.message}
                </p>
              </li>
            ))
          ) : (
            <p>No recent chats</p>
          )}
        </ul>
      </div>

      {/* RIGHT PANEL — Chat Window */}
      <div
        style={{
          width: "70%",
          borderLeft: "1px solid #ccc",
          paddingLeft: "20px",
        }}
      >
        {selectedUser ? (
          <>
            <h3>
              Chat with{" "}
              {
                dashboard?.recent_messages?.find(
                  (c) => c.user.id === selectedUser
                )?.user?.name
              }
            </h3>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                marginBottom: "10px",
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {messages.length > 0 ? (
                messages.map((m) => (
                  <div key={m.id} style={{ marginBottom: "6px" }}>
                    <strong>{m.sender_name || "User"}:</strong> {m.message}
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>

            <form onSubmit={sendMessage}>
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "80%", padding: "8px" }}
              />
              <button type="submit" style={{ padding: "8px 16px" }}>
                Send
              </button>
            </form>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
