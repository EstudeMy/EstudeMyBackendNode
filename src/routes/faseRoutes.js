import express from "express";
import { criarFase, listarFases, deletarFase } from "../controllers/faseController.js";
import { verificarToken } from "../middlewares/authMiddleware.js"; // se usar autenticação

const router = express.Router();

router.get("/", verificarToken, listarFases);
router.post("/", verificarToken, criarFase);
router.delete("/:id", verificarToken, deletarFase);

export default router;
