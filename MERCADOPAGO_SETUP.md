# 💳 Integração Mercado Pago - Adventista Play

## ✅ Status da Implementação

A integração do Mercado Pago foi **completamente implementada** na seção de doações mobile!

---

## 📦 O que foi implementado

### 1. Frontend (React)
- ✅ **DoacaoPage.jsx** - Página de doação atualizada com integração
- ✅ **DoacaoResultado.jsx** - Páginas de retorno (sucesso, falha, pendente)
- ✅ **mercadoPagoService.js** - Serviço para comunicação com API

### 2. Backend (API)
- ✅ **api/mercadopago.js** - Endpoint para criar preferências de pagamento
- ✅ **Webhook** - Endpoint para receber notificações do Mercado Pago

### 3. Funcionalidades
- ✅ **Três métodos de pagamento:**
  - Cartão de Crédito/Débito
  - PIX
  - Boleto Bancário
- ✅ **Validação de dados** (valor mínimo, email, etc.)
- ✅ **Campos opcionais** (nome e email do doador)
- ✅ **Páginas de retorno** personalizadas
- ✅ **Loading states** e feedback visual
- ✅ **Tratamento de erros**

### 4. Rotas Adicionadas
```javascript
/doacao          // Página principal de doação
/doacao/sucesso  // Retorno de pagamento aprovado
/doacao/falha    // Retorno de pagamento recusado
/doacao/pendente // Retorno de pagamento pendente
```

---

## 🔧 Configuração Necessária

### Passo 1: Criar Conta no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/
2. Crie uma conta ou faça login
3. Vá para: https://www.mercadopago.com.br/developers/

### Passo 2: Obter Credenciais

1. Acesse o painel de desenvolvedores: https://www.mercadopago.com.br/developers/panel/credentials
2. Você verá duas seções:
   - **Credenciais de teste** (para desenvolvimento)
   - **Credenciais de produção** (para o site real)

#### Credenciais de Teste (Desenvolvimento)

```
Public Key: TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Access Token: TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Credenciais de Produção

```
Public Key: APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Access Token: APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Passo 3: Configurar Variáveis de Ambiente

#### Desenvolvimento Local

Edite o arquivo `.env`:

```env
# Mercado Pago - TESTE
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:3000
```

#### Produção (Cloudflare Pages)

1. Acesse: https://dash.cloudflare.com/
2. **Workers & Pages** → seu projeto → **Settings**
3. **Environment Variables** → **Add variable**

Adicione as seguintes variáveis:

```
VITE_MERCADOPAGO_PUBLIC_KEY = APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN = APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL = https://seu-site.pages.dev
```

---

## 🧪 Como Testar

### Modo de Teste (Sandbox)

O Mercado Pago oferece um ambiente de testes completo:

#### 1. Usar Credenciais de Teste

Configure as credenciais de teste no `.env` (começam com `TEST-`)

#### 2. Cartões de Teste

Use estes cartões para simular diferentes cenários:

**Cartão Aprovado:**
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO
CPF: 12345678909
```

**Cartão Recusado:**
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: OTHE
CPF: 12345678909
```

