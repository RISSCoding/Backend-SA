import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPresence = async (data) => {
  return prisma.presence.create({
    data: {
      checkInTime: new Date(),
      checkInLocation: `${latitude},${longitude}`,
      status: type === "checkIn" ? "PRESENT" : "LATE",
      user: {
        connect: { userID: userId },
      },
    },
  });
};

export const updatePresence = async (id, data) => {
  return prisma.presence.update({
    where: { id },
    data,
  });
};

export const getPresenceByUserAndDate = async (userId, date) => {
  return prisma.presence.findFirst({
    where: {
      userID: userId,
      createdAt: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
};

