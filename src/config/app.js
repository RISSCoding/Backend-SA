// app.js
const express = require('express');
const notificationController = require('./notificationController');

const app = express();

app.use(express.json());

// Integrasi Notification Controller
app.use('/api/notifications', notificationController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
