import * as presenceService from "./presenceService.js";


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

export const checkLocation = (lat, long) => {
  const validLat = -6.9418;
  const validLong = 107.6285;

  return lat === validLat && long === validLong;
};

export const handleCheckIn = async (req, res) => {
  const { userID, lat, long, checkInPhoto } = req.body;

  // Verifikasi lokasi check-in
  if (!checkLocation(lat, long)) {
    return res.status(400).json({ message: "Invalid check-in location" });
  }

  // Verifikasi jadwal dan simpan data check-in jika waktu sesuai
  const schedule = await presenceService.getTodaySchedule(userID);

  if (!schedule) {
    return res.status(400).json({ message: "No schedule found for today" });
  }

  const currentTime = new Date();
  if (currentTime < schedule.startTime || currentTime > schedule.endTime) {
    return res
      .status(400)
      .json({ message: "You can only check-in during the scheduled time" });
  }

  const presenceData = {
    checkInTime: currentTime,
    checkInLocation: `${lat}, ${long}`,
    status: "Present",
  };

  const presence = await presenceService.createPresence(userID, presenceData);

  return res.status(200).json({ message: "Check-in successful", presence });

};
