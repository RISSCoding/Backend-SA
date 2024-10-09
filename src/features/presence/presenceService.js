import * as presenceRepo from './presenceRepo.js';
import { differenceInMinutes, parse, format } from 'date-fns';
import config from '../../config/config.js'; // Update import path
import * as notificationService from '../notification/notificationService.js';

const checkDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula to calculate distance between two points
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const isWithinAllowedRadius = (latitude, longitude) => {
  const distance = checkDistance(
    latitude,
    longitude,
    config.OFFICE_LATITUDE,
    config.OFFICE_LONGITUDE
  );
  return distance <= config.ALLOWED_RADIUS;
};

const determineStatus = (time, type) => {
  const scheduledTime = parse(type === 'checkIn' ? config.CHECK_IN_TIME : config.CHECK_OUT_TIME, 'HH:mm', new Date());
  const diffInMinutes = differenceInMinutes(time, scheduledTime);
  return diffInMinutes > 5 ? 'LATE' : 'PRESENT';
};

const isWorkDay = (date) => {
  const dayOfWeek = format(date, 'EEEE');
  return config.WORK_DAYS.includes(dayOfWeek);
};

const isWithinWorkHours = (time, type) => {
  const scheduledTime = parse(type === 'checkIn' ? config.CHECK_IN_TIME : config.CHECK_OUT_TIME, 'HH:mm', new Date());
  const currentTime = parse(format(time, 'HH:mm'), 'HH:mm', new Date());
  
  return currentTime >= scheduledTime;
};

const recordPresence = async (userId, latitude, longitude, type) => {
  const now = new Date();
  
  if (!isWorkDay(now)) {
    throw new Error('Presence can only be recorded on work days (Monday to Friday).');
  }

  if (!isWithinWorkHours(now, type)) {
    throw new Error(`${type === 'checkIn' ? 'Check-in' : 'Check-out'} is not allowed at this time.`);
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let presence = await presenceRepo.getPresenceByUserAndDate(userId, today);

  if (!presence) {
    if (type === 'checkOut') {
      throw new Error('Cannot check out without a prior check-in.');
    }
    presence = await presenceRepo.createPresence({
      userID: userId,
      checkInTime: now,
      checkInLocation: `${latitude},${longitude}`,
      status: determineStatus(now, type),
    });
  } else {
    if (type === 'checkIn') {
      throw new Error('Already checked in for today.');
    }
    presence = await presenceRepo.updatePresence(presence.id, {
      checkOutTime: now,
      checkOutLocation: `${latitude},${longitude}`,
      status: determineStatus(now, type),
    });
  }

  if (presence.status === 'LATE') {
    await notificationService.createNotification({
      userId: userId,
      message: `You were late for ${type === 'checkIn' ? 'check-in' : 'check-out'} on ${now.toLocaleDateString()}`,
      type: 'PRESENCE_DELAY',
    });
  }

  return presence;
};

export {
  recordPresence,
  isWithinAllowedRadius,
  isWorkDay,
  isWithinWorkHours,
};
