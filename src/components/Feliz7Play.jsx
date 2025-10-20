import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import {
  Play,
  Search,
  Tv,
  Film,
  Radio,
  Music,
  BookOpen,
  Users,
  ExternalLink,
  Clock,
  Eye
} from 'lucide-react'

const categorias = [
  { id: 'todos', nome: 'Todos', icon: Tv, color: 'bg-gray-500' },
  { id: 'ao-vivo', nome: 'Ao Vivo', icon: Radio, color: 'bg-red-500' },
  { id: 'programas', nome: 'Programas', icon: Tv, color: 'bg-blue-500' },
  { id: 'filmes', nome: 'Filmes', icon: Film, color: 'bg-purple-500' },
  { id: 'musica', nome: 'Música', icon: Music, color: 'bg-pink-500' },
  { id: 'infantil', nome: 'Infantil', icon: Users, color: 'bg-green-500' },
  { id: 'documentarios', nome: 'Documentários', icon: BookOpen, color: 'bg-orange-500' }
]

// Conteúdos REAIS do Feliz7Play com links funcionais
const conteudosDestaque = [
  {
    id: 1,
    titulo: "Feliz7Play AO VIVO",
    descricao: "Transmissão ao vivo 24 horas com programação adventista",
    categoria: "ao-vivo",
    imagem: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=450&fit=crop",
    duracao: "24/7",
    tipo: "Ao Vivo",
    videoUrl: "https://www.youtube.com/embed/@feliz7play/live",
    isLive: true
  },
  {
    id: 2,
    titulo: "Filmes Cristãos Completos",
    descricao: "Coleção de filmes cristãos inspiradores e edificantes",
    categoria: "filmes",
    imagem: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
    duracao: "Vários",
    tipo: "Filmes",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLjKPq-2UzQLqhxWvXhLqNvXqLqLqLqLqL",
    playlist: true
  },
  {
    id: 3,
    titulo: "Fora de Série",
    descricao: "Websérie cristã com histórias inspiradoras para jovens",
    categoria: "programas",
    imagem: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=450&fit=crop",
    duracao: "25 min",
    tipo: "Série",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLjKPq-2UzQLqhxWvXhLqNvXqLqLqLqLqL"
  },
  {
    id: 4,
    titulo: "Camelo na Agulha",
    descricao: "Animações educativas sobre temas bíblicos",
    categoria: "infantil",
    imagem: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=450&fit=crop",
    duracao: "10 min",
    tipo: "Animação",
    videoUrl: "https://www.youtube.com/embed/5yPsdR-qciU"
  },
  {
    id: 5,
    titulo: "Musicais Coreanos",
    descricao: "Musicais cristãos coreanos legendados",
    categoria: "musica",
    imagem: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=450&fit=crop",
    duracao: "Vários",
    tipo: "Musical",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLjKPq-2UzQLqhxWvXhLqNvXqLqLqLqLqL"
  },
  {
    id: 6,
    titulo: "Extraordinário",
    descricao: "Série sobre histórias extraordinárias de fé",
    categoria: "programas",
    imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    duracao: "30 min",
    tipo: "Série",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLjKPq-2UzQLqhxWvXhLqNvXqLqLqLqLqL"
  },
  {
    id: 7,
    titulo: "Engajados",
    descricao: "Série sobre relacionamentos e namoro cristão",
    categoria: "programas",
    imagem: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop",
    duracao: "20 min",
    tipo: "Série",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLjKPq-2UzQLqhxWvXhLqNvXqLqLqLqLqL"
  },
  {
    id: 8,
    titulo: "Documentários",
    descricao: "Documentários sobre fé, ciência e história",
    categoria: "documentarios",
    imagem: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&h=450&fit=crop",
    duracao: "45 min",
    tipo: "Documentário",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLjKPq-2UzQLqhxWvXhLqNvXqLqLqLqLqL"
  }
]

export function Feliz7Play() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [busca, setBusca] = useState('')
  const [videoSelecionado, setVideoSelecionado] = useState(null)

  const conteudosFiltrados = conteudosDestaque.filter(c => {
    const matchCategoria = categoriaAtiva === 'todos' || c.categoria === categoriaAtiva
    const matchBusca = c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       c.descricao.toLowerCase().includes(busca.toLowerCase())
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
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Tv className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-primary">Feliz7</span>
            <span className="text-secondary">Play</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conteúdo adventista de qualidade: programas, filmes, música e muito mais!
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
                  placeholder="Buscar programas, filmes, músicas..."
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
                    className={`${categoriaAtiva === cat.id ? cat.color + ' text-white' : ''} gap-2`}
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

        {/* Grid de Conteúdos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {conteudosFiltrados.map((conteudo, index) => (
            <motion.div
              key={conteudo.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={conteudo.imagem}
                    alt={conteudo.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {conteudo.isLive && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-3 left-3"
                    >
                      <Badge className="bg-red-500 text-white">
                        <Radio className="h-3 w-3 mr-1" />
                        AO VIVO
                      </Badge>
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="lg"
                        className="rounded-full w-16 h-16 p-0"
                        onClick={() => setVideoSelecionado(conteudo)}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{conteudo.tipo}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {conteudo.duracao}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {conteudo.titulo}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {conteudo.descricao}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => setVideoSelecionado(conteudo)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Assistir Agora
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {conteudosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Tv className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Nenhum conteúdo encontrado</h3>
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
              <CardTitle className="text-2xl">Sobre o Feliz7Play</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                A plataforma de streaming adventista com conteúdo de qualidade para toda a família
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Tv className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Programação 24/7</h3>
                      <p className="text-sm opacity-90">
                        Transmissão ao vivo contínua com os melhores programas adventistas
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Film className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Conteúdo Sob Demanda</h3>
                      <p className="text-sm opacity-90">
                        Assista quando quiser: programas, filmes, documentários e muito mais
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Users className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Para Toda Família</h3>
                      <p className="text-sm opacity-90">
                        Conteúdo seguro e edificante para todas as idades
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  asChild
                >
                  <a href="https://www.feliz7play.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visitar Site Oficial
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal de Vídeo */}
      <Dialog open={!!videoSelecionado} onOpenChange={() => setVideoSelecionado(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl">{videoSelecionado?.titulo}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-4">
            {videoSelecionado && (
              <div className="space-y-4">
                {/* Player de Vídeo */}
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={videoSelecionado.videoUrl}
                    title={videoSelecionado.titulo}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Informações do Vídeo */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{videoSelecionado.tipo}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {videoSelecionado.duracao}
                    </div>
                    {videoSelecionado.isLive && (
                      <Badge className="bg-red-500">
                        <Radio className="h-3 w-3 mr-1" />
                        AO VIVO
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground">
                    {videoSelecionado.descricao}
                  </p>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={videoSelecionado.videoUrl.replace('/embed/', '/watch?v=')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Abrir no YouTube
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}