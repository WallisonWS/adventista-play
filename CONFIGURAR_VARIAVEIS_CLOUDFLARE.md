# 🔧 Como Configurar Variáveis de Ambiente no Cloudflare Pages

## ⚠️ IMPORTANTE: Configuração Obrigatória

Para que o sistema de doações funcione, você **DEVE** configurar as variáveis de ambiente no Cloudflare Pages.

---

## 📋 Passo a Passo Completo

### 1. Acesse o Dashboard do Cloudflare

```
https://dash.cloudflare.com/
```

### 2. Navegue até seu Projeto

1. Clique em **"Workers & Pages"** no menu lateral
2. Encontre e clique no projeto: **adventista-play**
3. Clique na aba **"Settings"** (Configurações)

### 3. Adicione as Variáveis de Ambiente

1. Role a página até encontrar: **"Environment variables"**
2. Clique no botão: **"Add variable"**

---

## 🔑 Variáveis Obrigatórias

### Variável 1: Sentry DSN

```
Variable name: VITE_SENTRY_DSN
Value: https://2e885862b6c3c61e2d1bd852dcb15af7@o4510217800384512.ingest.de.sentry.io/4510244958502992
Environment: Production ✅
```

**O que faz:** Permite o monitoramento de erros no Sentry

---

### Variável 2: Mercado Pago Public Key

```
Variable name: VITE_MERCADOPAGO_PUBLIC_KEY
Value: APP_USR-39452907-7a49-40f8-9aac-a28a68cff7f4
Environment: Production ✅
```

**O que faz:** Chave pública para inicializar o Mercado Pago no frontend

---

### Variável 3: Mercado Pago Access Token

```
Variable name: MERCADOPAGO_ACCESS_TOKEN
Value: APP_USR-5571237664418168-102618-210ba0b6fbdf18361b9deab26b1f65be-2948292632
Environment: Production ✅
```

**O que faz:** Token de acesso para criar preferências de pagamento no backend

---

### Variável 4: API URL

```
Variable name: VITE_API_URL
Value: https://adventista-play.pages.dev
```

**IMPORTANTE:** Substitua `adventista-play.pages.dev` pela URL real do seu site!

**Environment:** Production ✅

**O que faz:** Define a URL base para chamadas de API

---

## 📸 Como Adicionar Cada Variável

Para cada variável acima:

1. Clique em **"Add variable"**
2. **Variable name:** Cole o nome exato (ex: `VITE_SENTRY_DSN`)
3. **Value:** Cole o valor correspondente
4. **Environment:** Marque **Production** ✅
5. Clique em **"Save"**

**Repita** para todas as 4 variáveis!

---

## 🔄 Fazer Redeploy

Após adicionar TODAS as variáveis:

1. Vá na aba **"Deployments"**
2. Encontre o último deploy (o mais recente)
3. Clique nos **três pontos (⋮)** ao lado
4. Selecione: **"Retry deployment"**
5. Aguarde o deploy completar (2-5 minutos)

---

## ✅ Verificar se Funcionou

### 1. Aguarde o Deploy Completar

Status deve estar: **Success** ✅

### 2. Acesse a Página de Doações

```
https://seu-site.pages.dev/doacao
```

### 3. Teste uma Doação

1. Preencha o valor: **R$ 10,00**
2. Selecione um método de pagamento
3. Clique em **"Confirmar Doação"**

**Se funcionar:**
- ✅ Você será redirecionado para o Mercado Pago
- ✅ Poderá completar o pagamento

**Se ainda der erro:**
- ❌ Verifique se TODAS as 4 variáveis foram adicionadas
- ❌ Verifique se não há espaços extras nos valores
- ❌ Confirme que selecionou **Production**
- ❌ Faça um novo **Redeploy**

---

## 🔍 Como Verificar as Variáveis

Para confirmar que as variáveis foram salvas:

1. Vá em: **Settings** → **Environment variables**
2. Você deve ver as 4 variáveis listadas:
   - ✅ `VITE_SENTRY_DSN`
   - ✅ `VITE_MERCADOPAGO_PUBLIC_KEY`
   - ✅ `MERCADOPAGO_ACCESS_TOKEN`
   - ✅ `VITE_API_URL`

---

## 🆘 Troubleshooting

### Erro: "Failed to fetch"

**Causa:** Variável `MERCADOPAGO_ACCESS_TOKEN` não configurada

**Solução:**
1. Verifique se a variável foi adicionada
2. Confirme que o nome está correto (sem espaços)
3. Faça um **Redeploy**

### Erro: "Configuração do Mercado Pago não encontrada"

**Causa:** Variável não está disponível no ambiente

**Solução:**
1. Confirme que selecionou **Production**
2. Aguarde alguns minutos após salvar
3. Faça um **Redeploy**

### Sentry não captura erros

**Causa:** Variável `VITE_SENTRY_DSN` não configurada

**Solução:**
1. Adicione a variável
2. Faça um **Redeploy**
3. Aguarde alguns minutos
4. Teste forçando um erro

---

## 📊 Resumo

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `VITE_SENTRY_DSN` | https://2e885862...io/4510244958502992 | Production |
| `VITE_MERCADOPAGO_PUBLIC_KEY` | APP_USR-39452907...a28a68cff7f4 | Production |
| `MERCADOPAGO_ACCESS_TOKEN` | APP_USR-5571237664...b1f65be-2948292632 | Production |
| `VITE_API_URL` | https://seu-site.pages.dev | Production |

---

## ✨ Pronto!

Após configurar as variáveis e fazer o redeploy, seu sistema de doações estará **100% funcional**!

Você poderá:
- ✅ Receber doações via Cartão, PIX e Boleto
- ✅ Monitorar erros no Sentry
- ✅ Acompanhar pagamentos no Mercado Pago

---

## 🔗 Links Úteis

- **Dashboard Cloudflare:** https://dash.cloudflare.com/
- **Painel Mercado Pago:** https://www.mercadopago.com.br/activities
- **Painel Sentry:** https://sentry.io/organizations/adventista-play/issues/

---

## 📞 Precisa de Ajuda?

Se ainda tiver problemas:
1. Verifique os logs do deploy no Cloudflare
2. Teste localmente com `npm run dev`
3. Consulte a documentação do Cloudflare Pages Functions

Tudo pronto! 🚀

