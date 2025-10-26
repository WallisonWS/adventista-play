/**
 * API Backend para integração com Mercado Pago
 * Este arquivo deve ser usado com Cloudflare Pages Functions ou similar
 */

import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

/**
 * Cria uma preferência de pagamento
 */
export async function onRequestPost(context) {
  try {
    const { valor, metodoPagamento, email, nome, descricao } = await context.request.json();

    // Validação
    if (!valor || valor < 5) {
      return new Response(
        JSON.stringify({ error: 'Valor mínimo de R$ 5,00' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Criar preferência
    const preference = new Preference(client);
    
    const preferenceData = {
      items: [
        {
          title: descricao || 'Doação - Adventista Play',
          quantity: 1,
          unit_price: parseFloat(valor),
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: nome || 'Doador Anônimo',
        email: email || 'doador@adventista-play.com',
      },
      back_urls: {
        success: `${context.request.headers.get('origin')}/doacao/sucesso`,
        failure: `${context.request.headers.get('origin')}/doacao/falha`,
        pending: `${context.request.headers.get('origin')}/doacao/pendente`,
      },
      auto_return: 'approved',
      statement_descriptor: 'ADVENTISTA PLAY',
      external_reference: `doacao-${Date.now()}`,
      notification_url: `${context.request.headers.get('origin')}/api/mercadopago/webhook`,
    };

    // Configurar métodos de pagamento permitidos
    if (metodoPagamento === 'pix') {
      preferenceData.payment_methods = {
        excluded_payment_types: [
          { id: 'credit_card' },
          { id: 'debit_card' },
          { id: 'ticket' },
        ],
      };
    } else if (metodoPagamento === 'boleto') {
      preferenceData.payment_methods = {
        excluded_payment_types: [
          { id: 'credit_card' },
          { id: 'debit_card' },
        ],
        excluded_payment_methods: [
          { id: 'pix' },
        ],
      };
    } else if (metodoPagamento === 'cartao') {
      preferenceData.payment_methods = {
        excluded_payment_methods: [
          { id: 'pix' },
        ],
        excluded_payment_types: [
          { id: 'ticket' },
        ],
      };
    }

    const result = await preference.create({ body: preferenceData });

    return new Response(
      JSON.stringify({
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao processar pagamento', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Webhook para receber notificações do Mercado Pago
 */
export async function onRequestPostWebhook(context) {
  try {
    const data = await context.request.json();
    
    console.log('Webhook recebido:', data);

    // Aqui você pode processar a notificação
    // Por exemplo: atualizar status no banco de dados, enviar email, etc.
    
    // Tipos de notificação:
    // - payment: Pagamento criado ou atualizado
    // - merchant_order: Ordem criada ou atualizada
    
    if (data.type === 'payment') {
      const paymentId = data.data.id;
      console.log('Pagamento ID:', paymentId);
      
      // Aqui você buscaria os detalhes do pagamento e processaria
      // const payment = await mercadopago.payment.get(paymentId);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao processar webhook' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

