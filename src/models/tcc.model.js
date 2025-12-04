import Repository from "../config/database/repository.js";

export const tabela = {
  nome: "tcc",
  colunas: "(tema, objectivo, estado, data_submissao, id_estudante, id_professor)",
  querys: "(?, ?)",
};

const tccRepo = Repository(tabela);

export const TccBancaModel = {
  async findAll() {
    return await tccRepo.findAll();
  },

  async findById(id) {
    return await tccRepo.findById(id);
  },

  async store(data) {
    return await tccRepo.store(data);
  },

  async deleteById(id) {
    return await tccRepo.deleteById(id);
  },
};