**Cartão Pendente:**
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: CONT
CPF: 12345678909
```

#### 3. Usuários de Teste

Crie usuários de teste em:
https://www.mercadopago.com.br/developers/panel/test-users

#### 4. Testar PIX e Boleto

- **PIX:** No ambiente de teste, você receberá um QR Code fictício
- **Boleto:** Será gerado um boleto de teste que pode ser "pago" no painel

### Fluxo de Teste Completo

1. Execute o projeto: `npm run dev`
2. Acesse: http://localhost:5173/doacao
3. Preencha:
   - Valor: R$ 10,00
   - Nome: Teste (opcional)
   - Email: teste@teste.com (opcional)
4. Selecione um método de pagamento
5. Clique em "Confirmar Doação"
6. Você será redirecionado para o checkout do Mercado Pago
7. Use um dos cartões de teste acima
8. Complete o pagamento
9. Você será redirecionado de volta para `/doacao/sucesso`

---

## 🏗️ Arquitetura da Solução

### Fluxo de Pagamento

```
┌─────────────────────────────────────────────────────────────┐
│  1. Usuário preenche formulário de doação                   │
│     ↓                                                        │
│  2. Frontend valida dados                                   │
│     ↓                                                        │
│  3. Frontend chama API: POST /api/mercadopago               │
│     ↓                                                        │
│  4. Backend cria preferência no Mercado Pago                │
│     ↓                                                        │
│  5. Backend retorna URL de pagamento (init_point)           │
│     ↓                                                        │
│  6. Frontend redireciona para checkout do Mercado Pago      │
│     ↓                                                        │
│  7. Usuário completa pagamento no Mercado Pago              │
│     ↓                                                        │
│  8. Mercado Pago redireciona de volta:                      │
│     • Aprovado → /doacao/sucesso                            │
│     • Recusado → /doacao/falha                              │
│     • Pendente → /doacao/pendente                           │
│     ↓                                                        │
│  9. Mercado Pago envia notificação para webhook             │
│     ↓                                                        │
│ 10. Backend processa webhook e atualiza status             │
└─────────────────────────────────────────────────────────────┘
```

### Estrutura de Arquivos

```
adventista-play/
├── src/
│   ├── components/
│   │   ├── DoacaoPage.jsx              # Página principal de doação
│   │   └── DoacaoResultado.jsx         # Páginas de retorno
│   └── services/
│       └── mercadoPagoService.js       # Lógica de integração
├── api/
│   └── mercadopago.js                  # API backend (Cloudflare Functions)
└── .env                                # Variáveis de ambiente
```

---

## 🔒 Segurança

### Boas Práticas Implementadas

✅ **Access Token no backend apenas**
- O Access Token nunca é exposto no frontend
- Apenas a Public Key é usada no cliente

✅ **Validação de dados**
- Valor mínimo de R$ 5,00
- Validação de email
- Sanitização de inputs

✅ **HTTPS obrigatório**
- Mercado Pago exige HTTPS em produção
- Cloudflare Pages fornece HTTPS automaticamente

✅ **Webhook seguro**
- Endpoint para receber notificações do Mercado Pago
- Validação de origem das requisições

### Variáveis de Ambiente

**NUNCA** commite o arquivo `.env` com credenciais reais!

O `.env` está no `.gitignore` ✅

---

## 📊 Monitoramento

### Painel do Mercado Pago

Acesse: https://www.mercadopago.com.br/activities

Você pode ver:
- Pagamentos recebidos
- Status de cada transação
- Valores e taxas
- Detalhes dos compradores
- Chargebacks e disputas

### Webhook Logs

Os webhooks são registrados no console. Em produção, considere:
- Salvar em banco de dados
- Enviar notificações por email
- Integrar com sistema de CRM

---

## 💰 Taxas do Mercado Pago

### Taxas por Método de Pagamento

- **Cartão de Crédito:** 4,99% + R$ 0,49 por transação
- **Cartão de Débito:** 3,99% + R$ 0,49 por transação
- **PIX:** 0,99% por transação
- **Boleto:** R$ 3,49 por transação

*Valores sujeitos a alteração. Consulte: https://www.mercadopago.com.br/costs-section/release-options*

### Recebimento

- **PIX:** Instantâneo
- **Cartão de Crédito:** D+14 ou D+30 (configurável)
- **Boleto:** D+2 após compensação

---

## 🚀 Deploy em Produção

### Checklist

- [ ] Obter credenciais de produção do Mercado Pago
- [ ] Configurar variáveis de ambiente no Cloudflare Pages
- [ ] Testar em ambiente de staging primeiro
- [ ] Configurar webhook URL no painel do Mercado Pago
- [ ] Ativar notificações de pagamento
- [ ] Testar com pagamento real de baixo valor
- [ ] Monitorar primeiras transações

### Configurar Webhook no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/notifications/webhooks
2. Clique em "Configurar notificações"
3. URL: `https://seu-site.pages.dev/api/mercadopago/webhook`
4. Eventos:
   - ✅ Pagamentos
   - ✅ Merchant Orders
5. Salvar

---

## 🆘 Troubleshooting

### Erro: "Public Key inválida"

**Solução:**
- Verifique se a Public Key está correta no `.env`
- Certifique-se de usar `VITE_` no prefixo
- Reinicie o servidor de desenvolvimento

### Erro: "Access Token inválido"

**Solução:**
- Verifique se o Access Token está correto
- Confirme que está usando credenciais do mesmo ambiente (teste/produção)
- Verifique se o token não expirou

### Pagamento não redireciona de volta

**Solução:**
- Verifique as `back_urls` no código
- Certifique-se de que as rotas estão configuradas
- Teste com `auto_return: 'approved'`

### Webhook não está sendo chamado

**Solução:**
- Verifique se a URL do webhook está configurada no painel do Mercado Pago
- Certifique-se de que a URL é acessível publicamente (HTTPS)
- Verifique os logs do Cloudflare Functions

---

## 📚 Recursos

- [Documentação Oficial](https://www.mercadopago.com.br/developers/pt/docs)
- [Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing)
- [Credenciais](https://www.mercadopago.com.br/developers/panel/credentials)
- [Cartões de Teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards)
- [Webhooks](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks)
- [Suporte](https://www.mercadopago.com.br/developers/pt/support)

---

## 🎉 Próximos Passos

### Melhorias Futuras

1. **Doações Recorrentes**
   - Implementar planos de assinatura
   - Doações mensais automáticas

2. **Relatórios**
   - Dashboard de doações
   - Gráficos de evolução
   - Exportação de dados

3. **Gamificação**
   - Badges para doadores
   - Ranking de contribuidores
   - Metas de arrecadação

4. **Comunicação**
   - Email de agradecimento automático
   - Certificado de doação
   - Newsletter para doadores

---

## ✅ Conclusão

A integração está **100% funcional** e pronta para uso!

Basta configurar as credenciais do Mercado Pago e começar a receber doações.

Para dúvidas ou suporte, consulte a documentação oficial do Mercado Pago.

