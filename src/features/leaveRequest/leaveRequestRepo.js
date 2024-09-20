import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLeaveRequest = async (leaveRequestData) => {
  return await prisma.leaveRequest.create({ data: leaveRequestData });
};

export const getLeaveRequestById = async (id) => {
  return await prisma.leaveRequest.findUnique({
    where: { id },
    include: { user: true },
  });
};

export const updateLeaveRequest = async (id, leaveRequestData) => {
  return await prisma.leaveRequest.update({
    where: { id },
    data: leaveRequestData,
    include: { user: true },
  });
};

export const deleteLeaveRequest = async (id) => {
  return await prisma.leaveRequest.delete({ where: { id } });
};

export const getLeaveRequests = async (filters = {}) => {
  return await prisma.leaveRequest.findMany({
    where: filters,
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
};
