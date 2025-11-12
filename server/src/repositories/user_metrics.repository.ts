import pool from "../db";
import { Unit } from "../models/unit.model";

export class UserMetricsRepository {
  async findUserMetricsByUserId(userId: string): Promise<Unit[]> {
    const query = `
      SELECT * FROM user_metrics
      WHERE 
      `;
    const values = [userId];

    const result = await pool.query(query, values);

    return result.rows;
  }

  async findAllUserMetrics(): Promise<Unit[]> {
    const query = `
      SELECT
        u.username,
        u.first_name,
        u.last_name,
        un.name AS unit_name,
        un.symbol AS unit_symbol,
        un.category AS unit_category,
        um.value,
        um.created_at
      FROM user_metrics um
      JOIN users u ON um.user_id = u.id
      JOIN units un ON um.unit_id = un.id
      ORDER BY u.username, un.category
      `;

    const result = await pool.query(query);

    return result.rows;
  }
}