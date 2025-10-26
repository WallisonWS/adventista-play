/**
 * Serviço de integração com Mercado Pago
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Cria uma preferência de pagamento no Mercado Pago
 * @param {Object} dadosDoacao - Dados da doação
 * @param {number} dadosDoacao.valor - Valor da doação
 * @param {string} dadosDoacao.metodoPagamento - Método de pagamento (cartao, pix, boleto)
 * @param {string} dadosDoacao.email - Email do doador (opcional)
 * @param {string} dadosDoacao.nome - Nome do doador (opcional)
 * @returns {Promise<Object>} - Retorna o ID da preferência e URL de pagamento
 */
export async function criarPreferenciaPagamento(dadosDoacao) {
  try {
    const response = await fetch(`${API_URL}/api/mercadopago/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valor: parseFloat(dadosDoacao.valor),
        metodoPagamento: dadosDoacao.metodoPagamento,
        email: dadosDoacao.email || 'doador@adventista-play.com',
        nome: dadosDoacao.nome || 'Doador Anônimo',
        descricao: 'Doação para Adventista Play - Apoio à Missão',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar preferência de pagamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    throw error;
  }
}

/**
 * Verifica o status de um pagamento
 * @param {string} paymentId - ID do pagamento
 * @returns {Promise<Object>} - Status do pagamento
 */
export async function verificarStatusPagamento(paymentId) {
  try {
    const response = await fetch(`${API_URL}/api/mercadopago/payment-status/${paymentId}`);
    
    if (!response.ok) {
      throw new Error('Erro ao verificar status do pagamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    throw error;
  }
}

/**
 * Inicializa o Mercado Pago no frontend
 * @param {string} publicKey - Chave pública do Mercado Pago
 * @returns {Object} - Instância do Mercado Pago
 */
export function inicializarMercadoPago(publicKey) {
  if (typeof window !== 'undefined' && window.MercadoPago) {
    return new window.MercadoPago(publicKey);
  }
  return null;
}

/**
 * Formata valor para exibição
 * @param {number} valor - Valor numérico
 * @returns {string} - Valor formatado em BRL
 */
export function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

/**
 * Valida dados da doação
 * @param {Object} dados - Dados da doação
 * @returns {Object} - { valido: boolean, erro: string }
 */
export function validarDadosDoacao(dados) {
  if (!dados.valor || parseFloat(dados.valor) < 5) {
    return {
      valido: false,
      erro: 'O valor mínimo da doação é R$ 5,00',
    };
  }

  if (!dados.metodoPagamento) {
    return {
      valido: false,
      erro: 'Por favor, selecione um método de pagamento',
    };
  }

  if (dados.email && !validarEmail(dados.email)) {
    return {
      valido: false,
      erro: 'Por favor, insira um email válido',
    };
  }

  return {
    valido: true,
    erro: null,
  };
}

/**
 * Valida formato de email
 * @param {string} email - Email para validar
 * @returns {boolean} - True se válido
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Mapeia método de pagamento para tipos do Mercado Pago
 * @param {string} metodo - Método selecionado (cartao, pix, boleto)
 * @returns {Array<string>} - Tipos de pagamento permitidos
 */
export function mapearMetodoPagamento(metodo) {
  const mapeamento = {
    cartao: ['credit_card', 'debit_card'],
    pix: ['pix'],
    boleto: ['bolbradesco', 'ticket'],
  };

  return mapeamento[metodo] || [];
}

