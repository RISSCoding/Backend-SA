import * as notificationRepo from './notificationRepo.js';

const getNotifications = async (req, res) => {
  const userId = req.user.userId; // Get userId from the authenticated token

  try {
    const notifications = await notificationRepo.getNotificationsByUserId(userId);
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};

export default {
  getNotifications,
};
