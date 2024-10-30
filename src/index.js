import express from "express";
import cors from "cors";
import config from "./config/config.js";
import router from "./router/router.js";

const app = express();

app.use(
  cors({
    origin: "https://smart-att.curaweda.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Path:", req.path);
  console.log("Content-Type:", req.get("Content-Type"));
  console.log("Request Body (raw):", req.body);
  next();
});

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
