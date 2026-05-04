# Sistema de Gerenciamento de TCC

Um sistema completo para gerenciamento de Trabalhos de Conclusão de Curso, com autenticação de usuários, controle de roles e gerenciamento de ficheiros.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Banco de Dados**: MySQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: bcryptjs para hash de senhas
- **Validação**: express-validator
- **Upload de Ficheiros**: Multer
- **Template Engine**: EJS
- **Package Manager**: pnpm

## 📋 Requisitos Pré-instalação

- Node.js 16+
- MySQL 8.0+
- pnpm 10.0+

## 🔧 Setup e Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Edmuin/Sistema-de-Gerenciamento.git
cd Sistema-de-Gerenciamento
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o ficheiro `.env` com suas configurações:
```env
PORT=3000
DB_HOST=localhost
DB_USER=sis_tcc_app
DB_PASSWORD=SenhaApp123!
DB_NAME=db_sis_tcc
DB_PORT=3306
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_2024
```

### 4. Crie o banco de dados
```bash
mysql -u root -p < database-init.sql
```

### 5. Inicie o servidor de desenvolvimento
```bash
pnpm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Estrutura de Pastas

```
src/
├── config/          # Configurações (BD, paths, roles, constantes)
├── controllers/     # Controladores (lógica de requisições)
├── middlewares/     # Middlewares (autenticação, upload, erro)
├── models/          # Modelos de dados
├── services/        # Serviços (lógica de negócio)
├── utils/           # Utilitários (logger, response, etc)
├── views/           # Templates EJS
├── public/          # Ficheiros estáticos (CSS, JS, imagens)
└── server.js        # Ponto de entrada principal
```

## 🔐 Autenticação

### Registar novo utilizador
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "password_confirm": "senha123"
  }'
```

### Fazer login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

Resposta conterá um token JWT válido por 24 horas.

## 🛡️ Autenticação em Rotas Protegidas

Adicione o header `Authorization` com o token:

```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

## 👥 Sistema de Roles

| Role ID | Nome | Permissões |
|---------|------|-----------|
| 1 | Admin | Acesso total ao sistema |
| 2 | Coordenador | Gestão de utilizadores e TCCs |
| 2.5 | Orientador | Visualização e revisão de TCCs |
| 3 | Aluno | Submissão e visualização do próprio TCC |

## 📄 Endpoints da API

Consulte o ficheiro `API_ENDPOINTS.md` para documentação completa das endpoints.

### Endpoints Principais

- **POST** `/auth/register` - Registar novo utilizador
- **POST** `/auth/login` - Login de utilizador
- **GET** `/auth/logout` - Logout
- **GET** `/users` - Listar utilizadores
- **GET** `/users/:id` - Obter utilizador por ID
- **POST** `/users` - Criar novo utilizador
- **DELETE** `/users/:id` - Eliminar utilizador

## 🧪 Testes

Execute os testes com:
```bash
chmod +x test-api.sh
./test-api.sh
```

## 📝 Logging

O sistema registra automaticamente:
- Todas as requisições HTTP (método, rota, status, duração)
- Erros ocorridos
- Ações de autenticação (login, registo, logout)
- Modificações de dados

Verifique os logs no console durante desenvolvimento.

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED" ao conectar BD
- Verificar se MySQL está a rodar
- Verificar credenciais em `.env`
- Verificar porta MySQL (padrão 3306 ou 3307)

### Erro: "Token inválido"
- Verificar se o token expirou (válido por 24h)
- Verificar se o JWT_SECRET é o correto

### Erro: "Ficheiro muito grande"
- Máximo 5MB por ficheiro
- Altere `FILE_CONFIG.MAX_SIZE` em `src/config/constants.js`

## 🚀 Deployment

### Usando PM2
```bash
pnpm install -g pm2
pm2 start src/server.js --name "tcc-system"
pm2 save
pm2 startup
```

### Usando Docker
```bash
docker build -t tcc-system .
docker run -p 3000:3000 --env-file .env tcc-system
```

## 📈 Próximas Melhorias

- [ ] Testes unitários e integração
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] 2FA (autenticação em dois fatores)
- [ ] Notificações por email
- [ ] Integração OAuth (Google, GitHub)
- [ ] WebSockets para notificações em tempo real

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o ficheiro `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Edmuin**  
GitHub: [@Edmuin](https://github.com/Edmuin)

## 📞 Suporte

Para reportar problemas ou sugestões, abra uma [Issue](https://github.com/Edmuin/Sistema-de-Gerenciamento/issues).

---

**Última atualização**: 30 de Abril de 2026
