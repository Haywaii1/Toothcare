import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken"; // 👈 add this

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // later set to your React app URL
    methods: ["GET", "POST"],
  },
});

// Middleware: authenticate token before allowing connection
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token"));
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // 👈 use same secret as Laravel
    socket.user = decoded; // attach user to socket
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    console.log("No token, disconnecting...");
    return socket.disconnect();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ User authenticated:", decoded);

    socket.on("chatMessage", (data) => {
      io.emit("chatMessage", { user: decoded.email, text: data.text });
    });

  } catch (err) {
    console.log("❌ Invalid token:", err.message);
    socket.disconnect();
  }
});

httpServer.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});
