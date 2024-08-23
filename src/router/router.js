import express from 'express';
import * as accountController from '../account/accountController.js';

const router = express.Router();

router.get('/accounts', accountController.getAllAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/:id', accountController.getAccountById);

export default router;