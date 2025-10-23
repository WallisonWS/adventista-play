import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, BookText, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { BottomNav } from './BottomNav'

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

  // Dados das categorias com imagens
  const categorias = [
    {
      titulo: 'Estudos Bíblicos',
      subtitulo: 'Aprofunde-se na Palavra',
      cursos: '28 cursos',
      link: '/estudos',
      imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Finanças',
      subtitulo: 'Mordomia cristã',
      cursos: '12 cursos',
      link: '/cursos',
      imagem: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Relacionamentos',
      subtitulo: 'Família e comunidade',
      cursos: '15 cursos',
      link: '/cursos',
      imagem: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop'
    },
    {
      titulo: 'Vida Espiritual',
      subtitulo: 'Crescimento cristão',
      cursos: '20 cursos',
      link: '/devocional',
      imagem: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Hero Section com Imagem de Fundo */}
      <section 
        className="relative h-64 bg-cover bg-center"
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
            <p className="text-base mb-2">{saudacao.texto} {saudacao.emoji}</p>
            <h1 className="text-3xl font-bold mb-3">Olá, {nomeUsuario}</h1>
            <p className="text-base opacity-90 mb-3">Vamos passar tempo com Deus? 🙏</p>
            
            {/* Botão Criar Conta - Apenas para visitantes */}
            {!user && (
              <Link to="/login">
                <Button className="bg-white text-primary hover:bg-gray-100 font-semibold text-sm px-6 py-2">
                  Criar Conta
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cards de Progresso */}
      <section className="px-4 -mt-12 relative z-10">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* Card: Plano de Leitura da Bíblia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/planos">
              <Card className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <BookText className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base mb-1">A Bíblia em um ano</CardTitle>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Lucas 9 a 11 - Continue sua jornada
                      </p>
                      {/* Barra de Progresso */}
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '81%' }}></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">81% concluído</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
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
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base mb-1">Meu devocional</CardTitle>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        296 de 365 - Reflexão diária
                      </p>
                      {/* Barra de Progresso */}
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '81%' }}></div>
                        </div>
                        <p className="text-xs text-red-500 mt-1">81% concluído</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categorias - Carousel Horizontal */}
      <section className="py-6">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Estudos bíblicos</h2>
            <Link to="/estudos" className="text-sm text-primary font-semibold">Ver todos</Link>
          </div>
          
          {/* Scroll Horizontal */}
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x snap-mandatory">
            {categorias.slice(0, 3).map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex-shrink-0 w-48 snap-start"
              >
                <Link to={categoria.link}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img 
                      src={categoria.imagem} 
                      alt={categoria.titulo}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-sm mb-0.5">{categoria.titulo}</h3>
                      <p className="text-xs opacity-90">{categoria.subtitulo}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Finanças */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Finanças</h2>
            <Link to="/cursos" className="text-sm text-primary font-semibold">Ver todos</Link>
          </div>
          
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x snap-mandatory">
            {[categorias[1]].map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex-shrink-0 w-48 snap-start"
              >
                <Link to={categoria.link}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img 
                      src={categoria.imagem} 
                      alt={categoria.titulo}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-sm mb-0.5">{categoria.titulo}</h3>
                      <p className="text-xs opacity-90">{categoria.subtitulo}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Relacionamento */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Relacionamento</h2>
            <Link to="/cursos" className="text-sm text-primary font-semibold">Ver todos</Link>
          </div>
          
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x snap-mandatory">
            {[categorias[2]].map((categoria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex-shrink-0 w-48 snap-start"
              >
                <Link to={categoria.link}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img 
                      src={categoria.imagem} 
                      alt={categoria.titulo}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-sm mb-0.5">{categoria.titulo}</h3>
                      <p className="text-xs opacity-90">{categoria.subtitulo}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atividade Recente */}
      <section className="px-4 py-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Atividade Recente</h2>
          
          <div className="space-y-3">
            {/* Devocional lido hoje */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Devocional lido hoje</CardTitle>
                  <CardDescription className="text-xs">
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
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Leitura da Bíblia</CardTitle>
                  <CardDescription className="text-xs">
                    Salmos 23 - ontem às 19:30
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

