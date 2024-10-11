// src/features/stats/statsController.js


import * as statsService from "./statsService.js";

export const getCombinedStats = async (req, res) => {
  try {
    const { year, month } = req.params;
    const stats = await statsService.getCombinedStats(year, month);

    res.status(200).json(stats);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
