# 🏗️ ARQUITETURA DO SISTEMA

## Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENTE (Frontend)                          │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ POST /auth/login
                             │ { email, password }
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVIDOR EXPRESS                             │
├─────────────────────────────────────────────────────────────────┤
│  1. express-validator (validação)                               │
│     └─ Email válido?                                            │
│     └─ Password mínimo 6 chars?                                 │
│                                                                 │
│  2. auth-controller (tratamento requisição)                     │
│     └─ Chama AuthService.login()                                │
│                                                                 │
│  3. auth-service (lógica de negócio)                            │
│     ├─ UserModel.findByEmail(email)                             │
│     ├─ bcrypt.compare(password, user.password)                  │
│     └─ jwt.sign({ id, email, role_id })                        │
│                                                                 │
│  4. ApiResponse (resposta padronizada)                          │
│     └─ { success, message, data, timestamp }                   │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ Response com JWT Token
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CLIENTE (Frontend)                             │
│   localStorage.setItem('token', response.data.token)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Arquitetura em Camadas

```
┌──────────────────────────────────────────────────────────┐
│                   PRESENTAÇÃO (Views)                    │
│    - HTML/EJS Templates                                 │
│    - CSS/JavaScript Frontend                            │
└──────────────────────────────────────────────────────────┘
                          ▲
                          │ res.render(), res.sendFile()
                          │
┌──────────────────────────────────────────────────────────┐
│                  CONTROLADORES                           │
│    - auth-controller.js                                 │
│    - user-controller.js                                 │
│    - system-controller.js                               │
└──────────────────────────────────────────────────────────┘
                          ▲
                          │ Chamadas de método
                          │
┌──────────────────────────────────────────────────────────┐
│                    SERVIÇOS                              │
│    - auth-service.js      (Lógica de autenticação)      │
│    - user-service.js      (CRUD de usuários)            │
│    - system-service.js    (Sistema geral)               │
└──────────────────────────────────────────────────────────┘
                          ▲
                          │ Acesso a dados
                          │
┌──────────────────────────────────────────────────────────┐
│                    MODELOS                               │
│    - user.model.js        (User entity)                 │
│    - role.model.js        (Role entity)                 │
└──────────────────────────────────────────────────────────┘
                          ▲
                          │ Repository pattern
                          │
┌──────────────────────────────────────────────────────────┐
│                  REPOSITORY (DAO)                        │
│    - repository.js        (Operações genéricas)         │
└──────────────────────────────────────────────────────────┘
                          ▲
                          │ Queries SQL
                          │
┌──────────────────────────────────────────────────────────┐
│                  BANCO DE DADOS                          │
│    - MySQL 8.0                                          │
│    - Pool de conexões (max 10)                          │
└──────────────────────────────────────────────────────────┘
```

---

## Middleware Pipeline

```
REQUEST
   │
   ▼
┌────────────────────────────────┐
│ express.json()                 │ Parsear JSON
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ express.urlencoded()           │ Parsear formulários
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ requestLogger                  │ Logging de requisição
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ express.static()               │ Ficheiros estáticos
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ Rotas (routes)                 │
│   │                            │
│   ├─ authRoutes                │ /auth/*
│   ├─ userRoutes                │ /users/*
│   └─ systemRoutes              │ /system/*
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ Controllers + Services         │ Lógica de negócio
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ ApiResponse                    │ Resposta formatada
└────────────────────────────────┘
   │
   ▼
┌────────────────────────────────┐
│ errorHandler                   │ Tratamento de erros
└────────────────────────────────┘
   │
   ▼
RESPONSE
```

---

## Estrutura de Pastas Detalhada

