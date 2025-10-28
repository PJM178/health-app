import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { NotFoundError } from "../utils/errors";

const userService = new UserService();

export class UsersController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();

    res.json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const user = await userService.getUserById(id || "");

      res.json(user);
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error(err);

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}