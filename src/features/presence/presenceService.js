// src/features/presence/presenceService.js
import * as presenceRepo from "./presenceRepo.js";

export const getTodaySchedule = async (userID) => {
  return await presenceRepo.getTodaySchedule(userID);
};

export const createPresence = async (userID, presenceData) => {
  return await presenceRepo.createPresence(userID, presenceData);
};

export const updatePresence = async (presenceID, updateData) => {
  return await presenceRepo.updatePresence(presenceID, updateData);
};

export const getDailyStatistics = async (date) => {
  return await presenceRepo.getDailyStatistics(date);
};

export const getMonthlyStatistics = async (year, month) => {
  const startDate = new Date(year, month - 1, 1); // Tanggal 1 di bulan yang diminta
  const endDate = new Date(year, month, 0); // Tanggal akhir bulan

  const statistics = [];

  for (let day = 1; day <= endDate.getDate(); day++) {
    const date = new Date(year, month - 1, day);
    const dailyStats = await presenceRepo.getDailyStatistics(date);
    statistics.push({ date: date.toISOString().slice(0, 10), dailyStats });
  }

  return statistics;
};
