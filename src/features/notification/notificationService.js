import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createNotification = async ({ userId, message, type }) => {
  return await prisma.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });
};

export {
  createNotification,
};