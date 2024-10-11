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

