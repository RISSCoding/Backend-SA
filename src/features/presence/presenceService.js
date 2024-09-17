const PresenceRepository = require('../repositories/presenceRepository');

const PresenceService = {
  async createPresence(data) {
    // Business logic, validation, etc.
    return await PresenceRepository.createPresence(data);
  },

  async getPresenceById(presenceId) {
    return await PresenceRepository.getPresenceById(presenceId);
  },

  async getAllPresences() {
    return await PresenceRepository.getAllPresences();
  },

  async updatePresence(presenceId, data) {
    return await PresenceRepository.updatePresence(presenceId, data);
  },

  async deletePresence(presenceId) {
    return await PresenceRepository.deletePresence(presenceId);
  },
};

module.exports = PresenceService;
