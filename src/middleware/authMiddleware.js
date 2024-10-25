import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Middleware untuk autentikasi token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Ambil Authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token dari header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired, please login again" });
      }
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};