# ⚡ Setup Rápido - Cloudflare Pages

## 🎯 Configurar Sentry no Cloudflare Pages em 3 Minutos

### Passo 1: Acessar o Dashboard
```
🌐 https://dash.cloudflare.com/
```

### Passo 2: Navegar até o Projeto
```
Workers & Pages → adventista-play → Settings
```

### Passo 3: Adicionar Variável de Ambiente

**Localização:** Role até **Environment Variables**

**Clique em:** `Add variable`

**Preencha:**
```
Variable name: VITE_SENTRY_DSN

Value: https://2e885862b6c3c61e2d1bd852dcb15af7@o4510217800384512.ingest.de.sentry.io/4510244958502992

Environment: ✅ Production
```

**Clique em:** `Save`

### Passo 4: Redeploy

```
Deployments → ⋮ (três pontos) → Retry deployment
```

---

## ✅ Pronto!

Aguarde o build completar e o Sentry estará ativo em produção!

---

## 🧪 Testar em Produção

Após o deploy:

1. Acesse seu site
2. Abra o Console (F12)
3. Digite:
   ```javascript
   throw new Error("Teste Sentry - Cloudflare Pages");
   ```
4. Verifique o painel: https://sentry.io/organizations/adventista-play/issues/

---

## 📊 Configurações de Build

Certifique-se de que está configurado:

```
Build command: npm run build
Build output directory: dist
Root directory: / (ou vazio)
Node version: 18
```

---

## 🔧 Troubleshooting

### Variável não funciona?
- ✅ Nome começa com `VITE_`?
- ✅ Fez redeploy após adicionar?
- ✅ Selecionou "Production"?
- ✅ Aguardou o build completar?

### Build falha?
```bash
# Certifique-se de que o Sentry está no package.json
git add package.json package-lock.json
git commit -m "fix: Adicionar Sentry ao package.json"
git push
```

---

## 📚 Documentação Completa

Para mais detalhes: **SENTRY_CLOUDFLARE_PAGES.md**

---

## 🎉 Resumo Visual

```
┌─────────────────────────────────────────┐
│  1. Dashboard Cloudflare                │
│     ↓                                   │
│  2. Workers & Pages → seu projeto       │
│     ↓                                   │
│  3. Settings → Environment Variables    │
│     ↓                                   │
│  4. Add variable                        │
│     • Name: VITE_SENTRY_DSN            │
│     • Value: seu-dsn                   │
│     • Env: Production                  │
│     ↓                                   │
│  5. Save                                │
│     ↓                                   │
│  6. Deployments → Redeploy              │
│     ↓                                   │
│  ✅ PRONTO!                             │
└─────────────────────────────────────────┘
```

