// src/features/presence/presenceRepo.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getTodaySchedule = async (userID) => {
  const today = new Date();
  return await prisma.schedule.findFirst({
    where: {
      AND: [
        {
          createdAt: {
            gte: new Date(today.setHours(0, 0, 0, 0)),
            lt: new Date(today.setHours(23, 59, 59, 999)),
          },
        },
        {
          userID: userID,
        },
      ],
    },
  });
};

const createPresence = async (userID, presenceData) => {
  return await prisma.presence.create({
    data: {
      ...presenceData,
      userID: userID,
    },
  });
};

const updatePresence = async (presenceID, updateData) => {
  return await prisma.presence.update({
    where: { id: presenceID },
    data: updateData,
  });
};

export {
  getTodaySchedule,
  createPresence,
  updatePresence,
};
