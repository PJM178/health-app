import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { HttpError, NotFoundError } from "../utils/errors";

export class UsersController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    console.log(users);
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const user = await this.userService.getUserById(id || "");

      res.json(user);
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error(err);

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const { user } = await this.userService.login(username, password);

      return res.status(200).json({
        message: "login succesful",
        user: { user },
      });
    } catch (err) {
      if (err instanceof HttpError) {
          return res.status(err.statusCode).json({ message: err.message });
      }

      console.error(err);

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}