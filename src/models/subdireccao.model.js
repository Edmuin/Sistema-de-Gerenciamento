import Repository from "../config/database/repository.js";

export const tabela = {
  nome: "subdireccao",
  colunas: "(id_user, cargo)",
  querys: "(?, ?)",
};

const subdireccaoRepo = Repository(tabela);

export const SubdireccaoModel = {
  async findAll() {
    return await subdireccaoRepo.findAll();
  },

  async findById(id) {
    return await subdireccaoRepo.findById(id);
  },

  async store(data) {
    return await subdireccaoRepo.store(data);
  },

  async deleteById(id) {
    return await subdireccaoRepo.deleteById(id);
  },
};