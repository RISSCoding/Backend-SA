import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createPresence = async (data) => {
  return prisma.presence.create({ data });
};

const updatePresence = async (id, data) => {
  return prisma.presence.update({
    where: { id },
    data,
  });
};

const getPresenceByUserAndDate = async (userId, date) => {
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

export {
  createPresence,
  updatePresence,
  getPresenceByUserAndDate,
};
