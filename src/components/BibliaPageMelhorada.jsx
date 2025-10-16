import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BookOpen, 
  Search, 
  BookMarked, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Heart,
  Share2,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon
} from 'lucide-react'

// Dados da Bíblia
const livrosBiblia = {
  antigoTestamento: [
    { id: 'genesis', nome: 'Gênesis', abrev: 'Gn', capitulos: 50 },
    { id: 'exodo', nome: 'Êxodo', abrev: 'Êx', capitulos: 40 },
    { id: 'levitico', nome: 'Levítico', abrev: 'Lv', capitulos: 27 },
    { id: 'numeros', nome: 'Números', abrev: 'Nm', capitulos: 36 },
    { id: 'deuteronomio', nome: 'Deuteronômio', abrev: 'Dt', capitulos: 34 },
    { id: 'josue', nome: 'Josué', abrev: 'Js', capitulos: 24 },
    { id: 'juizes', nome: 'Juízes', abrev: 'Jz', capitulos: 21 },
    { id: 'rute', nome: 'Rute', abrev: 'Rt', capitulos: 4 },
    { id: '1samuel', nome: '1 Samuel', abrev: '1Sm', capitulos: 31 },
    { id: '2samuel', nome: '2 Samuel', abrev: '2Sm', capitulos: 24 },
    { id: '1reis', nome: '1 Reis', abrev: '1Rs', capitulos: 22 },
    { id: '2reis', nome: '2 Reis', abrev: '2Rs', capitulos: 25 },
    { id: 'salmos', nome: 'Salmos', abrev: 'Sl', capitulos: 150 },
    { id: 'proverbios', nome: 'Provérbios', abrev: 'Pv', capitulos: 31 },
    { id: 'isaias', nome: 'Isaías', abrev: 'Is', capitulos: 66 },
    { id: 'daniel', nome: 'Daniel', abrev: 'Dn', capitulos: 12 },
  ],
  novoTestamento: [
    { id: 'mateus', nome: 'Mateus', abrev: 'Mt', capitulos: 28 },
    { id: 'marcos', nome: 'Marcos', abrev: 'Mc', capitulos: 16 },
    { id: 'lucas', nome: 'Lucas', abrev: 'Lc', capitulos: 24 },
    { id: 'joao', nome: 'João', abrev: 'Jo', capitulos: 21 },
    { id: 'atos', nome: 'Atos', abrev: 'At', capitulos: 28 },
    { id: 'romanos', nome: 'Romanos', abrev: 'Rm', capitulos: 16 },
    { id: '1corintios', nome: '1 Coríntios', abrev: '1Co', capitulos: 16 },
    { id: '2corintios', nome: '2 Coríntios', abrev: '2Co', capitulos: 13 },
    { id: 'galatas', nome: 'Gálatas', abrev: 'Gl', capitulos: 6 },
    { id: 'efesios', nome: 'Efésios', abrev: 'Ef', capitulos: 6 },
    { id: 'filipenses', nome: 'Filipenses', abrev: 'Fp', capitulos: 4 },
    { id: 'colossenses', nome: 'Colossenses', abrev: 'Cl', capitulos: 4 },
    { id: 'hebreus', nome: 'Hebreus', abrev: 'Hb', capitulos: 13 },
    { id: 'apocalipse', nome: 'Apocalipse', abrev: 'Ap', capitulos: 22 },
  ]
}

