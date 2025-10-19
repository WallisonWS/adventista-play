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
  TrendingUp
} from 'lucide-react'

// Notícias mockadas (em produção, viriam de uma API)
const noticiasMock = [
  {
    id: 1,
    titulo: "Camporee Sul-Americano 2025 - Inscrições Abertas",
    resumo: "Prepare-se para o maior encontro de Desbravadores da América do Sul! Inscrições abertas até março de 2025.",
    data: "2025-01-15",
    categoria: "Eventos",
    imagem: "https://via.placeholder.com/400x250/10b981/ffffff?text=Camporee+2025",
    link: "https://desbravadores.org.br"
  },
  {
    id: 2,
    titulo: "Nova Especialidade: Programação e Tecnologia",
    resumo: "Conheça a mais nova especialidade aprovada pela Divisão Sul-Americana, focada em desenvolvimento de software e tecnologia.",
    data: "2025-01-10",
    categoria: "Especialidades",
    imagem: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Programacao",
    link: "https://desbravadores.org.br"
  },
  {
    id: 3,
    titulo: "Desbravadores Arrecadam 10 Toneladas de Alimentos",
    resumo: "Clube de Desbravadores de São Paulo realiza campanha solidária e arrecada 10 toneladas de alimentos para famílias carentes.",
    data: "2025-01-05",
    categoria: "Ação Social",
    imagem: "https://via.placeholder.com/400x250/ec4899/ffffff?text=Acao+Social",
    link: "https://desbravadores.org.br"
  },
  {
    id: 4,
    titulo: "Curso de Liderança para Diretores - Vagas Limitadas",
    resumo: "Inscreva-se no curso de capacitação para diretores e líderes de clubes. Aprenda técnicas modernas de liderança juvenil.",
    data: "2024-12-28",
    categoria: "Capacitação",
    imagem: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Lideranca",
    link: "https://desbravadores.org.br"
  },
  {
    id: 5,
    titulo: "Desbravadores Plantam 5 Mil Árvores em Projeto Ambiental",
    resumo: "Clubes de todo o Brasil participam de projeto de reflorestamento e plantam 5 mil mudas em áreas degradadas.",
    data: "2024-12-20",
    categoria: "Meio Ambiente",
    imagem: "https://via.placeholder.com/400x250/10b981/ffffff?text=Meio+Ambiente",
    link: "https://desbravadores.org.br"
  },
  {
    id: 6,
    titulo: "Investidura 2024: Mais de 50 Mil Desbravadores Investidos",
    resumo: "Cerimônias de investidura acontecem em todo o país, celebrando a conquista de classes e especialidades.",
    data: "2024-12-15",
    categoria: "Investidura",
    imagem: "https://via.placeholder.com/400x250/2563eb/ffffff?text=Investidura",
    link: "https://desbravadores.org.br"
  }
]

const categorias = {
  "Eventos": { color: "bg-blue-500", icon: "📅" },
  "Especialidades": { color: "bg-purple-500", icon: "⭐" },
  "Ação Social": { color: "bg-pink-500", icon: "❤️" },
  "Capacitação": { color: "bg-orange-500", icon: "🎓" },
  "Meio Ambiente": { color: "bg-green-500", icon: "🌳" },
  "Investidura": { color: "bg-blue-600", icon: "🏆" }
}

export function NoticiasDesbravadores() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')

  useEffect(() => {
    carregarNoticias()
  }, [])

  const carregarNoticias = () => {
    setLoading(true)
    // Simula carregamento de API
    setTimeout(() => {
      setNoticias(noticiasMock)
      setLoading(false)
    }, 1000)
  }

  const noticiasFiltradas = filtroCategoria === 'Todas'
    ? noticias
    : noticias.filter(n => n.categoria === filtroCategoria)

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
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
              <Newspaper className="h-12 w-12 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Notícias dos Desbravadores</h1>
            <p className="text-muted-foreground">
              Fique por dentro das últimas novidades do mundo dos Desbravadores
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              variant={filtroCategoria === 'Todas' ? 'default' : 'outline'}
              onClick={() => setFiltroCategoria('Todas')}
            >
              Todas
            </Button>
            {Object.keys(categorias).map(cat => (
              <Button
                key={cat}
                variant={filtroCategoria === cat ? 'default' : 'outline'}
                onClick={() => setFiltroCategoria(cat)}
              >
                {categorias[cat].icon} {cat}
              </Button>
            ))}
            <Button variant="outline" onClick={carregarNoticias}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <CardHeader>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* Grid de Notícias */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {noticiasFiltradas.map((noticia, index) => (
                  <motion.div
                    key={noticia.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      {/* Imagem */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={noticia.imagem}
                          alt={noticia.titulo}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className={`absolute top-2 right-2 ${categorias[noticia.categoria].color} text-white`}>
                          {categorias[noticia.categoria].icon} {noticia.categoria}
                        </Badge>
                      </div>

                      {/* Conteúdo */}
                      <CardHeader className="flex-1">
                        <CardTitle className="line-clamp-2">{noticia.titulo}</CardTitle>
                        <CardDescription className="line-clamp-3 mt-2">
                          {noticia.resumo}
                        </CardDescription>
                      </CardHeader>

                      {/* Footer */}
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatarData(noticia.data)}
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" asChild>
                          <a href={noticia.link} target="_blank" rel="noopener noreferrer">
                            Ler Mais
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Mensagem se não houver notícias */}
              {noticiasFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma notícia encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente selecionar outra categoria ou aguarde novas atualizações
                  </p>
                </div>
              )}
            </>
          )}

          {/* Informação sobre atualização */}
          <div className="mt-12 text-center">
            <Card className="inline-block">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    As notícias são atualizadas automaticamente do site oficial dos Desbravadores
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

