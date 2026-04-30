# API Endpoints - Sistema de Gerenciamento de TCC

## Autenticação

### POST /auth/login
Realiza login de utilizador

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "João Silva",
    "role_id": 3
  }
}
```

---

### POST /auth/register
Regista novo utilizador

**Request Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "password": "senha123",
  "password_confirm": "senha123"
}
```

**Response (201):**
```json
{
  "message": "Utilizador registado com sucesso",
  "user": {
    "id": 2,
    "email": "maria@example.com",
    "name": "Maria Santos"
  }
}
```

---

### GET /auth/logout
Realiza logout (cliente apaga o token)

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## Utilizadores

### GET /users
Lista todos os utilizadores

**Response (200):**
```json
{
  "users": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@example.com",
      "role_id": 1
    }
  ]
}
```

---

### GET /users/:id
Busca utilizador por ID

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "role_id": 1
  }
}
```

---

### POST /users
Cria novo utilizador (com upload de avatar)

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**
- name: string (obrigatório)
- email: string (obrigatório)
- avatar: file (opcional, max 5MB)

**Response (201):**
```json
{
  "message": "Utilizador criado com sucesso",
  "user": {
    "id": 3,
    "nome": "Pedro Costa",
    "email": "pedro@example.com",
    "avatar": "pedro-costa-1234567890.jpg"
  }
}
```

---

### DELETE /users/:id
Elimina utilizador (requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Utilizador eliminado com sucesso"
}
```

---

## Melhorias Implementadas

✅ **Autenticação com JWT**: Tokens com expiração de 24 horas
✅ **Hash de Senhas**: Utiliza bcryptjs com salt de 10
✅ **Validação de Dados**: Express-validator em todas as rotas
✅ **Upload de Ficheiros**: Multer com filtros e limite de 5MB
✅ **Tratamento de Erros**: Middleware centralizado de erros
✅ **Template Engine**: EJS configurado
✅ **Proteção de Rotas**: Middleware de autenticação para rotas sensíveis

---

## Tokens JWT

Para usar as rotas protegidas, adicione o header:
```
Authorization: Bearer <seu_token_aqui>
```

Exemplo com curl:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." http://localhost:3000/users/1/delete
```
