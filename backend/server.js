import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* ==========================================
   Security Middlewares
========================================== */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/* ==========================================
   API Routes
========================================== */

app.use("/api/auth", authRoutes);

/* ==========================================
   Health Check
========================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🌸 Flower Backend Running Successfully!",
    version: "1.0.0",
    serverTime: new Date().toISOString(),
  });
});

/* ==========================================
   404 Route
========================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

/* ==========================================
   Global Error Handler
========================================== */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ==========================================
   Start Server
========================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log("🌸 Flower Backend Started");
  console.log(`🚀 Server : http://localhost:${PORT}`);
  console.log("==================================");
});