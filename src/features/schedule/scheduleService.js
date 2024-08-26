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