```
Sistema-de-Gerenciamento/
│
├── 📄 package.json
├── 📄 .env
├── 📄 .env.example
├── 📚 README.md
├── 📋 API_ENDPOINTS.md
├── 📈 IMPROVEMENTS.md
├── 📝 CHANGELOG.md
├── 🤝 CONTRIBUTING.md
├── 📊 SUMMARY.md
├── 🚀 NEXT_STEPS.md
│
├── 📁 src/
│   ├── 📄 server.js                      (Ponto de entrada)
│   │
│   ├── 📁 config/
│   │   ├── 📄 paths.js                   (Caminhos absolutos)
│   │   ├── 📄 roles.js                   (Sistema de roles)
│   │   ├── 📄 constants.js               (Constantes)
│   │   ├── 📁 app/
│   │   │   └── 📁 express/
│   │   │       ├── 📄 server.js          (Configuração Express)
│   │   │       └── 📁 routes/
│   │   │           ├── 📄 auth-routes.js
│   │   │           ├── 📄 user-routes.js
│   │   │           └── 📄 system-routes.js
│   │   └── 📁 database/
│   │       ├── 📄 repository.js          (Pattern DAO)
│   │       └── 📁 mysql/
│   │           └── 📄 db.js              (Conexão MySQL)
│   │
│   ├── 📁 controllers/
│   │   ├── 📄 auth-controller.js         (Lógica auth)
│   │   ├── 📄 user-controller.js         (Lógica users)
│   │   └── 📄 system-controller.js       (Lógica sistema)
│   │
│   ├── 📁 middlewares/
│   │   ├── 📄 auth-middleware.js         (JWT verification)
│   │   ├── 📄 upload-middleware.js       (File upload)
│   │   └── 📄 error-handler.js           (Error handling)
│   │
│   ├── 📁 models/
│   │   ├── 📄 user.model.js              (User entity)
│   │   └── 📄 role.model.js              (Role entity)
│   │
│   ├── 📁 services/
│   │   ├── 📄 auth-service.js            (Auth logic)
│   │   ├── 📄 user-service.js            (User logic)
│   │   └── 📄 system-service.js          (System logic)
│   │
│   ├── 📁 utils/
│   │   ├── 📄 logger.js                  (Logging)
│   │   └── 📄 response.js                (API Response)
│   │
│   ├── 📁 views/
│   │   ├── 📄 index.html                 (Homepage)
│   │   ├── 📁 auth/
│   │   │   ├── 📄 login.html
│   │   │   └── 📄 register.html
│   │   ├── 📁 users/
│   │   │   ├── 📄 create.html
│   │   │   └── 📄 show.html
│   │   └── 📄 Listagem.html
│   │
│   └── 📁 public/
│       ├── 📁 css/
│       │   ├── 📄 style.css
│       │   └── 📄 login.css
│       └── 📁 js/
│           ├── 📄 script.js
│           ├── 📁 auth/
│           │   └── 📄 login.js
│           └── 📁 user/
│               └── 📄 create.js
│
├── 📁 uploads/                           (Ficheiros enviados)
│
├── 📁 node_modules/                      (Dependências)
│
└── 📄 test-api.sh                        (Script de testes)
```

---

## Fluxo de Request - Exemplo Completo

### POST /auth/login

```
1. CLIENT
   ├─ Envia: { email, password }
   └─ Header: Content-Type: application/json

2. EXPRESS MIDDLEWARE
   ├─ JSON Parser
   ├─ Logger (request start)
   └─ Static Files Check

3. ROUTING
   ├─ Match /auth
   ├─ Match POST /login
   └─ Load auth-routes.js

4. VALIDATION
   ├─ body("email").isEmail()
   ├─ body("password").isLength({ min: 6 })
   └─ If error → ApiResponse.badRequest()

5. CONTROLLER
   ├─ auth-controller.login()
   ├─ Valida resultados
   └─ Chama AuthService.login()

6. SERVICE
   ├─ UserModel.findByEmail(email)
   ├─ bcrypt.compare(password, hash)
   ├─ jwt.sign({ id, email, role_id })
   └─ Retorna { user, token }

7. RESPONSE
   ├─ ApiResponse.success()
   ├─ Formata resposta JSON
   └─ Adiciona timestamp

8. LOGGER
   ├─ Logger.info("Login bem-sucedido", ...)
   ├─ Log de duration
   └─ Log de user_id

9. CLIENT
   └─ Recebe: { success, token, user, timestamp }
```

---

## Fluxos de Autenticação

### Sem Token (Público)
```
GET /users → Retorna lista de usuários (público)
```

### Com Token (Protegido)
```
DELETE /users/:id 
  ├─ Header: Authorization: Bearer <token>
  ├─ authMiddleware verifica token
  ├─ jwt.verify(token)
  ├─ Se válido → continue
  ├─ Se inválido → 401 Unauthorized
  └─ Se expirado → 401 Unauthorized
```

### Com Role Check (Super Protegido)
```
DELETE /users/:id
  ├─ authMiddleware (verifica token)
  ├─ requireRole([ADMIN, COORDENADOR]) (verifica role)
  ├─ Se role OK → continue
  └─ Se role insuficiente → 403 Forbidden
```

---

## Segurança - Camadas

```
┌─ LAYER 1: Input Validation ─────────────┐
│ express-validator                       │
│ └─ Valida email, password, etc         │
├─────────────────────────────────────────┤
│ LAYER 2: SQL Injection Protection      │
│ mysql2 prepared statements             │
│ └─ Parâmetros seguros                  │
├─────────────────────────────────────────┤
│ LAYER 3: Authentication                │
│ JWT Token + Bearer scheme               │
│ └─ Verifica identidade                 │
├─────────────────────────────────────────┤
│ LAYER 4: Authorization                 │
│ Role-based access control               │
│ └─ Verifica permissões                 │
├─────────────────────────────────────────┤
│ LAYER 5: Encryption                    │
│ bcryptjs password hashing               │
│ └─ Protege senhas                      │
├─────────────────────────────────────────┤
│ LAYER 6: Error Handling                │
│ Centralizado, sem info sensível         │
│ └─ Previne information disclosure      │
├─────────────────────────────────────────┤
│ LAYER 7: Logging & Audit               │
│ Rastreia todas as operações            │
│ └─ Detecção de anomalias               │
└─────────────────────────────────────────┘
```

---

**Diagrama atualizado**: 30 de Abril de 2026
