import bcrypt from 'bcrypt';
import * as accountRepo from './accountRepo.js';

export const getAllAccounts = async () => {
  return await accountRepo.getAllAccounts();
};

export const createAccount = async (accountData) => {
  try {
    const newAccount = await accountRepo.createAccount(accountData);
    return newAccount;
  } catch (error) {
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const account = await accountRepo.getAccountById(id);
    return account;
  } catch (error) {
    throw error;
  }
};

export const updateAccount = async (id, updateData) => {
  try {
    return await accountRepo.updateAccount(id, updateData);
  } catch (error) {
    throw error;
  }
};

export const verifyAccount = async (email, password) => {
  const account = await accountRepo.getAccountByEmail(email);
  if (account && await bcrypt.compare(password, account.password)) {
    const { password, ...accountWithoutPassword } = account;
    return accountWithoutPassword;
  }
  return null;
};