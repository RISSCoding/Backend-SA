import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAccounts = async () => {
  try {
    return await prisma.account.findMany({
      select: {
        userID: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error("Error fetching all accounts:", error);
    throw new Error("Error fetching all accounts");
  }
};

export const createAccount = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const newAccount = {
    name,
    email,
    password,
    phone: null,
    position: null,
    facePhoto: null,
    division: null, // Division dibiarkan null
    isApproved: false,
  };

  try {
    const account = await accountService.createAccount(newAccount);
    return res.status(201).json({
      message: "Account created successfully, pending admin approval",
      account,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        password: true,
        position: true,
        division: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return account;
  } catch (error) {
    throw new Error("Error fetching account");
  }
};

export const getAccountByEmail = async (email) => {
  try {
    const account = await prisma.account.findUnique({
      where: { email: email },
    });
    if (!account) {
      throw new Error("Account not found");
    }
    return account;
  } catch (error) {
    console.error("Error fetching account by email:", error);
    throw new Error("Error fetching account by email");
  }
};

export const updateAccount = async (id, updateData) => {
  try {
    return await prisma.account.update({
      where: { userID: id },
      data: {
        name: updateData.name || undefined,
        phone: updateData.phone || undefined,
        position: updateData.position || undefined,
        division: updateData.division || undefined,
        facePhoto: updateData.facePhoto || undefined,
      },
    });
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("Error updating account: " + error.message);
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
        division: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching pending accounts");
  }
};

export const deleteAccount = async (id) => {
  try {
    return await prisma.account.delete({
      where: { userID: id },
    });
  } catch (error) {
    throw new Error("Error deleting account");
  }
};
