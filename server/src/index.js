import express from "express";
import dotenv from "dotenv";
import { startDockerMonitor } from "./monitors/dockerMonitor.js";
dotenv.config();

const app = express();
app.use(express.json());
startDockerMonitor();
app.get("/health", (req, res) => {
  res.json({ status: "AutoOps running" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 AutoOps running on port ${PORT}`);
});
