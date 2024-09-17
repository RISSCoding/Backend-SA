const prisma = require('../prisma');

const PresenceRepository = {
  async createPresence(data) {
    return await prisma.presence.create({
      data,
    });
  },

  async getPresenceById(presenceId) {
    return await prisma.presence.findUnique({
      where: {
        id: presenceId,
      },
    });
  },

  async getAllPresences() {
    return await prisma.presence.findMany();
  },

  async updatePresence(presenceId, data) {
    return await prisma.presence.update({
      where: {
        id: presenceId,
      },
      data,
    });
  },

  async deletePresence(presenceId) {
    return await prisma.presence.delete({
      where: {
        id: presenceId,
      },
    });
  },
};

module.exports = PresenceRepository;
