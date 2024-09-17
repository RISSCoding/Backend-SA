import * as presenceService from './presenceService.js';
import * as accountService from '../account/accountService.js';

const checkLocation = (lat, long) => {
  const validLat = -6.941800;
  const validLong = 107.628500;
  
  return lat === validLat && long === validLong;
};

export const handleCheckIn = async (req, res) => {
  const { userID, lat, long, checkInPhoto } = req.body;

  // Verifikasi lokasi check-in
  if (!checkLocation(lat, long)) {
    return res.status(400).json({ message: 'Invalid check-in location' });
  }

  // Verifikasi jadwal dan simpan data check-in jika waktu sesuai
  const schedule = await presenceService.getTodaySchedule(userID);

  if (!schedule) {
    return res.status(400).json({ message: 'No schedule found for today' });
  }

  const currentTime = new Date();
  if (currentTime < schedule.startTime || currentTime > schedule.endTime) {
    return res.status(400).json({ message: 'You can only check-in during the scheduled time' });
  }

  const presenceData = {
    checkInTime: currentTime,
    checkInPhoto: checkInPhoto,  // Simpan URL/path dari foto check-in
    checkInLocation: `${lat}, ${long}`,
    status: 'Present',
  };

  const presence = await presenceService.createPresence(userID, presenceData);

  return res.status(200).json({ message: 'Check-in successful', presence });
};
