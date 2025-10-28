import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { getHomeData } from "../controllers/homeController.js";

const router = express.Router();

// Endpoint protegido: só usuários logados podem acessar
router.get("/", verificarToken, getHomeData);

export default router;
