# 📊 Documentação de Interligação de Páginas

## 📋 Resumo

A interligação das páginas foi completada com sucesso, criando um fluxo completo de navegação entre as páginas de autenticação e dashboards específicos por role.

## 🔄 Fluxo de Navegação

```
┌─────────────────────────────────────────────────────────────────┐
│                     HOMEPAGE (/index.html)                       │
│  ├─ Não autenticado → Mostra seção de auth com links             │
│  └─ Autenticado → Mostra bem-vindo                               │
└────────────┬────────────────────────────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
 ┌─────────┐   ┌──────────┐
 │ LOGIN   │   │ REGISTER │
 └────┬────┘   └─────┬────┘
      │              │
      │ Success       │ Success
      │              │
      ▼              ▼
┌──────────────────────────────────────────────┐
│         Redireciona para Dashboard           │
│         baseado no ROLE do usuário          │
└────────────────┬─────────────────────────────┘
        ┌────────┼────────┬──────────┐
        │        │        │          │
    ┌───▼──┐ ┌──▼────┐ ┌─▼──────┐ ┌▼──────┐
    │Aluno │ │Coordenador│Orientador│ Admin │
    │      │ │        │ │        │ │      │
    └──────┘ └────────┘ └────────┘ └──────┘
```

## 📁 Estrutura de Arquivos Criados

### Páginas HTML Principais
```
src/views/
├── dashboard.html                    # Dashboard principal (pós-autenticação)
├── error-404.html                    # Página de erro 404
└── dashboards/
    ├── aluno-dashboard.html          # Dashboard para Alunos
    ├── orientador-dashboard.html     # Dashboard para Orientadores
    ├── coordenador-dashboard.html    # Dashboard para Coordenadores
    └── admin-dashboard.html          # Dashboard para Administradores
```

### Scripts JavaScript
```
src/public/js/
├── navigation-system.js              # Sistema centralizado de navegação
└── auth/
    ├── login-improved.js             # Script de login melhorado
    └── register.js                   # Script de registro
```

### Arquivos de Configuração
```
src/config/app/express/routes/
└── system-routes.js                  # Rotas do sistema (atualizado)
    └── Inclui autenticação e autorização por role
```

## 🔐 Fluxo de Autenticação

### 1. **Página de Login (/auth/form-login)**
   - Formulário com validação em tempo real
   - Campo de email e password
   - Botão de alternar visibilidade da password
   - Link para página de registro
   - Requisição POST para `/auth/login`

### 2. **Resposta de Login bem-sucedida**
   ```javascript
   {
     "data": {
       "token": "jwt_token_aqui",
       "user": {
         "id": 123,
         "email": "aluno@email.com",
         "name": "João Silva",
         "role": "Aluno"
       }
     }
   }
   ```

### 3. **Armazenamento Local**
   ```javascript
   localStorage.setItem('token', data.data.token);
   localStorage.setItem('user', JSON.stringify(data.data.user));
   ```

### 4. **Redirecionamento Automático**
   - **Aluno** → `/aluno/dashboard`
   - **Orientador** → `/orientador/dashboard`
   - **Coordenador** → `/coordenador/dashboard`
   - **Admin** → `/admin/dashboard`

## 🛡️ Proteção de Rotas

### Middleware de Autenticação (`authenticateToken`)
- Verifica se o token existe no header `Authorization`
- Valida o JWT
- Redireciona para login se não autenticado

### Middleware de Autorização (`authorizeRole`)
- Verifica se o usuário tem a role necessária
- Permite acesso apenas aos dashboards permitidos
- Retorna erro 403 (Forbidden) se não autorizado

### Rotas Protegidas
```javascript
// Apenas Alunos
GET /aluno/dashboard (Aluno)

// Apenas Orientadores
GET /orientador/dashboard (Orientador)

// Apenas Coordenadores
GET /coordenador/dashboard (Coordenador)

// Apenas Administradores
GET /admin/dashboard (Admin)
```

## 💾 Dados Armazenados no localStorage

### Token
```javascript
// Chave: 'token'
// Valor: JWT com 24h de expiração
localStorage.getItem('token')
// Resultado: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Dados do Usuário
```javascript
// Chave: 'user'
// Valor: JSON serializado com dados do usuário
JSON.parse(localStorage.getItem('user'))
// Resultado: {
//   id: 123,
//   email: "usuario@email.com",
//   name: "Nome do Usuário",
//   role: "Aluno"
// }
```

## 🎯 Funcionalidades por Dashboard

### Dashboard do Aluno
- Informações do TCC
- Seus envios de arquivos
- Feedback do orientador
- Suas notas
- Perfil do usuário

### Dashboard do Orientador
- Visão geral de orientações
- Lista de alunos orientados
- Avaliações pendentes
- Formulário para fornecer feedback

### Dashboard do Coordenador
- Dashboard com estatísticas gerais
- Todos os TCCs do sistema
- Gerenciamento de usuários
- Relatórios e estatísticas
- Configurações do sistema

### Dashboard do Admin
- Painel administrativo completo
- Gerenciamento de usuários
- Gerenciamento de roles e permissões
- Configuração do sistema
- Logs do sistema
- Backup e segurança

## 🔄 Sistema de Navegação (NavigacaoSistema)

### Funcionalidades Principais
- **checkAuth()** - Verifica se o usuário está autenticado
- **navigateByRole()** - Navega para o dashboard correto baseado no role
- **getAuthHeaders()** - Obtém headers de autorização
- **hasRole(role)** - Verifica se o usuário tem uma role específica
- **hasAnyRole(roles)** - Verifica se o usuário tem uma de várias roles
- **logout()** - Realiza logout do usuário

### Exemplo de Uso
```javascript
const nav = new NavigacaoSistema();

