// src/utils/tokenHelper.js
import jwt from "jsonwebtoken";

export function gerarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}

export function verificarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
