import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import {
  criarTrilha,
  listarTrilhasUsuario,
  atualizarTrilha,
  deletarTrilha,
} from "../controllers/trilhaController.js";

const router = express.Router();

router.use(verificarToken);

router.post("/", criarTrilha);
router.get("/", listarTrilhasUsuario);
router.put("/:id", atualizarTrilha);
router.delete("/:id", deletarTrilha);

export default router;
