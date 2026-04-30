import express from "express";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import { PATHS } from "../../paths.js";
import authRoutes from "./routes/auth-routes.js";
import systemRoutes from "./routes/system-routes.js";
import userRoutes from "./routes/user-routes.js";
import { requestLogger } from "../../../utils/logger.js";
import { errorHandler, notFound } from "../../../middlewares/error-handler.js";

dotenv.config();

const app = express();

// Configurar EJS como view engine
app.set("view engine", "ejs");
app.set("views", PATHS.views);

// Ficheiros estáticos
app.use(express.static(PATHS.public));

// Logger de requisições
app.use(requestLogger);

// Middlewares para ler formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use("/", systemRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(PATHS.views, "index.html"));
});

// 404 handler
app.use(notFound);

// Error handler (deve estar por último)
app.use(errorHandler);

export default app;
