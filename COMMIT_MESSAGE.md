# Mensagem de Commit Sugerida

```
feat: Adicionar integração com Sentry para monitoramento de erros

- Instalar @sentry/react SDK
- Configurar Sentry no main.jsx com:
  * Browser Tracing Integration
  * Session Replay Integration
  * Configuração de ambiente automática
- Adicionar variáveis de ambiente (.env.example)
- Criar documentação de setup (SENTRY_SETUP.md)
- Adicionar componente de teste SentryTestButton (apenas dev)

Recursos habilitados:
- Performance Monitoring (100% das transações)
- Session Replay (10% sessões normais, 100% com erros)
- Detecção automática de ambiente

Próximos passos:
- Configurar VITE_SENTRY_DSN no .env
- Adicionar variável no Vercel/Netlify para produção
```

## Comandos para commit

```bash
# Adicionar arquivos
git add package.json package-lock.json
git add src/main.jsx
git add .env.example
git add SENTRY_SETUP.md
git add src/components/SentryTestButton.jsx

# Fazer commit
git commit -m "feat: Adicionar integração com Sentry para monitoramento de erros"

# Fazer push
git push origin main
```

