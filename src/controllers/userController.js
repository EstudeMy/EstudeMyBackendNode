// src/controllers/userController.js
import { listarUsuarios, criarUsuario, loginUsuario } from "../services/userService.js";
import { gerarToken } from "../utils/tokenHelper.js";

export async function getAllUsers(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar usuários", error });
  }
}

export async function createUser(req, res) {
  try {
    const novoUsuario = await criarUsuario(req.body);
    res.status(201).json({
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, senha } = req.body;
    const user = await loginUsuario(email, senha);

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = gerarToken({ id: user._id, email: user.email });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro no login", error });
  }
}
