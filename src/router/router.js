import express from "express";
import * as accountController from "../account/accountController.js";
import * as leaveRequestController from "../leaveRequest/leaveRequestController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// Account routes
router.post("/accounts", accountController.createAccount);
router.post("/accounts/login", accountController.loginAccount);
router.get(
  "/accounts/:id",
  authenticateToken,
  accountController.getAccountById
);
router.put("/accounts/:id", authenticateToken, accountController.updateAccount);
router.delete(
  "/accounts/:id",
  authenticateToken,
  authorizeAdmin,
  accountController.deleteAccount
);
router.get(
  "/accounts",
  authenticateToken,
  authorizeAdmin,
  accountController.getAccounts
);

// Leave Request routes
router.post(
  "/leave-requests",
  authenticateToken,
  leaveRequestController.createLeaveRequest
);
router.get(
  "/leave-requests/:id",
  authenticateToken,
  leaveRequestController.getLeaveRequestById
);
router.put(
  "/leave-requests/:id",
  authenticateToken,
  leaveRequestController.updateLeaveRequest
);
router.delete(
  "/leave-requests/:id",
  authenticateToken,
  leaveRequestController.deleteLeaveRequest
);
router.get(
  "/leave-requests",
  authenticateToken,
  leaveRequestController.getLeaveRequests
);
router.post(
  "/leave-requests/:id/approve",
  authenticateToken,
  authorizeAdmin,
  leaveRequestController.approveLeaveRequest
);
router.post(
  "/leave-requests/:id/reject",
  authenticateToken,
  authorizeAdmin,
  leaveRequestController.rejectLeaveRequest
);

export default router;
