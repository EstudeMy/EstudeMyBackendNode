// src/routes/trilhaRoutes.js
import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import {
  criarTrilha,
  listarTrilhas,
  atualizarTrilha,
  deletarTrilha,
  trilhasNovidades,
  trilhasPopulares,
  trilhasContinue,
} from "../controllers/trilhaController.js";

const router = express.Router();

// Rotas básicas CRUD
router.post("/", verificarToken, criarTrilha);
router.get("/", verificarToken, listarTrilhas);
router.put("/:id", verificarToken, atualizarTrilha);
router.delete("/:id", verificarToken, deletarTrilha);

// Rotas para Home
router.get("/novidades", verificarToken, trilhasNovidades);
router.get("/populares", trilhasPopulares); // público
router.get("/continue", verificarToken, trilhasContinue);

export default router;
