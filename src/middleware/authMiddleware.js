import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Ambil token dari cookie

  if (!token) return res.sendStatus(401); // Tidak ada token, akses ditolak

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token tidak valid

    req.user = user; // Menyimpan data user (termasuk userID dan role) dari token
    next(); // Lanjut ke fungsi berikutnya
  });
};
