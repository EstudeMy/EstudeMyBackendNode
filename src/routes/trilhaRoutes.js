import express from "express";
import { listarNovidades, listarPopulares, listarContinue, visualizarTrilha } from "../controllers/trilhaController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/novidades", listarNovidades);
router.get("/populares", listarPopulares);
router.get("/continue", verificarToken, listarContinue);
router.get("/visualizar/:id", verificarToken, visualizarTrilha);

export default router;


