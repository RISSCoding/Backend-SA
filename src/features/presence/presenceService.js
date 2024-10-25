import * as presenceRepo from "./presenceRepo.js";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const getTodaySchedule = async (userID) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    return await presenceRepo.getScheduleForToday(userID, today);
  } catch (error) {
    throw new Error("Error fetching today's schedule.");
  }
};

export const createPresence = async (userID, presenceData) => {
  try {
    return await presenceRepo.createPresence(userID, presenceData);
  } catch (error) {
    throw new Error("Error creating presence.");
  }
};

export const updatePresence = async (userID, presenceData) => {
  try {
    const presence = await presenceRepo.getPresenceForToday(userID);
    if (!presence) {
      throw new Error("No presence data found for today.");
    }

    return await presenceRepo.updatePresence(presence.id, presenceData);
  } catch (error) {
    throw new Error("Error updating presence.");
  }
};

export const getPresenceByUserIdAndDate = async (userID, date) => {
  try {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return await prisma.presence.findFirst({
      where: {
        userId: userID,
        checkInTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  } catch (error) {
    throw new Error("Error fetching presence by user ID and date.");
  }
};

export const getDailyStatistics = async (date) => {
  try {
    const rawData = await presenceRepo.getDailyStatistics(date);
    const statistics = processStatistics(rawData);
    return statistics;
  } catch (error) {
    throw new Error("Error fetching daily statistics.");
  }
};

export const getMonthlyStatistics = async (year, month) => {
  try {
    const rawData = await presenceRepo.getMonthlyStatistics(year, month);
    const statistics = aggregateMonthlyStatistics(rawData, year, month);
    return statistics;
  } catch (error) {
    throw new Error("Error fetching monthly statistics.");
  }
};

export const getYearlyStatistics = async (year) => {
  try {
    const rawData = await presenceRepo.getYearlyStatistics(year);
    const statistics = aggregateYearlyStatistics(rawData);
    return statistics;
  } catch (error) {
    throw new Error("Error fetching yearly statistics.");
  }
};
