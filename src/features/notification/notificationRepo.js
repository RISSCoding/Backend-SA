import { PrismaClient } from '@prisma/client';
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

export default NotificationRepo;

export const createNotification = async ({ userId, message, type }) => {
  return await prisma.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });
};

export const getNotificationsByUserId = async (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
