// src/features/stats/statsService.js

import * as presenceService from '../presence/presenceService.js';
import * as leaveService from '../leave/leaveService.js';

export const getCombinedStats = async () => {
  const presenceStats = await presenceService.getPresenceStats();
  const leaveStats = await leaveService.getLeaveStats();

  return {
    presence: presenceStats,
    leave: leaveStats
  };
};
