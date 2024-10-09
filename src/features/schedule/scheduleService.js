import * as scheduleRepo from './scheduleRepo.js';

export const getAllSchedules = async () => {
  return await scheduleRepo.getAllSchedules();
};

export const createSchedule = async (scheduleData) => {
  return await scheduleRepo.createSchedule(scheduleData);
};

export const updateSchedule = async (id, scheduleData) => {
  return await scheduleRepo.updateSchedule(id, scheduleData);
};

export const deleteSchedule = async (id) => {
  return await scheduleRepo.deleteSchedule(id);
};

export const deactivateScheduleDuringLeave = async (userId, startDate, endDate) => {
  return await prisma.schedule.updateMany({
    where: {
      userID: userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    data: {
      isActive: false,
    },
  });
};

// Mengizinkan check-in remote selama OFFICEDUTY
export const enableRemoteCheckInForDay = async (userId, date) => {
  return await prisma.schedule.updateMany({
    where: {
      userID: userId,
      date: date,
    },
    data: {
      isActive: true,  // Jadwal tetap aktif
      // Tambahkan logika khusus untuk mengizinkan check-in remote (jika diperlukan)
    },
  });
};