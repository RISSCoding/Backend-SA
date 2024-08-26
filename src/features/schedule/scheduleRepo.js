import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSchedules = async () => {
  try {
    return await prisma.schedule.findMany();
  } catch (error) {
    throw new Error('Error fetching schedules');
  }
};

export const createSchedule = async (scheduleData) => {
  try {
    return await prisma.schedule.create({
      data: scheduleData,
    });
  } catch (error) {
    throw new Error('Error creating schedule');
  }
};

export const updateSchedule = async (id, scheduleData) => {
  try {
    return await prisma.schedule.update({
      where: { id },
      data: scheduleData,
    });
  } catch (error) {
    throw new Error('Error updating schedule');
  }
};

export const deleteSchedule = async (id) => {
  try {
    return await prisma.schedule.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Error deleting schedule');
  }
};