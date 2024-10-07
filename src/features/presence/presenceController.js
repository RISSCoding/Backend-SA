import * as presenceService from './presenceService.js';

export const recordPresence = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { latitude, longitude, type } = req.body;
    const userId = req.user.userID; // Pastikan ini mengambil userID

    if (typeof latitude === "undefined" || typeof longitude === "undefined") {
      return res
        .status(400)
        .json({ error: "latitude or longitude is not defined" });
    }
    
    console.log("Extracted userID from token:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing from token." });
    }


    if (!presenceService.isWithinAllowedRadius(latitude, longitude)) {
      return res.status(400).json({
        error: "You are not within the allowed radius for presence recording.",
      });
    }


    if (!presenceService.isWorkDay(new Date())) {
      return res
        .status(400)
        .json({ error: "Presence can only be recorded on work days" });
    }

  
    if (!presenceService.isWithinWorkHours(new Date(), type)) {
      return res.status(400).json({
        error: `${
          type === "checkIn" ? "Check-in" : "Check-out"
        } is not allowed at this time.`,
      });
    }

    const presence = await presenceService.recordPresence(
      userId,
      latitude,
      longitude,
      type
    );
    res.status(200).json(presence);
  } catch (error) {
    console.error("Error in recordPresence:", error);
    res.status(400).json({ error: error.message });
  }
};


