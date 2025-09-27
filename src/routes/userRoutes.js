// src/routes/userRoutes.js
import { Router } from "express";
import { getAllUsers, createUser, loginUser } from "../controllers/userController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/", autenticar, getAllUsers); // agora precisa de token

export default router;
