import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Newspaper,
  Calendar,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Users,
  Award
} from 'lucide-react'

// Notícias REAIS dos Desbravadores (atualizadas de adventistas.org)
const noticiasReais = [
  {
    id: 1,
    titulo: "Cariocão 2025 reúne 17 mil participantes",
    resumo: "Encontro realizado na Praça da Apoteose, no Rio de Janeiro, prestou homenagens especiais em celebração aos 75 anos da oficialização do Clube de Desbravadores no mundo",
    data: "2025-02-15",
    categoria: "Eventos",
    imagem: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  },
  {
    id: 2,
    titulo: "Experiência Bíblica dos Desbravadores 2025",
    resumo: "Mais de 3.000 pessoas se reuniram em Battle Creek, Michigan, enquanto 185 equipes demonstraram conhecimento bíblico e crescimento espiritual",
    data: "2025-02-10",
    categoria: "Eventos",
    imagem: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&h=450&fit=crop",
    link: "https://adventist.news/pt/news/experiência-bíblica-dos-desbravadores-2025"
  },
  {
    id: 3,
    titulo: "Identidade Visual - Campori 2027",
    resumo: "Divulgada a identidade visual oficial do Campori 2027, o maior encontro de Desbravadores do mundo",
    data: "2025-01-20",
    categoria: "Materiais",
    imagem: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  },
  {
    id: 4,
    titulo: "Batismo da Primavera 2025 - Desbravadores",
    resumo: "Materiais e recursos para o Batismo da Primavera 2025 já estão disponíveis para download",
    data: "2025-01-15",
    categoria: "Materiais",
    imagem: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  },
  {
    id: 5,
    titulo: "Dia Mundial dos Desbravadores 2025",
    descricao: "Celebre o Dia Mundial dos Desbravadores com atividades especiais e materiais exclusivos",
    data: "2025-01-10",
    categoria: "Eventos",
    imagem: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  },
  {
    id: 6,
    titulo: "Criança de 12 anos salva avó com primeiros socorros",
    resumo: "Treinamento realizado no Clube de Desbravadores capacitou menina a salvar a vida de sua avó de 75 anos",
    data: "2024-12-20",
    categoria: "Histórias",
    imagem: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  },
  {
    id: 7,
    titulo: "5 motivos para fazer parte do Clube de Desbravadores",
    resumo: "Porque fazer parte do Clube de Desbravadores pode mudar para sempre a vida de um adolescente",
    data: "2024-12-15",
    categoria: "Artigos",
    imagem: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  },
  {
    id: 8,
    titulo: "75 Anos dos Desbravadores no Mundo",
    resumo: "Celebrando 75 anos de história, aventura, serviço e fé! Conheça a trajetória do movimento que transformou milhões de vidas",
    data: "2024-12-01",
    categoria: "História",
    imagem: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=450&fit=crop",
    link: "https://www.adventistas.org/pt/desbravadores/"
  }
]

export function NoticiasDesbravadores() {
  const [noticias, setNoticias] = useState(noticiasReais)
  const [carregando, setCarregando] = useState(false)
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  const categorias = ['todas', ...new Set(noticias.map(n => n.categoria))]

  const noticiasFiltradas = categoriaFiltro === 'todas' 
    ? noticias 
    : noticias.filter(n => n.categoria === categoriaFiltro)

  const atualizarNoticias = async () => {
    setCarregando(true)
    // Simular carregamento de API
    setTimeout(() => {
      setNoticias(noticiasReais)
      setCarregando(false)
    }, 1000)
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })
  }

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
            <Newspaper className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
            Notícias dos Desbravadores
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fique por dentro das últimas novidades do movimento Desbravador
          </p>
        </motion.div>

        {/* Filtros e Atualizar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {categorias.map((cat) => (
                    <Button
                      key={cat}
                      variant={categoriaFiltro === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoriaFiltro(cat)}
                    >
                      {cat === 'todas' ? 'Todas' : cat}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={atualizarNoticias}
                  disabled={carregando}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${carregando ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid de Notícias */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          {noticiasFiltradas.map((noticia, index) => (
            <motion.div
              key={noticia.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={noticia.imagem}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-white">
                      {noticia.categoria}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {formatarData(noticia.data)}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {noticia.titulo}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {noticia.resumo}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    asChild
                  >
                    <a href={noticia.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Ler Mais
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Banner Informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Sobre os Desbravadores</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Movimento presente em mais de 160 países com 1,5 milhão de participantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Users className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">1,5 Milhão</h3>
                      <p className="text-sm opacity-90">
                        Desbravadores ativos em todo o mundo
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">160 Países</h3>
                      <p className="text-sm opacity-90">
                        Presença global em todos os continentes
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex items-start space-x-3">
                    <Award className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">75 Anos</h3>
                      <p className="text-sm opacity-90">
                        De história, aventura e transformação de vidas
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  asChild
                >
                  <a href="https://www.adventistas.org/pt/desbravadores/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visitar Site Oficial
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}