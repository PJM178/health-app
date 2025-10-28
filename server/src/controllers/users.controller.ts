import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};