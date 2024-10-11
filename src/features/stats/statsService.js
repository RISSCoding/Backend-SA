// src/features/stats/statsService.js


import * as presenceService from "../presence/presenceService.js";
import * as leaveService from "../leave/leaveService.js";
import dayjs from "dayjs";

export const getCombinedStats = async (year, month) => {
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-${daysInMonth}`;

  const presenceStats = await presenceService.getPresenceStatsByDateRange(
    startDate,
    endDate
  );
  const leaveStats = await leaveService.getLeaveStatsByDateRange(
    startDate,
    endDate
  );

  return {
    presenceStats,
    leaveStats,

  };
};
