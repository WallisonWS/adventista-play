import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  BookOpen, 
  Heart, 
  Search,
  Star,
  Calendar,
  ChevronRight,
  Sparkles
} from 'lucide-react'

// Livros de Ellen White
const livrosEllenWhite = [
  {
    id: 1,
    titulo: "Caminho a Cristo",
    categoria: "Vida Cristã",
    descricao: "Um guia simples e prático para encontrar Jesus e viver uma vida cristã plena",
    capitulos: 13,
    cor: "bg-blue-500"
  },
  {
    id: 2,
    titulo: "O Desejado de Todas as Nações",
    categoria: "Vida de Cristo",
    descricao: "A história completa da vida de Jesus Cristo, desde o nascimento até a ascensão",
    capitulos: 87,
    cor: "bg-purple-500"
  },
  {
    id: 3,
    titulo: "O Grande Conflito",
    categoria: "Profecia",
    descricao: "A história do conflito entre Cristo e Satanás desde a queda de Lúcifer até o fim dos tempos",
    capitulos: 42,
    cor: "bg-red-500"
  },
  {
    id: 4,
    titulo: "Patriarcas e Profetas",
    categoria: "História Bíblica",
    descricao: "A história do Antigo Testamento desde a criação até o reinado de Davi",
    capitulos: 78,
    cor: "bg-green-500"
  },
  {
    id: 5,
    titulo: "Atos dos Apóstolos",
    categoria: "História da Igreja",
    descricao: "A história da igreja primitiva e a expansão do evangelho",
    capitulos: 58,
    cor: "bg-orange-500"
  },
  {
    id: 6,
    titulo: "Educação",
    categoria: "Educação",
    descricao: "Princípios da verdadeira educação cristã",
    capitulos: 21,
    cor: "bg-indigo-500"
  },
  {
    id: 7,
    titulo: "Ciência do Bom Viver",
    categoria: "Saúde",
    descricao: "Princípios de saúde física, mental e espiritual",
    capitulos: 31,
    cor: "bg-teal-500"
  },
  {
    id: 8,
    titulo: "Mensagens aos Jovens",
    categoria: "Juventude",
    descricao: "Conselhos especiais para a juventude adventista",
    capitulos: 15,
    cor: "bg-pink-500"
  },
  {
    id: 9,
    titulo: "Lar Adventista",
    categoria: "Família",
    descricao: "Orientações para construir um lar cristão feliz",
    capitulos: 89,
    cor: "bg-amber-500"
  },
  {
    id: 10,
    titulo: "Testemunhos Para a Igreja - Vol. 1",
    categoria: "Testemunhos",
    descricao: "Mensagens inspiradas para a igreja remanescente",
    capitulos: 78,
    cor: "bg-cyan-500"
  },
  {
    id: 11,
    titulo: "Conselhos Sobre Saúde",
    categoria: "Saúde",
    descricao: "Orientações divinas sobre reforma de saúde",
    capitulos: 56,
    cor: "bg-lime-500"
  },
  {
    id: 12,
    titulo: "Vida de Jesus",
    categoria: "Vida de Cristo",
    descricao: "Versão resumida de O Desejado de Todas as Nações",
    capitulos: 87,
    cor: "bg-violet-500"
  }
]

// Meditações diárias
const meditacoesDiarias = [
  {
    id: 1,
    titulo: "Meditações Matinais",
    ano: 2025,
    descricao: "Reflexões diárias para começar o dia com Deus",
    disponivel: true
  },
  {
    id: 2,
    titulo: "Filhos e Filhas de Deus",
    ano: 2024,
    descricao: "Meditações sobre nossa identidade como filhos de Deus",
    disponivel: true
  },
  {
    id: 3,
    titulo: "Nos Lugares Celestiais",
    ano: 2023,
    descricao: "Meditações sobre a vida cristã vitoriosa",
    disponivel: true
  }
]

export function EllenWhitePage() {
  const [busca, setBusca] = useState('')
  const [livroSelecionado, setLivroSelecionado] = useState(null)

  const livrosFiltrados = livrosEllenWhite.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.categoria.toLowerCase().includes(busca.toLowerCase())
  )

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
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-6 bg-primary/10 rounded-full">
              <BookOpen className="h-16 w-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-primary">Ellen G. White</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Mensageira do Senhor - Leia os escritos inspirados que têm abençoado milhões ao redor do mundo
          </p>
          
          {/* Busca */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar livros..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Meditações Diárias */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-primary" />
            Meditações Diárias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meditacoesDiarias.map((meditacao, index) => (
              <motion.div
                key={meditacao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{meditacao.titulo}</CardTitle>
                        <CardDescription>{meditacao.descricao}</CardDescription>
                      </div>
                      <Heart className="h-8 w-8 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge>{meditacao.ano}</Badge>
                      <Button size="sm">
                        Ler Hoje
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Biblioteca de Livros */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            Biblioteca Completa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livrosFiltrados.map((livro, index) => (
              <motion.div
                key={livro.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
                  <CardHeader className={`${livro.cor} text-white rounded-t-lg`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{livro.titulo}</CardTitle>
                        <CardDescription className="text-white/90">{livro.categoria}</CardDescription>
                      </div>
                      <Sparkles className="h-6 w-6 flex-shrink-0" />
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-4">
                    <p className="text-sm text-muted-foreground">{livro.descricao}</p>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{livro.capitulos} capítulos</Badge>
                      <Button size="sm">
                        Começar a Ler
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {livrosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum livro encontrado com "{busca}"</p>
            </div>
          )}
        </section>

        {/* Informação sobre Ellen White */}
        <section className="mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Star className="h-12 w-12 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Sobre Ellen G. White</h3>
                  <p className="text-muted-foreground mb-4">
                    Ellen Gould White (1827-1915) é reconhecida pela Igreja Adventista do Sétimo Dia como tendo 
                    recebido o dom profético. Durante seus 70 anos de ministério público, ela escreveu mais de 
                    5.000 artigos e 40 livros. Seus escritos cobrem uma ampla variedade de tópicos, incluindo 
                    religião, educação, saúde, relações sociais e evangelismo.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    "A Bíblia é a única regra de fé e doutrina. Os escritos de Ellen White são uma luz menor 
                    que conduz à luz maior, a Bíblia."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

