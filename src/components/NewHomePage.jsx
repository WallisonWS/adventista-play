import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Music, BookText, GraduationCap, Globe, Volume2, Gift, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'

// Componente da Nova Página Inicial
export function NewHomePage({ user }) {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section com Imagem de Fundo */}
      <section 
        className="relative h-80 bg-cover bg-center"
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
            <p className="text-lg mb-2">{saudacao.texto} {saudacao.emoji}</p>
            <h1 className="text-4xl font-bold mb-4">Olá, {nomeUsuario}</h1>
            <p className="text-lg opacity-90">Vamos passar tempo com Deus? 🙏</p>
          </motion.div>
        </div>
      </section>

      {/* Cards de Progresso */}
      <section className="px-4 -mt-16 relative z-10">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Card: Plano de Leitura da Bíblia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/planos">
              <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <BookText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-1">A Bíblia em um ano</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lucas 9 a 11 - Continue sua jornada
                      </p>
                      {/* Barra de Progresso */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '81%' }}></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">81% concluído</p>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>

          {/* Card: Devocional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/devocional">
              <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-1">Meu devocional</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        296 de 365 - Reflexão diária
                      </p>
                      {/* Barra de Progresso */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '81%' }}></div>
                        </div>
                        <p className="text-sm text-red-500 mt-1">81% concluído</p>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recursos</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Áudio Bíblia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/biblia">
                <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center mx-auto mb-3">
                      <Volume2 className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-base">Áudio Bíblia</CardTitle>
                    <CardDescription className="text-sm">
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
                <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center mx-auto mb-3">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-base">Louvores</CardTitle>
                    <CardDescription className="text-sm">
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
                <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-base">Estudos</CardTitle>
                    <CardDescription className="text-sm">
                      Cursos aprofundados
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>

            {/* Papéis de parede */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/projetos">
                <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-pink-500 flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-base">Projetos</CardTitle>
                    <CardDescription className="text-sm">
                      Missões globais
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Apoie a Missão */}
      <section className="px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/projetos">
              <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Gift className="h-10 w-10" />
                    <div>
                      <CardTitle className="text-white text-lg">Apoie a Missão</CardTitle>
                      <CardDescription className="text-blue-100">
                        Ajude a levar a Palavra a mais pessoas
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6" />
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Atividade Recente */}
      <section className="px-4 py-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Atividade Recente</h2>
          
          <div className="space-y-4">
            {/* Devocional lido hoje */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-base">Devocional lido hoje</CardTitle>
                  <CardDescription>
                    "Confiança em Tempos Difíceis" - há 2 horas
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Leitura da Bíblia */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-base">Leitura da Bíblia</CardTitle>
                  <CardDescription>
                    Salmos 23 - ontem às 19:30
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

