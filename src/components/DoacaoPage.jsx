import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, QrCode, FileText, ArrowLeft, Loader2 } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { criarPreferenciaPagamento, validarDadosDoacao, formatarValor } from '../services/mercadoPagoService'

export function DoacaoPage() {
  const navigate = useNavigate()
  const [valor, setValor] = useState('')
  const [metodoPagamento, setMetodoPagamento] = useState(null)
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState(null)

  const handleDoacao = async () => {
    setErro(null)
    
    // Validar dados
    const validacao = validarDadosDoacao({ valor, metodoPagamento, email })
    if (!validacao.valido) {
      setErro(validacao.erro)
      return
    }

    setProcessando(true)

    try {
      // Criar preferência de pagamento no Mercado Pago
      const preferencia = await criarPreferenciaPagamento({
        valor,
        metodoPagamento,
        email: email || undefined,
        nome: nome || undefined,
      })

      // Redirecionar para o checkout do Mercado Pago
      if (preferencia.init_point) {
        window.location.href = preferencia.init_point
      } else {
        throw new Error('URL de pagamento não recebida')
      }
    } catch (error) {
      console.error('Erro ao processar doação:', error)
      setErro(error.message || 'Erro ao processar doação. Tente novamente.')
      setProcessando(false)
    }
  }

  const metodosInfo = {
    cartao: {
      titulo: 'Cartão de Crédito/Débito',
      descricao: 'Pagamento aprovado na hora',
      icon: CreditCard,
      color: 'blue',
    },
    pix: {
      titulo: 'PIX',
      descricao: 'Aprovação instantânea',
      icon: QrCode,
      color: 'teal',
    },
    boleto: {
      titulo: 'Boleto Bancário',
      descricao: 'Aprovação em até 2 dias úteis',
      icon: FileText,
      color: 'orange',
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="flex items-center px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 text-gray-700 dark:text-gray-300"
            disabled={processando}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Apoie a Missão</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Apoie esta Missão
              </h2>
              
              <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                O Adventista Play existe para edificar vidas, levar a Palavra de Deus e fortalecer a 
                fé diariamente. Oferecemos conteúdo espiritual gratuito e acessível. Se o app tem te 
                abençoado, considere apoiar. Sua doação ajuda a manter o app, criar novos conteúdos 
                e alcançar mais pessoas.
              </p>

              {/* Versículo Bíblico */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, 
                  pois Deus ama quem dá com alegria.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  - 2 Coríntios 9:7
                </p>
              </div>

              {/* Mensagem de Erro */}
              {erro && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
                >
                  <p className="text-sm text-red-800 dark:text-red-200">{erro}</p>
                </motion.div>
              )}

              {/* Campos Opcionais */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={processando}
                    className="w-full px-4 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary focus:border-transparent
                             placeholder:text-gray-400 dark:placeholder:text-gray-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={processando}
                    className="w-full px-4 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary focus:border-transparent
                             placeholder:text-gray-400 dark:placeholder:text-gray-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Campo de Valor */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <label className="text-lg font-bold text-gray-900 dark:text-white">
                    Valor da doação:
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    Min: R$ 5,00
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 dark:text-gray-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="5"
                    step="0.01"
                    placeholder="10.00"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    disabled={processando}
                    className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary focus:border-transparent
                             placeholder:text-gray-400 dark:placeholder:text-gray-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {valor && parseFloat(valor) >= 5 && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Você está doando: <span className="font-semibold">{formatarValor(parseFloat(valor))}</span>
                  </p>
                )}
              </div>

              {/* Métodos de Pagamento */}
              <div className="mb-6">
                <label className="block text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Escolha como doar:
                </label>
                <div className="space-y-3">
                  {Object.entries(metodosInfo).map(([key, info]) => {
                    const Icon = info.icon
                    const isSelected = metodoPagamento === key
                    
                    return (
                      <motion.button
                        key={key}
                        whileTap={{ scale: processando ? 1 : 0.98 }}
                        onClick={() => !processando && setMetodoPagamento(key)}
                        disabled={processando}
                        className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all
                          ${isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                          }
                          ${processando ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-${info.color}-100 dark:bg-${info.color}-900/30 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-5 w-5 text-${info.color}-600 dark:text-${info.color}-400`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                            {info.titulo}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {info.descricao}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Informações de Segurança */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Pagamento 100% seguro
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Processado pelo Mercado Pago com criptografia de ponta a ponta
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão de Confirmação */}
              <Button 
                onClick={handleDoacao}
                className="w-full h-12 text-base font-semibold"
                disabled={!valor || !metodoPagamento || processando}
              >
                {processando ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Confirmar Doação'
                )}
              </Button>

              {/* Texto Legal */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                Ao confirmar, você será redirecionado para o Mercado Pago para concluir o pagamento de forma segura.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

