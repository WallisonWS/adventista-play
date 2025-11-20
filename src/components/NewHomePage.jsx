import { motion } from 'framer-motion'
import { useReadingProgress } from '../store/useReadingProgress'
import { Link } from 'react-router-dom'
import { Heart, BookText, ChevronRight, Volume2, Music, GraduationCap, Gift } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { BottomNav } from './BottomNav'

// Componente da Nova Página Inicial
// O componente NewHomePage é usado para mobile (ver AppContent em App.jsx)
export function NewHomePage({ user }) {
  const bibliaProgress = useReadingProgress(state => state.getProgress('biblia-ano'))
  const devocionalProgress = useReadingProgress(state => state.getProgress('devocional-diario'))
  // Função para obter saudação baseada no horário
  const getSaudacao = () => {
    const hora = new Date().getHours()
    if (hora < 12) return { texto: 'Bom dia!', emoji: '🌅' }
    if (hora < 18) return { texto: 'Boa tarde!', emoji: '☀️' }
    return { texto: 'Boa noite!', emoji: '🌙' }
  }

  const saudacao = getSaudacao()
  const nomeUsuario = user?.nome || 'Visitante'

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Hero Section com Imagem de Fundo */}
      <section 
        className="relative h-56 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200)',
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm mb-1">{saudacao.texto} {saudacao.emoji}</p>
            <h1 className="text-2xl font-bold mb-2">Olá, {nomeUsuario}</h1>
            <p className="text-sm opacity-90 mb-3">Vamos passar tempo com Deus? 🙏</p>
            
            {/* Botão Criar Conta - Apenas para visitantes */}
            {!user && (
              <Link to="/login">
                <Button className="bg-white text-primary hover:bg-gray-100 font-semibold text-sm px-6 py-2 h-9">
                  Criar Conta
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cards de Progresso */}
      <section className="px-4 -mt-10 relative z-10 mb-6">
        <div className="space-y-3">
          {// Card: Plano de Leitura da Bíblia
          {/* Integração com o progresso real */}
          {bibliaProgress.totalDays > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/planos">
                <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                  <CardHeader className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <BookText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">A Bíblia em um ano</CardTitle>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {bibliaProgress.lastRead} - Continue sua jornada
                        </p>
                        {/* Barra de Progresso */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${bibliaProgress.progressPercent}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{bibliaProgress.progressPercent}% concluído</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          )} */}


          {// Card: Devocional
          {/* Integração com o progresso real */}
          {devocionalProgress.totalDays > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/devocional">
                <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                  <CardHeader className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">Meu devocional</CardTitle>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {devocionalProgress.completedDays} de {devocionalProgress.totalDays} - {devocionalProgress.lastRead}
                        </p>
                        {/* Barra de Progresso */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${devocionalProgress.progressPercent}%` }}></div>
                        </div>
                        <p className="text-xs text-red-500">{devocionalProgress.progressPercent}% concluído</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          )} */}

        </div>
      </section>

      {/* Recursos */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Recursos</h2>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Áudio Bíblia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/biblia">
              <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <Volume2 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white">Áudio Bíblia</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Ouça com voz humanizada
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>

          {/* Louvores */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/hinario">
              <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center mx-auto mb-2">
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white">Louvores</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Hinos e cânticos
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>

          {/* Estudos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/estudos">
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white">Estudos</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Cursos aprofundados
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
          
          {/* Feliz7 Play - Novo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/feliz7play">
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center mx-auto mb-2">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white">Feliz7 Play</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Séries e filmes cristãos
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/estudos">
              <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white">Estudos</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Cursos aprofundados
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
          
          {/* Desbravadores - Novo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/desbravadores">
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardHeader className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center mx-auto mb-2">
                    {/* Ícone Desbravadores - Assumindo que o ícone está em public/icons/desbravadores-icon.png */}
                    <img src="/icons/desbravadores-icon.png" alt="Desbravadores" className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xs font-semibold text-gray-900 dark:text-white">Desbravadores</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Especialidades e classes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Apoie a Missão */}
      <section className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/doacao">
            <Card className="bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-white">Apoie a Missão</CardTitle>
                      <p className="text-xs text-blue-100 mt-0.5">
                        Ajude a levar a Palavra a mais pessoas
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>
      </section>

      {/* Atividade Recente */}
      <section className="px-4 pb-6">
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Atividade Recente</h2>
        
        <div className="space-y-3">
          {/* Devocional lido hoje */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white">Devocional lido hoje</CardTitle>
                <CardDescription className="text-xs mt-1">
                  "Confiança em Tempos Difíceis" - há 2 horas
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Leitura da Bíblia */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white">Leitura da Bíblia</CardTitle>
                <CardDescription className="text-xs mt-1">
                  Salmos 23 - ontem às 19:30
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

