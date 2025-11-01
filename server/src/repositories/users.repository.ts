import { User } from "../models/user.model";
import pool from "../db";

export class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await pool.query("SELECT * FROM users;");

    return users.rows;
  }

  async findById(id: string): Promise<User | undefined> {
    const query = "SELECT * FROM users WHERE id = $1;";
    const values = [id];

    const user = await pool.query(query, values);

    return user.rows[0];
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const query = "SELECT * FROM users WHERE username = $1;";
    const values = [username];

    const user = await pool.query(query, values);

    return user.rows[0];
  }
}