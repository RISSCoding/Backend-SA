import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config/config.js";
import * as accountService from "./accountService.js";

// Mendapatkan semua akun
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
  }}

// Membuat akun admin
export const createAdminAccount = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = {
      name,
      email,
      password: hashedPassword,
      phone: null,
      position: null,
      facePhoto: null,
      division: null,
      isApproved: false,
    };

    const account = await accountService.createAdminAccount(newAccount);
    return res.status(201).json({
      message: "Account created successfully, pending admin approval",
      account,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or invalid" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure to replace with your JWT secret
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userID = decoded.userID; // Assuming the token contains userID

    if (!userID) {
      return res.status(400).json({ error: "User ID not found in token" });
    }

    // Fetch account details from the service using the userID
    const account = await accountService.getAccountDetails(userID);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Send back account data, excluding sensitive information
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle other errors
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await accountService.verifyAccount(email, password);

    if (!account) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!account.isApproved) {
      return res.status(403).json({ message: "Account not approved by admin" });
    }

    const token = jwt.sign(
      { userID: account.userID, role: account.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      user: account,
      token,
      role: account.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const logout = (req, res) => {
  res.clearCookie("token", {
    secure: true,
    sameSite: "none",
  });

  res.json({ message: "Logout successful" });
};


export const editAccount = async (req, res) => {
  const { userID } = req.params;
  const updateData = req.body;

  const currentUserId = req.user.userID;
  const role = req.user.role;

  const userIdInt = parseInt(userID, 10);
  if (isNaN(userIdInt)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  if (role !== "ADMIN" && userIdInt !== currentUserId) {
    return res.status(403).json({ message: "Forbidden: You don't have permission to edit this account" });
  }

  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Tambahkan currentUser saat memanggil service
    const updatedAccount = await accountService.updateAccountbyId(
      parseInt(userIdInt),
      updateData,
      { userID: currentUserId, role: role } // Teruskan informasi currentUser (userID dan role)
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({
      message: "Account updated successfully",
      updatedAccount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkAuth = (req, res) => {
  const authHeader = req.headers.authorization; 
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return res.status(200).json({ message: "Authenticated", user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
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

// Menolak akun
export const rejectAccount = async (req, res) => {
  const { id } = req.params;

  try {
    await accountService.rejectAccountById(id);
    return res
    .status(200)
    .json({ message: "Account rejected and deleted successfully" });
  } catch (error) {
    console.error("Error in rejectAccount:", error);
    return res
    .status(500)
    .json({ message: "Error rejecting account", error: error.message });
  }
};

  export const getPendingAccounts = async (req, res) => {
    try {
      const accounts = await accountService.fetchPendingAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      console.error("Error fetching pending accounts:", error);
      res.status(500).json({
        message: "Error fetching pending accounts",
        error: error.message,
      });
    }
  };
