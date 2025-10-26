# ⚠️ ATENÇÃO: Credenciais de Produção Configuradas!

## 🔴 IMPORTANTE

Você configurou credenciais de **PRODUÇÃO** do Mercado Pago!

```
Public Key: APP_USR-39452907-7a49-40f8-9aac-a28a68cff7f4
Access Token: APP_USR-5571237664418168-102618-210ba0b6fbdf18361b9deab26b1f65be-2948292632
```

Isso significa que **QUALQUER PAGAMENTO SERÁ REAL** e você receberá o dinheiro na sua conta do Mercado Pago!

---

## 🧪 Recomendação: Use Credenciais de TESTE Primeiro

### Por que usar credenciais de teste?

✅ **Segurança:** Não há risco de cobranças reais
✅ **Testes ilimitados:** Pode testar quantas vezes quiser
✅ **Cartões de teste:** Use cartões fictícios para simular pagamentos
✅ **Sem custos:** Não paga taxas do Mercado Pago

---

## 📋 Como Obter Credenciais de TESTE

1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. Clique na aba **"Credenciais de teste"**
3. Copie:
   - **Public Key** (começa com `TEST-`)
   - **Access Token** (começa com `TEST-`)

### Substitua no `.env`:

```env
# Mercado Pago Configuration - TESTE
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:3000
```

---

## 🧪 Como Testar com Credenciais de TESTE

### 1. Execute o projeto:
```bash
npm run dev
```

### 2. Acesse:
```
http://localhost:5173/doacao
```

### 3. Preencha:
- **Valor:** R$ 10,00
- **Método:** Cartão de Crédito

### 4. Use este cartão de TESTE:

```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO
CPF: 12345678909
```

### 5. Complete o pagamento

Você será redirecionado para `/doacao/sucesso` ✅

---

## 💰 Se Quiser Usar PRODUÇÃO Agora

### ⚠️ ATENÇÃO: Pagamentos serão REAIS!

Se você realmente quer testar com as credenciais de produção configuradas:

### 1. Execute o projeto:
```bash
npm run dev
```

### 2. Acesse:
```
http://localhost:5173/doacao
```

### 3. Faça um pagamento de TESTE com valor BAIXO:
- **Valor:** R$ 1,00 (um real)
- Use seu próprio cartão
- Você receberá o dinheiro na sua conta do Mercado Pago

### 4. Verifique no painel:
```
https://www.mercadopago.com.br/activities
```

---

## 📊 Diferenças entre TESTE e PRODUÇÃO

| Aspecto | TESTE | PRODUÇÃO |
|---------|-------|----------|
| **Credenciais** | Começam com `TEST-` | Começam com `APP_USR-` |
| **Pagamentos** | Fictícios | Reais |
| **Cartões** | Cartões de teste | Cartões reais |
| **Dinheiro** | Não há transferência | Você recebe o dinheiro |
| **Taxas** | Sem taxas | 0,99% a 4,99% + R$ 0,49 |
| **Painel** | Sandbox separado | Painel principal |

---

## 🚀 Fluxo Recomendado

### Fase 1: TESTE (Desenvolvimento)
1. ✅ Usar credenciais de TESTE
2. ✅ Testar todos os métodos de pagamento
3. ✅ Verificar páginas de retorno
4. ✅ Testar erros e casos extremos

### Fase 2: PRODUÇÃO (Validação)
1. ✅ Trocar para credenciais de PRODUÇÃO
2. ✅ Fazer 1 pagamento real de R$ 1,00
3. ✅ Verificar se recebeu no painel
4. ✅ Confirmar webhook (se configurado)

### Fase 3: DEPLOY (Cloudflare Pages)
1. ✅ Configurar credenciais de PRODUÇÃO no Cloudflare
2. ✅ Fazer deploy
3. ✅ Testar em produção
4. ✅ Monitorar primeiras doações

---

## 🔒 Segurança

### ⚠️ NUNCA compartilhe suas credenciais!

- ❌ Não commite o arquivo `.env` no Git
- ❌ Não compartilhe em prints ou mensagens
- ❌ Não exponha no frontend (só a Public Key)
- ✅ O `.env` está no `.gitignore` (seguro)

---

## 🎯 Status Atual

```
✅ Credenciais de PRODUÇÃO configuradas
✅ Projeto pronto para receber doações REAIS
⚠️ Qualquer pagamento será processado de verdade
💰 Você receberá o dinheiro na sua conta do Mercado Pago
```

---

## 📝 Próximo Passo

**Escolha uma opção:**

### Opção A: Testar com Credenciais de TESTE (Recomendado)
1. Pegue as credenciais de teste no painel
2. Substitua no `.env`
3. Reinicie o servidor (`npm run dev`)
4. Teste à vontade com cartões fictícios

### Opção B: Usar PRODUÇÃO Agora (Cuidado!)
1. Execute: `npm run dev`
2. Acesse: http://localhost:5173/doacao
3. Faça um pagamento de R$ 1,00 para testar
4. Verifique no painel do Mercado Pago

---

## 🆘 Suporte

Se tiver dúvidas ou problemas:
- Consulte: `MERCADOPAGO_SETUP.md`
- Ou: `MERCADOPAGO_QUICKSTART.md`

---

## ✅ Conclusão

Suas credenciais estão configuradas e funcionando!

**Recomendação:** Use credenciais de TESTE primeiro para validar tudo antes de aceitar pagamentos reais. 🚀

