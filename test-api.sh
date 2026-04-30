#!/bin/bash

# Script de teste das endpoints da API
# Certifique-se de que o servidor está a rodar em http://localhost:3000

BASE_URL="http://localhost:3000"

echo "=== TESTE DE ENDPOINTS DA API ==="
echo ""

# Teste de registro
echo "1. Testando POST /auth/register"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste User",
    "email": "teste@example.com",
    "password": "senha123",
    "password_confirm": "senha123"
  }')
echo "Response: $REGISTER_RESPONSE"
echo ""

# Teste de login
echo "2. Testando POST /auth/login"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123"
  }')
echo "Response: $LOGIN_RESPONSE"
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token extraído: $TOKEN"
echo ""

# Teste de listagem de usuários
echo "3. Testando GET /users"
curl -s -X GET "$BASE_URL/users" \
  -H "Content-Type: application/json" | json_pp
echo ""

# Teste com token
if [ ! -z "$TOKEN" ]; then
  echo "4. Testando DELETE /users/:id com autenticação"
  curl -s -X DELETE "$BASE_URL/users/1" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" | json_pp
  echo ""
fi

echo "=== FIM DOS TESTES ==="
