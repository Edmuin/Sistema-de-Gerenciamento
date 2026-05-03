import { UserModel } from "../models/user.model.js";

const getRoleName = (roleId) => {
  const roles = {
    1: "Admin",
    2: "Coordenador",
    2.5: "Orientador",
    3: "Aluno",
  };
  return roles[roleId] || "Aluno";
};

export const UserService = {
  async listar() {
    const users = await UserModel.findAll();
    return users.map((user) => ({
      ...user,
      role: getRoleName(user.role_id),
    }));
  },

  async gravar(dados) {
    if (!dados.name || !dados.email)
      throw new Error("Nome e email são obrigatórios.");

    const novo = await UserModel.store(dados);
    return novo;
  },

  async buscarPorId(id) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("Usuário não encontrado.");
    return {
      ...user,
      role: getRoleName(user.role_id),
    };
  },

  async EliminarPorId(id) {
    const user = await UserModel.deleteById(id);
    if (!user) throw new Error("Usuário não encontrado.");
    return user;
  }
};
