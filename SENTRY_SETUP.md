# Configuração do Sentry - Adventista Play

## ✅ O que foi configurado

A integração do Sentry foi configurada com sucesso no projeto Adventista Play para monitoramento de erros e performance.

### Pacotes instalados

- **@sentry/react** - SDK oficial do Sentry para React

### Arquivos modificados/criados

1. **src/main.jsx** - Adicionada inicialização do Sentry com:
   - Browser Tracing Integration (monitoramento de performance)
   - Replay Integration (gravação de sessões)
   - Configuração de ambiente automática
   - Taxa de amostragem configurada

2. **.env** - Arquivo de variáveis de ambiente (não versionado)
3. **.env.example** - Template de variáveis de ambiente

## 🔧 Próximos passos

### 1. Obter o DSN do Sentry

1. Acesse o painel do Sentry: https://sentry.io/
2. Navegue até: **Settings** → **Projects** → **node**
3. Vá em **Client Keys (DSN)**
4. Copie o valor do **DSN**

### 2. Configurar a variável de ambiente

Edite o arquivo `.env` na raiz do projeto e adicione seu DSN:

```env
VITE_SENTRY_DSN=https://seu-dsn-aqui@o4508470587506688.ingest.us.sentry.io/4508470590586880
```

### 3. Testar a integração

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

### 4. Verificar se está funcionando

Para testar se o Sentry está capturando erros, você pode adicionar um botão de teste temporário em qualquer componente:

```jsx
<button onClick={() => {
  throw new Error("Teste do Sentry - Este é um erro proposital");
}}>
  Testar Sentry
</button>
```

Ao clicar no botão, o erro deve aparecer no painel do Sentry em alguns segundos.

## 📊 Recursos habilitados

### Performance Monitoring
- **tracesSampleRate: 1.0** - Captura 100% das transações para análise de performance
- Monitora carregamento de páginas, requisições API, etc.

### Session Replay
- **replaysSessionSampleRate: 0.1** - Grava 10% das sessões normais
- **replaysOnErrorSampleRate: 1.0** - Grava 100% das sessões quando ocorre um erro
- Permite visualizar exatamente o que o usuário estava fazendo quando o erro ocorreu

### Environment Detection
- Detecta automaticamente o ambiente (development, production) através do Vite

## 🚀 Deploy

### Cloudflare Pages (Seu ambiente)

**Via Dashboard:**
1. Acesse: https://dash.cloudflare.com/
2. Navegue até **Workers & Pages**
3. Selecione seu projeto **adventista-play**
4. Clique na aba **Settings**
5. Role até **Environment Variables**
6. Clique em **Add variable**
7. Preencha:
   - Variable name: `VITE_SENTRY_DSN`
   - Value: seu DSN do Sentry
8. Selecione **Production**
9. Clique em **Save**
10. Vá para **Deployments** e faça um **Redeploy**

**Via Wrangler CLI:**
```bash
wrangler pages secret put VITE_SENTRY_DSN
# Cole o DSN quando solicitado
```

📖 **Guia detalhado:** SENTRY_CLOUDFLARE_PAGES.md

### Outras Plataformas

**Vercel:**
1. Settings → Environment Variables
2. Adicione: `VITE_SENTRY_DSN`

**Netlify:**
1. Site settings → Environment variables
2. Adicione: `VITE_SENTRY_DSN`

## 📚 Recursos adicionais

- [Documentação oficial do Sentry para React](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Configuração avançada](https://docs.sentry.io/platforms/javascript/configuration/options/)
- [Session Replay](https://docs.sentry.io/platforms/javascript/session-replay/)
- [Performance Monitoring](https://docs.sentry.io/platforms/javascript/performance/)

## 🔒 Segurança

- O arquivo `.env` está incluído no `.gitignore` e não será versionado
- Nunca compartilhe seu DSN publicamente
- Use diferentes projetos/DSNs para ambientes diferentes (dev, staging, production)

## 💡 Dicas

1. **Ajuste as taxas de amostragem** em produção para controlar custos:
   ```javascript
   tracesSampleRate: 0.1, // 10% em vez de 100%
   replaysSessionSampleRate: 0.01, // 1% em vez de 10%
   ```

2. **Adicione contexto aos erros** para facilitar debug:
   ```javascript
   Sentry.setUser({ id: userId, email: userEmail });
   Sentry.setTag("page", "checkout");
   ```

3. **Capture erros manualmente** quando necessário:
   ```javascript
   try {
     // código que pode falhar
   } catch (error) {
     Sentry.captureException(error);
   }
   ```

