import express from "express";
import { login } from "../controllers/authController.js";
import { registerUser, criarPerfil } from "../controllers/userController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router(); 

// Cria a pasta /uploads caso não exista
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });
// rota de login
router.post("/login", login);

// rota de cadastro
router.post("/register", registerUser);

// rota de criar perfil (protegida por token e aceita upload de imagem)
router.post(
  "/criarPerfil",
  verificarToken,       // protege a rota
  upload.single("fotoPerfil"), // aceita upload de um arquivo com campo "fotoPerfil"
  criarPerfil
);

export default router;