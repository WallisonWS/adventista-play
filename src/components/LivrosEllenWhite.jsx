import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { Progress } from './ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx'
import { 
  Book, 
  BookOpen, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Bookmark,
  BookmarkCheck,
  List,
  FileText
} from 'lucide-react'
import { livrosEllenWhite } from '../data/livros-ellen-white-completo.js'

// Importar capas dos livros
import grandeConflitoImg from '../assets/livros-capas/grande-conflito.jpg'
import caminhoCristoImg from '../assets/livros-capas/caminho-cristo.jpg'
import patriarcasProfetasImg from '../assets/livros-capas/patriarcas-profetas.png'
import desejadoNacoesImg from '../assets/livros-capas/desejado-nacoes.png'
import atosApostolosImg from '../assets/livros-capas/atos-apostolos.jpg'
import educacaoImg from '../assets/livros-capas/educacao.jpg'

// Mapeamento de IDs para imagens importadas
const capasImportadas = {
  1: grandeConflitoImg,
  2: caminhoCristoImg,
  3: patriarcasProfetasImg,
  4: desejadoNacoesImg,
  5: atosApostolosImg,
  6: educacaoImg
}

// Mapeamento de títulos de capítulos por livro
const titulosCapitulos = {
  1: [ // O Grande Conflito
    'Predito o Destino do Mundo',
    'O Valor dos Mártires',
    'Como Começaram as Trevas Morais',
    'Um Povo que Guardou a Verdade Viva',
    'A Reforma na Inglaterra',
    'Dois Heróis da Idade Média',
    'Lutero Diante da Dieta',
    'Lutero e a Reforma na Suíça',
    'Progresso da Reforma na Alemanha',
    'Protesto dos Príncipes',
    'A Reforma na França',
    'A Reforma nos Países Baixos e Escandinávia',
    'Mais Tarde, Reformadores Ingleses',
    'As Trevas Espirituais do Século 18',
    'A Bíblia e a Revolução Francesa',
    'Os Peregrinos Buscam Liberdade',
    'Arautos de uma Nova Era',
    'Um Reformador Americano',
    'Luz Através das Trevas',
    'Um Grande Despertar Religioso'
    // ... mais capítulos
  ],
  2: [ // Caminho a Cristo
    'O Amor de Deus',
    'O Pecador Necessita de Cristo',
    'Arrependimento',
    'Confissão',
    'Consagração',
    'Fé e Aceitação',
    'O Teste do Discipulado',
    'Crescendo em Cristo',
    'O Trabalho e a Vida',
    'O Conhecimento de Deus',
    'O Privilégio de Orar',
    'O Que Fazer com a Dúvida',
    'Regozijando-se no Senhor'
  ]
}

// Gerar estrutura de capítulos com informação sobre onde ler
const gerarCapitulosExemplo = (livroId, numCapitulos) => {
  const capitulos = []
  const titulos = titulosCapitulos[livroId] || []
  
  for (let i = 1; i <= numCapitulos; i++) {
    const titulo = titulos[i - 1] || `Capítulo ${i}`
    capitulos.push({
      numero: i,
      titulo: titulo,
      conteudo: `
# ${titulo}

## 📖 Leia o Conteúdo Completo Online

Os livros de Ellen G. White estão disponíveis **gratuitamente** nos seguintes sites oficiais:

### 🌐 Fontes Oficiais Recomendadas:

**1. Ellen G. White Writings (Site Oficial)**
- 🔗 [egwwritings.org/pt](https://m.egwwritings.org/pt)
- ✅ Conteúdo oficial e completo em português
- ✅ Pesquisa avançada por tópicos
- ✅ Disponível em múltiplos idiomas

**2. Centro White Brasil**
- 🔗 [centrowhite.org.br](https://centrowhite.org.br)
- ✅ Livros em PDF para download
- ✅ Recursos em português

**3. Casa Publicadora Brasileira**
- 🔗 [ellenwhite.cpb.com.br](https://ellenwhite.cpb.com.br)
- ✅ Leitura online organizada por capítulos
- ✅ Interface em português

---

## 💡 Por que não está disponível aqui?

Os livros de Ellen G. White são protegidos por direitos autorais e estão disponíveis gratuitamente através dos sites oficiais acima. Recomendamos acessar essas fontes para:

- ✅ Garantir a **autenticidade** do texto
- ✅ Ter acesso a **recursos adicionais** (notas, referências)
- ✅ Apoiar o trabalho oficial de preservação
- ✅ Acessar **atualizações** e correções

---

## 📱 Como Ler?

**Opção 1: Online**
Acesse qualquer um dos links acima e navegue pelos capítulos.

**Opção 2: Download**
Baixe os PDFs completos no Centro White Brasil.

**Opção 3: Aplicativo**
Baixe o app oficial "Ellen White Writings" na App Store ou Google Play.

---

## 🔖 Marcador Salvo

Seu progresso de leitura está sendo salvo automaticamente neste aplicativo. Quando retornar, você continuará de onde parou!
      `
    })
  }
  
  return capitulos
}

