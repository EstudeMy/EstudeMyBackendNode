// src/routes/userRoutes.js
import express from "express";
import { criarPerfil } from "../controllers/userController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { loginUser} from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/criarPerfil", verificarToken, upload.single("fotoPerfil"), criarPerfil);

router.post("/login", loginUser);

export default router;
