import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText, 
  Clock,
  Users,
  Star,
  Search,
  ChevronRight,
  Award,
  Heart,
  Globe,
  Sparkles
} from 'lucide-react'

const cursosData = [
  {
    id: 1,
    titulo: "Fundamentos da Fé Adventista",
    descricao: "Aprenda os pilares da fé adventista do sétimo dia",
    categoria: "teologia",
    nivel: "Iniciante",
    duracao: "8 semanas",
    aulas: 24,
    alunos: 1250,
    rating: 4.9,
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    tags: ["Doutrina", "Bíblia", "História"],
    instrutor: "Pr. João Silva",
    conteudo: [
      "As 28 Crenças Fundamentais",
      "História da Igreja Adventista",
      "O Santuário e o Juízo Investigativo",
      "O Sábado e sua Importância",
      "O Estado dos Mortos",
      "A Segunda Vinda de Cristo"
    ]
  },
  {
    id: 2,
    titulo: "Liderança Jovem Adventista",
    descricao: "Desenvolva habilidades de liderança cristã",
    categoria: "lideranca",
    nivel: "Intermediário",
    duracao: "6 semanas",
    aulas: 18,
    alunos: 890,
    rating: 4.8,
    imagem: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
    tags: ["Liderança", "Jovens", "Ministério"],
    instrutor: "Dra. Maria Santos",
    conteudo: [
      "Princípios Bíblicos de Liderança",
      "Comunicação Efetiva",
      "Trabalho em Equipe",
      "Gestão de Conflitos",
      "Mentoria e Discipulado",
      "Planejamento Estratégico"
    ]
  },
  {
    id: 3,
    titulo: "Evangelismo Digital",
    descricao: "Aprenda a compartilhar a fé nas redes sociais",
    categoria: "evangelismo",
    nivel: "Iniciante",
    duracao: "4 semanas",
    aulas: 12,
    alunos: 2100,
    rating: 4.7,
    imagem: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    tags: ["Evangelismo", "Redes Sociais", "Tecnologia"],
    instrutor: "Pr. Carlos Mendes",
    conteudo: [
      "Estratégias de Conteúdo Cristão",
      "Instagram e Facebook para Evangelismo",
      "Criação de Vídeos Inspiradores",
      "Engajamento e Comunidade Online",
      "Ética Digital Cristã"
    ]
  },
  {
    id: 4,
    titulo: "Saúde e Estilo de Vida",
    descricao: "Princípios adventistas para uma vida saudável",
    categoria: "saude",
    nivel: "Iniciante",
    duracao: "5 semanas",
    aulas: 15,
    alunos: 1680,
    rating: 4.9,
    imagem: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    tags: ["Saúde", "Nutrição", "Bem-estar"],
    instrutor: "Dra. Ana Paula",
    conteudo: [
      "Os 8 Remédios Naturais",
      "Alimentação Vegetariana",
      "Exercícios Físicos e Espiritualidade",
      "Controle do Estresse",
      "Sono Reparador",
      "Temperança e Equilíbrio"
    ]
  },
  {
    id: 5,
    titulo: "Profecia Bíblica",
    descricao: "Estudo profundo das profecias de Daniel e Apocalipse",
    categoria: "teologia",
    nivel: "Avançado",
    duracao: "12 semanas",
    aulas: 36,
    alunos: 950,
    rating: 5.0,
    imagem: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400",
    tags: ["Profecia", "Daniel", "Apocalipse"],
    instrutor: "Pr. Roberto Lima",
    conteudo: [
      "Introdução à Profecia",
      "As Profecias de Daniel",
      "Os Sete Selos do Apocalipse",
      "As Sete Trombetas",
      "As Sete Pragas",
      "A Nova Terra"
    ]
  },
  {
    id: 6,
    titulo: "Música Sacra e Adoração",
    descricao: "Desenvolva seu ministério musical",
    categoria: "musica",
    nivel: "Intermediário",
    duracao: "8 semanas",
    aulas: 24,
    alunos: 720,
    rating: 4.8,
    imagem: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400",
    tags: ["Música", "Adoração", "Ministério"],
    instrutor: "Maestro Pedro Costa",
    conteudo: [
      "Teologia da Adoração",
      "Técnicas Vocais",
      "Regência de Coral",
      "Instrumentos na Igreja",
      "Composição de Hinos",
      "Ministério de Louvor"
    ]
  },
  {
    id: 7,
    titulo: "Família Cristã",
    descricao: "Fortalecendo os laços familiares à luz da Bíblia",
    categoria: "familia",
    nivel: "Iniciante",
    duracao: "6 semanas",
    aulas: 18,
    alunos: 1420,
    rating: 4.9,
    imagem: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
    tags: ["Família", "Casamento", "Filhos"],
    instrutor: "Pr. Marcos e Dra. Juliana",
    conteudo: [
      "O Plano de Deus para a Família",
      "Comunicação no Casamento",
      "Educação de Filhos",
      "Finanças Familiares",
      "Culto Familiar",
      "Resolução de Conflitos"
    ]
  },
  {
    id: 8,
    titulo: "Missões Urbanas",
    descricao: "Estratégias para alcançar as grandes cidades",
    categoria: "evangelismo",
    nivel: "Intermediário",
    duracao: "7 semanas",
    aulas: 21,
    alunos: 580,
    rating: 4.7,
    imagem: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    tags: ["Missões", "Evangelismo", "Urbano"],
    instrutor: "Pr. Felipe Oliveira",
    conteudo: [
      "Desafios das Grandes Cidades",
      "Grupos Pequenos Urbanos",
      "Ministério de Compaixão",
      "Plantio de Igrejas",
      "Evangelismo Público",
      "Discipulado Urbano"
    ]
  }
]

