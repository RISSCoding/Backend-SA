import bcrypt from "bcrypt";
import * as accountRepo from "./accountRepo.js";

export const getAllAccounts = async () => {
  return await accountRepo.getAllAccounts();
};

export const createAccount = async (accountData) => {
  const hashedPassword = await bcrypt.hash(accountData.password, 10); // 10 adalah saltRounds default

  console.log("Hashed password on account creation:", hashedPassword); // Debugging hash password

  const newAccount = {
    ...accountData,
    password: hashedPassword,
  };

  return await accountRepo.create(newAccount);
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

  if (account) {
    console.log("Account found for verification:", account);

    const isPasswordValid = await bcrypt.compare(password, account.password);
    console.log("Password valid:", isPasswordValid); 

    if (isPasswordValid) {
      const { password, ...accountWithoutPassword } = account;
      return accountWithoutPassword;
    }
  }
  return null;
};

export const fetchPendingAccounts = async () => {
  try {
    const accounts = await accountRepo.getPendingAccounts();
    return accounts;

  } catch (error) {
    console.error("Error in fetchPendingAccounts service:", error);
    throw error;
  }
};

export const approveAccountById = async (userId) => {
  return await accountRepo.approveAccount(userId);
};

export const rejectAccountById = async (userId) => {
  return await accountRepo.rejectAccount(userId);
};

export const deleteAccount = async (id) => {
  try {
    return await accountRepo.deleteAccount(id);
  } catch (error) {
    throw error;
  }
};

