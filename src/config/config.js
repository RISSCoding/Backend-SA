const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  OFFICE_LATITUDE: -6.941800,
  OFFICE_LONGITUDE: 107.628500,
  CHECK_IN_TIME: '08:00',
  CHECK_OUT_TIME: '17:00',
  ALLOWED_RADIUS: 200,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  WORK_DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

export default config;
