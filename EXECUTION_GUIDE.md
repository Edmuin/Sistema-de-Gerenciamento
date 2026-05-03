# 🚀 Guia de Execução - Interligação de Páginas

## Visão Geral

Este documento guia você através de todo o processo de execução e teste da interligação de páginas implementada.

---

## ✅ Pré-requisitos

- Node.js 18+ instalado
- pnpm ou npm instalado
- Porta 3000 disponível
- MySQL 8.0+ rodando (se necessário)

---

## 📦 Instalação

### 1. Instalar Dependências
```bash
cd /home/helder/Documentos/Projecto/Principal/Sistema-de-Gerenciamento

# Com pnpm (recomendado)
pnpm install

# Ou com npm
npm install
```

### 2. Configurar Ambiente (se necessário)
```bash
# Criar arquivo .env se não existir
cp .env.example .env

# Editar .env com suas configurações
nano .env
```

---

## 🚀 Iniciar o Servidor

### Opção 1: Modo Desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

Saída esperada:
```
✓ Servidor rodando em http://localhost:3000
✓ Escutando por mudanças de arquivo
```

### Opção 2: Modo Produção
```bash
npm run start
# ou
pnpm start
```

---

## 🧪 Testar a Interligação

### 1. Validação de Estrutura
```bash
# Verificar se todos os arquivos estão presentes
./validate-interconnection.sh
```

Resultado esperado:
```
✓ Estrutura de interligação validada com sucesso!
Resultado: 23/23 testes passaram
```

### 2. Teste Manual via Navegador

#### a) Página Inicial
1. Abrir `http://localhost:3000/`
2. Verificar:
   - [ ] Página carrega corretamente
   - [ ] Não está autenticado: mostra links de login/registro
   - [ ] Design está correto com glassmorphism

#### b) Página de Login
1. Clicar em "Entrar"
2. URL muda para `http://localhost:3000/auth/form-login`
3. Verificar:
   - [ ] Formulário com email e password
   - [ ] Botão de mostrar/ocultar password funciona
   - [ ] Link para "Criar Conta"
   - [ ] Validação em tempo real

#### c) Página de Registro
1. Clicar em "Criar Conta"
2. URL muda para `http://localhost:3000/auth/register`
3. Verificar:
   - [ ] Formulário com todos os campos
   - [ ] Validação de confirmação de password
   - [ ] Link para voltar ao login

#### d) Login com Credenciais Válidas
1. Usar credenciais de teste (se disponíveis)
2. Ou criar uma conta primeiro
3. Credenciais válidas:
   ```
   Email: usuario@teste.com
   Password: Senha@123
   ```

4. Verificar após login bem-sucedido:
   - [ ] Mensagem "Login realizado com sucesso"
   - [ ] Redirecionamento automático para dashboard
   - [ ] URL muda para `/aluno/dashboard` (ou role correspondente)
   - [ ] Dados do usuário aparecem na página
   - [ ] localStorage contém token e user data

#### e) Dashboard Específico
Cada role tem seu dashboard:

**Aluno** (`/aluno/dashboard`):
- [ ] Sidebar com navegação
- [ ] Seção "Meu TCC"
- [ ] Seção "Meus Envios"
- [ ] Seção "Feedback"
- [ ] Seção "Notas"
- [ ] Seção "Meu Perfil"

**Orientador** (`/orientador/dashboard`):
- [ ] Dashboard com estatísticas
- [ ] Lista de alunos orientados
- [ ] Avaliações pendentes
- [ ] Formulário de feedback

**Coordenador** (`/coordenador/dashboard`):
- [ ] Dashboard com estatísticas gerais
- [ ] Todos os TCCs
- [ ] Gerenciamento de usuários
- [ ] Relatórios

**Admin** (`/admin/dashboard`):
- [ ] Painel administrativo
- [ ] Gerenciamento de usuários
- [ ] Gerenciamento de roles
- [ ] Configuração do sistema
- [ ] Logs
- [ ] Backup e segurança

#### f) Teste de Logout
1. Clicar em "Logout" no dashboard
2. Verificar:
   - [ ] localStorage é limpo
   - [ ] Redirecionamento para `/auth/form-login`
   - [ ] Não consegue acessar dashboard sem fazer login

### 3. Teste de Proteção de Rotas

#### a) Sem Autenticação
1. Limpar localStorage:
   ```javascript
   // No console do navegador (F12)
   localStorage.clear()
   ```

2. Tentar acessar `http://localhost:3000/aluno/dashboard`
3. Verificar:
   - [ ] Redireciona para `/auth/form-login`
   - [ ] Não mostra dashboard

