import * as presenceService from './presenceService.js';

const recordPresence = async (req, res) => {
  try {
    const { latitude, longitude, type } = req.body;
    const userId = req.user.userId; // Get userId from the authenticated token

    if (!presenceService.isWithinAllowedRadius(latitude, longitude)) {
      return res.status(400).json({ error: 'You are not within the allowed radius for presence recording.' });
    }

    if (!presenceService.isWorkDay(new Date())) {
      return res.status(400).json({ error: 'Presence can only be recorded on work days (Monday to Friday).' });
    }

    if (!presenceService.isWithinWorkHours(new Date(), type)) {
      return res.status(400).json({ error: `${type === 'checkIn' ? 'Check-in' : 'Check-out'} is not allowed at this time.` });
    }

    const presence = await presenceService.recordPresence(userId, latitude, longitude, type);
    res.status(200).json(presence);
  } catch (error) {
    console.error('Error in recordPresence:', error);
    res.status(400).json({ error: error.message });
  }
};

export default {
  recordPresence,
};
