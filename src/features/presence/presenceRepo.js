import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getScheduleForToday = async (userID, today) => {
  try {
    return await prisma.schedule.findFirst({
      where: {
        userId: userID,
        date: today,
      },
    });
  } catch (error) {
    throw new Error("Error fetching today's schedule.");
  }
};

export const createPresence = async (userID, presenceData) => {
  try {
    return await prisma.presence.create({
      data: {
        userId: userID,
        checkInTime: presenceData.checkInTime,
        checkInLocation: presenceData.checkInLocation,
        status: presenceData.status,
      },
    });
  } catch (error) {
    throw new Error("Error creating presence.");
  }
};

export const getPresenceForToday = async (userID) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    return await prisma.presence.findFirst({
      where: {
        userId: userID,
        checkInTime: {
          gte: new Date(`${today}T00:00:00`),
          lt: new Date(`${today}T23:59:59`),
        },
      },
    });
  } catch (error) {
    throw new Error("Error fetching today's presence.");
  }
};

export const updatePresence = async (presenceID, presenceData) => {
  try {
    return await prisma.presence.update({
      where: { id: presenceID },
      data: presenceData,
    });
  } catch (error) {
    throw new Error("Error updating presence.");
  }
};

export const getDailyStatistics = async (date) => {
  try {
    return await prisma.presence.findMany({
      where: {
        checkInTime: {
          gte: new Date(`${date.toISOString().split("T")[0]}T00:00:00`),
          lt: new Date(`${date.toISOString().split("T")[0]}T23:59:59`),
        },
      },
    });
  } catch (error) {
    throw new Error("Error fetching daily statistics.");
  }
};

export const getMonthlyStatistics = async (year, month) => {
  try {
    return await prisma.presence.findMany({
      where: {
        checkInTime: {
          gte: new Date(`${year}-${month}-01T00:00:00`),
          lt: new Date(`${year}-${month}-31T23:59:59`),
        },
      },
    });
  } catch (error) {
    throw new Error("Error fetching monthly statistics.");
  }
};

export const getYearlyStatistics = async (year) => {
  try {
    return await prisma.presence.findMany({
      where: {
        checkInTime: {
          gte: new Date(`${year}-01-01T00:00:00`),
          lt: new Date(`${year}-12-31T23:59:59`),
        },
      },
    });
  } catch (error) {
    throw new Error("Error fetching yearly statistics.");
  }
};
