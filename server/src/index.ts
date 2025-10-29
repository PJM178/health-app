import express, { Request, Response } from "express";
import usersRoute from "./routes/users.route";
import cors from "cors";
import { connectToDb } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Allow requests from frontend
app.use(cors({
  origin: "http://localhost:8081", // or "*" to allow all origins (not recommended for production)
  credentials: false // only if you're using cookies or auth headers
}));

// Routes
app.use("/api/users", usersRoute);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript server is running 🚀");
});

async function initializeServer() {
  // Try to connect to the db
  await connectToDb();

  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
}

initializeServer();
