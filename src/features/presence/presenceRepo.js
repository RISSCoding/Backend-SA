
// src/features/presence/presenceRepo.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTodaySchedule = async (userID) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  return await prisma.schedule.findFirst({
    where: {
      AND: [
        {
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        {
          Account: {
            some: {
              userID: userID,
            },
          },
        },
      ],
    },
  });
};

export const getDailyStatistics = async (date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const presenceStats = await prisma.presence.groupBy({
    by: ["status"],
    where: {
      checkInTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    _count: {
      _all: true,
    },
  });

  const leaveStats = await prisma.leaveRequest.groupBy({
    by: ["type"],
    where: {
      startDate: {
        lte: endOfDay,
      },
      endDate: {
        gte: startOfDay,
      },
    },
    _count: {
      _all: true,
    },
  });

  return { presenceStats, leaveStats };
};


export const createPresence = async (userID, presenceData) => {
  return await prisma.presence.create({
    data: {
      ...presenceData,
      userID: userID,
    },
  });
};

export const updatePresence = async (presenceID, updateData) => {
  return await prisma.presence.update({
    where: { id: presenceID },
    data: updateData,
  });

};
