// src/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
  },
  { timestamps: true } // cria campos createdAt e updatedAt
);

export const User = mongoose.model("User", userSchema);
