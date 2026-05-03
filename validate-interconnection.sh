#!/bin/bash

# Quick validation script para verificar a estrutura de interligação

echo "🔍 Validação da Estrutura de Interligação"
echo "==========================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Contadores
total=0
passed=0

# Função para testar arquivo
check_file() {
    total=$((total + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        passed=$((passed + 1))
    else
        echo -e "${RED}✗${NC} $1 (NÃO ENCONTRADO)"
    fi
}

# Função para testar conteúdo de arquivo
check_content() {
    total=$((total + 1))
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 contém '$2'"
        passed=$((passed + 1))
    else
        echo -e "${RED}✗${NC} $1 NÃO contém '$2'"
    fi
}

echo "📁 Verificando Arquivos HTML..."
check_file "src/views/dashboard.html"
check_file "src/views/error-404.html"
check_file "src/views/dashboards/aluno-dashboard.html"
check_file "src/views/dashboards/orientador-dashboard.html"
check_file "src/views/dashboards/coordenador-dashboard.html"
check_file "src/views/dashboards/admin-dashboard.html"
check_file "src/views/auth/login-v2.html"
check_file "src/views/auth/register-v2.html"

echo ""
echo "📁 Verificando Scripts JavaScript..."
check_file "src/public/js/navigation-system.js"
check_file "src/public/js/auth/login-improved.js"
check_file "src/public/js/auth/register.js"
check_file "src/public/js/navigation.js"

echo ""
echo "📁 Verificando Arquivos CSS..."
check_file "src/public/css/navigation.css"
check_file "src/public/css/validation.css"

echo ""
echo "📁 Verificando Arquivos de Rota..."
check_file "src/config/app/express/routes/auth-routes.js"
check_file "src/config/app/express/routes/system-routes.js"

echo ""
echo "📁 Verificando Documentação..."
check_file "PAGE_INTERCONNECTION.md"
check_file "INTERCONNECTION_SUMMARY.md"

echo ""
echo "🔐 Verificando Conteúdo Crítico..."
check_content "src/config/app/express/routes/system-routes.js" "authenticateToken"
check_content "src/config/app/express/routes/system-routes.js" "authorizeRole"
check_content "src/public/js/navigation-system.js" "NavigacaoSistema"
check_content "src/public/js/auth/login-improved.js" "redirectUrl"
check_content "src/views/dashboards/aluno-dashboard.html" "navigation-system.js"

echo ""
echo "==========================================="
echo -e "Resultado: ${GREEN}$passed${NC}/$total testes passaram"
echo ""

if [ $passed -eq $total ]; then
    echo -e "${GREEN}✓ Estrutura de interligação validada com sucesso!${NC}"
    exit 0
else
    echo -e "${RED}✗ Alguns arquivos ou conteúdos estão faltando${NC}"
    exit 1
fi
