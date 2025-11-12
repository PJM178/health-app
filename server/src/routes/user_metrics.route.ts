import { Router } from "express";
import { UserMetricsController } from "../controllers/user_metrics.controller";

const router = Router();
const userMetricsController = new UserMetricsController();

// router.get("/:userId/metrics", (req, res) => userMetricsController.getUserMetrics(req, res));
router.get("/metrics", (req, res) => userMetricsController.getAllUserMetrics(req, res));

export default router;