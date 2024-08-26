import * as scheduleService from './scheduleService.js';

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const newSchedule = await scheduleService.createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await scheduleService.updateSchedule(parseInt(req.params.id), req.body);
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    await scheduleService.deleteSchedule(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};