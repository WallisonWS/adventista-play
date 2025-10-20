import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Award,
  Search,
  ExternalLink,
  Play,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react'

const categorias = [
  { id: 'todos', nome: 'Todos', icon: GraduationCap },
  { id: 'teologia', nome: 'Teologia', icon: BookOpen },
  { id: 'lideranca', nome: 'Liderança', icon: Users },
  { id: 'evangelismo', nome: 'Evangelismo', icon: TrendingUp },
  { id: 'familia', nome: 'Família', icon: Users },
  { id: 'jovens', nome: 'Jovens', icon: Star }
]

const cursosDisponiveis = [
  {
    id: 1,
    titulo: "Teologia Adventista Básica",
    descricao: "Fundamentos da fé adventista e doutrinas essenciais",
    categoria: "teologia",
    nivel: "Iniciante",
    duracao: "8 semanas",
    aulas: 24,
    instrutor: "Pastor Marcos Silva",
    imagem: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
    destaque: true,
    gratuito: true,
    certificado: true
  },
  {
    id: 2,
    titulo: "Liderança Cristã Eficaz",
    descricao: "Princípios bíblicos de liderança para líderes de igreja",
    categoria: "lideranca",
    nivel: "Intermediário",
    duracao: "6 semanas",
    aulas: 18,
    instrutor: "Pr. João Santos",
    imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    destaque: true,
    gratuito: true,
    certificado: true
  },
  {
    id: 3,
    titulo: "Evangelismo Pessoal",
    descricao: "Como compartilhar sua fé de forma natural e eficaz",
    categoria: "evangelismo",
    nivel: "Iniciante",
    duracao: "4 semanas",
    aulas: 12,
    instrutor: "Evangelista Maria Costa",
    imagem: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: true
  },
  {
    id: 4,
    titulo: "Família Cristã Feliz",
    descricao: "Construindo relacionamentos saudáveis baseados em princípios bíblicos",
    categoria: "familia",
    nivel: "Todos",
    duracao: "5 semanas",
    aulas: 15,
    instrutor: "Dra. Ana Paula",
    imagem: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: false
  },
  {
    id: 5,
    titulo: "Ministério Jovem Dinâmico",
    descricao: "Estratégias para engajar jovens na igreja",
    categoria: "jovens",
    nivel: "Intermediário",
    duracao: "6 semanas",
    aulas: 18,
    instrutor: "Pr. Lucas Oliveira",
    imagem: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
    destaque: true,
    gratuito: true,
    certificado: true
  },
  {
    id: 6,
    titulo: "Profecia Bíblica",
    descricao: "Estudo aprofundado de Daniel e Apocalipse",
    categoria: "teologia",
    nivel: "Avançado",
    duracao: "12 semanas",
    aulas: 36,
    instrutor: "Dr. Roberto Almeida",
    imagem: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: true
  },
  {
    id: 7,
    titulo: "Pregação Expositiva",
    descricao: "Como preparar e apresentar sermões bíblicos",
    categoria: "lideranca",
    nivel: "Avançado",
    duracao: "10 semanas",
    aulas: 30,
    instrutor: "Pr. Fernando Lima",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: true
  },
  {
    id: 8,
    titulo: "Pequenos Grupos",
    descricao: "Como liderar e multiplicar pequenos grupos",
    categoria: "lideranca",
    nivel: "Intermediário",
    duracao: "4 semanas",
    aulas: 12,
    instrutor: "Líder Paulo Mendes",
    imagem: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: false
  },
  {
    id: 9,
    titulo: "Música Sacra",
    descricao: "Fundamentos de música para o culto adventista",
    categoria: "jovens",
    nivel: "Iniciante",
    duracao: "8 semanas",
    aulas: 24,
    instrutor: "Maestro Carlos Souza",
    imagem: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: true
  },
  {
    id: 10,
    titulo: "Aconselhamento Cristão",
    descricao: "Princípios bíblicos para aconselhar e ajudar pessoas",
    categoria: "lideranca",
    nivel: "Avançado",
    duracao: "10 semanas",
    aulas: 30,
    instrutor: "Psicóloga Dra. Juliana",
    imagem: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: true
  },
  {
    id: 11,
    titulo: "Missões Urbanas",
    descricao: "Estratégias de evangelismo para grandes cidades",
    categoria: "evangelismo",
    nivel: "Intermediário",
    duracao: "6 semanas",
    aulas: 18,
    instrutor: "Missionário Pedro Rocha",
    imagem: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: true
  },
  {
    id: 12,
    titulo: "Educação Cristã",
    descricao: "Princípios de educação adventista para pais e professores",
    categoria: "familia",
    nivel: "Todos",
    duracao: "5 semanas",
    aulas: 15,
    instrutor: "Profª. Sandra Lima",
    imagem: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop",
    gratuito: true,
    certificado: false
  }
]

