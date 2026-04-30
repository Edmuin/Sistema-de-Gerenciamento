import { ApiResponse } from "../utils/response.js";
import { Logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  Logger.error("Erro capturado", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Erro de multer
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return ApiResponse.error(res, "Ficheiro muito grande (máximo 5MB)", 413);
    }
    return ApiResponse.badRequest(res, err.message);
  }

  // Erro de validação
  if (err.name === "ValidationError") {
    return ApiResponse.badRequest(res, "Dados inválidos", 400, err.errors);
  }

  // Erro genérico
  const status = err.status || 500;
  const message = err.message || "Erro interno do servidor";

  return ApiResponse.error(res, message, status);
};

export const notFound = (req, res, next) => {
  Logger.warn("Rota não encontrada", {
    path: req.path,
    method: req.method,
  });
  return ApiResponse.notFound(res, "Rota não encontrada");
};

