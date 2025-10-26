# 🚀 Sentry - Guia Rápido de Início

## ✅ Status da Configuração

O Sentry foi **instalado e configurado** com sucesso no projeto Adventista Play!

## 📋 Checklist

- [x] SDK do Sentry instalado (`@sentry/react`)
- [x] Código de inicialização adicionado em `src/main.jsx`
- [x] Arquivo `.env.example` criado
- [x] Documentação completa criada (`SENTRY_SETUP.md`)
- [x] Componente de teste criado (`SentryTestButton.jsx`)
- [ ] **VOCÊ PRECISA FAZER:** Adicionar o DSN do Sentry no arquivo `.env`

## ⚡ Próximo Passo OBRIGATÓRIO

### Obter e configurar o DSN do Sentry

1. **Acesse o Sentry:**
   - URL: https://sentry.io/
   - Organização: `adventista-play`
   - Projeto: `node`

2. **Obtenha o DSN:**
   - Vá em: **Settings** → **Projects** → **node** → **Client Keys (DSN)**
   - Copie o valor do DSN (algo como: `https://xxxxx@o4508470587506688.ingest.us.sentry.io/4508470590586880`)

3. **Configure o arquivo `.env`:**
   ```bash
   # Edite o arquivo .env na raiz do projeto
   VITE_SENTRY_DSN=https://seu-dsn-completo-aqui
   ```

4. **Teste a integração:**
   ```bash
   npm run dev
   ```
   
   O componente de teste aparecerá no canto inferior direito da tela (apenas em desenvolvimento).

## 🧪 Como Testar

### Opção 1: Usar o componente de teste

1. Adicione o componente no seu `App.jsx`:
   ```jsx
   import SentryTestButton from './components/SentryTestButton';
   
   function App() {
     return (
       <>
         {/* Seu código existente */}
         <SentryTestButton />
       </>
     );
   }
   ```

2. Execute `npm run dev`
3. Clique nos botões de teste que aparecem no canto da tela
4. Verifique o painel do Sentry em alguns segundos

### Opção 2: Testar manualmente

Adicione este código em qualquer componente:

```jsx
import * as Sentry from '@sentry/react';

// Testar erro
<button onClick={() => {
  throw new Error("Teste do Sentry");
}}>
  Testar Erro
</button>

// Testar mensagem
<button onClick={() => {
  Sentry.captureMessage("Mensagem de teste", "info");
}}>
  Testar Mensagem
</button>
```

## 🚀 Deploy em Produção

### Cloudflare Pages (Seu Ambiente)

**Via Dashboard (Recomendado):**
1. Acesse: https://dash.cloudflare.com/
2. **Workers & Pages** → seu projeto → **Settings**
3. **Environment Variables** → **Add variable**
4. Nome: `VITE_SENTRY_DSN`
5. Valor: `https://2e885862b6c3c61e2d1bd852dcb15af7@o4510217800384512.ingest.de.sentry.io/4510244958502992`
6. Ambiente: **Production**
7. **Save** e depois faça um **Redeploy**

**Via Wrangler CLI:**
```bash
wrangler pages secret put VITE_SENTRY_DSN
# Cole o DSN quando solicitado
```

📖 **Guia completo para Cloudflare:** SENTRY_CLOUDFLARE_PAGES.md

### Outras Plataformas

**Vercel:**
```bash
vercel env add VITE_SENTRY_DSN
```

**Netlify:**
```bash
netlify env:set VITE_SENTRY_DSN "seu-dsn-aqui"
```

## 📚 Documentação Completa

Para informações detalhadas, consulte: **SENTRY_SETUP.md**

## ❓ Problemas Comuns

### Sentry não está capturando erros

1. Verifique se o DSN está configurado corretamente no `.env`
2. Certifique-se de que o servidor de desenvolvimento foi reiniciado após adicionar o DSN
3. Verifique o console do navegador para mensagens de erro do Sentry
4. Confirme que você está no projeto correto no painel do Sentry

### Variável de ambiente não está sendo lida

1. Variáveis no Vite devem começar com `VITE_`
2. Reinicie o servidor de desenvolvimento após modificar o `.env`
3. Verifique se não há espaços extras no arquivo `.env`

## 🆘 Suporte

- [Documentação oficial do Sentry](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Status do Sentry](https://status.sentry.io/)
- [Comunidade Sentry](https://discord.gg/sentry)

