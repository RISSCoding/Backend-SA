import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import * as accountService from './accountService.js';

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAccount = async (req, res) => {
  const { name, phone, position, email, password, faceImage } = req.body;

  // Deteksi wajah dari gambar yang diambil dari kamera
  const faceData = await detectFace(faceImage);
  
  if (!faceData) {
    return res.status(400).json({ message: 'Face not detected in the provided image' });
  }

  const newAccount = {
    name,
    phone,
    position,
    email,
    password,
    faceFeatures: faceData.descriptor,  // Simpan fitur wajah di kolom faceFeatures
  };

  const account = await accountService.createAccount(newAccount);

  return res.status(201).json({ message: 'Account created successfully', account });
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountService.getAccountById(parseInt(id));
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    const account = await accountService.verifyAccount(email, password);
    if (account) {
      const token = jwt.sign({ userID: account.userID, role: account.role }, config.jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};