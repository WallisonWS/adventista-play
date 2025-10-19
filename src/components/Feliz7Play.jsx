import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Play, 
  Search,
  Tv,
  Film,
  Radio,
  Music,
  BookOpen,
  Users,
  Heart,
  ExternalLink
} from 'lucide-react'

const categorias = [
  { id: 'ao-vivo', nome: 'Ao Vivo', icon: Radio, color: 'bg-red-500' },
  { id: 'programas', nome: 'Programas', icon: Tv, color: 'bg-blue-500' },
  { id: 'filmes', nome: 'Filmes', icon: Film, color: 'bg-purple-500' },
  { id: 'musica', nome: 'Música', icon: Music, color: 'bg-pink-500' },
  { id: 'infantil', nome: 'Infantil', icon: Users, color: 'bg-green-500' },
  { id: 'documentarios', nome: 'Documentários', icon: BookOpen, color: 'bg-orange-500' }
]

const conteudosDestaque = [
  {
    id: 1,
    titulo: "Está Escrito",
    descricao: "Programa de estudos bíblicos apresentado por Luís Gonçalves",
    categoria: "programas",
    imagem: "https://via.placeholder.com/400x225/2563eb/ffffff?text=Esta+Escrito",
    duracao: "30 min",
    tipo: "Série"
  },
  {
    id: 2,
    titulo: "Feliz7Play Ao Vivo",
    descricao: "Transmissão ao vivo 24 horas com programação adventista",
    categoria: "ao-vivo",
    imagem: "https://via.placeholder.com/400x225/ef4444/ffffff?text=AO+VIVO",
    duracao: "24/7",
    tipo: "Ao Vivo"
  },
  {
    id: 3,
    titulo: "Na Mira da Verdade",
    descricao: "Programa de perguntas e respostas bíblicas",
    categoria: "programas",
    imagem: "https://via.placeholder.com/400x225/8b5cf6/ffffff?text=Na+Mira",
    duracao: "45 min",
    tipo: "Série"
  },
  {
    id: 4,
    titulo: "Hinário Adventista",
    descricao: "Coletânea completa de hinos adventistas",
    categoria: "musica",
    imagem: "https://via.placeholder.com/400x225/ec4899/ffffff?text=Hinario",
    duracao: "Playlist",
    tipo: "Música"
  },
  {
    id: 5,
    titulo: "Meu Amigão",
    descricao: "Programa infantil com histórias bíblicas e valores cristãos",
    categoria: "infantil",
    imagem: "https://via.placeholder.com/400x225/10b981/ffffff?text=Meu+Amigao",
    duracao: "25 min",
    tipo: "Infantil"
  },
  {
    id: 6,
    titulo: "Origens",
    descricao: "Documentário sobre criação e ciência",
    categoria: "documentarios",
    imagem: "https://via.placeholder.com/400x225/f59e0b/ffffff?text=Origens",
    duracao: "50 min",
    tipo: "Documentário"
  }
]

export function Feliz7Play() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [busca, setBusca] = useState('')

  const conteudosFiltrados = conteudosDestaque.filter(c => {
    const matchCategoria = categoriaAtiva === 'todos' || c.categoria === categoriaAtiva
    const matchBusca = c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       c.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block p-4 bg-primary/10 rounded-full mb-4"
            >
              <Play className="h-12 w-12 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Feliz7 Play</h1>
            <p className="text-muted-foreground mb-4">
              Streaming adventista com programação 24 horas
            </p>
            <Button size="lg" asChild>
              <a href="https://www.feliz7play.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5 mr-2" />
                Acessar Feliz7 Play
              </a>
            </Button>
          </div>

          {/* Busca */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar programas, filmes, músicas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button
              variant={categoriaAtiva === 'todos' ? 'default' : 'outline'}
              onClick={() => setCategoriaAtiva('todos')}
            >
              Todos
            </Button>
            {categorias.map(cat => (
              <Button
                key={cat.id}
                variant={categoriaAtiva === cat.id ? 'default' : 'outline'}
                onClick={() => setCategoriaAtiva(cat.id)}
              >
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.nome}
              </Button>
            ))}
          </div>

          {/* Destaque - Ao Vivo */}
          <Card className="mb-8 overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <Badge className="bg-white text-red-500 mb-3">
                    <Radio className="h-3 w-3 mr-1" />
                    AO VIVO
                  </Badge>
                  <h2 className="text-3xl font-bold mb-2">Transmissão 24 Horas</h2>
                  <p className="text-white/90 mb-4">
                    Assista agora a programação ao vivo do Feliz7 Play com conteúdo adventista de qualidade
                  </p>
                  <Button size="lg" variant="secondary" asChild>
                    <a href="https://www.feliz7play.com/aovivo" target="_blank" rel="noopener noreferrer">
                      <Play className="h-5 w-5 mr-2" />
                      Assistir Agora
                    </a>
                  </Button>
                </div>
                <div className="w-full md:w-auto">
                  <div className="relative w-64 h-36 bg-white/10 rounded-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-white/80" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid de Conteúdos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conteudosFiltrados.map((conteudo, index) => (
              <motion.div
                key={conteudo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all group">
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={conteudo.imagem}
                      alt={conteudo.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      {conteudo.duracao}
                    </Badge>
                  </div>

                  {/* Info */}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="line-clamp-1">{conteudo.titulo}</CardTitle>
                      <Badge variant="outline">{conteudo.tipo}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {conteudo.descricao}
                    </CardDescription>
                  </CardHeader>

                  {/* Ações */}
                  <CardContent className="pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://www.feliz7play.com" target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Assistir
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sem resultados */}
          {conteudosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum conteúdo encontrado</h3>
              <p className="text-muted-foreground">
                Tente buscar por outro termo ou selecione outra categoria
              </p>
            </div>
          )}

          {/* Informações */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Tv className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Programação 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Conteúdo adventista disponível o tempo todo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Família Toda</h3>
                <p className="text-sm text-muted-foreground">
                  Conteúdo para todas as idades
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Film className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Qualidade HD</h3>
                <p className="text-sm text-muted-foreground">
                  Transmissão em alta definição
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Final */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-3">
                  Acesse o Feliz7 Play Completo
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Tenha acesso a todo o catálogo de programas, filmes, documentários e muito mais no site oficial do Feliz7 Play
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="https://www.feliz7play.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visitar Feliz7 Play
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

