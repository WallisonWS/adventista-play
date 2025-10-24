import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, CheckCircle, Circle, ChevronDown, ChevronUp, Play } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Button } from './ui/button'
import { estudosCompletos } from '../data/estudos-completos'
import { YouTubePlayer, VideoCard } from './YouTubePlayer'

export function DetalheCursoPage() {
  const { categoria, cursoId } = useParams()
  const navigate = useNavigate()
  const [licaoExpandida, setLicaoExpandida] = useState(null)
  const [videoAtual, setVideoAtual] = useState(null)
  
  // Mapear categoria
  const categoriaMap = {
    'biblicos': 'escolaSabatina',
    'financas': 'financas',
    'relacionamentos': 'relacionamentos',
    'familia': 'familia',
    'vida-crista': 'vidaCrista'
  }
  
  const chaveCat = categoriaMap[categoria] || 'escolaSabatina'
  const cursos = estudosCompletos[chaveCat] || []
  const curso = cursos.find(c => c.id === cursoId)
  
  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-bold mb-2">Curso não encontrado</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              O curso que você está procurando não existe.
            </p>
            <Button onClick={() => navigate('/estudos')}>
              Voltar para Estudos
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  const toggleLicao = (numero) => {
    setLicaoExpandida(licaoExpandida === numero ? null : numero)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/estudos/${categoria}`)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {curso.titulo}
              </h1>
              {curso.trimestre && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {curso.trimestre}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Descrição do Curso */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sobre o Curso</CardTitle>
            <CardDescription>{curso.descricao}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{curso.licoes?.length || 0} lições</span>
              </div>
              {curso.categoria && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  {curso.categoria}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Videoaulas */}
        {curso.videoaulas && curso.videoaulas.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Videoaulas
            </h2>
            <div className="space-y-3">
              {curso.videoaulas.map((video, index) => (
                <motion.div
                  key={video.numero}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <VideoCard
                    video={video}
                    onClick={() => setVideoAtual(video)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Lista de Lições */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Lições
          </h2>
          
          {curso.licoes && curso.licoes.length > 0 ? (
            curso.licoes.map((licao, index) => (
              <motion.div
                key={licao.numero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <div
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => toggleLicao(licao.numero)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base mb-1">
                              Lição {licao.numero}: {licao.titulo}
                            </CardTitle>
                            {licao.texto && (
                              <CardDescription className="text-xs">
                                {licao.texto}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        {licaoExpandida === licao.numero ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                  </div>
                  
                  <AnimatePresence>
                    {licaoExpandida === licao.numero && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent className="pt-0 pb-4">
                          <div className="pl-8 space-y-3">
                            {licao.conteudo && (
                              <div>
                                <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
                                  Conteúdo:
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {licao.conteudo}
                                </p>
                              </div>
                            )}
                            
                            {licao.reflexao && (
                              <div>
                                <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
                                  Reflexão:
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                  {licao.reflexao}
                                </p>
                              </div>
                            )}
                            
                            {licao.aplicacao && (
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-300">
                                  Aplicação Prática:
                                </h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                  {licao.aplicacao}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Nenhuma lição disponível ainda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Player de Vídeo */}
      {videoAtual && (
        <YouTubePlayer
          videoId={videoAtual.videoId}
          titulo={videoAtual.titulo}
          onClose={() => setVideoAtual(null)}
        />
      )}
    </div>
  )
}

