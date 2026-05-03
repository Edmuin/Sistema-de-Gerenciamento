#!/bin/bash

# Script de teste do fluxo de navegação
# Testa se todas as rotas e redirecionamentos estão funcionando

echo "🧪 Teste de Fluxo de Navegação e Interligação de Páginas"
echo "==========================================================="
echo ""

BASE_URL="http://localhost:3000"
TEST_USER_ALUNO="aluno@teste.com"
TEST_USER_COORDENADOR="coordenador@teste.com"
TEST_PASSWORD="Teste@123"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local expected_status=$3
    local data=$4
    local token=$5

    echo -n "Testando $method $endpoint ... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" \
            -X $method \
            -H "Authorization: Bearer $token" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" \
            -X $method \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data" \
            "$BASE_URL$endpoint")
    fi
    
    status_code=$(echo "$response" | tail -1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" == "$expected_status" ]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $status_code)"
        echo "$body"
    else
        echo -e "${RED}✗ FALHA${NC} (HTTP $status_code, esperado $expected_status)"
        echo "$body"
    fi
    echo ""
}

# 1. Testar página inicial
echo -e "${BLUE}1. Testando Página Inicial${NC}"
test_endpoint "GET" "/" "200"

# 2. Testar página de login
echo -e "${BLUE}2. Testando Página de Login${NC}"
test_endpoint "GET" "/auth/form-login" "200"

# 3. Testar página de registro
echo -e "${BLUE}3. Testando Página de Registro${NC}"
test_endpoint "GET" "/auth/register" "200"

# 4. Testar login com credenciais inválidas
echo -e "${BLUE}4. Testando Login com Credenciais Inválidas${NC}"
test_endpoint "POST" "/auth/login" "401" \
    '{"email":"invalido@teste.com","password":"invalido"}'

# 5. Testar acesso a dashboard sem autenticação
echo -e "${BLUE}5. Testando Acesso a Dashboard sem Autenticação${NC}"
test_endpoint "GET" "/aluno/dashboard" "401"

# 6. Testar dashboard não existente
echo -e "${BLUE}6. Testando Dashboard Não Existente${NC}"
test_endpoint "GET" "/inexistente/dashboard" "404"

# 7. Testar página de erro 404
echo -e "${BLUE}7. Testando Página de Erro 404${NC}"
test_endpoint "GET" "/pagina-inexistente" "404"

# 8. Testar logout
echo -e "${BLUE}8. Testando Logout${NC}"
test_endpoint "GET" "/auth/logout" "302"

echo ""
echo -e "${GREEN}==========================================================="
echo "Testes Concluídos!"
echo "==========================================================="
echo ""
echo "📝 Notas:"
echo "- Se há token: use '-H \"Authorization: Bearer \$TOKEN\"'"
echo "- Verifique localStorage após login bem-sucedido"
echo "- Teste o fluxo completo: login → dashboard → logout"
echo ""
