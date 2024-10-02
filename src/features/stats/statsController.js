// src/features/stats/statsController.js

import * as presenceService from '../presence/presenceService.js';
import * as leaveService from '../leave/leaveService.js';

export const getCombinedStats = async (req, res) => {
  try {
    const presenceStats = await presenceService.getPresenceStats();
    const leaveStats = await leaveService.getLeaveStats();
    
    res.status(200).json({
      presence: presenceStats,
      leave: leaveStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
