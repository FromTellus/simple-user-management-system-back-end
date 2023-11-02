import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../controllers/userController";

export const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/", listUsers);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
