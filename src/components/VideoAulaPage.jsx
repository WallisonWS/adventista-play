import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Clock, Users, Star, ChevronRight, ChevronLeft } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Button } from './ui/button'
import { estudosCompletos } from '../data/estudos-completos'
import { videoAulasCursos, cursosRelacionados } from '../data/video-aulas-cursos'
import '../styles/video-aula.css'

export function VideoAulaPage() {
  const { categoria, cursoId, aulaId } = useParams()
  const navigate = useNavigate()
  const [videoAtual, setVideoAtual] = useState(null)
  const [cursoAtual, setCursoAtual] = useState(null)
  const [videoaulas, setVideoaulas] = useState([])

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

  useEffect(() => {
    if (curso && curso.videoaulas) {
      setVideoaulas(curso.videoaulas)
      const aula = curso.videoaulas[0]
      setVideoAtual(aula)
      setCursoAtual(curso)
    }
  }, [curso])

  const handleSelectAula = (aula) => {
    setVideoAtual(aula)
    setTimeout(() => {
      document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleProximaAula = () => {
    if (!videoAtual) return
    const indexAtual = videoaulas.findIndex(a => a.numero === videoAtual.numero)
    if (indexAtual < videoaulas.length - 1) {
      handleSelectAula(videoaulas[indexAtual + 1])
    }
  }

  const handleAulaAnterior = () => {
    if (!videoAtual) return
    const indexAtual = videoaulas.findIndex(a => a.numero === videoAtual.numero)
    if (indexAtual > 0) {
      handleSelectAula(videoaulas[indexAtual - 1])
    }
  }

  const indexAulaAtual = videoAtual ? videoaulas.findIndex(a => a.numero === videoAtual.numero) : 0
  const temProxima = indexAulaAtual < videoaulas.length - 1
  const temAnterior = indexAulaAtual > 0

  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Play className="h-12 w-12 mx-auto mb-4 text-gray-400" />
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="video-aula-header bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/estudos/${categoria}`)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {cursoAtual?.titulo}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {videoAtual?.titulo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Video Player Section */}
        {videoAtual && (
          <motion.div
            id="video-player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card className="overflow-hidden">
              {/* Player Background */}
              <div className="video-player-container relative w-full bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoAtual.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={videoAtual.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {videoAtual.titulo}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      {videoAtual.duracao && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{videoAtual.duracao}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>12.500 estudantes</span>
                      </div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Nesta aula, exploraremos os conceitos principais e práticos apresentados no vídeo. Aproveite para tomar notas e refletir sobre como aplicar o conteúdo em sua vida.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <Button className="flex-1 sm:flex-none">
                      <Play className="h-4 w-4 mr-2" />
                      Continuar Assistindo
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      Marcar como Concluida
                    </Button>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex gap-2 justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAulaAnterior}
                      disabled={!temAnterior}
                      className="flex-1"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Anterior
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">{indexAulaAtual + 1}</span>
                      <span>/</span>
                      <span>{videoaulas.length}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleProximaAula}
                      disabled={!temProxima}
                      className="flex-1"
                    >
                      Proxima
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Playlist Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Lista de Reprodução ({videoaulas.length} aulas)
          </h3>

          <div className="space-y-3">
            {videoaulas.map((aula, index) => (
              <motion.div
                key={aula.numero}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={`playlist-item ${
                    videoAtual?.numero === aula.numero ? 'active' : ''
                  }`}
                  onClick={() => handleSelectAula(aula)}
                >
                  <div className="playlist-thumbnail">
                    <img
                      src={`https://img.youtube.com/vi/${aula.videoId}/mqdefault.jpg`}
                      alt={aula.titulo}
                      className="w-full h-full object-cover"
                    />
                    <div className="playlist-thumbnail-overlay">
                      <div className="playlist-thumbnail-play">
                        <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 playlist-item-info">
                    <div className="flex items-start justify-between gap-2 flex-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          Aula {aula.numero}
                        </p>
                        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {aula.titulo}
                        </h4>
                        {aula.duracao && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {aula.duracao}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cursos Relacionados */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Outros Cursos Relacionados
          </h3>

          <div className="related-courses-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {cursosRelacionados.map((cursoRel, index) => (
              <motion.div
                key={cursoRel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden h-full">
                  {/* Placeholder Image */}
                  <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-50" />
                  </div>

                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {cursoRel.titulo}
                    </h4>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        <span>{cursoRel.aulas} aulas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{cursoRel.duracao}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{cursoRel.estudantes} estudantes</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4">
                      Acessar Curso
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

