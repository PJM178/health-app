import pool from "../db";
import { Unit } from "../models/unit.model";

export class UserMetricsRepository {
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

  async findUserMetricsByUserId(userId: string): Promise<Unit[]> {
    const query = `
      SELECT
        un.name AS unit_name,
        un.symbol AS unit_symbol,
        un.category AS unit_category,
        um.value,
        um.created_at
      FROM user_metrics um
      JOIN users u ON um.user_id = u.id
      JOIN units un ON um.unit_id = un.id
      WHERE u.id = $1
      ORDER BY u.username, un.category
    `;

    const values = [userId];

    const result = await pool.query(query, values);
    console.log(result.rows);
    return result.rows;
  }
}