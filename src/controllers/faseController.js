import Fase from "../models/fase.js";

// Criar fase
export const criarFase = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const novaFase = await Fase.create({ titulo, descricao });
    res.status(201).json(novaFase);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar fase" });
  }
};

// Listar fases
export const listarFases = async (req, res) => {
  try {
    const fases = await Fase.find().sort({ createdAt: -1 });
    res.json(fases);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar fases" });
  }
};

// Deletar fase
export const deletarFase = async (req, res) => {
  try {
    const { id } = req.params;
    const deletada = await Fase.findByIdAndDelete(id);
    if (!deletada) return res.status(404).json({ message: "Fase não encontrada" });
    res.json({ message: "Fase deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar fase" });
  }
};
