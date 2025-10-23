import { useState, useEffect } from 'react'

/**
 * Hook para detectar status de conexão online/offline
 * Monitora mudanças na conexão e tenta reconectar automaticamente
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    // Handlers para eventos de conexão
    const handleOnline = () => {
      console.log('✅ Conexão restaurada!')
      setIsOnline(true)
      
      // Se estava offline antes, marcar que reconectou
      if (wasOffline) {
        setWasOffline(false)
        // Disparar evento customizado para componentes reagirem
        window.dispatchEvent(new CustomEvent('connection-restored'))
      }
    }

    const handleOffline = () => {
      console.log('❌ Conexão perdida - modo offline ativado')
      setIsOnline(false)
      setWasOffline(true)
      // Disparar evento customizado
      window.dispatchEvent(new CustomEvent('connection-lost'))
    }

    // Adicionar listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Verificar conexão periodicamente (a cada 30 segundos)
    const checkConnection = async () => {
      try {
        // Tentar fazer uma requisição simples
        const response = await fetch('https://www.google.com/favicon.ico', {
          mode: 'no-cors',
          cache: 'no-cache'
        })
        
        if (!isOnline) {
          handleOnline()
        }
      } catch (error) {
        if (isOnline) {
          handleOffline()
        }
      }
    }

    const intervalId = setInterval(checkConnection, 30000)

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(intervalId)
    }
  }, [isOnline, wasOffline])

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline
  }
}

