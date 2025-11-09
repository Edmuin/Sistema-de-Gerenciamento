import Repository from "../config/database/repository.js";

export const tabela = {
  nome: "user",
  colunas: "(nome, email, password, telefone, idade, genero, foto, role_id)",
  querys: "(?, ?, ?, ?, ?, ?, ?, ?)",
};

const userRepo = Repository(tabela);

export const UserModel = {
  async findAll() {
    return await userRepo.findAll();
  },

  async findById(id) {
    return await userRepo.findById(id);
  },

  async store(data) {
    return await userRepo.store(data);
  },

  async deleteById(id) {
    return await userRepo.deleteById(id);
  },
};