export function LivrosEllenWhite() {
  const [livroSelecionado, setLivroSelecionado] = useState(null)
  const [capituloAtual, setCapituloAtual] = useState(1)
  const [marcadores, setMarcadores] = useState({})
  const [mostrarIndice, setMostrarIndice] = useState(false)
  
  // Carregar marcadores do localStorage
  useEffect(() => {
    const marcadoresSalvos = localStorage.getItem('marcadores-ellen-white')
    if (marcadoresSalvos) {
      setMarcadores(JSON.parse(marcadoresSalvos))
    }
  }, [])
  
  // Salvar marcadores no localStorage
  const salvarMarcador = (livroId, capitulo) => {
    const novosMarcadores = {
      ...marcadores,
      [livroId]: capitulo
    }
    setMarcadores(novosMarcadores)
    localStorage.setItem('marcadores-ellen-white', JSON.stringify(novosMarcadores))
  }
  
  // Obter progresso de leitura
  const obterProgresso = (livroId, totalCapitulos) => {
    const capituloMarcado = marcadores[livroId] || 0
    return Math.round((capituloMarcado / totalCapitulos) * 100)
  }
  
  const livros = livrosEllenWhite
  
  // Quando um livro é selecionado, carregar o capítulo marcado ou o primeiro
  useEffect(() => {
    if (livroSelecionado) {
      const capituloMarcado = marcadores[livroSelecionado.id] || 1
      setCapituloAtual(capituloMarcado)
    }
  }, [livroSelecionado, marcadores])
  
  // Gerar capítulos para o livro selecionado
  const capitulos = livroSelecionado 
    ? gerarCapitulosExemplo(livroSelecionado.id, livroSelecionado.capitulos)
    : []
  
  const capituloAtualData = capitulos.find(c => c.numero === capituloAtual)
  
  const proximoCapitulo = () => {
    if (capituloAtual < livroSelecionado.capitulos) {
      const novoCapitulo = capituloAtual + 1
      setCapituloAtual(novoCapitulo)
      salvarMarcador(livroSelecionado.id, novoCapitulo)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const capituloAnterior = () => {
    if (capituloAtual > 1) {
      const novoCapitulo = capituloAtual - 1
      setCapituloAtual(novoCapitulo)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const irParaCapitulo = (numeroCapitulo) => {
    setCapituloAtual(numeroCapitulo)
    setMostrarIndice(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const marcarComoLido = () => {
    salvarMarcador(livroSelecionado.id, capituloAtual)
  }

  // Vista de biblioteca (lista de livros)
  if (!livroSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-6 w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <Book className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Livros de Ellen G. White
            </h1>
            <p className="text-xl text-gray-600">
              Biblioteca completa com {livros.length} livros e sistema de marcadores
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livros.map((livro, index) => {
              const progresso = obterProgresso(livro.id, livro.capitulos)
              const temMarcador = marcadores[livro.id] > 0
              
              return (
                <motion.div
                  key={livro.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                    onClick={() => setLivroSelecionado(livro)}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={capasImportadas[livro.id] || livro.capa} 
                        alt={livro.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.style.backgroundColor = '#f3f4f6'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      {temMarcador && (
                        <div className="absolute top-4 right-4 bg-amber-600 text-white p-2 rounded-full">
                          <BookmarkCheck className="w-5 h-5" />
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <Badge className="bg-amber-600 mb-2">
                          {livro.categoria}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-1">
                          {livro.titulo}
                        </h3>
                        <p className="text-sm opacity-90">
                          {livro.autor}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {livro.descricao}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{livro.capitulos} capítulos</span>
                        <span>{livro.paginas} páginas</span>
                      </div>
                      
                      {temMarcador && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progresso</span>
                            <span>{progresso}%</span>
                          </div>
                          <Progress value={progresso} className="h-2" />
                        </div>
                      )}
                      
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {temMarcador ? 'Continuar Lendo' : 'Começar a Ler'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Vista de leitura (livro aberto com capítulos)
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => {
              setLivroSelecionado(null)
              setMostrarIndice(false)
            }}
            className="hover:bg-amber-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Biblioteca
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setMostrarIndice(!mostrarIndice)}
            className="border-amber-600 text-amber-600 hover:bg-amber-50"
          >
            <List className="w-4 h-4 mr-2" />
            {mostrarIndice ? 'Fechar Índice' : 'Ver Índice'}
          </Button>
        </div>

        <AnimatePresence>
          {mostrarIndice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700">
                    <FileText className="w-5 h-5 mr-2" />
                    Índice de Capítulos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto">
                    {capitulos.map((cap) => (
                      <Button
                        key={cap.numero}
                        variant={cap.numero === capituloAtual ? "default" : "outline"}
                        size="sm"
                        onClick={() => irParaCapitulo(cap.numero)}
                        className={cap.numero === capituloAtual 
                          ? "bg-amber-600 hover:bg-amber-700" 
                          : "hover:bg-amber-50"
                        }
                      >
                        Cap. {cap.numero}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-2xl overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img 
                src={livroSelecionado.capa} 
                alt={livroSelecionado.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <Badge className="bg-amber-600 mb-3">
                  {livroSelecionado.categoria}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {livroSelecionado.titulo}
                </h1>
                <p className="text-lg opacity-90 mb-3">
                  {livroSelecionado.autor}
                </p>
                <div className="flex gap-4 text-sm">
                  <span>Capítulo {capituloAtual} de {livroSelecionado.capitulos}</span>
                  <span>•</span>
                  <span>{Math.round((capituloAtual / livroSelecionado.capitulos) * 100)}% concluído</span>
                </div>
              </div>
            </div>

            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <Progress 
                  value={(capituloAtual / livroSelecionado.capitulos) * 100} 
                  className="h-2"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={capituloAtual}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none"
                >
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                    {capituloAtualData?.conteudo}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={capituloAnterior}
                    disabled={capituloAtual === 1}
                    variant="outline"
                    className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Capítulo Anterior
                  </Button>
                  
                  <Button
                    onClick={marcarComoLido}
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Marcar Posição
                  </Button>
                  
                  <Button
                    onClick={proximoCapitulo}
                    disabled={capituloAtual === livroSelecionado.capitulos}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
                  >
                    Próximo Capítulo
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

