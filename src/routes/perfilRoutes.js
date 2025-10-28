import express from "express";
import { criarPerfil } from "../controllers/perfilController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/criarPerfil", verificarToken, upload.single("fotoPerfil"), criarPerfil);

export default router;
