#!/bin/bash
set -e

echo "🔧 Instalando dependências com npm..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Limpar node_modules se existir
if [ -d "node_modules" ]; then
  echo "🧹 Limpando node_modules antigo..."
  rm -rf node_modules
fi

# Instalar com npm e legacy-peer-deps
echo "📦 Instalando pacotes..."
npm install --legacy-peer-deps --verbose

echo "✅ Instalação concluída!"