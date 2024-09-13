import jwt from 'jsonwebtoken'; // Import jsonwebtoken untuk verifikasi JWT
import config from '../config/config.js'; // Import konfigurasi untuk mendapatkan secret key

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Jika token tidak ada, kirim status 401 (Unauthorized)

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      console.error('JWT Error:', err.message); // Log kesalahan JWT untuk debugging
      return res.sendStatus(403); // Jika token tidak valid atau kadaluarsa, kirim status 403 (Forbidden)
    }
    
    req.user = user; // Jika token valid, set user ke dalam request
    next(); // Lanjutkan ke middleware atau route berikutnya
  });
};
