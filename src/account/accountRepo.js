import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getAllAccounts = async () => {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        userID: true,
        address: true,
        phoneNumber: true,
        role: true,
      }
    });
    return accounts;
  } catch (error) {
    throw new Error('Error fetching accounts');
  }
};

export const createAccount = async (accountData) => {
  try {
    const hashedPassword = await bcrypt.hash(accountData.password, 10);
    const newAccount = await prisma.account.create({
      data: {
        ...accountData,
        password: hashedPassword,
        role: accountData.role || 'USER', // Default to USER if not specified
      },
    });
    const { password, ...accountWithoutPassword } = newAccount;
    return accountWithoutPassword;
  } catch (error) {
    throw new Error('Error creating account');
  }
};

export const getAccountById = async (id) => {
  try {
    const account = await prisma.account.findUnique({
      where: { userID: id },
      select: {
        userID: true,
        address: true,
        phoneNumber: true,
        role: true,
      }
    });
    return account;
  } catch (error) {
    throw new Error('Error fetching account');
  }
};