export function CursosAdventistas() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [busca, setBusca] = useState('')
  const [cursoSelecionado, setCursoSelecionado] = useState(null)

  const cursosFiltrados = cursosDisponiveis.filter(c => {
    const matchCategoria = categoriaAtiva === 'todos' || c.categoria === categoriaAtiva
    const matchBusca = c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       c.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                       c.instrutor.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  const cursosDestaque = cursosDisponiveis.filter(c => c.destaque)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <GraduationCap className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
            Cursos Adventistas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Capacitação e crescimento espiritual através de cursos online gratuitos
          </p>
        </motion.div>

        {/* Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos por título, descrição ou instrutor..."
                  className="pl-10 text-lg"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categorias.map((cat, index) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={categoriaAtiva === cat.id ? "default" : "outline"}
                    className="gap-2"
                    onClick={() => setCategoriaAtiva(cat.id)}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.nome}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Cursos em Destaque */}
        {categoriaAtiva === 'todos' && !busca && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Cursos em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosDestaque.map((curso, index) => (
                <motion.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group border-2 border-yellow-500/50">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      </div>
                      {curso.gratuito && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-green-500 text-white">
                            GRÁTIS
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{curso.nivel}</Badge>
                        {curso.certificado && (
                          <Badge variant="outline" className="gap-1">
                            <Award className="h-3 w-3" />
                            Certificado
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {curso.titulo}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {curso.descricao}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {curso.duracao}
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {curso.aulas} aulas
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Por: {curso.instrutor}
                      </p>
                      <Button className="w-full" onClick={() => setCursoSelecionado(curso)}>
                        <Play className="h-4 w-4 mr-2" />
                        Começar Curso
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Todos os Cursos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            {categoriaAtiva === 'todos' ? 'Todos os Cursos' : `Cursos de ${categorias.find(c => c.id === categoriaAtiva)?.nome}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cursosFiltrados.map((curso, index) => (
              <motion.div
                key={curso.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={curso.imagem}
                      alt={curso.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {curso.gratuito && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 text-white">
                          GRÁTIS
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{curso.nivel}</Badge>
                      {curso.certificado && (
                        <Badge variant="outline" className="gap-1">
                          <Award className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {curso.titulo}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {curso.descricao}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {curso.duracao}
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        {curso.aulas} aulas
                      </div>
                    </div>
                    <Button className="w-full" size="sm" onClick={() => setCursoSelecionado(curso)}>
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {cursosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <GraduationCap className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar por outro termo ou selecione outra categoria
            </p>
          </motion.div>
        )}

        {/* Banner Informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Por que fazer nossos cursos?</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Capacitação de qualidade para servir melhor na igreja e comunidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">100% Gratuitos</h3>
                      <p className="text-sm opacity-90">
                        Todos os cursos são oferecidos gratuitamente pela igreja
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Award className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Certificados</h3>
                      <p className="text-sm opacity-90">
                        Receba certificado de conclusão reconhecido pela igreja
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Users className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Instrutores Qualificados</h3>
                      <p className="text-sm opacity-90">
                        Aprenda com pastores, professores e líderes experientes
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal de Detalhes do Curso */}
      {cursoSelecionado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setCursoSelecionado(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <Card>
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={cursoSelecionado.imagem}
                  alt={cursoSelecionado.titulo}
                  className="w-full h-full object-cover"
                />
                {cursoSelecionado.gratuito && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                      GRÁTIS
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-base px-3 py-1">{cursoSelecionado.nivel}</Badge>
                  {cursoSelecionado.certificado && (
                    <Badge variant="outline" className="gap-1 text-base px-3 py-1">
                      <Award className="h-4 w-4" />
                      Certificado
                    </Badge>
                  )}
                  {cursoSelecionado.destaque && (
                    <Badge className="bg-yellow-500 text-white gap-1 text-base px-3 py-1">
                      <Star className="h-4 w-4" />
                      Destaque
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl mb-3">{cursoSelecionado.titulo}</CardTitle>
                <CardDescription className="text-lg">
                  {cursoSelecionado.descricao}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Informações do Curso */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">{cursoSelecionado.duracao}</p>
                    <p className="text-xs text-muted-foreground">Duração</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Play className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">{cursoSelecionado.aulas} aulas</p>
                    <p className="text-xs text-muted-foreground">Conteúdo</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">{cursoSelecionado.instrutor}</p>
                    <p className="text-xs text-muted-foreground">Instrutor</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">{cursoSelecionado.certificado ? 'Sim' : 'Não'}</p>
                    <p className="text-xs text-muted-foreground">Certificado</p>
                  </div>
                </div>

                {/* O que você vai aprender */}
                <div>
                  <h3 className="font-bold text-xl mb-4">O que você vai aprender:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Fundamentos bíblicos sólidos",
                      "Aplicação prática no dia a dia",
                      "Ferramentas para ministério",
                      "Crescimento espiritual",
                      "Networking com outros alunos",
                      "Materiais de apoio"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Começar Agora
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setCursoSelecionado(null)}>
                    Fechar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}