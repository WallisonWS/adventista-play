import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  Circle,
  Award,
  X,
  Share2,
  Bookmark,
  MessageSquare
} from 'lucide-react'
import { updateStudyProgress, incrementDevotionalsRead } from '../services/authService.js'

export function LessonViewer({ estudo, onClose }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [marcadores, setMarcadores] = useState({})
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Carregar marcadores do localStorage
  useEffect(() => {
    const marcadoresSalvos = localStorage.getItem('marcadores-estudos')
    if (marcadoresSalvos) {
      const parsed = JSON.parse(marcadoresSalvos)
      setMarcadores(parsed)
      
      // Verificar se a lição atual está marcada
      const estudoKey = `${estudo.id}-${currentLessonIndex}`
      setIsBookmarked(!!parsed[estudoKey])
      
      // Se há marcador para este estudo, ir para a lição marcada
      const ultimaLicao = parsed[`ultimo-${estudo.id}`]
      if (ultimaLicao !== undefined) {
        setCurrentLessonIndex(ultimaLicao)
      }
    }
  }, [])

  // Atualizar status de marcador quando mudar de lição
  useEffect(() => {
    const estudoKey = `${estudo.id}-${currentLessonIndex}`
    setIsBookmarked(!!marcadores[estudoKey])
  }, [currentLessonIndex, marcadores, estudo.id])

  // Função para adicionar/remover marcador
  const toggleMarcador = () => {
    const estudoKey = `${estudo.id}-${currentLessonIndex}`
    const novosMarcadores = { ...marcadores }
    
    if (isBookmarked) {
      delete novosMarcadores[estudoKey]
    } else {
      novosMarcadores[estudoKey] = {
        estudoTitulo: estudo.titulo,
        licaoNumero: currentLesson.numero,
        licaoTitulo: currentLesson.titulo,
        data: new Date().toISOString()
      }
    }
    
    // Salvar última lição acessada
    novosMarcadores[`ultimo-${estudo.id}`] = currentLessonIndex
    
    setMarcadores(novosMarcadores)
    setIsBookmarked(!isBookmarked)
    localStorage.setItem('marcadores-estudos', JSON.stringify(novosMarcadores))
  }

  if (!estudo || !estudo.licoes) return null

  const currentLesson = estudo.licoes[currentLessonIndex]
  const progress = (completedLessons.size / estudo.licoes.length) * 100
  const isLastLesson = currentLessonIndex === estudo.licoes.length - 1
  const isFirstLesson = currentLessonIndex === 0

  const handleNext = () => {
    if (!isLastLesson) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(currentLessonIndex - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleComplete = () => {
    const newCompleted = new Set(completedLessons)
    newCompleted.add(currentLessonIndex)
    setCompletedLessons(newCompleted)
    
    // Atualizar progresso no sistema
    updateStudyProgress(estudo.id, currentLesson.numero, true)
    incrementDevotionalsRead()
    
    if (!isLastLesson) {
      setTimeout(() => handleNext(), 500)
    }
  }

  const handleLessonClick = (index) => {
    setCurrentLessonIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                  {estudo.titulo}
                </h1>
                <p className="text-sm text-muted-foreground">{estudo.trimestre || estudo.categoria}</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:flex">
              {completedLessons.size} de {estudo.licoes.length} concluídas
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso Geral</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lista de Lições */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Lições</CardTitle>
                <CardDescription>
                  {estudo.licoes.length} lições disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[60vh] overflow-y-auto">
                {estudo.licoes.map((licao, index) => (
                  <motion.button
                    key={licao.numero}
                    onClick={() => handleLessonClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      currentLessonIndex === index
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-muted border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        {completedLessons.has(index) ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs opacity-70 mb-1">
                          Lição {licao.numero}
                        </div>
                        <div className="text-sm font-medium line-clamp-2">
                          {licao.titulo}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content - Lição Atual */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLessonIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge>Lição {currentLesson.numero}</Badge>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={toggleMarcador}
                          title={isBookmarked ? "Remover marcador" : "Adicionar marcador"}
                        >
                          <Bookmark 
                            className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} 
                          />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">
                      {currentLesson.titulo}
                    </CardTitle>
                    {currentLesson.texto && (
                      <CardDescription className="text-base">
                        📖 {currentLesson.texto}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Conteúdo da Lição */}
                    <div className="prose prose-lg max-w-none">
                      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          Conteúdo da Lição
                        </h3>
                        <p className="text-base leading-relaxed text-foreground">
                          {currentLesson.conteudo}
                        </p>
                      </div>

                      {/* Versículo Chave */}
                      {currentLesson.versiculo && (
                        <div className="bg-secondary/20 p-6 rounded-lg mb-6">
                          <h3 className="text-lg font-semibold mb-3">📜 Versículo Chave</h3>
                          <p className="italic text-lg">{currentLesson.versiculo}</p>
                        </div>
                      )}

                      {/* Reflexão */}
                      {currentLesson.reflexao && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3">💭 Reflexão</h3>
                          <p className="text-base leading-relaxed">{currentLesson.reflexao}</p>
                        </div>
                      )}

                      {/* Aplicação Prática */}
                      {currentLesson.aplicacao && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Award className="h-5 w-5 text-green-600" />
                            Aplicação Prática
                          </h3>
                          <p className="text-base leading-relaxed">{currentLesson.aplicacao}</p>
                        </div>
                      )}

                      {/* Perguntas para Discussão */}
                      {currentLesson.perguntas && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Perguntas para Reflexão
                          </h3>
                          <ul className="space-y-2">
                            {currentLesson.perguntas.map((pergunta, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-primary font-bold">{i + 1}.</span>
                                <span>{pergunta}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isFirstLesson}
                        className="flex-1"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Lição Anterior
                      </Button>

                      {!completedLessons.has(currentLessonIndex) && (
                        <Button
                          onClick={handleComplete}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Marcar como Concluída
                        </Button>
                      )}

                      <Button
                        onClick={handleNext}
                        disabled={isLastLesson}
                        className="flex-1"
                      >
                        Próxima Lição
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    {/* Mensagem de Conclusão */}
                    {completedLessons.size === estudo.licoes.length && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-lg text-center"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="inline-block mb-4"
                        >
                          <Award className="h-16 w-16 text-yellow-500" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">
                          🎉 Parabéns!
                        </h3>
                        <p className="text-lg mb-4">
                          Você completou todas as lições de "{estudo.titulo}"!
                        </p>
                        <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
                          <Award className="mr-2 h-5 w-5" />
                          Ver Certificado
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

