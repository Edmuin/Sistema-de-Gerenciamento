import Repository from "../config/database/repository.js";

export const tabela = {
  nome: "estudante",
  colunas: "(id_user, numero_estudante, numero_processo, turma, ano_lectivo, id_curso)",
  querys: "(?, ?, ?, ?, ?, ?)",
};

const estudanteRepo = Repository(tabela);

export const EstudanteModel = {
  async findAll() {
    return await estudanteRepo.findAll();
  },

  async findById(id) {
    return await estudanteRepo.findById(id);
  },

  async store(data) {
    return await estudanteRepo.store(data);
  },

  async deleteById(id) {
    return await estudanteRepo.deleteById(id);
  },
};