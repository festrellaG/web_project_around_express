import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.patch("/me", updateProfile);

router.patch("/me/avatar", updateAvatar);

export default router;
