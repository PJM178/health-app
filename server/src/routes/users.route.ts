import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();
const usersController = new UsersController();

router.get("/", (req, res) => usersController.getAllUsers(req, res));
router.get("/:id", (req, res) => usersController.getUserById(req, res));
router.post("/login", (req, res) => usersController.login(req, res));

export default router;