import { Request, Response } from "express";
import { UserMetricsService } from "../services/user_metrics.service";
import { HttpError, NotFoundError } from "../utils/errors";

export class UserMetricsController {
  private userMetricsService: UserMetricsService;

  constructor() {
    this.userMetricsService = new UserMetricsService();
  }

  async getAllUserMetrics(req: Request, res: Response) {
    const userMetrics = await this.userMetricsService.getAllUserMetrics();
    console.log("Get all users' metrics " + new Date(Date.now()).toUTCString(), userMetrics);

    return res.status(200).json(userMetrics);
  }

  async getUserMetricsBasedOnId(req: Request, res: Response) {
    const userId = req.params.userId;

    const singleUserMetrics = await this.userMetricsService.getUserMetricsBasedOnId(String(userId));

    return res.status(200).json(singleUserMetrics);
  }
}