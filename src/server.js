
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "API Chatify đang hoạt động",
  });
});

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Máy chủ đang hoạt động bình thường",
  });
});

// Start server
server.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);

  try {
    await connectDB();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});

