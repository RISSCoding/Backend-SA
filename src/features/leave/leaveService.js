// src/features/leave/leaveService.js

import * as leaveRepo from './leaveRepo.js';

export const getLeaveStats = async () => {
  return await leaveRepo.getLeaveStats();
};

export const getLeaveStatsByType = async (leaveType) => {
  try {
    const stats = await prisma.leaveRequest.count({
      where: {
        type: leaveType
      }
    });
    
    return { type: leaveType, count: stats };
  } catch (error) {
    throw new Error('Error fetching leave stats');
  }
};

export const getLeaveRequestById = async (leaveId) => {
  return await prisma.leaveRequest.findUnique({
    where: { id: leaveId },
  });
};

export const createNotification = async (userId, message, type) => {
  return await prisma.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });
};

export const updateLeaveStatus = async (leaveId, status, adminId) => {
  const leaveRequest = await prisma.leaveRequest.update({
    where: { id: leaveId },
    data: {
      status: status,
      approvedBy: adminId,
      updatedAt: new Date(),
    },
  });

  // Buat notifikasi untuk user saat leave disetujui atau ditolak
  const message = status === 'APPROVED'
    ? `Your leave request has been approved.`
    : `Your leave request has been rejected.`;

  await createNotification(leaveRequest.userId, message, 'LEAVE_APPROVAL');

  return leaveRequest;
};

