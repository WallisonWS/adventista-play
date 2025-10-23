import { useState, useEffect } from 'react'

/**
 * Hook para detectar se o usuário está em um dispositivo mobile
 * Detecta através de:
 * 1. User Agent (Android, iOS, Windows Phone)
 * 2. Largura da tela (< 768px)
 * 3. Touch screen capability
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      // Detectar pelo User Agent
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileUA = mobileRegex.test(userAgent)

      // Detectar pela largura da tela
      const isMobileScreen = window.innerWidth < 768

      // Detectar se tem touch screen
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      // É mobile se atender pelo menos 2 critérios
      const mobileCount = [isMobileUA, isMobileScreen, hasTouch].filter(Boolean).length
      setIsMobile(mobileCount >= 2)
    }

    // Verificar no mount
    checkIsMobile()

    // Verificar quando redimensionar a janela
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return isMobile
}

