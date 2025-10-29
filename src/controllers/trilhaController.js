import Trilha from "../models/Trilha.js";


export const criarTrilha = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

    const trilha = new Trilha({ ...req.body, usuario: userId });
    await trilha.save();

    res.status(201).json(trilha);
  } catch (error) {
    console.error("Erro ao criar trilha:", error);
    res.status(500).json({ message: "Erro ao criar trilha" });
  }
};

export const listarTrilhas = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

    const trilhas = await Trilha.find({ usuario: userId });
    res.json(trilhas);
  } catch (error) {
    console.error("Erro ao listar trilhas:", error);
    res.status(500).json({ message: "Erro ao listar trilhas" });
  }
};

export const atualizarTrilha = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const trilha = await Trilha.findOneAndUpdate(
      { _id: id, usuario: userId },
      req.body,
      { new: true }
    );

    if (!trilha) return res.status(404).json({ message: "Trilha não encontrada" });

    res.json(trilha);
  } catch (error) {
    console.error("Erro ao atualizar trilha:", error);
    res.status(500).json({ message: "Erro ao atualizar trilha" });
  }
};

export const deletarTrilha = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const trilha = await Trilha.findOneAndDelete({ _id: id, usuario: userId });
    if (!trilha) return res.status(404).json({ message: "Trilha não encontrada" });

    res.json({ message: "Trilha excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar trilha:", error);
    res.status(500).json({ message: "Erro ao deletar trilha" });
  }
};

// Novidades: trilhas que o usuário ainda não iniciou
export const trilhasNovidades = async (req, res) => {
  try {
    const userId = req.user._id;
    const trilhas = await Trilha.find({ usuariosIniciaram: { $ne: userId } })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(trilhas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar novidades" });
  }
};

// Populares: trilhas com mais visualizações
export const trilhasPopulares = async (req, res) => {
  try {
    const trilhas = await Trilha.find()
      .sort({ visualizacoes: -1 })
      .limit(10);
    res.json(trilhas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar populares" });
  }
};

// Continue: trilhas que o usuário já iniciou
export const trilhasContinue = async (req, res) => {
  try {
    const userId = req.user._id;
    const trilhas = await Trilha.find({ usuariosIniciaram: userId })
      .sort({ updatedAt: -1 })
      .limit(10);
    res.json(trilhas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar trilhas iniciadas" });
  }
};
