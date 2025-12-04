import Repository from "../config/database/repository";

export const tabela = {
  nome: "avaliacao",
  colunas: "(id_tcc, observacao, data_avaliacao)",
  querys: "(?, ?, ?)",
};


const avaliacaoRepo = Repository(tabela);

export const AvaliacaoModel = {
  async findAll() {
    return await avaliacaoRepo.findAll();
  },

  async findById(id) {
    return await avaliacaoRepo.findById(id);
  },

  async store(data) {
    return await avaliacaoRepo.store(data);
  },

  async deleteById(id) {
    return await avaliacaoRepo.deleteById(id);
  },
};