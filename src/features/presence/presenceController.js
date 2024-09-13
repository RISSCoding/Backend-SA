import * as presenceService from './presenceService.js';
import * as accountService from '../account/accountService.js';
// import { detectFace, compareFaces } from '../utils/faceRecognition.js'; // Import face-api.js functions

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

  // // Ambil data akun pengguna berdasarkan userID
  // const account = await accountService.getAccountById(userID);

  // if (!account || !account.faceFeatures) {
  //   return res.status(400).json({ message: 'No facial data available for this user' });
  // }

  // // Deteksi wajah dari foto check-in
  // const detectedFace = await detectFace(checkInPhoto);

  // if (!detectedFace) {
  //   return res.status(400).json({ message: 'No face detected in the check-in photo' });
  // }

  // // Bandingkan fitur wajah yang terdeteksi dengan yang tersimpan di database
  // const faceMatch = compareFaces(account.faceFeatures, detectedFace.descriptor);

  // if (!faceMatch) {
  //   return res.status(400).json({ message: 'Face does not match' });
  // }

  // Verifikasi jadwal dan simpan data check-in jika wajah cocok
  const schedule = await presenceService.getTodaySchedule(userID);

  if (!schedule) {
    return res.status(400).json({ message: 'No schedule found for today' });
  }

  const presenceData = {
    checkInTime: new Date(),
    // checkInPhoto: checkInPhoto,   // Simpan URL/path dari foto check-in
    checkInLocation: `${lat}, ${long}`,
    status: 'Present',
  };

  const presence = await presenceService.createPresence(userID, presenceData);

  return res.status(200).json({ message: 'Check-in successful', presence });
};
