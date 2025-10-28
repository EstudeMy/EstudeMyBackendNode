import Trilha from "../models/Trilha.js";

// Criar nova trilha
export const criarTrilha = async (req, res) => {
  try {
    const { titulo, descricao, dataCriacao, dataTermino, materia, dificuldade, disponibilidade, pagamento, faseSelecionada } = req.body;

    if (!titulo || !descricao || !materia || !faseSelecionada) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }

    const novaTrilha = new Trilha({
      usuario: req.user._id,
      titulo,
      descricao,
      dataCriacao,
      dataTermino,
      materia,
      dificuldade,
      disponibilidade,
      pagamento,
      faseSelecionada,
    });

    await novaTrilha.save();
    res.status(201).json(novaTrilha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar trilha." });
  }
};

// Buscar trilhas do usuário logado
export const listarTrilhasUsuario = async (req, res) => {
  try {
    const trilhas = await Trilha.find({ usuario: req.user._id }).sort({ createdAt: -1 });
    res.json(trilhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar trilhas." });
  }
};

// Atualizar trilha
export const atualizarTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findOne({ _id: id, usuario: req.user._id });
    if (!trilha) return res.status(404).json({ message: "Trilha não encontrada." });

    Object.assign(trilha, req.body);
    await trilha.save();

    res.json(trilha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar trilha." });
  }
};

// Deletar trilha
export const deletarTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findOneAndDelete({ _id: id, usuario: req.user._id });
    if (!trilha) return res.status(404).json({ message: "Trilha não encontrada." });

    res.json({ message: "Trilha deletada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar trilha." });
  }
};
