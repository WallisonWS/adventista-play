import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, QrCode, FileText, ArrowLeft } from 'lucide-react'
import { Card, CardHeader, CardContent } from './ui/card'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

export function DoacaoPage() {
  const navigate = useNavigate()
  const [valor, setValor] = useState('')
  const [metodoPagamento, setMetodoPagamento] = useState(null)

  const handleDoacao = () => {
    if (!valor || parseFloat(valor) < 5) {
      alert('O valor mínimo da doação é R$ 5,00')
      return
    }
    if (!metodoPagamento) {
      alert('Por favor, selecione um método de pagamento')
      return
    }
    
    // Aqui você implementaria a integração com gateway de pagamento
    alert(`Doação de R$ ${valor} via ${metodoPagamento} em processamento!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="flex items-center px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 text-gray-700 dark:text-gray-300"
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
                O Sobre Ele existe para edificar vidas, levar a Palavra de Deus e fortalecer a 
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

              {/* Campo de Valor */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <label className="text-lg font-bold text-gray-900 dark:text-white">
                    Digite o valor da doação:
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    Min: R$ 5,00
                  </span>
                </div>
                <input
                  type="number"
                  min="5"
                  step="0.01"
                  placeholder="Exemplo: 10.00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary focus:border-transparent
                           placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              {/* Métodos de Pagamento */}
              <div className="space-y-3">
                {/* Cartão de Crédito/Débito */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMetodoPagamento('cartao')}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all
                    ${metodoPagamento === 'cartao' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    Doar com cartão de crédito/débito
                  </span>
                </motion.button>

                {/* PIX */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMetodoPagamento('pix')}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all
                    ${metodoPagamento === 'pix' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    Doar com pix
                  </span>
                </motion.button>

                {/* Boleto */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMetodoPagamento('boleto')}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all
                    ${metodoPagamento === 'boleto' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    Doar com boleto
                  </span>
                </motion.button>
              </div>

              {/* Botão de Confirmação */}
              <Button 
                onClick={handleDoacao}
                className="w-full mt-6 h-12 text-base font-semibold"
                disabled={!valor || !metodoPagamento}
              >
                Confirmar Doação
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

