const config = {
  PORT: process.env.PORT || 8040,

  JWT_SECRET: process.env.JWT_SECRET || "24578563",
  DATABASE_URL: process.env.DATABASE_URL,
  OFFICE_LATITUDE: -6.9418,
  OFFICE_LONGITUDE: 107.6285,
  CHECK_IN_TIME: "08:00",
  CHECK_OUT_TIME: "17:00",
  ALLOWED_RADIUS: 10000,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  WORK_DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
};

export default config;
