import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import router from "./router/router.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle OPTIONS requests explicitly
app.options("*", cors(corsOptions));

app.use(cookieParser(config.COOKIE_SECRET));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  if (req.method !== "OPTIONS") {
    console.log("Body:", req.body);
  }
  next();
});

// Set security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Log cookies for debugging
app.use((req, res, next) => {
  console.log("Cookies:", req.cookies);
  next();
});

app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      ...(config.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

app.listen(config.PORT, () => {
  console.log(
    `Server running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});

export default app;
