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
  Rewind,
  Download,
  Smartphone
} from 'lucide-react'
import { Slider } from '@/components/ui/slider.jsx'
import { toast } from 'react-hot-toast'

/**
 * Componente de Text-to-Speech com suporte a reprodução em segundo plano
 * Usa Web Speech API para primeiro plano e Audio Element + Media Session API para segundo plano
 */
export function TextToSpeechBackground({ text, title = "Leitura Bíblica", autoPlay = false, compact = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [backgroundMode, setBackgroundMode] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  
  const utteranceRef = useRef(null)
  const audioRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  // Carregar vozes disponíveis
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      const portugueseVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('pt')
      )
      
      const sortedVoices = portugueseVoices.sort((a, b) => {
        if (a.name.includes('Google') && !b.name.includes('Google')) return -1
        if (!a.name.includes('Google') && b.name.includes('Google')) return 1
        if (a.name.includes('Microsoft') && !b.name.includes('Microsoft')) return -1
        if (!a.name.includes('Microsoft') && b.name.includes('Microsoft')) return 1
        if (a.lang === 'pt-BR' && b.lang !== 'pt-BR') return -1
        if (a.lang !== 'pt-BR' && b.lang === 'pt-BR') return 1
        return 0
      })
      
      setVoices(sortedVoices.length > 0 ? sortedVoices : availableVoices)
      
      const defaultVoice = sortedVoices.find(voice => 
        voice.lang === 'pt-BR' && (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      ) || sortedVoices.find(voice => voice.lang === 'pt-BR') || sortedVoices[0] || availableVoices[0]
      
      setSelectedVoice(defaultVoice)
    }

    loadVoices()
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  // Configurar Media Session API
  const setupMediaSession = () => {
    if (!('mediaSession' in navigator)) return

    navigator.mediaSession.metadata = new MediaMetadata({
      title: title,
      artist: 'Adventista Play',
      album: 'Leitura Bíblica',
      artwork: [
        { src: '/logo-icon.png', sizes: '96x96', type: 'image/png' },
        { src: '/logo-icon.png', sizes: '128x128', type: 'image/png' },
        { src: '/logo-icon.png', sizes: '192x192', type: 'image/png' },
        { src: '/logo-icon.png', sizes: '256x256', type: 'image/png' },
        { src: '/logo-icon.png', sizes: '384x384', type: 'image/png' },
        { src: '/logo-icon.png', sizes: '512x512', type: 'image/png' },
      ]
    })

    navigator.mediaSession.setActionHandler('play', handlePlay)
    navigator.mediaSession.setActionHandler('pause', handlePause)
    navigator.mediaSession.setActionHandler('stop', handleStop)
    
    // Atualizar estado de reprodução
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
  }

  // Atualizar posição de reprodução
  useEffect(() => {
    if (!backgroundMode || !audioRef.current || !isPlaying) return

    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setProgress(audioRef.current.currentTime)
        
        if ('mediaSession' in navigator && audioRef.current.duration > 0) {
          navigator.mediaSession.setPositionState({
            duration: audioRef.current.duration,
            playbackRate: audioRef.current.playbackRate,
            position: audioRef.current.currentTime
          })
        }
      }
    }, 300)

    return () => clearInterval(interval)
  }, [backgroundMode, isPlaying])

  // Gerar áudio a partir do texto usando Web Speech API
  const generateAudioFromText = async () => {
    if (!text || !selectedVoice) {
      toast.error('Texto ou voz não disponível')
      return
    }

    setIsGeneratingAudio(true)
    toast.loading('Preparando áudio para segundo plano...', { id: 'generating' })

    try {
      // Criar contexto de áudio
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const destination = audioContext.createMediaStreamDestination()
      
      // Configurar MediaRecorder
      const mediaRecorder = new MediaRecorder(destination.stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      chunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setBackgroundMode(true)
        setIsGeneratingAudio(false)
        toast.success('Áudio pronto! Agora você pode minimizar o app.', { id: 'generating' })
        
        // Reproduzir automaticamente
        setTimeout(() => {
          playAudioBlob(blob)
        }, 500)
      }

      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder

      // Criar utterance e conectar ao contexto de áudio
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = selectedVoice
      utterance.rate = rate
      utterance.volume = volume
      utterance.lang = 'pt-BR'

      utterance.onend = () => {
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()
          }
        }, 500)
      }

      utterance.onerror = (event) => {
        console.error('Erro ao gerar áudio:', event)
        toast.error('Erro ao gerar áudio', { id: 'generating' })
        setIsGeneratingAudio(false)
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop()
        }
      }

      window.speechSynthesis.speak(utterance)

    } catch (error) {
      console.error('Erro ao preparar áudio:', error)
      toast.error('Erro ao preparar áudio para segundo plano', { id: 'generating' })
      setIsGeneratingAudio(false)
    }
  }

  // Reproduzir blob de áudio
  const playAudioBlob = (blob) => {
    if (!blob) return

    const audioUrl = URL.createObjectURL(blob)
    
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    audioRef.current.src = audioUrl
    audioRef.current.volume = volume
    audioRef.current.playbackRate = rate

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration)
    }

    audioRef.current.onplay = () => {
      setIsPlaying(true)
      setIsPaused(false)
      setupMediaSession()
    }

    audioRef.current.onpause = () => {
      setIsPlaying(false)
      setIsPaused(true)
    }

    audioRef.current.onended = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(0)
    }

    audioRef.current.onerror = (event) => {
      console.error('Erro na reprodução:', event)
      toast.error('Erro ao reproduzir áudio')
      setIsPlaying(false)
    }

    audioRef.current.play().catch(error => {
      console.error('Erro ao iniciar reprodução:', error)
      toast.error('Erro ao iniciar reprodução')
    })
  }

  const handlePlay = () => {
    if (!text || !selectedVoice) return

    // Modo segundo plano
    if (backgroundMode && audioBlob) {
      if (isPaused && audioRef.current) {
        audioRef.current.play()
      } else {
        playAudioBlob(audioBlob)
      }
      return
    }

    // Modo primeiro plano (Web Speech API)
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = selectedVoice
    utterance.rate = rate
    utterance.volume = volume
    utterance.lang = 'pt-BR'

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utterance.onerror = (event) => {
      console.error('Erro no Text-to-Speech:', event)
      setIsPlaying(false)
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const handlePause = () => {
    if (backgroundMode && audioRef.current) {
      audioRef.current.pause()
    } else {
      window.speechSynthesis.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (backgroundMode && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setProgress(0)
    } else {
      window.speechSynthesis.cancel()
    }
    setIsPlaying(false)
    setIsPaused(false)
  }

  const handleRateChange = (newRate) => {
    setRate(newRate[0])
    
    if (backgroundMode && audioRef.current) {
      audioRef.current.playbackRate = newRate[0]
    } else if (isPlaying || isPaused) {
      handleStop()
      setTimeout(() => handlePlay(), 100)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0])
    
    if (backgroundMode && audioRef.current) {
      audioRef.current.volume = newVolume[0]
    } else if (isPlaying || isPaused) {
      handleStop()
      setTimeout(() => handlePlay(), 100)
    }
  }

  const handleSeek = (newPosition) => {
    if (backgroundMode && audioRef.current) {
      audioRef.current.currentTime = newPosition[0]
      setProgress(newPosition[0])
    }
  }

  const downloadAudio = () => {
    if (!audioBlob) return

    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.webm`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Áudio baixado com sucesso!')
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Versão compacta
  if (compact) {
    return (
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={isPlaying ? handlePause : handlePlay}
            className="gap-2"
          >
            {isPlaying ? (
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

        {!backgroundMode && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={generateAudioFromText}
              disabled={isGeneratingAudio}
              className="gap-2"
              title="Preparar para ouvir em segundo plano"
            >
              <Smartphone className="h-4 w-4" />
              {isGeneratingAudio ? 'Preparando...' : 'Segundo Plano'}
            </Button>
          </motion.div>
        )}
      </div>
    )
  }

  // Versão completa
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border space-y-4"
    >
      {/* Título */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Ouvir Texto</h3>
        </div>
        {backgroundMode && (
          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
            <Smartphone className="h-3 w-3" />
            Modo Segundo Plano
          </span>
        )}
      </div>

      {/* Alerta sobre modo segundo plano */}
      {!backgroundMode && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm">
          <p className="text-blue-700 dark:text-blue-300">
            📱 <strong>Quer ouvir com a tela bloqueada?</strong> Clique em "Preparar para Segundo Plano" para gerar um áudio que continuará tocando mesmo quando você minimizar o app ou bloquear a tela.
          </p>
        </div>
      )}

      {/* Controles principais */}
      <div className="flex items-center gap-2 flex-wrap">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="lg"
            onClick={handlePlay}
            disabled={!text || !selectedVoice || isGeneratingAudio}
            className="gap-2"
          >
            <Play className="h-5 w-5" />
            {isPaused ? 'Continuar' : 'Reproduzir'}
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
                size="lg"
                onClick={handlePause}
                className="gap-2"
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
                size="lg"
                onClick={handleStop}
                className="gap-2"
              >
                <Square className="h-5 w-5" />
                Parar
              </Button>
            </motion.div>
          </>
        )}

        {!backgroundMode && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={generateAudioFromText}
              disabled={isGeneratingAudio || !text}
              className="gap-2"
            >
              <Smartphone className="h-5 w-5" />
              {isGeneratingAudio ? 'Preparando...' : 'Preparar para Segundo Plano'}
            </Button>
          </motion.div>
        )}

        {backgroundMode && audioBlob && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={downloadAudio}
              className="gap-2"
            >
              <Download className="h-5 w-5" />
              Baixar Áudio
            </Button>
          </motion.div>
        )}
      </div>

      {/* Barra de progresso (apenas no modo segundo plano) */}
      {backgroundMode && duration > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            min={0}
            max={duration}
            step={1}
            className="w-full"
          />
        </div>
      )}

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

      {/* Seletor de voz */}
      {voices.length > 1 && !backgroundMode && (
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

      {/* Dicas */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>💡 <strong>Dica:</strong> Use fones de ouvido para uma melhor experiência!</p>
        {backgroundMode && (
          <p>📱 <strong>Segundo Plano Ativo:</strong> Agora você pode minimizar o app ou bloquear a tela. O áudio continuará tocando e você poderá controlá-lo pela tela de bloqueio!</p>
        )}
      </div>
    </motion.div>
  )
}

