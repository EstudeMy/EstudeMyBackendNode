import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import trilhaRoutes from "./routes/trilhaRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import faseRoutes from "./routes/faseRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    // 1. URL do seu Frontend Vercel (MUITO IMPORTANTE!)
    'https://estudemy.vercel.app', 
    // 2. URL do seu Backend Render (para o Swagger UI interno)
    'https://estudemybackendnode.onrender.com', 
    // 3. URLs locais para desenvolvimento
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'http://localhost:5000',
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem origem (como apps mobile ou curl) e as origens permitidas
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/trilhas", trilhaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", perfilRoutes);
app.use("/api/fases", faseRoutes);
app.use("/api/usuarios", userRoutes); 

app.use(cors(corsOptions)); // Aplica a nova configuração CORS
app.use(express.json());

// Middleware de erros
app.use(errorHandler);

export default app;


