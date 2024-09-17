import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import * as accountService from './accountService.js';

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAccount = async (req, res) => {
  const { name, phone, position, email, password } = req.body;

  const newAccount = {
    name,
    phone,
    position,
    email,
    password,
    isApproved: false,  // Set default isApproved to false
  };

  const account = await accountService.createAccount(newAccount);

  return res.status(201).json({ message: 'Account created successfully, pending admin approval', account });
};
  

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountService.getAccountById(parseInt(id));
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await accountService.verifyAccount(email, password);

    if (!account.isApproved) {
      return res.status(403).json({ message: 'Account not approved by admin' });
    }

    if (account) {
      const token = jwt.sign({ userID: account.userID, role: account.role }, config.jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert id to integer
    const userIdInt = parseInt(id, 10);

    if (isNaN(userIdInt)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Pastikan account ada sebelum diperbarui
    const account = await accountService.getAccountById(userIdInt);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Update account
    const updatedAccount = await accountService.updateAccount(userIdInt, { isApproved: true });
    res.status(200).json({ message: 'Account approved', updatedAccount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

