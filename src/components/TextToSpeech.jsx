import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX,
  FastForward,
  Rewind
} from 'lucide-react'
import { Slider } from '@/components/ui/slider.jsx'

/**
 * Componente de Text-to-Speech usando Web Speech API nativa do navegador
 * Totalmente gratuito e funciona offline!
 */
export function TextToSpeech({ text, autoPlay = false, compact = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rate, setRate] = useState(1) // Velocidade: 0.5 a 2
  const [volume, setVolume] = useState(1) // Volume: 0 a 1
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const utteranceRef = useRef(null)
  const voicesLoadedRef = useRef(false)

  // Carregar vozes disponíveis (compatível com Chrome, Edge, Safari)
  useEffect(() => {
    const loadVoices = () => {
      if (voicesLoadedRef.current) return
      
      const availableVoices = window.speechSynthesis.getVoices()
      
      console.log(`🔊 Vozes disponíveis: ${availableVoices.length}`)
      
      // Se não há vozes ainda, aguardar
      if (availableVoices.length === 0) return
      
      // Filtrar e priorizar vozes em português brasileiro
      const portugueseVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('pt')
      )
      
      console.log(`🇧🇷 Vozes em português: ${portugueseVoices.length}`)
      
      // Ordenar vozes por qualidade e navegador
      const sortedVoices = portugueseVoices.sort((a, b) => {
        // CHROME/EDGE: Priorizar vozes do Google (mais naturais)
        if (a.name.includes('Google') && !b.name.includes('Google')) return -1
        if (!a.name.includes('Google') && b.name.includes('Google')) return 1
        
        // EDGE: Priorizar vozes da Microsoft (Edge Natural Voices)
        if (a.name.includes('Microsoft') && !b.name.includes('Microsoft')) return -1
        if (!a.name.includes('Microsoft') && b.name.includes('Microsoft')) return 1
        
        // SAFARI: Priorizar vozes da Apple (Luciana, Joana)
        if ((a.name.includes('Luciana') || a.name.includes('Joana')) && 
            !(b.name.includes('Luciana') || b.name.includes('Joana'))) return -1
        if (!(a.name.includes('Luciana') || a.name.includes('Joana')) && 
            (b.name.includes('Luciana') || b.name.includes('Joana'))) return 1
        
        // Priorizar pt-BR sobre pt-PT
        if (a.lang === 'pt-BR' && b.lang !== 'pt-BR') return -1
        if (a.lang !== 'pt-BR' && b.lang === 'pt-BR') return 1
        
        // Priorizar vozes locais (local = true)
        if (a.localService && !b.localService) return -1
        if (!a.localService && b.localService) return 1
        
        return 0
      })
      
      setVoices(sortedVoices.length > 0 ? sortedVoices : availableVoices)
      
      // Selecionar a melhor voz disponível para cada navegador
      let defaultVoice = null
      
      // Tentar vozes premium primeiro (Google, Microsoft, Apple)
      defaultVoice = sortedVoices.find(voice => 
        voice.lang === 'pt-BR' && (
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.name.includes('Luciana') ||
          voice.name.includes('Joana')
        )
      )
      
      // Fallback: qualquer voz pt-BR
      if (!defaultVoice) {
        defaultVoice = sortedVoices.find(voice => voice.lang === 'pt-BR')
      }
      
      // Fallback: qualquer voz em português
      if (!defaultVoice) {
        defaultVoice = sortedVoices[0]
      }
      
      // Fallback final: primeira voz disponível
      if (!defaultVoice) {
        defaultVoice = availableVoices[0]
      }
      
      console.log(`✅ Voz selecionada: ${defaultVoice?.name || 'Nenhuma'} (${defaultVoice?.lang || 'N/A'})`)
      
      setSelectedVoice(defaultVoice)
      voicesLoadedRef.current = true
      setIsLoading(false)
    }

    setIsLoading(true)
    
    // CHROME/EDGE: Vozes carregam imediatamente
    loadVoices()
    
    // SAFARI: Vozes demoram para carregar, precisa do evento
    // Tentar múltiplas vezes para garantir compatibilidade
    const retryIntervals = [100, 500, 1000, 2000]
    const timers = retryIntervals.map(delay => 
      setTimeout(() => {
        if (!voicesLoadedRef.current) {
          console.log(`🔄 Tentando carregar vozes novamente (${delay}ms)...`)
          loadVoices()
        }
      }, delay)
    )
    
    // Fallback final: se após 3 segundos não carregou, usar voz padrão do sistema
    const fallbackTimer = setTimeout(() => {
      if (!voicesLoadedRef.current) {
        console.log('⚠️ Usando voz padrão do sistema (fallback)')
        const systemVoices = window.speechSynthesis.getVoices()
        if (systemVoices.length > 0) {
          setVoices(systemVoices)
          setSelectedVoice(systemVoices[0])
        }
        voicesLoadedRef.current = true
        setIsLoading(false)
      }
    }, 3000)
    
    // Evento para quando as vozes mudarem (importante para Safari)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer))
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Auto play se solicitado
  useEffect(() => {
    if (autoPlay && text && selectedVoice) {
      handlePlay()
    }
    
    return () => {
      // Limpar ao desmontar
      window.speechSynthesis.cancel()
    }
  }, [autoPlay, text, selectedVoice])

  const handlePlay = () => {
    if (!text) {
      alert('Nenhum texto disponível para reproduzir.')
      return
    }
    
    // Verificar se o navegador suporta Web Speech API
    if (!window.speechSynthesis) {
      alert('Seu navegador não suporta reprodução de áudio. Tente usar Chrome, Edge ou Safari.')
      return
    }
    
    setIsLoading(true)

    // Se estava pausado, retomar
    if (isPaused) {
      try {
        window.speechSynthesis.resume()
        setIsPaused(false)
        setIsPlaying(true)
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao retomar:', error)
        alert('Erro ao retomar áudio. Tente reproduzir novamente.')
        setIsLoading(false)
      }
      return
    }

    // Cancelar qualquer fala anterior
    window.speechSynthesis.cancel()

    // Limitar tamanho do texto para evitar travamentos
    // Web Speech API tem limite de ~32KB em alguns navegadores
    const MAX_LENGTH = 5000 // Aproximadamente 1000 palavras
    let textToSpeak = text
    
    if (text.length > MAX_LENGTH) {
      // Pegar apenas os primeiros parágrafos
      textToSpeak = text.substring(0, MAX_LENGTH)
      // Tentar cortar em uma frase completa
      const lastPeriod = textToSpeak.lastIndexOf('.')
      if (lastPeriod > 0) {
        textToSpeak = textToSpeak.substring(0, lastPeriod + 1)
      }
      textToSpeak += ' ... (texto muito longo, reproduzindo apenas o início)'
    }

    // Criar nova utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.voice = selectedVoice
    utterance.rate = rate
    utterance.volume = volume
    utterance.lang = 'pt-BR'

    // Eventos
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
      setIsLoading(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setIsLoading(false)
    }

    utterance.onerror = (event) => {
      console.error('Erro no Text-to-Speech:', event)
      setIsPlaying(false)
      setIsPaused(false)
      setIsLoading(false)
      
      let errorMessage = 'Erro ao reproduzir áudio.'
      
      switch(event.error) {
        case 'canceled':
          errorMessage = 'Reprodução cancelada.'
          break
        case 'interrupted':
          errorMessage = 'Reprodução interrompida. Tente novamente.'
          break
        case 'audio-busy':
          errorMessage = 'Áudio ocupado. Aguarde um momento e tente novamente.'
          break
        case 'audio-hardware':
          errorMessage = 'Problema com o hardware de áudio. Verifique suas configurações.'
          break
        case 'network':
          errorMessage = 'Erro de rede. Verifique sua conexão.'
          break
        case 'synthesis-unavailable':
          errorMessage = 'Síntese de voz não disponível. Tente recarregar a página.'
          break
        case 'synthesis-failed':
          errorMessage = 'Falha na síntese de voz. Tente um texto menor.'
          break
        case 'language-unavailable':
          errorMessage = 'Idioma não disponível. Tente selecionar outra voz.'
          break
        case 'voice-unavailable':
          errorMessage = 'Voz não disponível. Tente selecionar outra voz.'
          break
        case 'text-too-long':
          errorMessage = 'Texto muito longo. Tente um texto menor.'
          break
        case 'invalid-argument':
          errorMessage = 'Argumento inválido. Tente novamente.'
          break
        case 'not-allowed':
          errorMessage = 'Reprodução não permitida. Tente clicar no botão novamente.'
          break
        default:
          errorMessage = `Erro ao reproduzir áudio: ${event.error || 'desconhecido'}. Tente novamente.`
      }
      
      alert(errorMessage)
    }

    utteranceRef.current = utterance
    
    // Iniciar reprodução imediatamente
    try {
      window.speechSynthesis.speak(utterance)
      
      // Timeout de segurança: se não começar em 3 segundos, mostrar erro
      setTimeout(() => {
        if (isLoading) {
          setIsLoading(false)
          setIsPlaying(false)
          alert('Tempo esgotado. Tente novamente ou use um texto menor.')
        }
      }, 3000)
    } catch (error) {
      console.error('Erro ao iniciar Text-to-Speech:', error)
      setIsLoading(false)
      alert('Erro ao iniciar reprodução. Seu navegador pode não suportar esta funcionalidade.')
    }
  }

  const handlePause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsPlaying(false)
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  const handleRateChange = (newRate) => {
    setRate(newRate[0])
    
    // Se estiver tocando, reiniciar com nova velocidade
    if (isPlaying || isPaused) {
      handleStop()
      setTimeout(() => handlePlay(), 100)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0])
    
    // Se estiver tocando, reiniciar com novo volume
    if (isPlaying || isPaused) {
      handleStop()
      setTimeout(() => handlePlay(), 100)
    }
  }

  // Versão compacta (apenas botão play)
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
          <Button
            variant="outline"
            size="sm"
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Volume2 className="h-4 w-4" />
                </motion.div>
                Carregando...
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pausar
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Ouvir
              </>
            )}
          </Button>
      </motion.div>
    )
  }

  // Versão completa com controles
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border space-y-4"
    >
      {/* Título */}
      <div className="flex items-center gap-2">
        <Volume2 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Ouvir Texto</h3>
      </div>

      {/* Controles principais */}
      <div className="flex flex-wrap items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="default"
            onClick={handlePlay}
            disabled={!text || isLoading}
            className="gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Volume2 className="h-5 w-5" />
                </motion.div>
                Carregando...
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                {isPaused ? 'Continuar' : 'Reproduzir'}
              </>
            )}
          </Button>
        </motion.div>

        {(isPlaying || isPaused) && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="default"
                onClick={handlePause}
                className="gap-2 text-sm"
              >
                <Pause className="h-5 w-5" />
                Pausar
              </Button>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="default"
                onClick={handleStop}
                className="gap-2 text-sm"
              >
                <Square className="h-5 w-5" />
                Parar
              </Button>
            </motion.div>
          </>
        )}
      </div>

      {/* Controle de velocidade */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <FastForward className="h-4 w-4" />
            Velocidade: {rate.toFixed(1)}x
          </label>
        </div>
        <Slider
          value={[rate]}
          onValueChange={handleRateChange}
          min={0.5}
          max={2}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0.5x (Lento)</span>
          <span>1.0x (Normal)</span>
          <span>2.0x (Rápido)</span>
        </div>
      </div>

      {/* Controle de volume */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            Volume: {Math.round(volume * 100)}%
          </label>
        </div>
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Seletor de voz (opcional) */}
      {voices.length > 1 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Voz:</label>
          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value)
              setSelectedVoice(voice)
            }}
            className="w-full p-2 rounded-md border bg-background"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Status */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-primary"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Volume2 className="h-4 w-4" />
          </motion.div>
          <span>Reproduzindo...</span>
        </motion.div>
      )}

      {/* Dica */}
      <p className="text-xs text-muted-foreground">
        💡 Dica: Use fones de ouvido para uma melhor experiência!
      </p>
    </motion.div>
  )
}

/**
 * Hook personalizado para usar Text-to-Speech
 */
export function useTextToSpeech() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const speak = (text, options = {}) => {
    const {
      rate = 1,
      volume = 1,
      lang = 'pt-BR',
      onEnd = () => {},
      onError = () => {}
    } = options

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.volume = volume
    utterance.lang = lang

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      onEnd()
    }
    utterance.onerror = (event) => {
      setIsPlaying(false)
      setIsPaused(false)
      onError(event)
    }

    window.speechSynthesis.speak(utterance)
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsPlaying(false)
  }

  const resume = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
    setIsPlaying(true)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  return {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused
  }
}