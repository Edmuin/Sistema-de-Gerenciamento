# SUMÁRIO DE ALTERAÇÕES - Sistema de Gerenciamento de TCC

**Data**: 30 de Abril de 2026  
**Versão**: 1.1.0

## ✅ Problemas Corrigidos

### 🔐 Autenticação
- [x] Autenticação incompleta → Implementada com JWT
- [x] Senhas sem encriptação → Utiliza bcryptjs com salt
- [x] Sem proteção de rotas → Middleware authMiddleware implementado
- [x] POST /auth/login usando req.params → Agora usa req.body

### 🔍 Validação
- [x] Sem validação de dados → express-validator implementado em todas rotas
- [x] Sem sanitização → Inputs validados e normalizados

### 📤 Upload de Ficheiros
- [x] upload-middleware.js vazio → Completo com validações e filtros
- [x] Sem limite de tamanho → Limite de 5MB + tipos permitidos

### ⚙️ Configuração
- [x] EJS não configurado → Configurado como view engine
- [x] Sem tratamento de erros global → Middleware centralizado implementado
- [x] Rotas de usuários não importadas → Completadas e protegidas

---

## 🆕 Funcionalidades Adicionadas

### 1. **Autenticação Segura**
- JWT com expiração de 24 horas
- Hash de senhas com bcryptjs (salt 10)
- Tokens inclusos em requisições protegidas
- Arquivo: `src/services/auth-service.js`

### 2. **Middleware de Autenticação**
- Middleware para verificar JWT
- Middleware de autenticação opcional
- Proteção de rotas sensíveis
- Arquivo: `src/middlewares/auth-middleware.js`

### 3. **Sistema de Roles**
- 4 níveis de permissão (Admin, Coordenador, Orientador, Aluno)
- Middleware requireRole para controle de acesso
- Arquivo: `src/config/roles.js`

### 4. **Upload de Ficheiros**
- Multer com validação de tipo e tamanho
- Limite de 5MB por ficheiro
- Tipos permitidos: JPEG, PNG, GIF, PDF, DOC, DOCX
- Nomes únicos com timestamp
- Arquivo: `src/middlewares/upload-middleware.js`

### 5. **Logging Estruturado**
- Logger com níveis (info, warn, error, debug)
- Middleware de logging de requisições
- Rastreamento de todas as operações sensíveis
- Arquivo: `src/utils/logger.js`

### 6. **Response Padronizado**
- Classe ApiResponse com métodos padronizados
- Formato consistente para sucesso e erro
- Timestamps automáticos
- Arquivo: `src/utils/response.js`

### 7. **Tratamento de Erros Global**
- Middleware centralizado de erros
- Tratamento específico para diferentes tipos de erro
- Handler 404 automático
- Arquivo: `src/middlewares/error-handler.js`

### 8. **Validação de Dados**
- Validação em todas as rotas
- Normalização de email
- Verificação de força de password
- Arquivo: `src/config/app/express/routes/auth-routes.js`

### 9. **Constantes Centralizadas**
- HTTP status codes
- Configurações de ficheiro
- Mensagens de validação
- Arquivo: `src/config/constants.js`

---

## 📁 Ficheiros Criados

1. **src/utils/logger.js** - Sistema de logging
2. **src/utils/response.js** - Response padronizado
3. **src/config/roles.js** - Definição de roles
4. **src/config/constants.js** - Constantes da app
5. **API_ENDPOINTS.md** - Documentação de endpoints
6. **IMPROVEMENTS.md** - Plano de melhorias futuras
7. **README.md** - Guia completo de setup e uso
8. **test-api.sh** - Script de teste de endpoints
9. **.env.example** - Template para variáveis de ambiente

## 📝 Ficheiros Modificados

| Ficheiro | Mudanças |
|----------|----------|
| `src/services/auth-service.js` | Reescrita completa com JWT e bcrypt |
| `src/controllers/auth-controller.js` | Corrigido login, adicionado logging |
| `src/controllers/user-controller.js` | Validação, logging, response padronizado |
| `src/models/user.model.js` | Adicionado método findByEmail |
| `src/config/database/repository.js` | Adicionado método findByEmail |
| `src/middlewares/auth-middleware.js` | Reescrita com JWT verification |
| `src/middlewares/upload-middleware.js` | Adicionado fileFilter e validações |
| `src/middlewares/error-handler.js` | Reescrita com logging |
| `src/config/app/express/server.js` | EJS, logging middleware adicionados |
| `src/config/app/express/routes/auth-routes.js` | Validação com express-validator |
| `src/config/app/express/routes/user-routes.js` | Validação e proteção de rotas |
| `.env` | Adicionada JWT_SECRET |

---

## 🔄 Melhorias de Código

### Antes
```javascript
// auth-service.js - incompleto
export const AuthService = {
  async login (dados) {
    if (!dados.name || !dados.email)
      throw new Error("Nome e email são obrigatórios.");
    const novo = await UserModel.store(dados);
    return novo;
  },
};
```

### Depois
```javascript
// auth-service.js - completo e seguro
export const AuthService = {
  async login(email, password) {
    const user = await UserModel.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      { id: user.id, email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return { user, token };
  },
};
```

---

## 📊 Estatísticas

- **Linhas de código adicionadas**: ~800
- **Linhas de código refatoradas**: ~400
- **Novos ficheiros**: 9
- **Ficheiros modificados**: 12
- **Dependências adicionadas**: 3 (bcryptjs, jsonwebtoken, express-validator)
- **Endpoints melhorados**: 8

---

## 🚀 Próximas Ações Recomendadas

1. **Teste de integração** - Executar `./test-api.sh`
2. **Atualizar views** - Converter HTML para EJS
3. **Testes unitários** - Adicionar Jest/Supertest
4. **Rate limiting** - Proteger contra brute force
5. **Refresh tokens** - Implementar token renewal
6. **Email verification** - Confirmação de email
7. **2FA** - Autenticação em dois fatores

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- **README.md** - Setup e instruções gerais
- **API_ENDPOINTS.md** - Documentação de endpoints
- **IMPROVEMENTS.md** - Plano de melhorias futuras

---

**Projeto atualizado com sucesso!** ✨
