import express from 'express';
import * as accountController from '../features/account/accountController.js';
import * as scheduleController from '../features/schedule/scheduleController.js';
import { isAdmin } from '../middleware/roleMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Account routes
router.post('/login', accountController.login);
router.get('/accounts', accountController.getAllAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/:id', authenticateToken, accountController.getAccountById);

// Schedule routes
router.get('/schedules', authenticateToken, scheduleController.getAllSchedules);
router.post('/schedules', authenticateToken, isAdmin, scheduleController.createSchedule);
router.put('/schedules/:id', authenticateToken, isAdmin, scheduleController.updateSchedule);
router.delete('/schedules/:id', authenticateToken, isAdmin, scheduleController.deleteSchedule);

export default router;