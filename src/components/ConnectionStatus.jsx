import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, CheckCircle } from 'lucide-react'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { useState, useEffect } from 'react'

/**
 * Componente que mostra o status da conexão
 * Aparece quando fica offline ou quando reconecta
 */
export function ConnectionStatus() {
  const { isOnline, wasOffline } = useOnlineStatus()
  const [showReconnected, setShowReconnected] = useState(false)
  const [showOffline, setShowOffline] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      // Mostrar aviso de offline
      setShowOffline(true)
    } else {
      setShowOffline(false)
      
      // Se reconectou, mostrar mensagem de sucesso por 3 segundos
      if (wasOffline) {
        setShowReconnected(true)
        setTimeout(() => setShowReconnected(false), 3000)
      }
    }
  }, [isOnline, wasOffline])

  return (
    <AnimatePresence>
      {/* Mensagem de Offline */}
      {showOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <WifiOff className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="font-semibold">Sem conexão</p>
              <p className="text-sm">Modo offline ativado</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mensagem de Reconectado */}
      {showReconnected && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: 3, duration: 0.5 }}
            >
              <CheckCircle className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="font-semibold">Conexão restaurada!</p>
              <p className="text-sm">Você está online novamente</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Indicador pequeno de status (para usar em outras páginas)
 */
export function ConnectionIndicator() {
  const { isOnline } = useOnlineStatus()

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2"
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="text-xs text-green-600 dark:text-green-400">Online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-orange-500" />
          <span className="text-xs text-orange-600 dark:text-orange-400">Offline</span>
        </>
      )}
    </motion.div>
  )
}

