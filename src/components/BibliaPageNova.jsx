import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  BookText, 
  BookMarked, 
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  BookOpen
} from 'lucide-react'
import { livrosBiblia } from '../data/biblia.js'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Versões disponíveis (simuladas - em produção viriam da API)
const versoes = [
  { id: 'arc', nome: 'Almeida Revista e Corrigida', sigla: 'ARC' },
  { id: 'acf', nome: 'Almeida Corrigida Fiel', sigla: 'ACF' },
  { id: 'nvi', nome: 'Nova Versão Internacional', sigla: 'NVI' }
]

// Dados de exemplo para quando a API não estiver disponível
const getVersiculosExemplo = (livro, capitulo) => {
  const exemplos = {
    'Gênesis': {
      1: [
        { number: 1, text: 'No princípio criou Deus os céus e a terra.' },
        { number: 2, text: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
        { number: 3, text: 'E disse Deus: Haja luz. E houve luz.' },
        { number: 4, text: 'E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.' },
        { number: 5, text: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.' }
      ]
    },
    'João': {
      1: [
        { number: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
        { number: 2, text: 'Ele estava no princípio com Deus.' },
        { number: 3, text: 'Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.' },
        { number: 4, text: 'Nele estava a vida, e a vida era a luz dos homens.' },
        { number: 5, text: 'E a luz resplandece nas trevas, e as trevas não a compreenderam.' }
      ],
      3: [
        { number: 16, text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
        { number: 17, text: 'Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.' }
      ]
    },
    'Salmos': {
      23: [
        { number: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
        { number: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
        { number: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
        { number: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
        { number: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
        { number: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.' }
      ]
    }
  }

  return exemplos[livro]?.[capitulo] || [
    { number: 1, text: `Versículo 1 de ${livro} ${capitulo}` },
    { number: 2, text: `Versículo 2 de ${livro} ${capitulo}` },
    { number: 3, text: `Versículo 3 de ${livro} ${capitulo}` }
  ]
}

export function BibliaPageNova() {
  const [selectedTestament, setSelectedTestament] = useState('Antigo Testamento')
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [selectedVersion, setSelectedVersion] = useState('arc')
  const [versiculos, setVersiculos] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const testaments = Object.keys(livrosBiblia)

  // Carregar versículos quando livro ou capítulo mudar
  useEffect(() => {
    if (selectedBook) {
      carregarVersiculos()
    }
  }, [selectedBook, selectedChapter, selectedVersion])

  const carregarVersiculos = async () => {
    setLoading(true)
    try {
      // Simular carregamento da API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Usar dados de exemplo
      const versos = getVersiculosExemplo(selectedBook.nome, selectedChapter)
      setVersiculos(versos)
    } catch (error) {
      console.error('Erro ao carregar versículos:', error)
      setVersiculos([])
    } finally {
      setLoading(false)
    }
  }

  const proximoCapitulo = () => {
    if (selectedBook && selectedChapter < selectedBook.capitulos) {
      setSelectedChapter(selectedChapter + 1)
    }
  }

  const capituloAnterior = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1)
    }
  }

  const filteredBooks = livrosBiblia[selectedTestament].filter(livro =>
    livro.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center gap-3">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <BookText className="h-10 w-10" />
            </motion.div>
            Bíblia Sagrada
          </h1>
          <p className="text-muted-foreground text-lg">Leia e estude a Palavra de Deus em múltiplas versões</p>
        </motion.div>

        {/* Seletor de Versão */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Versão da Bíblia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {versoes.map((versao) => (
                  <motion.div
                    key={versao.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedVersion === versao.id ? 'default' : 'outline'}
                      onClick={() => setSelectedVersion(versao.id)}
                      className="flex flex-col items-start h-auto py-3"
                    >
                      <span className="font-bold">{versao.sigla}</span>
                      <span className="text-xs opacity-80">{versao.nome}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Seleção de Livro */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Livros da Bíblia</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar livro..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs value={selectedTestament} onValueChange={setSelectedTestament} className="mt-4">
                  <TabsList className="grid grid-cols-2 w-full">
                    {testaments.map(testament => (
                      <TabsTrigger key={testament} value={testament} className="text-xs">
                        {testament.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="space-y-1 max-h-[600px] overflow-y-auto">
                {filteredBooks.map((livro, index) => (
                  <motion.button
                    key={livro.nome}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => {
                      setSelectedBook(livro)
                      setSelectedChapter(1)
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedBook?.nome === livro.nome
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{livro.nome}</div>
                        <div className="text-xs opacity-70">{livro.capitulos} cap.</div>
                      </div>
                      {selectedBook?.nome === livro.nome && (
                        <BookMarked className="h-4 w-4" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedBook ? (
                <motion.div
                  key={`${selectedBook.nome}-${selectedChapter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            {selectedBook.nome} {selectedChapter}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {versoes.find(v => v.id === selectedVersion)?.nome}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          Cap. {selectedChapter} de {selectedBook.capitulos}
                        </Badge>
                      </div>

                      {/* Navegação de Capítulos */}
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={capituloAnterior}
                          disabled={selectedChapter === 1}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Anterior
                        </Button>

                        <div className="flex-1 flex flex-wrap gap-1 justify-center">
                          {Array.from({ length: Math.min(selectedBook.capitulos, 20) }, (_, i) => i + 1).map((cap) => (
                            <motion.div
                              key={cap}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant={cap === selectedChapter ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setSelectedChapter(cap)}
                                className="w-10 h-10 p-0"
                              >
                                {cap}
                              </Button>
                            </motion.div>
                          ))}
                          {selectedBook.capitulos > 20 && (
                            <span className="flex items-center px-2 text-muted-foreground">...</span>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={proximoCapitulo}
                          disabled={selectedChapter === selectedBook.capitulos}
                        >
                          Próximo
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {loading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <span className="ml-3 text-muted-foreground">Carregando versículos...</span>
                        </div>
                      ) : (
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {versiculos.map((versiculo, index) => (
                            <motion.div
                              key={versiculo.number}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                            >
                              <span className="text-primary font-bold text-lg flex-shrink-0 w-8">
                                {versiculo.number}
                              </span>
                              <p className="text-lg leading-relaxed">
                                {versiculo.text}
                              </p>
                            </motion.div>
                          ))}

                          {versiculos.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                              <BookText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>Nenhum versículo disponível</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="h-full flex items-center justify-center min-h-[500px]">
                    <CardContent className="text-center py-12">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <BookText className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">Selecione um Livro</h3>
                      <p className="text-muted-foreground">
                        Escolha um livro da Bíblia ao lado para começar a leitura
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dica de Uso */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-lg">💡 Dica de Estudo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experimente ler o mesmo capítulo em diferentes versões para uma compreensão mais profunda do texto bíblico. 
                Cada tradução oferece nuances únicas que podem enriquecer seu estudo.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

