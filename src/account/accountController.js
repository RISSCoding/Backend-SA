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
  try {
    const { name, phone, position, email, password, role } = req.body;
    if (!name || !phone || !position || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newAccount = await accountService.createAccount({ name, phone, position, email, password, role });
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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