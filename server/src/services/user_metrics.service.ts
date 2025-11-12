import { UserRepository } from "../repositories/users.repository";
import { User } from "../models/user.model";
import { HttpError, NotFoundError } from "../utils/errors";
import { UserMetricsRepository } from "../repositories/user_metrics.repository";
import { Unit } from "../models/unit.model";

export class UserMetricsService {
  private userMetricsRepository: UserMetricsRepository;

  constructor() {
    this.userMetricsRepository = new UserMetricsRepository();
  }

  async getAllUserMetrics(): Promise<Unit[]> {
    const metrics = await this.userMetricsRepository.findAllUserMetrics();

    return metrics;
  }
}