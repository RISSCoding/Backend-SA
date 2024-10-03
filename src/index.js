import express from "express";
import config from "./config/config.js";
import router from "./router/router.js";

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk debugging
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Path:", req.path);
  console.log("Content-Type:", req.get("Content-Type"));
  console.log("Request Body (raw):", req.body);
  next();
});

app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
