import mongoose from "mongoose";

const TrilhaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    materia: { type: String, required: true },
    dificuldade: {
      type: String,
      enum: ["Facil", "Medio", "Dificil"],
      default: "Facil",
    },
    disponibilidade: {
      type: String,
      enum: ["Privado", "Aberto"],
      default: "Privado",
    },
    pagamento: {
      type: String,
      enum: ["Paga", "Gratuita"],
      default: "Gratuita",
    },
    faseSelecionada: { type: Number, required: true },

    // Relacionamentos e controle
    criador: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // quem criou a trilha
    usuariosIniciaram: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Estatísticas
    acessos: { type: Number, default: 0 },
    dataCriacao: { type: Date, default: Date.now },
    dataTermino: { type: Date },
  },
  {
    timestamps: true, // adiciona automaticamente createdAt e updatedAt
  }
);

export default mongoose.models.Trilha ||
  mongoose.model("Trilha", TrilhaSchema);
