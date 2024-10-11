import express from "express";
import * as accountController from "../features/account/accountController.js";
import * as scheduleController from "../features/schedule/scheduleController.js";
import * as presenceController from "../features/presence/presenceController.js";
import * as leaveController from "../features/leave/leaveController.js";
import * as statsController from "../features/stats/statsController.js";
import * as notificationController from "../features/notification/notificationController.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Account routes

router.post("/login", accountController.login);
router.get("/accounts", accountController.getAllAccounts);
router.post("/accounts", accountController.createAccount);
router.get("/accounts/:id",accountController.getAccountById);
router.put("/account/edit", accountController.editAccount);
router.get("/accounts/pending",accountController.getPendingAccounts);
router.get("/pending", accountController.getPendingAccounts);
router.put("/accounts/:id/approve",accountController.approveAccount);
router.put("/accounts/:id/reject",accountController.rejectAccount);


// Schedule routes
router.get("/schedules", authenticateToken, scheduleController.getAllSchedules);
router.post("/schedules",authenticateToken,isAdmin,scheduleController.createSchedule);
router.put("/schedules/:id",authenticateToken,isAdmin,scheduleController.updateSchedule);
router.delete("/schedules/:id",authenticateToken,isAdmin,scheduleController.deleteSchedule);

// Presence routes
router.post("/presence", authenticateToken, presenceController.handleCheckIn);

// // Leave routes
router.put("/leave/:leaveId/approve",leaveController.approveLeaveRequest);
router.put("/leave/:leaveId/reject",leaveController.rejectLeaveRequest);

// // Notification routes
router.get("/notifications",authenticateToken,notificationController.getNotifications);

// // Stats routes
router.get('/presence/statistics', presenceController.getDailyStatistics);
router.get("/presence/monthly-statistics",presenceController.getMonthlyStatistics);

// router.get('/presence/stats', authenticateToken, presenceController.getPresenceStats);
// router.get('/leave/stats', authenticateToken, statsController.getLeaveStats);
// router.get('/leave/stats/:type', authenticateToken, statsController.getLeaveStatsByType);
router.get("/stats/combined/:year/:month",statsController.getCombinedStats
);

export default router;


