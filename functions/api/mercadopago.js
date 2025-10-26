/**
 * API Backend para integração com Mercado Pago
 * Cloudflare Pages Functions
 */

/**
 * Cria uma preferência de pagamento
 * POST /api/mercadopago
 */
export async function onRequestPost(context) {
  try {
    const { valor, metodoPagamento, email, nome, descricao } = await context.request.json();

    // Validação
    if (!valor || valor < 5) {
      return new Response(
        JSON.stringify({ error: 'Valor mínimo de R$ 5,00' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Obter Access Token do ambiente
    const accessToken = context.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: 'Configuração do Mercado Pago não encontrada' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Obter origem para URLs de retorno
    const origin = context.request.headers.get('origin') || context.request.headers.get('referer')?.replace(/\/$/, '') || 'https://adventista-play.pages.dev';

    // Criar preferência usando a API REST do Mercado Pago
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
        success: `${origin}/doacao/sucesso`,
        failure: `${origin}/doacao/falha`,
        pending: `${origin}/doacao/pendente`,
      },
      auto_return: 'approved',
      statement_descriptor: 'ADVENTISTA PLAY',
      external_reference: `doacao-${Date.now()}`,
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

    // Chamar API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro do Mercado Pago:', errorData);
      throw new Error(`Mercado Pago API error: ${response.status}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao processar pagamento', details: error.message }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

