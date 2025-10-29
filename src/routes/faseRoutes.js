import express from "express";
import { criarFase, listarFases, deletarFase } from "../controllers/faseController.js";
import { verificarToken } from "../middlewares/authMiddleware.js"; // se usar autenticação

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Fases
 *   description: Rotas relacionadas à criação, listagem e exclusão de fases
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/fases:
 *   get:
 *     summary: Lista todas as fases
 *     tags: [Fases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fases retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "671f23a8bc12ab3456f90e12"
 *                   nome:
 *                     type: string
 *                     example: "Fase 1"
 *                   descricao:
 *                     type: string
 *                     example: "Introdução aos conceitos básicos"
 *       401:
 *         description: Token ausente ou inválido
 */
router.get("/", verificarToken, listarFases);

/**
 * @swagger
 * /api/fases:
 *   post:
 *     summary: Cria uma nova fase
 *     tags: [Fases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fase 1"
 *               descricao:
 *                 type: string
 *                 example: "Introdução aos conceitos básicos"
 *     responses:
 *       201:
 *         description: Fase criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Fase criada com sucesso!"
 *                 fase:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671f23a8bc12ab3456f90e12"
 *                     nome:
 *                       type: string
 *                       example: "Fase 1"
 *                     descricao:
 *                       type: string
 *                       example: "Introdução aos conceitos básicos"
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 */
router.post("/", verificarToken, criarFase);

/**
 * @swagger
 * /api/fases/{id}:
 *   delete:
 *     summary: Deleta uma fase pelo ID
 *     tags: [Fases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da fase a ser deletada
 *         schema:
 *           type: string
 *           example: "671f23a8bc12ab3456f90e12"
 *     responses:
 *       200:
 *         description: Fase deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Fase deletada com sucesso!"
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Fase não encontrada
 */
router.delete("/:id", verificarToken, deletarFase);

export default router;
