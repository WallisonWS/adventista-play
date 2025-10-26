# ⚡ Mercado Pago - Guia Rápido

## 🎯 Começar em 5 Minutos

### Passo 1: Criar Conta no Mercado Pago

```
🌐 https://www.mercadopago.com.br/
```

1. Crie uma conta ou faça login
2. Acesse: https://www.mercadopago.com.br/developers/

### Passo 2: Obter Credenciais de Teste

```
📍 https://www.mercadopago.com.br/developers/panel/credentials
```

Copie as **Credenciais de Teste**:
- Public Key (começa com `TEST-`)
- Access Token (começa com `TEST-`)

### Passo 3: Configurar no Projeto

Edite o arquivo `.env`:

```env
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:3000
```

### Passo 4: Executar o Projeto

```bash
npm run dev
```

### Passo 5: Testar

1. Acesse: http://localhost:5173/doacao
2. Preencha:
   - Valor: R$ 10,00
   - Método: Cartão de Crédito
3. Clique em "Confirmar Doação"
4. Use este cartão de teste:

```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO
CPF: 12345678909
```

5. Complete o pagamento
6. Você será redirecionado para `/doacao/sucesso` ✅

---

## 🚀 Deploy em Produção

### 1. Obter Credenciais de Produção

```
📍 https://www.mercadopago.com.br/developers/panel/credentials
```

Copie as **Credenciais de Produção**:
- Public Key (começa com `APP_USR-`)
- Access Token (começa com `APP_USR-`)

### 2. Configurar no Cloudflare Pages

```
🌐 https://dash.cloudflare.com/
```

1. **Workers & Pages** → seu projeto → **Settings**
2. **Environment Variables** → **Add variable**

Adicione:

```
VITE_MERCADOPAGO_PUBLIC_KEY = APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN = APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL = https://seu-site.pages.dev
```

3. Selecione **Production**
4. **Save**
5. Faça um **Redeploy**

### 3. Configurar Webhook (Opcional)

```
📍 https://www.mercadopago.com.br/developers/panel/notifications/webhooks
```

1. Clique em "Configurar notificações"
2. URL: `https://seu-site.pages.dev/api/mercadopago/webhook`
3. Eventos: Pagamentos + Merchant Orders
4. Salvar

---

## 🧪 Cartões de Teste

### Pagamento Aprovado
```
Número: 5031 4332 1540 6351
Nome: APRO
```

### Pagamento Recusado
```
Número: 5031 4332 1540 6351
Nome: OTHE
```

### Pagamento Pendente
```
Número: 5031 4332 1540 6351
Nome: CONT
```

**Sempre use:**
- CVV: 123
- Validade: 11/25
- CPF: 12345678909

---

## 📊 Métodos de Pagamento Disponíveis

| Método | Aprovação | Taxa |
|--------|-----------|------|
| **Cartão de Crédito** | Instantânea | 4,99% + R$ 0,49 |
| **Cartão de Débito** | Instantânea | 3,99% + R$ 0,49 |
| **PIX** | Instantânea | 0,99% |
| **Boleto** | 2 dias úteis | R$ 3,49 |

---

## ✅ Checklist

### Desenvolvimento
- [ ] Conta no Mercado Pago criada
- [ ] Credenciais de teste obtidas
- [ ] Variáveis configuradas no `.env`
- [ ] Projeto executando (`npm run dev`)
- [ ] Teste de doação realizado
- [ ] Pagamento aprovado com sucesso

### Produção
- [ ] Credenciais de produção obtidas
- [ ] Variáveis configuradas no Cloudflare Pages
- [ ] Deploy realizado
- [ ] Webhook configurado (opcional)
- [ ] Teste com pagamento real de baixo valor
- [ ] Monitoramento ativo

---

## 🆘 Problemas Comuns

### "Public Key inválida"
✅ Verifique se copiou corretamente
✅ Reinicie o servidor (`npm run dev`)

### "Não redireciona após pagamento"
✅ Verifique se as rotas estão configuradas
✅ Confirme que `VITE_API_URL` está correto

### "Webhook não funciona"
✅ URL deve ser HTTPS
✅ Verifique configuração no painel do Mercado Pago

---

## 📚 Documentação Completa

Para mais detalhes: **MERCADOPAGO_SETUP.md**

---

## 🎉 Pronto!

Sua integração com Mercado Pago está funcionando!

Agora você pode receber doações via:
- ✅ Cartão de Crédito/Débito
- ✅ PIX
- ✅ Boleto Bancário

**Próximo passo:** Configure as credenciais de produção e comece a receber doações reais! 💰

