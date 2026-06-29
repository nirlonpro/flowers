import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  // 1 minute
  windowMs: 1 * 60 * 1000,

  // Allow 5 attempts per minute
  max: 5,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },

  standardHeaders: true,
  
  legacyHeaders: false,
});

export default loginLimiter;