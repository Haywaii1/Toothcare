import React, { useEffect, useState } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Swal from "sweetalert2";



const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  // ✅ Admin token
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
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "YOUR_PUSHER_KEY",
      cluster: "YOUR_PUSHER_CLUSTER",
      forceTLS: true,
    });

    // Listen for chat end events
    if (selectedUser) {
      const channel = window.Echo.channel(`chat.${selectedUser}`);

      channel.listen(".ChatEnded", (e) => {
        alert("Chat with this user has ended.");
        setMessages([]);
        setSelectedUser(null);
      });

      return () => {
        channel.stopListening(".ChatEnded");
      };
    }
  }, [selectedUser]);

  // ✅ Fetch dashboard
  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ Auto-refresh messages every 1 second
  useEffect(() => {
    if (selectedUser) {
      const interval = setInterval(() => fetchMessages(selectedUser), 1000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  const fetchDashboard = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err.response?.data || err.message);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await axiosInstance.get(`/admin/chat/${userId}/messages`);
      const payload = res.data.data ?? res.data;

      // Normalize message format
      const normalized = (payload || []).map((m) => ({
        id: m.id,
        message: m.message,
        sender_type: m.sender_type
          ? m.sender_type
          : m.is_admin
            ? "admin"
            : "user",
      }));

      setMessages(normalized);
      setSelectedUser(userId);
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      await axiosInstance.post("/admin/chats/send", {
        user_id: selectedUser,
        message: reply,
      });

      const newMessage = {
        id: Date.now(),
        message: reply,
        sender_type: "admin",
      };
      setMessages((prev) => [...prev, newMessage]);
      setReply("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  // ✅ End Chat handler
  const endChat = async () => {
    if (!selectedUser) return;

    // ✅ Confirmation modal
    const result = await Swal.fire({
      title: "End Chat?",
      text: "Are you sure you want to end this chat? All messages will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, end chat",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/admin/chat/${selectedUser}/end`);

      // ✅ Success feedback
      await Swal.fire({
        title: "Chat Ended",
        text: res.data.message || "Chat ended and deleted successfully.",
        icon: "success",
        confirmButtonColor: "#007bff",
      });

      // Reset UI
      setMessages([]);
      setSelectedUser(null);
      fetchDashboard();
    } catch (error) {
      console.error("Error ending chat:", error.response?.data || error.message);

      Swal.fire({
        title: "Error",
        text: "Failed to end chat. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };


  if (!dashboard) return <p>Loading dashboard...</p>;

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* LEFT PANEL */}
      <div style={{ width: "30%", paddingRight: "20px" }}>
        <h2>Admin Dashboard</h2>
        <p><strong>Admin:</strong> {dashboard?.admin?.name}</p>
        <p><strong>Total Users:</strong> {dashboard?.total_users}</p>
        <p><strong>Total Messages:</strong> {dashboard?.total_messages}</p>

        <h3 style={{ marginTop: "30px" }}>Recent Chats</h3>
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
                  transition: "background 0.2s",
                }}
              >
                <strong>{chat.user?.name}</strong>
                <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
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

      {/* RIGHT PANEL */}
      <div
        style={{
          width: "70%",
          borderLeft: "1px solid #ccc",
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "column",
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
                flex: 1,
                maxHeight: "450px",
                overflowY: "auto",
                background: "#fff",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {messages.length > 0 ? (
                messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      justifyContent:
                        m.sender_type === "admin" ? "flex-end" : "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          m.sender_type === "admin" ? "#007bff" : "#e9ecef",
                        color: m.sender_type === "admin" ? "#fff" : "#000",
                        padding: "8px 12px",
                        borderRadius: "15px",
                        maxWidth: "60%",
                        wordWrap: "break-word",
                        textAlign:
                          m.sender_type === "admin" ? "right" : "left",
                        alignSelf:
                          m.sender_type === "admin" ? "flex-end" : "flex-start",
                        boxShadow:
                          m.sender_type === "admin"
                            ? "0 1px 4px rgba(0, 123, 255, 0.3)"
                            : "0 1px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      {m.message}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#666" }}>
                  No messages yet.
                </p>
              )}
            </div>

            {/* ✅ Send + End Chat Buttons */}
            <form
              onSubmit={sendMessage}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  marginLeft: "10px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Send
              </button>

              {/* End Chat Button */}
              <button
                type="button"
                onClick={endChat}
                style={{
                  padding: "10px 20px",
                  marginLeft: "10px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#dc3545",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                End Chat
              </button>
            </form>
          </>
        ) : (
          <p>Select a user from recent chats to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
