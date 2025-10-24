import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, DollarSign, Heart, Users, Star, ChevronRight, Search, Filter, GraduationCap } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { getProgressStats } from '../services/progressoService'
import { getCurrentUser } from '../services/authService'

// Componente da Nova Página de Estudos
export function NewEstudosPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // Categorias de estudos com cores e ícones
  const categorias = [
    {
      id: 1,
      nome: 'Estudos Bíblicos',
      descricao: 'Aprofunde-se na Palavra de Deus',
      icone: BookOpen,
      cor: 'from-blue-400 to-blue-600',
      corFundo: 'bg-blue-100 dark:bg-blue-900',
      cursosDisponiveis: 28,
      rota: '/estudos/biblicos'
    },
    {
      id: 2,
      nome: 'Finanças',
      descricao: 'Princípios bíblicos de mordomia',
      icone: DollarSign,
      cor: 'from-green-400 to-green-600',
      corFundo: 'bg-green-100 dark:bg-green-900',
      cursosDisponiveis: 12,
      rota: '/estudos/financas'
    },
    {
      id: 3,
      nome: 'Relacionamentos',
      descricao: 'Construa vínculos saudáveis',
      icone: Heart,
      cor: 'from-pink-400 to-pink-600',
      corFundo: 'bg-pink-100 dark:bg-pink-900',
      cursosDisponiveis: 15,
      rota: '/estudos/relacionamentos'
    },
    {
      id: 4,
      nome: 'Família',
      descricao: 'Fortaleça os laços familiares',
      icone: Users,
      cor: 'from-purple-400 to-purple-600',
      corFundo: 'bg-purple-100 dark:bg-purple-900',
      cursosDisponiveis: 18,
      rota: '/estudos/familia'
    },
    {
      id: 5,
      nome: 'Vida Cristã',
      descricao: 'Cresça em sua jornada espiritual',
      icone: Star,
      cor: 'from-yellow-400 to-yellow-600',
      corFundo: 'bg-yellow-100 dark:bg-yellow-900',
      cursosDisponiveis: 22,
      rota: '/estudos/vida-crista'
    }
  ]

  // Cursos em destaque
  const cursosDestaque = [
    {
      id: 1,
      titulo: 'Apocalipse: Revelações do Fim',
      instrutor: 'Pr. Mark Finley',
      avaliacao: 4.9,
      estudantes: 15200,
      horas: 12,
      aulas: 32,
      imagem: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400',
      descricao: 'Desvende as profecias do Apocalipse e compreenda os eventos finais'
    },
    {
      id: 2,
      titulo: 'Daniel: Profecias para Hoje',
      instrutor: 'Pr. Doug Batchelor',
      avaliacao: 4.9,
      estudantes: 13800,
      horas: 10,
      aulas: 28,
      imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      descricao: 'Estudo profundo das profecias de Daniel e sua relevância atual'
    },
    {
      id: 3,
      titulo: 'Escola Sabatina - O Grande Conflito',
      instrutor: 'Divisão Sul-Americana',
      avaliacao: 4.8,
      estudantes: 25000,
      horas: 13,
      aulas: 13,
      imagem: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400',
      descricao: 'Lições trimestrais da Escola Sabatina para adultos'
    },
    {
      id: 4,
      titulo: 'Administração Financeira Cristã',
      instrutor: 'Pr. Alejandro Bullón',
      avaliacao: 4.7,
      estudantes: 9500,
      horas: 6,
      aulas: 18,
      imagem: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
      descricao: 'Princípios bíblicos de mordomia e gestão financeira'
    },
    {
      id: 5,
      titulo: 'Vida de Cristo',
      instrutor: 'Pr. Erton Köhler',
      avaliacao: 4.9,
      estudantes: 18500,
      horas: 15,
      aulas: 40,
      imagem: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400',
      descricao: 'Estudo completo sobre a vida, ministério e ensinamentos de Jesus'
    },
    {
      id: 6,
      titulo: 'Saúde e Estilo de Vida',
      instrutor: 'Dr. Neil Nedley',
      avaliacao: 4.8,
      estudantes: 11200,
      horas: 8,
      aulas: 24,
      imagem: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
      descricao: 'Princípios de saúde integral baseados na Bíblia'
    }
  ]

  // Progresso do usuário (dinâmico)
  const [progressoUsuario, setProgressoUsuario] = useState({
    concluidos: 0,
    emAndamento: 0,
    horasEstudadas: 0
  })
  const [user, setUser] = useState(null)

  // Carregar progresso do usuário ao montar componente
  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    
    if (currentUser) {
      const stats = getProgressStats()
      setProgressoUsuario(stats)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Estudos Bíblicos</h1>
              <p className="text-gray-600 dark:text-gray-400">Aprenda e cresça na fé</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <section className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Categorias</h2>
          
          <div className="space-y-4">
            {categorias.map((categoria, index) => (
              <motion.div
                key={categoria.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${categoria.corFundo}`}
                  onClick={() => navigate(categoria.rota)}
                >
                  <div className="flex items-center">
                    {/* Ícone com gradiente */}
                    <div className={`w-32 h-32 flex items-center justify-center bg-gradient-to-br ${categoria.cor}`}>
                      <categoria.icone className="h-16 w-16 text-white" />
                    </div>
                    
                    {/* Conteúdo */}
                    <CardHeader className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">{categoria.nome}</CardTitle>
                          <CardDescription className="text-sm mb-2">
                            {categoria.descricao}
                          </CardDescription>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">
                            {categoria.cursosDisponiveis} cursos disponíveis
                          </p>
                        </div>
                        <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      </div>
                    </CardHeader>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos em Destaque */}
      <section className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Cursos em Destaque</h2>
          
          <div className="space-y-4">
            {cursosDestaque.map((curso, index) => (
              <motion.div
                key={curso.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800">
                  <div className="flex">
                    {/* Imagem */}
                    <div 
                      className="w-32 h-32 bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${curso.imagem})` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          ▶ {curso.aulas} aulas
                        </span>
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <CardHeader className="flex-1">
                      <CardTitle className="text-base mb-1">{curso.titulo}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {curso.instrutor}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="font-medium">{curso.avaliacao}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{curso.estudantes.toLocaleString()} estudantes</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        ⏱️ {curso.horas} horas
                      </p>
                    </CardHeader>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meu Progresso */}
      <section className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Meu Progresso</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <CardHeader>
                {user ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <GraduationCap className="h-10 w-10" />
                      <span className="text-sm opacity-90">Estudos Concluídos</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-3xl font-bold">{progressoUsuario.concluidos}</p>
                        <p className="text-sm opacity-90">Concluídos</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-red-300">{progressoUsuario.emAndamento}</p>
                        <p className="text-sm opacity-90">Em andamento</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-green-300">{progressoUsuario.horasEstudadas}h</p>
                        <p className="text-sm opacity-90">Estudadas</p>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50"
                      onClick={() => navigate('/cursos')}
                    >
                      Ver Meus Cursos
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <GraduationCap className="h-10 w-10" />
                      <span className="text-sm opacity-90">Faça login para acompanhar</span>
                    </div>
                    
                    <div className="text-center py-6">
                      <p className="text-lg mb-4">🔒 Entre para acompanhar seu progresso</p>
                      <p className="text-sm opacity-90 mb-6">
                        Faça login e tenha acesso ao seu histórico de estudos, cursos concluídos e muito mais!
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                      onClick={() => navigate('/login')}
                    >
                      Fazer Login
                    </Button>
                  </>
                )}
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

