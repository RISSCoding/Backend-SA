import jwt from 'jsonwebtoken'; // Import jsonwebtoken untuk verifikasi JWT
import config from '../config/config.js'; // Import konfigurasi untuk mendapatkan secret key

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // pastikan `userID` disimpan di req.user
    next();
  });
};


