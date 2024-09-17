const PresenceService = require('../services/presenceService');

const PresenceController = {
  async createPresence(req, res) {
    try {
      const data = req.body;
      const presence = await PresenceService.createPresence(data);
      res.status(201).json(presence);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create presence' });
    }
  },

  async getPresenceById(req, res) {
    try {
      const presenceId = parseInt(req.params.id);
      const presence = await PresenceService.getPresenceById(presenceId);
      if (!presence) {
        return res.status(404).json({ message: 'Presence not found' });
      }
      res.status(200).json(presence);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch presence' });
    }
  },

  async getAllPresences(req, res) {
    try {
      const presences = await PresenceService.getAllPresences();
      res.status(200).json(presences);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch presences' });
    }
  },

  async updatePresence(req, res) {
    try {
      const presenceId = parseInt(req.params.id);
      const data = req.body;
      const updatedPresence = await PresenceService.updatePresence(presenceId, data);
      res.status(200).json(updatedPresence);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update presence' });
    }
  },

  async deletePresence(req, res) {
    try {
      const presenceId = parseInt(req.params.id);
      await PresenceService.deletePresence(presenceId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete presence' });
    }
  },
};

module.exports = PresenceController;
