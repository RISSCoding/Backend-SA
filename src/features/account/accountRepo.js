//repo
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const saltRounds = 10;

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
      where: {
        isApproved: true,
      },
    });
  } catch (error) {
    console.error("Error fetching all accounts:", error);
    throw new Error("Error fetching all accounts");
  }
};

export const create = async (accountData) => {
  try {
    // Hash the password before storing it
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(accountData.password, saltRounds);

    const newAccount = await prisma.account.create({
      data: {
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
        phone: accountData.phone || "",
        position: null,
        facePhoto: null,
        role: accountData.role || "USER",
        division: accountData.division || "",
        isApproved: false,
      },
    });
    return newAccount;
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Error creating account: " + error.message);
  }
};

export const createAdmin = async (accountData) => {
  try {
    // Hash the password before storing it
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(accountData.password, saltRounds);

    const newAccount = await prisma.account.create({
      data: {
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
        phone: accountData.phone || "",
        position: null,
        facePhoto: null,
        role: accountData.role || "ADMIN",
        division: accountData.division || "",
        isApproved: false,
      },
    });
    return newAccount;
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Error creating account: " + error.message);
  }
};

export const getAccountById = async (id) => {
  try {
    const account = await prisma.account.findUnique({
      where: { userID: id },
      select: {
        userID: true,
        facePhoto: true,
        name: true,
        phone: true,
        adress: true,
        password: true,
        position: true,
        division: true,
        email: true,
        yearscareer: true,
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
    console.log("Account found:", account); // Debugging
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
        adress: updateData.adress || undefined,
        leaveBalance: updateData.leaveBalance || undefined,
        facePhoto: updateData.facePhoto || undefined,
        isApproved:
          updateData.isApproved !== undefined
            ? updateData.isApproved
            : undefined,
      },
    });
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("Error updating account: " + error.message);
  }
};

export const updateAccountById = async (userID, updateData) => {
  try {
    const updatedAccount = await prisma.account.update({
      where: { userID: userID },
      data: updateData, // Data yang diupdate
    });

    return updatedAccount;
  } catch (error) {
    console.error("Error updating account:", error);
    throw new Error("Error updating account");
  }
};

export const getPendingAccounts = async () => {
  return prisma.account.findMany({
    where: { isApproved: false },
    select: {
      userID: true,
      name: true,
      email: true,
      password: true,
    },
  });
};

export const approveAccount = async (userId) => {
  return prisma.account.update({
    where: { userID: parseInt(userId) },
    data: { isApproved: true },
  });
};

export const rejectAccount = async (userId) => {
  return prisma.account.delete({
    where: { userID: parseInt(userId) },
  });
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
