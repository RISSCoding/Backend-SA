// notificationRepo.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class NotificationRepo {
  // Membuat notifikasi baru
  async createNotification(accountID, title, message, type) {
    return prisma.notification.create({
      data: {
        accountID,
        title,
        message,
        type,
      },
    });
  }

  // Mendapatkan semua notifikasi untuk pengguna tertentu
  async getNotificationsByAccount(accountID) {
    return prisma.notification.findMany({
      where: { accountID },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Menandai notifikasi sebagai dibaca
  async markAsRead(notificationID) {
    return prisma.notification.update({
      where: { id: notificationID },
      data: { read: true },
    });
  }

  // Menghapus notifikasi
  async deleteNotification(notificationID) {
    return prisma.notification.delete({
      where: { id: notificationID },
    });
  }
}

module.exports = NotificationRepo;
