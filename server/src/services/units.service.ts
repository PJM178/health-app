import { UserRepository } from "../repositories/users.repository";
import { User } from "../models/user.model";
import { HttpError, NotFoundError } from "../utils/errors";
import { MetricRepository } from "../repositories/units.repository";
import { Unit } from "../models/unit.model";

export class UserService {
  private metricRepository: MetricRepository;

  constructor() {
    this.metricRepository = new MetricRepository();
  }

  // async getAllMetrics(): Promise<Unit[]> {
  //   const metrics = await this.metricRepository.findAll();

  //   return metrics;
  // }
}