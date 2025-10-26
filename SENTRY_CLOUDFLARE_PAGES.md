# 🚀 Configurar Sentry no Cloudflare Pages

## 📋 Guia Completo para Deploy no Cloudflare Pages

### Opção 1: Via Dashboard do Cloudflare (Recomendado)

#### Passo 1: Acessar as Configurações do Projeto

1. Acesse o [Dashboard do Cloudflare](https://dash.cloudflare.com/)
2. Navegue até **Workers & Pages**
3. Selecione seu projeto **adventista-play**
4. Clique na aba **Settings**

#### Passo 2: Adicionar Variável de Ambiente

1. Role até a seção **Environment Variables**
2. Clique em **Add variable**
3. Preencha:
   - **Variable name:** `VITE_SENTRY_DSN`
   - **Value:** `https://2e885862b6c3c61e2d1bd852dcb15af7@o4510217800384512.ingest.de.sentry.io/4510244958502992`
4. Selecione o ambiente:
   - ✅ **Production** (recomendado)
   - ✅ **Preview** (opcional, para testar antes)
5. Clique em **Save**

#### Passo 3: Fazer Redeploy

1. Vá para a aba **Deployments**
2. Clique nos **três pontos (⋮)** do último deployment
3. Selecione **Retry deployment** ou **Redeploy**
4. Aguarde o build completar

### Opção 2: Via Wrangler CLI

Se você usa o Wrangler CLI do Cloudflare:

```bash
# Instalar Wrangler (se ainda não tiver)
npm install -g wrangler

# Login no Cloudflare
wrangler login

# Adicionar variável de ambiente
wrangler pages project create adventista-play

# Adicionar a variável
wrangler pages secret put VITE_SENTRY_DSN
# Quando solicitado, cole o DSN:
# https://2e885862b6c3c61e2d1bd852dcb15af7@o4510217800384512.ingest.de.sentry.io/4510244958502992
```

### Opção 3: Via arquivo wrangler.toml (Não Recomendado para Secrets)

**⚠️ ATENÇÃO:** Não adicione o DSN diretamente no `wrangler.toml` pois ele será versionado no Git!

Se você quiser usar `wrangler.toml` para outras configurações:

```toml
# wrangler.toml
name = "adventista-play"
compatibility_date = "2024-01-01"

[env.production]
# NÃO coloque o DSN aqui!
# Use o dashboard ou wrangler secret

[build]
command = "npm run build"
```

---

## 🔍 Verificar se Funcionou

### 1. Verificar Variáveis Configuradas

No Dashboard do Cloudflare:
1. **Workers & Pages** → Seu projeto → **Settings**
2. Role até **Environment Variables**
3. Você deve ver `VITE_SENTRY_DSN` listada

### 2. Testar em Produção

Após o deploy:

1. Acesse seu site no Cloudflare Pages
2. Abra o Console do navegador (F12)
3. Digite:
   ```javascript
   throw new Error("Teste Sentry - Produção Cloudflare");
   ```
4. Verifique o painel do Sentry em alguns segundos

---

## 📊 Diferentes Ambientes

### Production (Produção)

```bash
# Via Dashboard:
# Environment: Production
# Variable: VITE_SENTRY_DSN
# Value: seu-dsn-aqui
```

### Preview (Pré-visualização)

Se você quiser testar em branches de preview:

```bash
# Via Dashboard:
# Environment: Preview
# Variable: VITE_SENTRY_DSN
# Value: seu-dsn-aqui (pode ser o mesmo ou diferente)
```

**Dica:** Use o mesmo DSN para Production e Preview, ou crie projetos separados no Sentry.

---

## 🎯 Build Configuration

Certifique-se de que suas configurações de build estão corretas:

### No Dashboard do Cloudflare

**Settings** → **Builds & deployments**:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (ou deixe em branco)
- **Node version:** `18` ou superior

### Variáveis de Ambiente

Além do `VITE_SENTRY_DSN`, você pode precisar de:

```
NODE_VERSION=18
NPM_FLAGS=--legacy-peer-deps (se necessário)
```

---

## 🔧 Ajustes de Performance para Produção

### Reduzir Taxas de Amostragem

Edite `src/main.jsx` para usar taxas diferentes em produção:

```javascript
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Ajustar para produção
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% em prod, 100% em dev
  replaysSessionSampleRate: import.meta.env.PROD ? 0.01 : 0.1, // 1% em prod, 10% em dev
  replaysOnErrorSampleRate: 1.0, // Sempre 100% quando há erro
  environment: import.meta.env.MODE,
});
```

### Adicionar Release Tracking

Para rastrear versões no Sentry:

```javascript
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  release: `adventista-play@${import.meta.env.VITE_APP_VERSION || 'dev'}`,
  // ... outras configurações
});
```

E adicione no `.env`:

```env
VITE_APP_VERSION=1.0.0
```

---

## 📝 Checklist de Deploy

- [ ] Variável `VITE_SENTRY_DSN` adicionada no Cloudflare Pages
- [ ] Ambiente selecionado (Production/Preview)
- [ ] Redeploy realizado
- [ ] Build completado com sucesso
- [ ] Site acessível
- [ ] Teste de erro realizado em produção
- [ ] Erro apareceu no painel do Sentry
- [ ] Session Replay funcionando (se habilitado)

---

## 🆘 Troubleshooting

### Build Falha no Cloudflare

**Erro:** `Module not found: @sentry/react`

**Solução:**
```bash
# Certifique-se de que está no package.json
npm install --save @sentry/react

# Commit e push
git add package.json package-lock.json
git commit -m "fix: Adicionar @sentry/react ao package.json"
git push
```

### Variável de Ambiente Não Funciona

**Problema:** `VITE_SENTRY_DSN` está undefined

**Soluções:**
1. Certifique-se de que o nome começa com `VITE_`
2. Faça um redeploy após adicionar a variável
3. Verifique se selecionou o ambiente correto (Production/Preview)
4. Limpe o cache do build no Cloudflare

### Sentry Não Captura Erros em Produção

**Checklist:**
1. ✅ Variável configurada no Cloudflare?
2. ✅ Redeploy feito após adicionar variável?
3. ✅ DSN está correto?
4. ✅ Projeto correto no Sentry?
5. ✅ Verifique o console do navegador para erros

---

## 🔗 Links Úteis

- **Dashboard Cloudflare:** https://dash.cloudflare.com/
- **Documentação Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Variáveis de Ambiente:** https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
- **Painel Sentry:** https://sentry.io/organizations/adventista-play/issues/

---

## 💡 Dicas Importantes

### 1. Múltiplos Ambientes

Considere criar projetos separados no Sentry:
- `adventista-play-dev` (desenvolvimento)
- `adventista-play-staging` (preview)
- `adventista-play-prod` (produção)

### 2. Source Maps

Para melhor debug, habilite source maps no Vite:

```javascript
// vite.config.js
export default {
  build: {
    sourcemap: true, // Gera source maps para produção
  }
}
```

### 3. Alertas

Configure alertas no Sentry:
1. Acesse o projeto no Sentry
2. **Settings** → **Alerts**
3. Configure notificações por email/Slack quando houver erros

---

## 🎉 Pronto!

Seu projeto agora está configurado para enviar erros do Cloudflare Pages para o Sentry!

**Próximos passos:**
1. Adicione a variável no Cloudflare Pages (via dashboard)
2. Faça um redeploy
3. Teste em produção
4. Monitore o painel do Sentry

Para mais informações, consulte **SENTRY_README.md**

