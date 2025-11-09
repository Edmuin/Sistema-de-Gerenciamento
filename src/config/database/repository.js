import { pool } from "./mysql/db.js";

function Repository(table) {
  return {
    async findAll() {
      try {
        const [rows] = await pool.query(`SELECT * FROM ${table.nome}`);
        return rows;
      } catch (error) {
        console.error("Erro ao buscar todos:", error);
        throw error;
      }
    },

    async findById(id) {
      try {
        const [rows] = await pool.query(
          `SELECT * FROM ${table.nome} WHERE id = ?`,
          [id]
        );
        return rows[0];
      } catch (error) {
        console.error("Erro ao buscar por ID:", error);
        throw error;
      }
    },

    async store(entity) {
      try {
        const [result] = await pool.query(
          `INSERT INTO ${table.nome} ${table.colunas} VALUES ${table.querys}`,
          [...entity]
        );
        return { id: result.insertId, ...entity };
      } catch (error) {
        console.error("Erro ao inserir:", error);
        throw error;
      }
    },

    async deleteById(id) {
      try {
        const [result] = await pool.query(
          `DELETE FROM ${table.nome} WHERE id = ?`,
          [id]
        );
        return result;
      } catch (error) {
        console.error("Erro ao excluir:", error);
        throw error;
      }
    },
  };
}

export default Repository;