// Verificar autenticação
if (nav.isAuthenticated()) {
  console.log('Usuário autenticado como:', nav.user.name);
}

// Fazer requisição autenticada
nav.fetchAuth('/api/users').then(res => res.json());

// Navegar para página segura
nav.navigate('/aluno/dashboard');

// Verificar role
if (nav.hasRole('Admin')) {
  // Mostrar opções de admin
}
```

## 🧪 Teste Completo do Fluxo

### 1. Acessar página inicial
```
GET http://localhost:3000/
```
- Se não autenticado: Mostra links de login/registro
- Se autenticado: Mostra bem-vindo e links dos dashboards

### 2. Fazer login
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "aluno@email.com",
  "password": "password123"
}
```

### 3. Verificar token
```javascript
localStorage.getItem('token')  // Deve conter JWT
localStorage.getItem('user')   // Deve conter dados do usuário
```

### 4. Acessar dashboard protegido
```
GET http://localhost:3000/aluno/dashboard
Authorization: Bearer {token}
```

### 5. Logout
```javascript
// Clique em botão de logout
localStorage.removeItem('token')
localStorage.removeItem('user')
window.location.href = '/auth/form-login'
```

## 📝 Validação de Formulários

### Login
- ✅ Email válido (formato correto)
- ✅ Password com mínimo 6 caracteres
- ✅ Mostrar/ocultar password
- ✅ Validação em tempo real
- ✅ Feedback visual de erros

### Registro
- ✅ Nome com mínimo 3 caracteres
- ✅ Email válido
- ✅ Password forte (maiúscula, minúscula, número)
- ✅ Confirmação de password
- ✅ Validação em tempo real

## 🎨 Interface Visual

### Tema
- **Cores**: Gradiente roxo-azul (#667eea - #764ba2)
- **Fonte**: Outfit (Google Fonts)
- **Design**: Glassmorphism com efeitos modernos

### Componentes
- **Cartões**: Com sombra e efeito hover
- **Botões**: Com animações suaves
- **Inputs**: Com feedback visual de validação
- **Notificações**: Slide-in do lado direito

## 🚀 Como Usar

### 1. **Para Usuários Não Autenticados**
1. Ir para `/` (página inicial)
2. Clicar em "Entrar" ou "Criar Conta"
3. Preencher formulário de login ou registro
4. Ser redirecionado automaticamente para o dashboard

### 2. **Para Usuários Autenticados**
1. Token é verificado automaticamente ao carregar página
2. Se token inválido/expirado → redireciona para login
3. Se válido → mostra dashboard com dados do usuário
4. Clicar em "Logout" para sair

### 3. **Navegação Entre Páginas**
- Use os links nas sidebars dos dashboards
- Cada link filtra as seções da página
- Todos os dados carregam dinamicamente

## ⚠️ Tratamento de Erros

### Erro de Autenticação
```
⚠️ Email ou password incorretos
```

### Erro de Autorização
```
❌ Você não tem permissão para acessar esta página
```

### Erro de Conexão
```
⚠️ Erro ao conectar ao servidor. Tente novamente.
```

### Erro 404
```
🚫 Página não encontrada
```

## 📊 Próximos Passos

1. **Integração com API**
   - Carregar dados reais dos dashboards
   - Implementar CRUD de TCCs
   - Adicionar upload de arquivos

2. **Notificações**
   - Sistema de notificações em tempo real
   - Badges de alerta
   - Alertas por email

3. **Relatórios**
   - Gerar PDFs
   - Exportar CSV
   - Gráficos e estatísticas

4. **Testes**
   - Testes unitários
   - Testes de integração
   - Testes de segurança

---

## 📌 Resumo Técnico

- **Framework**: Express.js 5.1.0
- **Autenticação**: JWT (jsonwebtoken)
- **Validação**: express-validator
- **Criptografia**: bcryptjs
- **View Engine**: EJS
- **Frontend**: Vanilla JavaScript + CSS3
- **Responsividade**: Mobile-first design

---

**Status**: ✅ Completo
**Data**: 2026
**Versão**: 1.0.0
