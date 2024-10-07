import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotification = async ({ userId, message, type }) => {
  return await prisma.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });
};

export const getNotificationsByUserId = async (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }, 
  });
};
