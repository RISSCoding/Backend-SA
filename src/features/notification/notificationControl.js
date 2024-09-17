// notificationController.js
const express = require('express');
const NotificationService = require('./notificationService');
const notificationService = new NotificationService();

const router = express.Router();

// Route untuk mengirim notifikasi presensi terlambat
router.post('/late-presence', async (req, res) => {
  try {
    const { accountID } = req.body;
    const notification = await notificationService.sendLatePresenceNotification(accountID);

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Route untuk mengirim notifikasi status pengajuan
router.post('/request-status', async (req, res) => {
  try {
    const { accountID, isApproved } = req.body;
    const notification = await notificationService.sendRequestStatusNotification(accountID, isApproved);

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Route untuk mendapatkan semua notifikasi pengguna
router.get('/:accountID', async (req, res) => {
  try {
    const { accountID } = req.params;
    const notifications = await notificationService.getNotifications(accountID);

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Route untuk menandai notifikasi sebagai dibaca
router.post('/mark-read/:notificationID', async (req, res) => {
  try {
    const { notificationID } = req.params;
    const notification = await notificationService.markNotificationAsRead(notificationID);

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Route untuk menghapus notifikasi
router.delete('/delete/:notificationID', async (req, res) => {
  try {
    const { notificationID } = req.params;
    await notificationService.deleteNotification(notificationID);

    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
