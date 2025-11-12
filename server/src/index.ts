import express, { Request, Response } from "express";
import usersRoute from "./routes/users.route";
import userMetricsRoute from "./routes/user_metrics.route";
import cors from "cors";
import { connectToDb } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Configure cors
app.use(cors({
  // Allow requests coming from the front
  origin: "http://localhost:8081",
  credentials: false
}));

// Routes
// Users and user metrics
app.use("/api/users", [userMetricsRoute, usersRoute]);

// Initialize the server
async function initializeServer() {
  // Setup the database - if connection to the database fails, node process exits and the server won't start
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

initializeServer();
