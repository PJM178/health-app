import pool from "../db";
import { Unit } from "../models/unit.model";

export class MetricRepository {
  async findAllMetrics(): Promise<Unit[]> {
    const query = "SELECT * FROM metrics";

    const result = await pool.query(query);

    return result.rows;
  }
}