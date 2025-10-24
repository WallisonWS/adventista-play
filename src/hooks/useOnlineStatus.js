import { useState, useEffect, useRef } from 'react'

/**
 * Hook para detectar status de conexão online/offline
 * Monitora mudanças na conexão e tenta reconectar automaticamente
 * Quando offline, tenta reconectar a cada 5 segundos
 * Quando online, verifica a cada 30 segundos
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [wasOffline, setWasOffline] = useState(false)
  const intervalRef = useRef(null)

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

    // Verificar conexão periodicamente
    const checkConnection = async () => {
      try {
        // Tentar fazer uma requisição simples
        const response = await fetch('https://www.google.com/favicon.ico', {
          mode: 'no-cors',
          cache: 'no-cache'
        })
        
        if (!isOnline) {
          console.log('🔄 Tentativa de reconexão bem-sucedida')
          handleOnline()
        }
      } catch (error) {
        if (isOnline) {
          handleOffline()
        }
      }
    }

    // Configurar intervalo baseado no status
    const setupInterval = () => {
      // Limpar intervalo anterior se existir
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      // Intervalo dinâmico: 5s quando offline, 30s quando online
      const interval = isOnline ? 30000 : 5000
      console.log(`🔄 Verificando conexão a cada ${interval/1000}s (${isOnline ? 'online' : 'offline'})`)
      intervalRef.current = setInterval(checkConnection, interval)
    }

    setupInterval()

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOnline, wasOffline]) // Reconfigurar quando o status mudar

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline
  }
}