// Versículos de exemplo (em produção, viria de uma API)
const versiculosExemplo = {
  'joao-3': [
    { numero: 1, texto: 'E havia entre os fariseus um homem, chamado Nicodemos, príncipe dos judeus.' },
    { numero: 2, texto: 'Este foi ter de noite com Jesus, e disse-lhe: Rabi, bem sabemos que és Mestre, vindo de Deus; porque ninguém pode fazer estes sinais que tu fazes, se Deus não for com ele.' },
    { numero: 3, texto: 'Jesus respondeu, e disse-lhe: Na verdade, na verdade te digo que aquele que não nascer de novo, não pode ver o reino de Deus.' },
    { numero: 4, texto: 'Disse-lhe Nicodemos: Como pode um homem nascer, sendo velho? Pode, porventura, tornar a entrar no ventre de sua mãe, e nascer?' },
    { numero: 5, texto: 'Jesus respondeu: Na verdade, na verdade te digo que aquele que não nascer da água e do Espírito, não pode entrar no reino de Deus.' },
    { numero: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
    { numero: 17, texto: 'Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.' },
  ],
  'genesis-1': [
    { numero: 1, texto: 'No princípio criou Deus os céus e a terra.' },
    { numero: 2, texto: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
    { numero: 3, texto: 'E disse Deus: Haja luz; e houve luz.' },
    { numero: 26, texto: 'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo o réptil que se move sobre a terra.' },
    { numero: 27, texto: 'E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.' },
  ],
  'salmos-23': [
    { numero: 1, texto: 'O Senhor é o meu pastor, nada me faltará.' },
    { numero: 2, texto: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
    { numero: 3, texto: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
    { numero: 4, texto: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
    { numero: 5, texto: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
    { numero: 6, texto: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.' },
  ],
  'mateus-5': [
    { numero: 1, texto: 'E Jesus, vendo a multidão, subiu a um monte, e, assentando-se, aproximaram-se dele os seus discípulos;' },
    { numero: 2, texto: 'E, abrindo a sua boca, os ensinava, dizendo:' },
    { numero: 3, texto: 'Bem-aventurados os pobres de espírito, porque deles é o reino dos céus;' },
    { numero: 4, texto: 'Bem-aventurados os que choram, porque eles serão consolados;' },
    { numero: 5, texto: 'Bem-aventurados os mansos, porque eles herdarão a terra;' },
    { numero: 6, texto: 'Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos;' },
    { numero: 7, texto: 'Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia;' },
    { numero: 8, texto: 'Bem-aventurados os limpos de coração, porque eles verão a Deus;' },
    { numero: 9, texto: 'Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus;' },
    { numero: 14, texto: 'Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte;' },
    { numero: 16, texto: 'Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus.' },
  ],
  'romanos-8': [
    { numero: 1, texto: 'Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.' },
    { numero: 28, texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
    { numero: 31, texto: 'Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?' },
    { numero: 35, texto: 'Quem nos separará do amor de Cristo? A tribulação, ou a angústia, ou a perseguição, ou a fome, ou a nudez, ou o perigo, ou a espada?' },
    { numero: 37, texto: 'Mas em todas estas coisas somos mais do que vencedores, por aquele que nos amou.' },
    { numero: 38, texto: 'Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir,' },
    { numero: 39, texto: 'Nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor.' },
  ]
}

export function BibliaPageMelhorada() {
  const [livroSelecionado, setLivroSelecionado] = useState(null)
  const [capituloSelecionado, setCapituloSelecionado] = useState(null)
  const [versao, setVersao] = useState('ARC')
  const [busca, setBusca] = useState('')
  const [tamanhoFonte, setTamanhoFonte] = useState(18)
  const [modoNoturno, setModoNoturno] = useState(false)
  const [versiculosFavoritos, setVersiculosFavoritos] = useState([])
  const [versiculoCopiado, setVersiculoCopiado] = useState(null)

  const todosLivros = [...livrosBiblia.antigoTestamento, ...livrosBiblia.novoTestamento]

  const copiarVersiculo = (livro, capitulo, versiculo) => {
    const texto = `${livro} ${capitulo}:${versiculo.numero} - ${versiculo.texto}`
    navigator.clipboard.writeText(texto)
    setVersiculoCopiado(versiculo.numero)
    setTimeout(() => setVersiculoCopiado(null), 2000)
  }

  const toggleFavorito = (versiculo) => {
    if (versiculosFavoritos.includes(versiculo.numero)) {
      setVersiculosFavoritos(versiculosFavoritos.filter(v => v !== versiculo.numero))
    } else {
      setVersiculosFavoritos([...versiculosFavoritos, versiculo.numero])
    }
  }

  // Se um capítulo está selecionado, mostrar o leitor
  if (capituloSelecionado && livroSelecionado) {
    const chave = `${livroSelecionado.id}-${capituloSelecionado}`
    const versiculos = versiculosExemplo[chave] || []
    
    const proximoCapitulo = () => {
      if (capituloSelecionado < livroSelecionado.capitulos) {
        setCapituloSelecionado(capituloSelecionado + 1)
      }
    }

    const capituloAnterior = () => {
      if (capituloSelecionado > 1) {
        setCapituloSelecionado(capituloSelecionado - 1)
      }
    }

    return (
      <div className={`min-h-screen ${modoNoturno ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-blue-50 to-white'} py-8 px-4`}>
        <div className="container mx-auto max-w-4xl">
          {/* Barra de ferramentas */}
          <motion.div 
            className={`${modoNoturno ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 mb-6 sticky top-20 z-40`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => { setCapituloSelecionado(null); setLivroSelecionado(null) }}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar
                </Button>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {livroSelecionado.nome} {capituloSelecionado}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <select 
                  value={versao} 
                  onChange={(e) => setVersao(e.target.value)}
                  className={`px-3 py-2 rounded-md border ${modoNoturno ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  <option value="ARC">Almeida RC</option>
                  <option value="ACF">Almeida CF</option>
                  <option value="NVI">Nova VI</option>
                </select>

                <Button variant="outline" size="sm" onClick={() => setTamanhoFonte(Math.max(14, tamanhoFonte - 2))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{tamanhoFonte}px</span>
                <Button variant="outline" size="sm" onClick={() => setTamanhoFonte(Math.min(24, tamanhoFonte + 2))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="sm" onClick={() => setModoNoturno(!modoNoturno)}>
                  {modoNoturno ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Conteúdo do capítulo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`${modoNoturno ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-xl`}>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-3xl" style={{ color: '#2E3192' }}>
                  {livroSelecionado.nome} - Capítulo {capituloSelecionado}
                </CardTitle>
                <CardDescription className={modoNoturno ? 'text-gray-400' : ''}>
                  Versão: {versao === 'ARC' ? 'Almeida Revista e Corrigida' : versao === 'ACF' ? 'Almeida Corrigida Fiel' : 'Nova Versão Internacional'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                {versiculos.length > 0 ? (
                  <div className="space-y-6">
                    {versiculos.map((versiculo) => (
                      <motion.div
                        key={versiculo.numero}
                        className={`group p-4 rounded-lg transition-all ${
                          modoNoturno ? 'hover:bg-gray-700' : 'hover:bg-blue-50'
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: versiculo.numero * 0.05 }}
                      >
                        <div className="flex gap-4">
                          <Badge 
                            variant="outline" 
                            className="h-8 w-8 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: '#7CB342', color: '#7CB342' }}
                          >
                            {versiculo.numero}
                          </Badge>
                          
                          <div className="flex-1">
                            <p 
                              className={`leading-relaxed ${modoNoturno ? 'text-gray-200' : 'text-gray-800'}`}
                              style={{ fontSize: `${tamanhoFonte}px`, lineHeight: '1.8' }}
                            >
                              {versiculo.texto}
                            </p>
                            
                            {/* Ações do versículo */}
                            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleFavorito(versiculo)}
                                className={versiculosFavoritos.includes(versiculo.numero) ? 'text-red-500' : ''}
                              >
                                <Heart className={`h-4 w-4 ${versiculosFavoritos.includes(versiculo.numero) ? 'fill-current' : ''}`} />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copiarVersiculo(livroSelecionado.nome, capituloSelecionado, versiculo)}
                              >
                                {versiculoCopiado === versiculo.numero ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: '#7CB342' }} />
                    <p className={`text-xl font-semibold mb-4 ${modoNoturno ? 'text-gray-300' : 'text-gray-700'}`}>
                      {livroSelecionado.nome} {capituloSelecionado}
                    </p>
                    <p className={`text-lg mb-2 ${modoNoturno ? 'text-gray-400' : 'text-gray-600'}`}>
                      Este capítulo está disponível para leitura!
                    </p>
                    <p className={`text-sm ${modoNoturno ? 'text-gray-500' : 'text-gray-500'}`}>
                      Explore outros capítulos ou use a busca para encontrar versículos específicos.
                    </p>
                    <div className="mt-6 flex gap-4 justify-center">
                      <Button onClick={() => setCapituloSelecionado(null)} variant="outline">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Escolher Outro Capítulo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Navegação entre capítulos */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              size="lg"
              onClick={capituloAnterior}
              disabled={capituloSelecionado === 1}
              className={modoNoturno ? 'bg-gray-800 border-gray-700' : ''}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Capítulo Anterior
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={proximoCapitulo}
              disabled={capituloSelecionado === livroSelecionado.capitulos}
              className={modoNoturno ? 'bg-gray-800 border-gray-700' : ''}
            >
              Próximo Capítulo
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Se um livro está selecionado, mostrar capítulos
  if (livroSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setLivroSelecionado(null)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Voltar aos Livros
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl" style={{ color: '#2E3192' }}>
                  {livroSelecionado.nome}
                </CardTitle>
                <CardDescription className="text-lg">
                  Selecione um capítulo para começar a leitura
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                  {Array.from({ length: livroSelecionado.capitulos }, (_, i) => i + 1).map((cap) => (
                    <motion.button
                      key={cap}
                      onClick={() => setCapituloSelecionado(cap)}
                      className="aspect-square rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all font-semibold text-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: cap * 0.01 }}
                    >
                      {cap}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Tela inicial - seleção de livro
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-2" style={{ color: '#2E3192' }}>
            📖 Bíblia Sagrada
          </h1>
          <p className="text-xl text-gray-600">
            Leia e estude a Palavra de Deus com ferramentas modernas
          </p>
        </motion.div>

        {/* Busca */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar versículo, palavra ou referência (ex: João 3:16)"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </motion.div>

        {/* Tabs AT/NT */}
        <Tabs defaultValue="nt" className="mb-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="at">Antigo Testamento</TabsTrigger>
            <TabsTrigger value="nt">Novo Testamento</TabsTrigger>
          </TabsList>

          <TabsContent value="at">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {livrosBiblia.antigoTestamento.map((livro, index) => (
                <motion.div
                  key={livro.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary"
                    onClick={() => setLivroSelecionado(livro)}
                  >
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-3" style={{ color: '#7CB342' }} />
                      <h3 className="font-bold text-lg mb-1">{livro.nome}</h3>
                      <Badge variant="secondary">{livro.capitulos} cap.</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nt">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {livrosBiblia.novoTestamento.map((livro, index) => (
                <motion.div
                  key={livro.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary"
                    onClick={() => setLivroSelecionado(livro)}
                  >
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-3" style={{ color: '#2E3192' }} />
                      <h3 className="font-bold text-lg mb-1">{livro.nome}</h3>
                      <Badge variant="secondary">{livro.capitulos} cap.</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

