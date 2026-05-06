import app from "./config/app/express/server.js";
import dotenv from "dotenv";
import { testConnection } from "./config/database/mysql/db.js";

dotenv.config();

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await testConnection();
    console.log('Conexão com banco de dados estabelecida.');
  } catch (error) {
    console.warn('Atenção: não foi possível conectar ao banco de dados. O servidor ainda irá iniciar, mas o registro/login poderão falhar até que as credenciais sejam corrigidas no arquivo .env.');
    console.warn('Erro de DB:', error.message);
  }

  app.listen(port, () => {
    console.log(`Server On Fire on port: http://localhost:${port}`);
  });
};

startServer();