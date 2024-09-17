// notificationService.js
const NotificationRepo = require('./notificationRepo');
const notificationRepo = new NotificationRepo();

class NotificationService {
  // Fungsi untuk mengirim notifikasi presensi terlambat
  async sendLatePresenceNotification(accountID) {
    const title = 'Late Check-in/Check-out Notification';
    const message = 'You have checked in/out late. Please ensure to follow the schedule.';
    
    return notificationRepo.createNotification(accountID, title, message, 'LATE_PRESENCE');
  }

  // Fungsi untuk mengirim notifikasi persetujuan atau penolakan pengajuan
  async sendRequestStatusNotification(accountID, isApproved) {
    const title = isApproved ? 'Approval Success' : 'Request Rejected';
    const message = isApproved
      ? 'Your request has been approved.'
      : 'Your request has been rejected.';

    return notificationRepo.createNotification(accountID, title, message, 'REQUEST_STATUS');
  }

  // Mendapatkan semua notifikasi pengguna
  async getNotifications(accountID) {
    return notificationRepo.getNotificationsByAccount(accountID);
  }

  // Menandai notifikasi sebagai dibaca
  async markNotificationAsRead(notificationID) {
    return notificationRepo.markAsRead(notificationID);
  }

  // Menghapus notifikasi
  async deleteNotification(notificationID) {
    return notificationRepo.deleteNotification(notificationID);
  }
}

module.exports = NotificationService;
