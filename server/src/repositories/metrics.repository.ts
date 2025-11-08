import pool from "../db";
import { Metric } from "../models/metric.model";

export class MetricRepository {
  async findAll(): Promise<Metric[]> {
    const result = await pool.query("SELECT * FROM metrics;");

    return result.rows;
  }
}