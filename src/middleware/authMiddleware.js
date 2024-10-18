
import jwt from 'jsonwebtoken'; // Import jsonwebtoken untuk verifikasi JWT
import config from '../config/config.js'; // Import konfigurasi untuk mendapatkan secret key


export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // Simpan user di req.user
    next();
  });
};



