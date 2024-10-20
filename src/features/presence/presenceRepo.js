import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Mendapatkan jadwal pengguna untuk hari ini
export const getScheduleForToday = async (userID, today) => {
  return await prisma.schedule.findFirst({
    where: {
      userId: userID,
      date: today,
    },
  });
};

// Membuat presensi untuk check-in
export const createPresence = async (userID, presenceData) => {
  return await prisma.presence.create({
    data: {
      userId: userID,
      checkInTime: presenceData.checkInTime,
      checkInLocation: presenceData.checkInLocation,
      status: presenceData.status,
    },
  });
};

// Mendapatkan data presensi untuk hari ini
export const getPresenceForToday = async (userID) => {
  const today = new Date().toISOString().split("T")[0]; // Ambil tanggal hari ini
  return await prisma.presence.findFirst({
    where: {
      userId: userID,
      checkInTime: {
        gte: new Date(`${today}T00:00:00`),
        lt: new Date(`${today}T23:59:59`),
      },
    },
  });
};

// Mengupdate data presensi untuk check-out
export const updatePresence = async (presenceID, presenceData) => {
  return await prisma.presence.update({
    where: { id: presenceID },
    data: {
      checkOutTime: presenceData.checkOutTime,
      checkOutLocation: presenceData.checkOutLocation,
      status: presenceData.status,
    },
  });
};

// Ambil data presensi harian berdasarkan tanggal tertentu
export const getDailyStatistics = async (date) => {
  return prisma.presence.groupBy({
    by: ['status'],
    where: {
      checkInTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
    _count: {
      status: true,
    },
  });
};

// Ambil data presensi bulanan berdasarkan tahun dan bulan
export const getMonthlyStatistics = async (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // Mengambil akhir bulan

  return prisma.presence.groupBy({
    by: ['status', 'checkInTime'],
    where: {
      checkInTime: {
        gte: startDate,
        lt: endDate,
      },
    },
    _count: {
      status: true,
    },
  });
};

// Ambil data presensi tahunan berdasarkan tahun
export const getYearlyStatistics = async (year) => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  return prisma.presence.groupBy({
    by: ['status', 'checkInTime'],
    where: {
      checkInTime: {
        gte: startDate,
        lt: endDate,
      },
    },
    _count: {
      status: true,
    },
  });
};
