import Repository from "../config/database/repository.js";

export const tabela = {
  nome: "documento",
  colunas: "(id_tcc, nome, tipo, caminho_arquivo)",
  querys: "(?, ?, ?, ?)",
};

const documentoRepo = Repository(tabela);

export const DocumentoModel = {
  async findAll() {
    return await documentoRepo.findAll();
  },

  async findById(id) {
    return await documentoRepo.findById(id);
  },

  async store(data) {
    return await documentoRepo.store(data);
  },

  async deleteById(id) {
    return await documentoRepo.deleteById(id);
  },
};