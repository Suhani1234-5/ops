import express from "express";
import dotenv from "dotenv";
import { startDockerMonitor } from "./monitors/dockerMonitor.js";
import { matchRule } from "../rules/ruleEngine.js";
import { restartContainer } from "../actions/restartContainer.js";
dotenv.config();

const app = express();
app.use(express.json());
startDockerMonitor();
if (event.status === "die") {
  const rule = matchRule(event);
  if (rule) {
    await restartContainer(event.Actor.Attributes.name);
  }
}
app.get("/health", (req, res) => {
  res.json({ status: "AutoOps running" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 AutoOps running on port ${PORT}`);
});
