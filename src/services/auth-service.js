import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getRoleName = (roleId) => {
  const roles = {
    1: "Admin",
    2: "Coordenador",
    2.5: "Orientador",
    3: "Aluno",
  };
  return roles[roleId] || "Aluno";
};

export const AuthService = {
  async register(dados) {
    if (!dados.name || !dados.email || !dados.password) {
      throw new Error("Nome, email e password são obrigatórios.");
    }

    // Verificar se o email já existe
    const existingUser = await UserModel.findByEmail(dados.email);
    if (existingUser) {
      throw new Error("Email já registrado.");
    }

    // Hash da password
    const hashedPassword = await bcrypt.hash(dados.password, 10);
    
    const novo = await UserModel.store({
      nome: dados.name,
      email: dados.email,
      password: hashedPassword,
      role_id: dados.role_id || 3, // Default: Aluno
    });
    
    return {
      ...novo,
      role_id: novo.role_id || dados.role_id || 3,
      role: getRoleName(novo.role_id || dados.role_id || 3),
    };
  },

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email e password são obrigatórios.");
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Utilizador não encontrado.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Password incorreta.");
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET || "seu_segredo_aqui",
      { expiresIn: "24h" }
    );

    const role = getRoleName(user.role_id);
    const userWithRole = {
      ...user,
      role_id: user.role_id || 3,
      role,
    };

    const tokenWithRole = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id, role },
      process.env.JWT_SECRET || "seu_segredo_aqui",
      { expiresIn: "24h" }
    );

    return { user: userWithRole, token: tokenWithRole };
  },

  async logout(id) {
    // Logout é gerido no cliente apagando o token
    // Esta função é opcional
    return { message: "Logout realizado com sucesso" };
  },
};