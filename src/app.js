import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import trilhaRoutes from "./routes/trilhaRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/trilhas", trilhaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", perfilRoutes);

// Middleware de erros
app.use(errorHandler);

export default app;


