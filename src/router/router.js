import express from 'express';
import * as accountController from '../features/account/accountController.js';
import * as scheduleController from '../features/schedule/scheduleController.js';
import * as leaveController from '../features/leave/leaveController.js';
import * as statsController from '../features/stats/statsController.js';
import * as notificationController from '../features/notification/notificationController.js';
import { isAdmin } from '../middleware/roleMiddleware.js';
import * as presenceController from '../features/presence/presenceController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Account routes
router.post('/login', accountController.login);
router.get('/accounts', authenticateToken, accountController.getAllAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/:id', authenticateToken, accountController.getAccountById);
router.put('/accounts/:id/approve',  accountController.approveAccount);
router.put('/accounts/:id/reject', authenticateToken, isAdmin, accountController.rejectAccount);
router.put('/account/edit', authenticateToken, accountController.editAccount);
router.get('/accounts/pending', authenticateToken, isAdmin, accountController.getPendingAccounts);

// Schedule routes
router.get('/schedules', authenticateToken, scheduleController.getAllSchedules);
router.post('/schedules', authenticateToken, isAdmin, scheduleController.createSchedule);
router.put('/schedules/:id', authenticateToken, isAdmin, scheduleController.updateSchedule);
router.delete('/schedules/:id', authenticateToken, isAdmin, scheduleController.deleteSchedule);

// Presence routes
router.post('/presence', presenceController.recordPresence)

// Leave routes
router.put('/leave/:leaveId/approve', authenticateToken, isAdmin, leaveController.approveLeaveRequest);
router.put('/leave/:leaveId/reject', authenticateToken, isAdmin, leaveController.rejectLeaveRequest);

// // Notification routes
router.get('/notifications', authenticateToken, notificationController.getNotifications);

// // Stats routes
// router.get('/presence/statistics', authenticateToken, presenceController.getDailyStatistics);
// router.get('/presence/stats', authenticateToken, presenceController.getPresenceStats);
// router.get('/leave/stats', authenticateToken, leaveController.getLeaveStats);
// router.get('/leave/stats/:type', authenticateToken, leaveController.getLeaveStatsByType);
router.get('/stats/combined', statsController.getCombinedStats);

export default router;
