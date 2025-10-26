# 🧪 Como Testar o Sentry - Passo a Passo

## ✅ Status Atual

- [x] Sentry SDK instalado
- [x] Código de inicialização configurado
- [x] DSN configurado no arquivo `.env`
- [x] Build testado e funcionando
- [ ] **Próximo:** Testar o envio de erros para o Sentry

## 🚀 Opção 1: Adicionar Componente de Teste (Recomendado)

### Passo 1: Editar o arquivo `src/App.jsx`

Adicione a importação no início do arquivo:

```jsx
import SentryTestButton from './components/SentryTestButton';
```

### Passo 2: Adicionar o componente no JSX

Adicione o componente em qualquer lugar do seu JSX (ele aparecerá fixo no canto inferior direito):

```jsx
function App() {
  return (
    <Router>
      {/* Seu código existente */}
      
      {/* Adicione esta linha */}
      <SentryTestButton />
      
      {/* Resto do código */}
    </Router>
  );
}
```

### Passo 3: Executar o projeto

```bash
npm run dev
```

### Passo 4: Testar

1. Abra o navegador em `http://localhost:5173` (ou a porta que o Vite indicar)
2. Você verá um painel de teste no canto inferior direito com 2 botões
3. Clique em **"Testar Erro"** ou **"Testar Mensagem"**
4. Aguarde alguns segundos
5. Acesse o painel do Sentry: https://sentry.io/organizations/adventista-play/issues/

## 🎯 Opção 2: Teste Rápido via Console do Navegador

1. Execute o projeto: `npm run dev`
2. Abra o navegador
3. Abra o Console (F12)
4. Cole este código:

```javascript
// Testar erro
throw new Error("Teste do Sentry via Console");

// OU testar mensagem
window.Sentry.captureMessage("Mensagem de teste via Console", "info");
```

## 🔍 Opção 3: Criar um Botão Temporário em Qualquer Página

Adicione este código em qualquer componente:

```jsx
import * as Sentry from '@sentry/react';

// Dentro do seu componente
<button 
  onClick={() => {
    throw new Error("🧪 Teste do Sentry - Erro proposital");
  }}
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 9999
  }}
>
  Testar Sentry
</button>
```

## 📊 Verificar os Resultados

### No Painel do Sentry

1. Acesse: https://sentry.io/organizations/adventista-play/issues/
2. Você deve ver o erro/mensagem aparecer em alguns segundos
3. Clique no erro para ver:
   - Stack trace completo
   - Informações do navegador
   - Replay da sessão (se disponível)
   - Breadcrumbs (histórico de ações)

### O que você verá no Sentry:

- **Erro:** "🧪 Teste do Sentry - Este é um erro proposital para verificar a integração"
- **Ambiente:** development
- **Browser:** Informações do seu navegador
- **URL:** localhost:5173
- **User:** Anonymous (até você configurar identificação de usuário)

## 🎬 Session Replay

Se você clicar em um erro no Sentry, poderá ver:

1. **Replay da sessão** - Vídeo mostrando o que o usuário fez antes do erro
2. **Breadcrumbs** - Histórico de cliques, navegação, etc.
3. **Console logs** - Logs do console do navegador
4. **Network requests** - Requisições HTTP feitas

## 🔧 Ajustes Opcionais

### Adicionar informações do usuário

```jsx
import * as Sentry from '@sentry/react';

// Quando o usuário fizer login
Sentry.setUser({
  id: "12345",
  email: "usuario@exemplo.com",
  username: "usuario_teste"
});

// Para limpar (logout)
Sentry.setUser(null);
```

### Adicionar tags customizadas

```jsx
Sentry.setTag("pagina", "checkout");
Sentry.setTag("versao_app", "1.0.0");
```

### Adicionar contexto extra

```jsx
Sentry.setContext("pedido", {
  id: "12345",
  valor: 99.90,
  itens: 3
});
```

## ✅ Checklist de Teste

- [ ] Executar `npm run dev`
- [ ] Abrir o navegador
- [ ] Clicar no botão de teste (ou usar console)
- [ ] Verificar que apareceu um alert confirmando o envio
- [ ] Aguardar 5-10 segundos
- [ ] Acessar o painel do Sentry
- [ ] Confirmar que o erro/mensagem apareceu
- [ ] Explorar os detalhes do erro
- [ ] Verificar se o Session Replay está funcionando

## 🎉 Próximos Passos

Após confirmar que está funcionando:

1. **Remover o componente de teste** (ou deixar apenas em dev)
2. **Fazer commit das alterações:**
   ```bash
   git add .
   git commit -m "feat: Adicionar integração com Sentry"
   git push
   ```

3. **Configurar no ambiente de produção:**
   - Adicionar `VITE_SENTRY_DSN` nas variáveis de ambiente do Vercel/Netlify
   - Fazer deploy

4. **Ajustar taxas de amostragem** para produção (opcional):
   ```jsx
   // Em src/main.jsx
   tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
   replaysSessionSampleRate: import.meta.env.PROD ? 0.01 : 0.1,
   ```

## 🆘 Problemas?

### Erro não aparece no Sentry

1. Verifique se o DSN está correto no `.env`
2. Reinicie o servidor (`npm run dev`)
3. Limpe o cache do navegador
4. Verifique o console do navegador para erros do Sentry
5. Confirme que está no projeto correto no painel do Sentry

### "Sentry is not defined"

- Certifique-se de importar: `import * as Sentry from '@sentry/react'`

### DSN não está sendo lido

- Variáveis no Vite devem começar com `VITE_`
- Reinicie o servidor após modificar `.env`
- Verifique se não há espaços extras

## 📚 Recursos

- [Documentação Sentry React](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Session Replay](https://docs.sentry.io/platforms/javascript/session-replay/)
- [Performance Monitoring](https://docs.sentry.io/platforms/javascript/performance/)

