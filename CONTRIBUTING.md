# Guia de Contribuição

## Como Contribuir

Agradecemos por se interessar em contribuir! Este documento fornece diretrizes para contribuir com o projeto Sistema de Gerenciamento de TCC.

## 🤝 Processo de Contribuição

### 1. Fork o Repositório
```bash
git clone https://github.com/Edmuin/Sistema-de-Gerenciamento.git
cd Sistema-de-Gerenciamento
```

### 2. Crie uma Branch
```bash
git checkout -b feature/seu-feature-name
```

Use nomes descritivos:
- `feature/nova-funcionalidade` - Para novas features
- `fix/nome-do-bug` - Para correções
- `docs/adicionar-documentacao` - Para documentação
- `refactor/melhorar-codigo` - Para refatoração

### 3. Faça suas Mudanças

Siga as convenções de código:
- Use camelCase para variáveis e funções
- Use PascalCase para classes
- Adicione comments em código complexo
- Mantenha funções pequenas e focadas

### 4. Teste suas Mudanças
```bash
pnpm run dev
# Teste manualmente ou
./test-api.sh
```

### 5. Commit com Mensagens Claras
```bash
git add .
git commit -m "feat: adicionar autenticação por JWT"
```

Formato de commit:
- `feat:` - Nova feature
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de build/deploy

### 6. Push para sua Branch
```bash
git push origin feature/seu-feature-name
```

### 7. Abra um Pull Request
- Descreva claramente o que foi mudado
- Referencie issues relacionadas (#123)
- Inclua screenshots se relevante

## 📋 Padrões de Código

### Controllers
```javascript
import { ApiResponse } from "../utils/response.js";
import { Logger } from "../utils/logger.js";

export const myFunction = async (req, res) => {
  try {
    // Validar
    // Executar lógica
    // Retornar resposta padronizada
    return ApiResponse.success(res, data, "Mensagem");
  } catch (err) {
    Logger.error("Erro", err);
    return ApiResponse.error(res, err.message);
  }
};
```

### Services
```javascript
export const MyService = {
  async myMethod(data) {
    // Lógica de negócio
    return result;
  },
};
```

### Rotas
```javascript
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth-middleware.js";

router.post("/", 
  body("field").notEmpty().withMessage("Validação"),
  authMiddleware,
  controllerFunction
);
```

## 🧪 Testes

Antes de submeter, certifique-se que:
- [ ] Nenhum console.log deixado para trás
- [ ] Tratamento de erros adequado
- [ ] Inputs validados
- [ ] Sem SQL Injection
- [ ] Código formatado

## 📚 Documentação

Se adicionar nova feature:
- [ ] Atualizar README.md
- [ ] Adicionar exemplos de uso em API_ENDPOINTS.md
- [ ] Atualizar CHANGELOG.md
- [ ] Adicionar comments no código

## 🐛 Reportar Bugs

Ao reportar bugs, inclua:
1. Descrição clara do problema
2. Passos para reproduzir
3. Comportamento esperado vs atual
4. Ambiente (SO, Node version, etc)
5. Screenshots/logs se aplicável

## ✅ Checklist antes de Submeter

- [ ] Código segue as convenções do projeto
- [ ] Testei localmente
- [ ] Sem erros de console
- [ ] Documentação atualizada
- [ ] Mensagem de commit clara
- [ ] Sem conflitos com main

## 📞 Dúvidas?

Abra uma issue ou contacte os maintainers:
- **GitHub Issues**: [Sistema-de-Gerenciamento/issues](https://github.com/Edmuin/Sistema-de-Gerenciamento/issues)

---

Obrigado por contribuir! 🎉
