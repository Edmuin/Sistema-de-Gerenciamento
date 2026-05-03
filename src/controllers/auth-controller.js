import path from "path";
import { AuthService } from "../services/auth-service.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/response.js";
import { Logger } from "../utils/logger.js";

export const formLogin = async (req, res) => {
  try {
    res.sendFile(path.join(process.cwd(), "src/views/auth/login-v2.html"));
  } catch (err) {
    Logger.error("Erro ao servir form de login", err);
    return ApiResponse.error(res, err.message);
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.badRequest(res, "Validação falhou", 400, errors.array());
    }

    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    Logger.info("Login bem-sucedido", { userId: user.id, email });

    return ApiResponse.success(res, {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.nome,
        role_id: user.role_id,
        role: user.role || "Aluno",
      },
    }, "Login realizado com sucesso");
  } catch (err) {
    Logger.warn("Falha de login", { email: req.body.email, error: err.message });
    return ApiResponse.unauthorized(res, err.message);
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.badRequest(res, "Validação falhou", 400, errors.array());
    }

    const { name, email, password, password_confirm } = req.body;
    const role_id = Number(req.body.role_id) || 3;

    if (password !== password_confirm) {
      return ApiResponse.badRequest(res, "Passwords não coincidem");
    }

        const user = await AuthService.register({ name, email, password, role_id });

    Logger.info("Novo utilizador registado", { userId: user.id, email });

        return ApiResponse.created(res, {
          user: {
            id: user.id,
            email: user.email,
            name: user.nome,
            role_id: user.role_id,
            role: user.role,
          },
        }, "Utilizador registado com sucesso");
  } catch (err) {
    Logger.warn("Falha no registo", { email: req.body.email, error: err.message });
    return ApiResponse.error(res, err.message, 400);
  }
};

export const logout = async (req, res) => {
  try {
    const result = await AuthService.logout(req.user?.id);
    Logger.info("Logout realizado", { userId: req.user?.id });
    return ApiResponse.success(res, result, "Logout realizado com sucesso");
  } catch (err) {
    Logger.error("Erro no logout", err);
    return ApiResponse.error(res, err.message);
  }
};
