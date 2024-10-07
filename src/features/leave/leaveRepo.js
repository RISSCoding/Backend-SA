import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateLeaveRequest = async (id, data) => {
  return await prisma.leaveRequest.update({
    where: { id },
    data,
  });
};
