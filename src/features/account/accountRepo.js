
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAccounts = async () => {
  try {
    return await prisma.account.findMany({
      select: {
        userID: true,
        name: true,
        email: true,
        role: true,
      },
    });
  } catch (error) {
    console.error('Error fetching all accounts:', error);
    throw new Error('Error fetching all accounts');
  }
};

export const createAccount = async (accountData) => {
  try {
    const hashedPassword = await bcrypt.hash(accountData.password, 10);
    const newAccount = await prisma.account.create({
      data: {
        name: accountData.name,
        phone: accountData.phone,
        position: accountData.position,
        email: accountData.email,
        password: hashedPassword,
        role: accountData.role || 'USER',
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
        name: true,
        phone: true,
        position: true,
        email: true,
        role: true,
      }
    });
    return account;
  } catch (error) {
    throw new Error('Error fetching account');
  }
};

export const getAccountByEmail = async (email) => {
  try {
    const account = await prisma.account.findUnique({
      where: { email: email },
    });
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  } catch (error) {
    console.error('Error fetching account by email:', error);
    throw new Error('Error fetching account by email');
  }
};