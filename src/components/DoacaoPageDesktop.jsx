import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, QrCode, FileText, Heart, Shield, CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { criarPreferenciaPagamento, validarDadosDoacao, formatarValor } from '../services/mercadoPagoService'

export function DoacaoPageDesktop() {
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

  const beneficios = [
    'Manutenção e hospedagem do aplicativo',
    'Desenvolvimento de novos recursos',
    'Criação de conteúdo espiritual',
    'Alcançar mais pessoas com a mensagem',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Apoie Nossa Missão
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            O Adventista Play existe para edificar vidas e levar a Palavra de Deus a mais pessoas. 
            Sua doação nos ajuda a continuar este ministério digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Informações */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Versículo */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-relaxed">
                    "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, 
                    pois Deus ama quem dá com alegria."
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    2 Coríntios 9:7
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefícios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Sua doação ajuda a:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {beneficios.map((beneficio, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{beneficio}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200 mb-1">
                      Pagamento 100% Seguro
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Processado pelo Mercado Pago com criptografia de ponta a ponta
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna Direita - Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Faça sua Doação</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para contribuir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mensagem de Erro */}
                {erro && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                  >
                    <p className="text-sm text-red-800 dark:text-red-200">{erro}</p>
                  </motion.div>
                )}

                {/* Campos Opcionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-primary focus:border-transparent
                               placeholder:text-gray-400 dark:placeholder:text-gray-500
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-primary focus:border-transparent
                               placeholder:text-gray-400 dark:placeholder:text-gray-500
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all"
                    />
                  </div>
                </div>

                {/* Campo de Valor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Valor da doação
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      Mínimo: R$ 5,00
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500 dark:text-gray-400">
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
                      className="w-full pl-12 pr-4 py-4 text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-primary focus:border-primary
                               placeholder:text-gray-400 dark:placeholder:text-gray-500
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all"
                    />
                  </div>
                  {valor && parseFloat(valor) >= 5 && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Você está doando: <span className="font-semibold text-primary">{formatarValor(parseFloat(valor))}</span>
                    </p>
                  )}
                </div>

                {/* Métodos de Pagamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Escolha como doar
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(metodosInfo).map(([key, info]) => {
                      const Icon = info.icon
                      const isSelected = metodoPagamento === key
                      
                      return (
                        <motion.button
                          key={key}
                          whileHover={{ scale: processando ? 1 : 1.02 }}
                          whileTap={{ scale: processando ? 1 : 0.98 }}
                          onClick={() => !processando && setMetodoPagamento(key)}
                          disabled={processando}
                          className={`relative p-6 rounded-xl border-2 transition-all text-left
                            ${isSelected 
                              ? 'border-primary bg-primary/5 shadow-lg' 
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50'
                            }
                            ${processando ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                        >
                          <Icon className={`h-8 w-8 mb-3 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
                          <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            {info.titulo}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {info.descricao}
                          </p>
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Botão de Confirmação */}
                <Button 
                  onClick={handleDoacao}
                  className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl"
                  disabled={!valor || !metodoPagamento || processando}
                  size="lg"
                >
                  {processando ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-5 w-5" />
                      Confirmar Doação
                    </>
                  )}
                </Button>

                {/* Texto Legal */}
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Ao confirmar, você será redirecionado para o Mercado Pago para concluir o pagamento de forma segura.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

