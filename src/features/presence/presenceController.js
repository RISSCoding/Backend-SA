import * as presenceService from "./presenceService.js";
import config from "../../config/config.js";
import geolib from "geolib";

// Fungsi untuk memverifikasi lokasi
export const isWithinAllowedRadius = (lat, long) => {
  return geolib.isPointWithinRadius(
    { latitude: lat, longitude: long },
    { latitude: config.OFFICE_LATITUDE, longitude: config.OFFICE_LONGITUDE },
    config.ALLOWED_RADIUS
  );
};

export const handleCheckIn = async (req, res) => {
  const { lat, long } = req.body;
  const currentTime = new Date();
  const userID = req.user.userID; // Ambil userID dari token yang sudah diverifikasi

  // Verifikasi lokasi
  if (!isWithinAllowedRadius(lat, long)) {
    return res
      .status(400)
      .json({ message: "You are outside the allowed radius." });
  }

  // Verifikasi waktu check-in
  const checkInTime = new Date(
    `${currentTime.toDateString()} ${config.CHECK_IN_TIME}`
  );
  const lateThreshold = new Date(checkInTime.getTime() + 5 * 60000); // Waktu check-in + 5 menit

  let presenceStatus = "PRESENT";

  if (currentTime > lateThreshold) {
    presenceStatus = "LATE"; // Jika lebih dari 5 menit
  }

  // Buat data presensi
  const presenceData = {
    checkInTime: currentTime,
    checkInLocation: `${lat}, ${long}`,
    status: presenceStatus,
  };

  try {
    const presence = await presenceService.createPresence(userID, presenceData);

    // // Jika terlambat, bisa tambahkan notifikasi atau logika tambahan di sini
    // if (presenceStatus === "LATE") {
    //   await presenceService.createNotification(userID, {
    //     message: "You are late for check-in.",
    //     type: "PRESENCE_DELAY",
    //   });
    // }

    return res.status(200).json({ message: "Check-in successful", presence });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const handleCheckOut = async (req, res) => {
  const { lat, long } = req.body;
  const currentTime = new Date();
  const userID = req.user.userID; // Ambil userID dari token yang sudah diverifikasi

  // Verifikasi lokasi
  if (!isWithinAllowedRadius(lat, long)) {
    return res
      .status(400)
      .json({ message: "You are outside the allowed radius." });
  }

  // Verifikasi waktu check-out
  const checkOutTime = new Date(
    `${currentTime.toDateString()} ${config.CHECK_OUT_TIME}`
  );
  if (currentTime < checkOutTime) {
    return res
      .status(400)
      .json({ message: "Check-out time has not yet started." });
  }

  try {
    // Ambil data presensi yang sudah ada untuk hari ini
    const existingPresence = await presenceService.getPresenceByUserIdAndDate(
      userID,
      currentTime
    );

    if (!existingPresence) {
      return res.status(400).json({ message: "No check-in record found." });
    }

    // Tetapkan status check-out berdasarkan status check-in
    const checkOutStatus =
      existingPresence.status === "LATE" ? "LATE" : "PRESENT";

    // Update data presensi dengan waktu check-out dan status
    const updatedPresence = await presenceService.updatePresence(userID, {
      checkOutTime: currentTime,
      checkOutLocation: `${lat}, ${long}`,
      status: checkOutStatus,
    });

    return res
      .status(200)
      .json({ message: "Check-out successful", presence: updatedPresence });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// Fungsi untuk mendapatkan statistik harian
export const getDailyStatistics = async (req, res) => {
  const { date } = req.query; // Ambil tanggal dari query params
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const statistics = await presenceService.getDailyStatistics(new Date(date));
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk mendapatkan statistik bulanan
export const getMonthlyStatistics = async (req, res) => {
  const { year, month } = req.query; // Ambil tahun dan bulan dari query params
  if (!year || !month) {
    return res.status(400).json({ message: "Year and month are required" });
  }

  try {
    const statistics = await presenceService.getMonthlyStatistics(year, month);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk mendapatkan statistik tahunan
export const getYearlyStatistics = async (req, res) => {
  const { year } = req.query;
  if (!year) {
    return res.status(400).json({ message: "Year is required" });
  }

  try {
    const statistics = await presenceService.getYearlyStatistics(year);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


