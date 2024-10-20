import * as presenceRepo from "./presenceRepo.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// Fungsi untuk mendapatkan jadwal hari ini untuk pengguna tertentu
export const getTodaySchedule = async (userID) => {
  const today = new Date().toISOString().split("T")[0]; // Ambil tanggal hari ini dalam format YYYY-MM-DD
  return await presenceRepo.getScheduleForToday(userID, today);
};

// Fungsi untuk membuat data check-in
export const createPresence = async (userID, presenceData) => {
  return await presenceRepo.createPresence(userID, presenceData);
};

// Fungsi untuk meng-update data check-out
export const updatePresence = async (userID, presenceData) => {
  const presence = await presenceRepo.getPresenceForToday(userID);

  if (!presence) {
    throw new Error("No presence data found for today.");
  }

  return await presenceRepo.updatePresence(presence.id, presenceData);
};

export const getPresenceByUserIdAndDate = async (userID, date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  return prisma.presence.findFirst({
    where: {
      userId: userID,
      checkInTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
};

// Fungsi untuk mendapatkan statistik harian
export const getDailyStatistics = async (date) => {
  const rawData = await presenceRepo.getDailyStatistics(date);
  const statistics = processStatistics(rawData);
  return statistics;
};

// Fungsi untuk mendapatkan statistik bulanan
export const getMonthlyStatistics = async (year, month) => {
  const rawData = await presenceRepo.getMonthlyStatistics(year, month);
  const statistics = aggregateMonthlyStatistics(rawData, year, month);
  return statistics;
};

// Fungsi untuk mendapatkan statistik tahunan
export const getYearlyStatistics = async (year) => {
  const rawData = await presenceRepo.getYearlyStatistics(year);
  const statistics = aggregateYearlyStatistics(rawData);
  return statistics;
};

// Fungsi untuk memproses statistik mentah dari repository
const processStatistics = (rawData) => {
  const presentCount =
    rawData.find((item) => item.status === "PRESENT")?._count.status || 0;
  const lateCount =
    rawData.find((item) => item.status === "LATE")?._count.status || 0;
  const leaveCount =
    rawData.find((item) => item.status === "LEAVE")?._count.status || 0;

  return { presentCount, lateCount, leaveCount };
};

// Fungsi untuk mendapatkan jumlah hari dalam bulan berdasarkan tahun dan bulan
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate(); // Mengembalikan jumlah hari dalam bulan
};

// Agregasi bulanan
const aggregateMonthlyStatistics = (rawData, year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const result = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    presentCount: 0,
    lateCount: 0,
    leaveCount: 0,
  }));

  rawData.forEach((record) => {
    const day = new Date(record.checkInTime).getDate();
    if (record.status === "PRESENT")
      result[day - 1].presentCount += record._count.status;
    if (record.status === "LATE")
      result[day - 1].lateCount += record._count.status;
    if (record.status === "LEAVE")
      result[day - 1].leaveCount += record._count.status;
  });

  return result;
};

// Agregasi tahunan
const aggregateYearlyStatistics = (rawData) => {
  const result = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    presentCount: 0,
    lateCount: 0,
    leaveCount: 0,
  }));

  rawData.forEach((record) => {
    const month = new Date(record.checkInTime).getMonth();
    if (record.status === "PRESENT")
      result[month].presentCount += record._count.status;
    if (record.status === "LATE")
      result[month].lateCount += record._count.status;
    if (record.status === "LEAVE")
      result[month].leaveCount += record._count.status;
  });

  return result;
};
