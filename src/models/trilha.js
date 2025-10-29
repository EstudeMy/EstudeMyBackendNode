import mongoose from "mongoose";

const trilhaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  dataCriacao: { type: String, required: true },
  dataTermino: { type: String },
  materia: { type: String, required: true },
  dificuldade: { type: String, enum: ["Facil", "Medio", "Dificil"], default: "Facil" },
  disponibilidade: { type: String, enum: ["Privado", "Aberto"], default: "Privado" },
  pagamento: { type: String, enum: ["Paga", "Gratuita"], default: "Gratuita" },
  faseSelecionada: { type: Number, required: true },
});

const Trilha = mongoose.model("Trilha", trilhaSchema);
export default Trilha;
