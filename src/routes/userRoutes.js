// src/routes/userRoutes.js
import express from "express";
import { criarPerfil, loginUser } from "../controllers/userController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas relacionadas aos usuários e autenticação
 */

/**
 * @swagger
 * /usuarios/criarPerfil:
 *   post:
 *     summary: Cria um novo perfil de usuário
 *     description: Cria um perfil para o usuário autenticado. É necessário enviar um token JWT no header e o arquivo da foto de perfil.
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "joaovictor"
 *               personagem:
 *                 type: string
 *                 example: "guerreiro"
 *               fotoPerfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 */
router.post("/criarPerfil", verificarToken, upload.single("fotoPerfil"), criarPerfil);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Faz login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso e token gerado
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", loginUser);

export default router;
