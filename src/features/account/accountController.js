import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import * as accountService from "./accountService.js";

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    division: null, 
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


export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountService.getAccountById(parseInt(id));
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
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
      return res.status(403).json({ message: "Account not approved by admin" });
    }

    if (account) {
      // Di sini token dibuat menggunakan userID dan role dari account
      const token = jwt.sign(
        { userID: account.userID, role: account.role }, // Ini bagian yang penting, userID harus ada di sini
        config.JWT_SECRET,
        { expiresIn: "1h" } // Token akan berlaku selama 1 jam
      );
      res.json({ token }); // Token dikirimkan kembali ke client
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const editAccount = async (req, res) => {
  const { userID } = req.user; // Ambil userID dari token JWT
  const updateData = req.body; // Data yang ingin diupdate

  try {
    const updatedAccount = await accountService.updateAccount(
      userID,
      updateData
    );
    return res.status(200).json({
      message: "Account updated successfully",
      updatedAccount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const userIdInt = parseInt(id, 10);

    if (isNaN(userIdInt)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const account = await accountService.getAccountById(userIdInt);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const updatedAccount = await accountService.updateAccount(userIdInt, {
      isApproved: true,
    });

    return res.status(200).json({
      message: "Account approved successfully",
      updatedAccount,
    });
  } catch (error) {
    console.error("Error approving account:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while approving the account" });
  }
};

export const getPendingAccounts = async (req, res) => {
  try {
    const pendingAccounts = await accountService.getPendingAccounts();
    res.status(200).json(pendingAccounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rejectAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const userIdInt = parseInt(id, 10);
    if (isNaN(userIdInt)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const account = await accountService.getAccountById(userIdInt);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await accountService.deleteAccount(userIdInt);
    res.status(200).json({ message: "Account rejected and deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
