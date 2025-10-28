import Trilha from "../models/Trilha.js";

/**
 * @desc Lista as trilhas mais recentes
 * @route GET /api/trilhas/novidades
 * @access Público
 */
export const listarNovidades = async (req, res) => {
  try {
    const trilhas = await Trilha.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(trilhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar novidades" });
  }
};

/**
 * @desc Lista as trilhas mais populares
 * @route GET /api/trilhas/populares
 * @access Público
 */
export const listarPopulares = async (req, res) => {
  try {
    const trilhas = await Trilha.find()
      .sort({ acessos: -1 })
      .limit(10);
    res.json(trilhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar populares" });
  }
};

/**
 * @desc Lista trilhas iniciadas pelo usuário logado
 * @route GET /api/trilhas/continue
 * @access Privado (requer token)
 */
export const listarContinue = async (req, res) => {
  try {
    const userId = req.user.id;
    const trilhas = await Trilha.find({ usuariosIniciaram: userId }).limit(10);
    res.json(trilhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar trilhas do usuário" });
  }
};

/**
 * @desc Visualiza trilha específica e incrementa acessos
 * @route GET /api/trilhas/:id
 * @access Privado
 */
export const visualizarTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findById(id);

    if (!trilha)
      return res.status(404).json({ message: "Trilha não encontrada" });

    // Incrementa contagem de acessos
    trilha.acessos += 1;

    // Registra que o usuário iniciou a trilha, se ainda não estiver na lista
    if (!trilha.usuariosIniciaram.includes(req.user.id)) {
      trilha.usuariosIniciaram.push(req.user.id);
    }

    await trilha.save();
    res.json(trilha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao visualizar trilha" });
  }
};
