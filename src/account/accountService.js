import * as accountRepo from './accountRepo.js';

export const getAllAccounts = async () => {
  try {
    const accounts = await accountRepo.getAllAccounts();
    return accounts;
  } catch (error) {
    throw error;
  }
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