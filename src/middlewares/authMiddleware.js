// src/middlewares/authMiddleware.js
import { verificarToken } from "../utils/tokenHelper.js";

export function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verificarToken(token);
    req.user = decoded; // agora o controller pode saber quem está logado
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
