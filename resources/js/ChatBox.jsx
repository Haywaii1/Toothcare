import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [authError, setAuthError] = useState("");
  const [connectionError, setConnectionError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(
    localStorage.getItem("auth_user")
      ? JSON.parse(localStorage.getItem("auth_user"))
      : null
  );

  const messagesEndRef = useRef(null);

  window.Pusher = Pusher;

  /** ✅ Scroll to bottom on new messages */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//   window.Pusher = Pusher;
//   window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: "7633d3843f1432e54dc9", // ✅ From .env
//     cluster: "mt1",              // ✅ From .env
//     forceTLS: true,
//   });

//   const channel = window.Echo.channel(`chat.${user.id}`);

//   channel.listen(".ChatEnded", (e) => {
//     alert("Admin has ended the chat session.");
//     setMessages([]);
//   });

//   return () => {
//     channel.stopListening(".ChatEnded");
//   };
// }, []);



  /** ✅ Setup Laravel Echo (Pusher) */
  useEffect(() => {
    if (!token) return;

    try {
      if (window.Echo) window.Echo.disconnect();

      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "7633d3843f1432e54dc9",
        cluster: "mt1",
        forceTLS: true,
        authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
        auth: { headers: { Authorization: `Bearer ${token}` } },
      });

      const channel = window.Echo.private("chat");

      channel.listen(".message.sent", (e) => {
        console.log("📩 Received broadcast:", e);
        setMessages((prev) => {
          if (prev.some((m) => m.id === e.id && e.id)) return prev;
          return [
            ...prev,
            {
              id: e.id || Date.now(),
              message: e.message,
              is_admin: e.is_admin,
              user: e.user,
              user_id: e.user_id,
              created_at: e.created_at || new Date().toISOString(),
            },
          ];
        });
      });

      return () => {
        channel.stopListening(".message.sent");
        window.Echo.disconnect();
      };
    } catch (err) {
      console.error("Echo connection failed:", err);
      setConnectionError("⚠️ Chat connection failed.");
    }
  }, [token]);

  /** ✅ Listen for login/logout changes */
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

  /** ✅ Fetch user chat history */
  const fetchMessages = async (authToken = token) => {
    if (!authToken) return;
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/chat/messages", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });

      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setMessages(data);
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

  /** ✅ Auto-refresh every 1s */
  useEffect(() => {
    if (!isOpen || !token) return;
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, token]);

  /** ✅ Send message */
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
        { message, is_admin: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setMessages((prev) => [...prev, res.data.data]);
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
      {isOpen ? (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <span>
              {connectionError
                ? connectionError
                : token
                  ? "Chat Connected ✅"
                  : "Login required 🚫"}
            </span>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              ×
            </button>
          </div>

          <div style={styles.messages}>
            {!token ? (
              <div style={styles.empty}>Please log in to chat.</div>
            ) : messages.length > 0 ? (
              messages.map((msg, index) => {
                const isAdmin =
                  msg.is_admin === true ||
                  msg.is_admin === 1 ||
                  msg.sender_type === "admin";
                return (
                  <div
                    key={msg.id || index}
                    style={{
                      ...styles.messageWrapper,
                      justifyContent: isAdmin ? "flex-start" : "flex-end",
                    }}
                  >
                    <div
                      style={{
                        ...styles.messageBubble,
                        background: isAdmin ? "#007bff" : "#28a745",
                        borderRadius: isAdmin
                          ? "14px 14px 14px 4px"
                          : "14px 14px 4px 14px",
                        alignSelf: isAdmin ? "flex-start" : "flex-end",
                      }}
                    >
                      <div style={{ fontSize: "13px", lineHeight: "1.3" }}>
                        {msg.message}
                      </div>
                      <small style={styles.timestamp}>
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={styles.empty}>No messages yet.</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form style={styles.inputArea} onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={token ? "Type a message..." : "Login to chat"}
              disabled={!token}
              style={styles.input}
            />
            <button type="submit" disabled={!token} style={styles.sendBtn}>
              ➤
            </button>
          </form>

          {authError && <div style={styles.error}>{authError}</div>}
        </div>
      ) : (
        <button style={styles.toggleBtn} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

/** ✅ Styles */
const styles = {
  wrapper: { position: "fixed", bottom: "20px", left: "20px", zIndex: 9999 },
  chatBox: {
    width: "320px",
    height: "480px",
    background: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  messageWrapper: {
    display: "flex",
    width: "100%",
    marginBottom: "10px",
  },
  messageBubble: {
    display: "inline-block",
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: "14px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    color: "#fff",
    wordBreak: "break-word",
    fontSize: "13px",
    lineHeight: "1.4",
  },
  timestamp: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.8)",
    marginTop: "4px",
    textAlign: "right",
    display: "block",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
    background: "#fafafa",
  },
  input: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    outline: "none",
  },
  sendBtn: {
    marginLeft: "8px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  toggleBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  empty: { textAlign: "center", color: "#777", marginTop: "40%" },
  error: {
    background: "#ffe5e5",
    color: "#d00",
    padding: "5px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default ChatBox;
