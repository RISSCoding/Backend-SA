
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

export const create = async (accountData) => {
  try {
    const newAccount = await prisma.account.create({
      data: {
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
        phone: accountData.phone || "",
        position: null,
        facePhoto: null,
        role: accountData.role || "USER",
        isApproved: false,
      },
    });
    return newAccount;
  } catch (error) {
    throw new Error(`Error creating account: ${error.message}`);
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

export const updateAccount = async (id, updateData) => {
  try {
    return await prisma.account.update({
      where: { userID: id },
      data: updateData,
    });
  } catch (error) {
    console.error('Prisma error:', error);  
    throw new Error('Error updating account: ' + error.message);
  }
};

export const getPendingAccounts = async () => {
  try {
    return await prisma.account.findMany({
      where: {
        isApproved: false,
      },
      select: {
        userID: true,
        name: true,
        email: true,
        phone: true,
        position: true,
      },
    });
  } catch (error) {
    throw new Error('Error fetching pending accounts');
  }
};

export const deleteAccount = async (id) => {
  try {
    return await prisma.account.delete({
      where: { userID: id },
    });
  } catch (error) {
    throw new Error('Error deleting account');
  }
};