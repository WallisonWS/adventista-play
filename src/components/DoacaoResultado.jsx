import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, ArrowLeft, Home } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

export function DoacaoSucesso() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')
  const externalReference = searchParams.get('external_reference')

  useEffect(() => {
    // Aqui você pode registrar a doação no seu sistema
    console.log('Doação aprovada:', { paymentId, status, externalReference })
  }, [paymentId, status, externalReference])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Doação Realizada com Sucesso!
            </h1>

            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
              Muito obrigado por apoiar nossa missão! Sua doação nos ajuda a continuar 
              levando a Palavra de Deus a mais pessoas.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 dark:text-green-200">
                Você receberá um comprovante por email em breve.
              </p>
              {paymentId && (
                <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                  ID do Pagamento: {paymentId}
                </p>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                "Deus ama quem dá com alegria."
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                - 2 Coríntios 9:7
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full h-12"
              >
                <Home className="mr-2 h-5 w-5" />
                Voltar para o Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export function DoacaoFalha() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Pagamento Não Aprovado
            </h1>

            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
              Infelizmente não foi possível processar seu pagamento. 
              Isso pode acontecer por diversos motivos.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                <strong>Possíveis causas:</strong>
              </p>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 text-left space-y-1">
                <li>• Saldo insuficiente</li>
                <li>• Dados do cartão incorretos</li>
                <li>• Pagamento recusado pelo banco</li>
                <li>• Limite de crédito excedido</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/doacao')}
                className="w-full h-12"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Tentar Novamente
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full h-12"
              >
                <Home className="mr-2 h-5 w-5" />
                Voltar para o Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export function DoacaoPendente() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Pagamento Pendente
            </h1>

            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
              Seu pagamento está sendo processado. Você receberá uma confirmação 
              assim que for aprovado.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                <strong>Próximos passos:</strong>
              </p>
              <ul className="text-xs text-blue-700 dark:text-blue-300 text-left space-y-1">
                <li>• Para PIX: Escaneie o QR Code ou copie o código</li>
                <li>• Para Boleto: Pague até a data de vencimento</li>
                <li>• Você receberá um email com as instruções</li>
              </ul>
              {paymentId && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
                  ID do Pagamento: {paymentId}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full h-12"
              >
                <Home className="mr-2 h-5 w-5" />
                Voltar para o Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