const categorias = [
  { id: 'todos', nome: 'Todos', icone: BookOpen },
  { id: 'teologia', nome: 'Teologia', icone: BookOpen },
  { id: 'lideranca', nome: 'Liderança', icone: Users },
  { id: 'evangelismo', nome: 'Evangelismo', icone: Heart },
  { id: 'saude', nome: 'Saúde', icone: Heart },
  { id: 'musica', nome: 'Música', icone: Sparkles },
  { id: 'familia', nome: 'Família', icone: Heart }
]

export function CursosAdventistas() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos')
  const [busca, setBusca] = useState('')
  const [cursoSelecionado, setCursoSelecionado] = useState(null)

  const cursosFiltrados = cursosData.filter(curso => {
    const matchCategoria = categoriaSelecionada === 'todos' || curso.categoria === categoriaSelecionada
    const matchBusca = curso.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       curso.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                       curso.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()))
    return matchCategoria && matchBusca
  })

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
            className="flex justify-center mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GraduationCap className="h-20 w-20 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cursos <span className="text-primary">Adventistas</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desenvolva seu conhecimento e ministério com cursos de qualidade
          </p>
        </motion.div>

        {/* Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar cursos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </motion.div>

        {/* Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((cat) => {
              const Icone = cat.icone
              return (
                <Button
                  key={cat.id}
                  variant={categoriaSelecionada === cat.id ? 'default' : 'outline'}
                  onClick={() => setCategoriaSelecionada(cat.id)}
                  className="flex items-center space-x-2"
                >
                  <Icone className="h-4 w-4" />
                  <span>{cat.nome}</span>
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Grid de Cursos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cursosFiltrados.map((curso, index) => (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setCursoSelecionado(curso)}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={curso.imagem} 
                    alt={curso.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white">
                      {curso.nivel}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{curso.titulo}</CardTitle>
                  <CardDescription>{curso.descricao}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {curso.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Informações */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{curso.duracao}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>{curso.aulas} aulas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{curso.alunos} alunos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{curso.rating}</span>
                    </div>
                  </div>

                  {/* Instrutor */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold">{curso.instrutor}</p>
                  </div>

                  <Button className="w-full" variant="default">
                    <Award className="h-4 w-4 mr-2" />
                    Iniciar Curso
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Nenhum resultado */}
        {cursosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou busca
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

