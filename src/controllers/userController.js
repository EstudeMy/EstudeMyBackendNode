// src/controllers/userController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const criarPerfil = async (req, res) => {
  try {
    // Verifica autenticação
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const { username, personagem, fotoPerfil: fotoBody } = req.body;
    let fotoPerfil = "";

    // Se enviou arquivo via upload
    if (req.file) {
      fotoPerfil = `/uploads/${req.file.filename}`;
    } else if (fotoBody) {
      fotoPerfil = fotoBody;
    }

    // Validação dos campos obrigatórios
    if (!username?.trim() || !personagem?.trim() || !fotoPerfil?.trim()) {
      return res.status(400).json({
        message: "Personagem, username e foto são obrigatórios!",
      });
    }

    // Busca o usuário logado
    const usuario = await User.findById(req.user._id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Atualiza os campos de perfil
    usuario.username = username.trim();
    usuario.personagem = personagem.trim();
    usuario.fotoPerfil = fotoPerfil.trim();

    await usuario.save();

    res.json({
      message: "Perfil criado com sucesso!",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar perfil." });
  }
};
  
export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha, dataNascimento, tipoUsuario, registro, titulacao } = req.body;

    // Verifica se já existe
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    const usuario = new User({
      nome,
      email,
      senha: hashedSenha,
      dataNascimento,
      tipoUsuario,
      registro: tipoUsuario === "PROFESSOR" ? registro : undefined,
      titulacao: tipoUsuario === "PROFESSOR" ? titulacao : undefined,
    });

    await usuario.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Gera token
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      token,
      perfilCriado: !!usuario.personagem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