#### b) Role Incorreto
1. Fazer login como "Aluno"
2. Tentar acessar URL `/coordenador/dashboard` manualmente
3. Verificar:
   - [ ] Acesso negado (erro 403) OU
   - [ ] Redireciona para dashboard correto

### 4. Teste via API

#### a) Testar Login via cURL
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@teste.com","password":"Senha@123"}'
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Login bem-sucedido",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "usuario@teste.com",
      "name": "Nome do Usuário",
      "role": "Aluno"
    }
  }
}
```

#### b) Testar Dashboard com Token
```bash
# 1. Fazer login e copiar o token
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# 2. Acessar dashboard com token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/aluno/dashboard

# Resposta esperada: HTML da página
```

---

## 🐛 Troubleshooting

### Problema: "Não consegue fazer login"
**Solução:**
1. Verificar se o servidor está rodando
2. Verificar logs do servidor por erros
3. Verificar se a rota POST `/auth/login` retorna erro
4. Verificar credenciais (email/password)

### Problema: "Não redireciona após login"
**Solução:**
1. Abrir console do navegador (F12)
2. Procurar por erros de JavaScript
3. Verificar se localStorage está sendo atualizado
4. Verificar se o role do usuário está correto

### Problema: "Erro 404 no dashboard"
**Solução:**
1. Verificar se arquivo HTML existe
2. Verificar se rota está registrada em `system-routes.js`
3. Verificar permissões de arquivo

### Problema: "Middleware de autenticação retorna erro"
**Solução:**
1. Verificar se token está sendo enviado
2. Verificar se token ainda é válido
3. Verificar se header Authorization está correto
4. Verificar chave secreta JWT em `.env`

---

## 📊 Validação Completa do Fluxo

### Checklist de Teste Completo

```
1. Autenticação
  ☐ Página de login carrega
  ☐ Validação de email funciona
  ☐ Validação de password funciona
  ☐ Login bem-sucedido retorna token
  ☐ Token armazenado em localStorage
  ☐ Logout remove token de localStorage

2. Navegação
  ☐ Redireciona para dashboard correto após login
  ☐ URL muda de acordo com role
  ☐ Sidebar funciona e navega entre seções
  ☐ Links internos funcionam corretamente
  ☐ Logout redireciona para login

3. Proteção
  ☐ Não consegue acessar dashboard sem login
  ☐ Não consegue acessar dashboard com role errado
  ☐ Token expirado redireciona para login
  ☐ Middleware valida corretamente

4. Interface
  ☐ Design responsivo em mobile
  ☐ Design em desktop funciona
  ☐ Animações suaves
  ☐ Botões funcionam corretamente
  ☐ Formulários validam em tempo real

5. Dados
  ☐ localStorage tem token
  ☐ localStorage tem dados do usuário
  ☐ Role está correto no localStorage
  ☐ Dados do usuário aparecem na página
```

---

## 📝 Logs e Debugging

### Ver Logs do Servidor
```bash
# Os logs aparecem no terminal onde npm run dev foi executado
# Procure por:
# - ✓ Requisições GET/POST
# - ✗ Erros de autenticação
# - ⚠️ Avisos
```

### Ver Logs do Navegador
```javascript
// Abrir console (F12) e procurar por:
console.log('✅ Login bem-sucedido!');
console.log('Redirecionando para:', redirectUrl);
console.error('❌ Erro de login:', data);
```

### Verificar localStorage
```javascript
// No console do navegador
localStorage.getItem('token')
localStorage.getItem('user')
JSON.parse(localStorage.getItem('user'))
```

---

## 🎯 Próximos Passos

Após validar a interligação de páginas:

1. **Integração com Banco de Dados**
   - Carregar usuários reais do banco
   - Salvar dados de TCC
   - Persistir feedback

2. **Funcionalidades Adicionais**
   - Upload de arquivos
   - Notificações
   - Mensagens entre usuários
   - Relatórios

3. **Optimização**
   - Cache de páginas
   - Lazy loading de componentes
   - Minificação de CSS/JS
   - Compressão de imagens

4. **Segurança**
   - Testes de penetração
   - Implementar rate limiting
   - HTTPS em produção
   - Logs de auditoria

---

## 📞 Suporte Rápido

**Comando para verificar tudo:**
```bash
# 1. Validar estrutura
./validate-interconnection.sh

# 2. Iniciar servidor
npm run dev

# 3. Teste de fluxo (em outro terminal)
./test-navigation.sh
```

**Arquivos importantes:**
- Documentação: `PAGE_INTERCONNECTION.md`
- Resumo: `INTERCONNECTION_SUMMARY.md`
- Validação: `validate-interconnection.sh`
- Testes: `test-navigation.sh`

---

**Data**: 2026
**Versão**: 1.0.0
**Status**: ✅ Pronto para uso
