/**
 * Webhook para receber notificações do Mercado Pago
 * POST /api/mercadopago/webhook
 */
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    console.log('Webhook recebido:', JSON.stringify(data, null, 2));

    // Tipos de notificação:
    // - payment: Pagamento criado ou atualizado
    // - merchant_order: Ordem criada ou atualizada
    
    if (data.type === 'payment') {
      const paymentId = data.data.id;
      console.log('Pagamento ID:', paymentId);
      
      // Aqui você pode:
      // 1. Buscar detalhes do pagamento na API do Mercado Pago
      // 2. Salvar no banco de dados
      // 3. Enviar email de confirmação
      // 4. Atualizar sistema de doadores
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao processar webhook' }),
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

