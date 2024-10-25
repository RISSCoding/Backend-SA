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
router.post("/logout", accountController.logout);
router.get("/accounts", authenticateToken, isAdmin, accountController.getAllAccounts);
router.post("/accounts", accountController.createAccount); 
router.post("/admin", authenticateToken, isAdmin, accountController.createAdminAccount); 
router.get("/myaccount", authenticateToken, accountController.getMyAccount);
router.put("/accounts/:userID", authenticateToken, accountController.editAccount);
router.get("/accounts/pending", authenticateToken, isAdmin, accountController.getPendingAccounts);
router.put("/accounts/:id/approve", authenticateToken, isAdmin, accountController.approveAccount);
router.put("/accounts/:id/reject", authenticateToken, isAdmin, accountController.rejectAccount);
router.get("/check-auth", accountController.checkAuth);

// Schedule routes
router.get("/schedules", authenticateToken, scheduleController.getAllSchedules);
router.post("/schedules",authenticateToken, isAdmin, scheduleController.createSchedule);
router.put("/schedules/:id",authenticateToken, isAdmin, scheduleController.updateSchedule);
router.delete("/schedules/:id", authenticateToken, isAdmin, scheduleController.deleteSchedule);

// Presence routes
router.post("/checkin", authenticateToken, presenceController.handleCheckIn);
router.post("/checkout", authenticateToken, presenceController.handleCheckOut);

// Leave routes
router.put("/leave/:leaveId/approve", authenticateToken, isAdmin, leaveController.approveLeaveRequest);
router.put("/leave/:leaveId/reject", authenticateToken, isAdmin, leaveController.rejectLeaveRequest);

// Notification routes
router.get("/notifications", authenticateToken, notificationController.getNotifications);

// Stats routes
router.get("/statistics/daily", presenceController.getDailyStatistics);
router.get("/statistics/monthly", presenceController.getMonthlyStatistics);
router.get("/statistics/yearly", presenceController.getYearlyStatistics);
router.get("/stats/combined/:year/:month", statsController.getCombinedStats);

export default router;


