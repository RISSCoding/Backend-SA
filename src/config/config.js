const config = {
  PORT: process.env.PORT || 8040,
  NODE_ENV: process.env.NODE_ENV || "development",

  JWT_SECRET: process.env.JWT_SECRET || "24578563",
  DATABASE_URL: process.env.DATABASE_URL,
  OFFICE_LATITUDE: -6.9418,
  OFFICE_LONGITUDE: 107.6285,
  CHECK_IN_TIME: "08:00",
  CHECK_OUT_TIME: "10:30",
  ALLOWED_RADIUS: 10000,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  WORK_DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

  // New configurations
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3001",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3001",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "123736761",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
  COOKIE_SECURE: process.env.NODE_ENV === "production",
  COOKIE_SAMESITE: process.env.NODE_ENV === "production" ? "none" : "lax",
};

export default config;
