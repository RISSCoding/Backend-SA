// src/features/presence/presenceService.js
import * as presenceRepo from './presenceRepo.js';

export const getTodaySchedule = async (userID) => {
  return await presenceRepo.getTodaySchedule(userID);
};

export const createPresence = async (userID, presenceData) => {
  return await presenceRepo.createPresence(userID, presenceData);
};

export const updatePresence = async (presenceID, updateData) => {
  return await presenceRepo.updatePresence(presenceID, updateData);
};
