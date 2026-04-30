import path from "path";
import { ApiResponse } from "../utils/response.js";
import { Logger } from "../utils/logger.js";
import { validationResult } from "express-validator";
import { UserService } from "../services/user-service.js";

export const index = async (req, res) => {
  try {
    const users = await UserService.listar();
    return ApiResponse.success(res, users, "Utilizadores listados com sucesso");
  } catch (err) {
    Logger.error("Erro ao listar utilizadores", err);
    return ApiResponse.error(res, err.message);
  }
};

export const show = async (req, res) => {
  try {
    const user = await UserService.buscarPorId(req.params.id);
    return ApiResponse.success(res, user, "Utilizador encontrado");
  } catch (err) {
    Logger.warn("Utilizador não encontrado", { userId: req.params.id });
    return ApiResponse.notFound(res, err.message);
  }
};

export const createForm = async (req, res) => {
  try {
    res.render("users/create");
  } catch (err) {
    Logger.error("Erro ao servir formulário de criação", err);
    return ApiResponse.error(res, err.message);
  }
};

export const store = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.badRequest(res, "Validação falhou", 400, errors.array());
    }

    const { name, email } = req.body;
    const avatar = req.file ? req.file.filename : null;
    
    const user = await UserService.gravar({ name, email, avatar });
    
    Logger.info("Novo utilizador criado", { userId: user.id, email });
    return ApiResponse.created(res, user, "Utilizador criado com sucesso");
  } catch (err) {
    Logger.warn("Erro ao criar utilizador", { error: err.message });
    return ApiResponse.badRequest(res, err.message);
  }
};

export const destroy = async (req, res) => {
  try {
    await UserService.EliminarPorId(req.params.id);
    Logger.info("Utilizador eliminado", { userId: req.params.id });
    return ApiResponse.success(res, null, "Utilizador eliminado com sucesso");
  } catch (err) {
    Logger.warn("Erro ao eliminar utilizador", { userId: req.params.id });
    return ApiResponse.notFound(res, err.message);
  }
};
