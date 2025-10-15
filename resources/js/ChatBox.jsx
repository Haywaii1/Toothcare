import React, { useState, useEffect } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(
    localStorage.getItem("auth_user")
      ? JSON.parse(localStorage.getItem("auth_user"))
      : null
  );

  window.Pusher = Pusher;

  useEffect(() => {
    if (!token) return;

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "7633d3843f1432e54dc9", // your key
      cluster: "mt1",
      forceTLS: true,
      authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    window.Echo.private("chat").listen(".message.sent", (e) => {
      console.log("📩 New message received:", e);
      setMessages((prev) => [
        ...prev,
        { message: e.message, is_admin: e.sender === "Admin" },
      ]);
    });

    return () => {
      if (window.Echo) {
        window.Echo.disconnect();
      }
    };
  }, [token]);


  // ✅ React to login/logout events
  useEffect(() => {
    const handleAuthChange = () => {
      const newToken = localStorage.getItem("auth_token");
      const newUser = localStorage.getItem("auth_user")
        ? JSON.parse(localStorage.getItem("auth_user"))
        : null;

      setToken(newToken);
      setUser(newUser);

      if (!newToken) {
        setMessages([]);
        setAuthError("You must be logged in to chat.");
      } else {
        setAuthError("");
        fetchMessages(newToken);
      }
    };

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // ✅ Fetch messages for logged-in user
  const fetchMessages = async (authToken = token) => {
    if (!authToken) return;

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/chat/messages", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to load messages:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setToken(null);
        setUser(null);
        setMessages([]);
        setAuthError("Session expired. Please log in again.");
        window.dispatchEvent(new Event("authChanged"));
      }
    }
  };

  useEffect(() => {
    if (isOpen && token) fetchMessages();
  }, [isOpen, token]);

  // ✅ Send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!token) {
      setAuthError("You must be logged in to send messages.");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/send",
        {
          message, // ✅ only send message
          is_admin: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (error) {
      console.error("❌ Message send failed:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setToken(null);
        setUser(null);
        setMessages([]);
        setAuthError("Authentication failed. Please log in again.");
        window.dispatchEvent(new Event("authChanged"));
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      {isOpen && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <span>{token ? "Chat Connected ✅" : "Login required 🚫"}</span>
            <button onClick={() => setIsOpen(false)}>−</button>
          </div>

          <div style={styles.messages}>
            {!token ? (
              <div style={{ textAlign: "center", color: "#777" }}>
                Please log in to view and send messages.
              </div>
            ) : messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  style={{
                    ...styles.messageItem,
                    background: msg.is_admin ? "#e0f7ff" : "#f1f1f1",
                    alignSelf: msg.is_admin ? "flex-start" : "flex-end",
                  }}
                >
                  <div>{msg.message}</div>
                  <small style={styles.timestamp}>
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </small>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", color: "#777" }}>
                No messages yet.
              </div>
            )}
          </div>

          <form style={styles.inputArea} onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={token ? "Type a message..." : "Login to chat"}
              disabled={!token}
            />
            <button type="submit" disabled={!token}>
              Send
            </button>
          </form>

          {authError && <div style={styles.error}>{authError}</div>}
        </div>
      )}

      {!isOpen && (
        <button style={styles.toggleBtn} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

const styles = {
  wrapper: { position: "fixed", bottom: "20px", left: "20px", zIndex: 9999 },
  chatBox: {
    width: "300px",
    height: "450px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  error: {
    background: "#ffe5e5",
    color: "#d00",
    padding: "5px",
    fontSize: "14px",
    textAlign: "center",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  inputArea: { display: "flex", padding: "10px", borderTop: "1px solid #ccc" },
  toggleBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  messageItem: {
    marginBottom: "10px",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  timestamp: { fontSize: "11px", color: "#777", marginTop: "4px", display: "block" },
};

export default ChatBox;
