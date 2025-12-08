import app from "./config/app/express/server.js";
import dotenv from "dotenv";
import { criarTodasTabelas } from "./config/database/index.js";


dotenv.config();

const port = process.env.PORT || 3000;

const startServer = 
  () => 
    app.listen(port, async () => {
      console.log(`Criando tabelas na base de dados, se não existirem...`);
      await criarTodasTabelas();
      console.log(`Server On Fire on port: http://localhost:${port}`);
    });

startServer();