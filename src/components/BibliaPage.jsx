import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  Moon,
  Loader2
} from 'lucide-react'
import { bibliaApiService, historicoService, marcadoresService } from '../services/bibliaApiService'
import { bibliaExemplo } from '../data/biblia-exemplo'
import { bibliaCompleta } from '../data/biblia-completa'

// Dados dos livros da Bíblia
const livrosBiblia = {
  antigoTestamento: [
    { id: 'gn', nome: 'Gênesis', abrev: 'Gn', capitulos: 50 },
    { id: 'ex', nome: 'Êxodo', abrev: 'Êx', capitulos: 40 },
    { id: 'lv', nome: 'Levítico', abrev: 'Lv', capitulos: 27 },
    { id: 'nm', nome: 'Números', abrev: 'Nm', capitulos: 36 },
    { id: 'dt', nome: 'Deuteronômio', abrev: 'Dt', capitulos: 34 },
    { id: 'js', nome: 'Josué', abrev: 'Js', capitulos: 24 },
    { id: 'jz', nome: 'Juízes', abrev: 'Jz', capitulos: 21 },
    { id: 'rt', nome: 'Rute', abrev: 'Rt', capitulos: 4 },
    { id: '1sm', nome: '1 Samuel', abrev: '1Sm', capitulos: 31 },
    { id: '2sm', nome: '2 Samuel', abrev: '2Sm', capitulos: 24 },
    { id: '1rs', nome: '1 Reis', abrev: '1Rs', capitulos: 22 },
    { id: '2rs', nome: '2 Reis', abrev: '2Rs', capitulos: 25 },
    { id: '1cr', nome: '1 Crônicas', abrev: '1Cr', capitulos: 29 },
    { id: '2cr', nome: '2 Crônicas', abrev: '2Cr', capitulos: 36 },
    { id: 'ed', nome: 'Esdras', abrev: 'Ed', capitulos: 10 },
    { id: 'ne', nome: 'Neemias', abrev: 'Ne', capitulos: 13 },
    { id: 'et', nome: 'Ester', abrev: 'Et', capitulos: 10 },
    { id: 'job', nome: 'Jó', abrev: 'Jó', capitulos: 42 },
    { id: 'sl', nome: 'Salmos', abrev: 'Sl', capitulos: 150 },
    { id: 'pv', nome: 'Provérbios', abrev: 'Pv', capitulos: 31 },
    { id: 'ec', nome: 'Eclesiastes', abrev: 'Ec', capitulos: 12 },
    { id: 'ct', nome: 'Cânticos', abrev: 'Ct', capitulos: 8 },
    { id: 'is', nome: 'Isaías', abrev: 'Is', capitulos: 66 },
    { id: 'jr', nome: 'Jeremias', abrev: 'Jr', capitulos: 52 },
    { id: 'lm', nome: 'Lamentações', abrev: 'Lm', capitulos: 5 },
    { id: 'ez', nome: 'Ezequiel', abrev: 'Ez', capitulos: 48 },
    { id: 'dn', nome: 'Daniel', abrev: 'Dn', capitulos: 12 },
    { id: 'os', nome: 'Oséias', abrev: 'Os', capitulos: 14 },
    { id: 'jl', nome: 'Joel', abrev: 'Jl', capitulos: 3 },
    { id: 'am', nome: 'Amós', abrev: 'Am', capitulos: 9 },
    { id: 'ob', nome: 'Obadias', abrev: 'Ob', capitulos: 1 },
    { id: 'jn', nome: 'Jonas', abrev: 'Jn', capitulos: 4 },
    { id: 'mq', nome: 'Miquéias', abrev: 'Mq', capitulos: 7 },
    { id: 'na', nome: 'Naum', abrev: 'Na', capitulos: 3 },
    { id: 'hc', nome: 'Habacuque', abrev: 'Hc', capitulos: 3 },
    { id: 'sf', nome: 'Sofonias', abrev: 'Sf', capitulos: 3 },
    { id: 'ag', nome: 'Ageu', abrev: 'Ag', capitulos: 2 },
    { id: 'zc', nome: 'Zacarias', abrev: 'Zc', capitulos: 14 },
    { id: 'ml', nome: 'Malaquias', abrev: 'Ml', capitulos: 4 },
  ],
  novoTestamento: [
    { id: 'mt', nome: 'Mateus', abrev: 'Mt', capitulos: 28 },
    { id: 'mc', nome: 'Marcos', abrev: 'Mc', capitulos: 16 },
    { id: 'lc', nome: 'Lucas', abrev: 'Lc', capitulos: 24 },
    { id: 'jo', nome: 'João', abrev: 'Jo', capitulos: 21 },
    { id: 'at', nome: 'Atos', abrev: 'At', capitulos: 28 },
    { id: 'rm', nome: 'Romanos', abrev: 'Rm', capitulos: 16 },
    { id: '1co', nome: '1 Coríntios', abrev: '1Co', capitulos: 16 },
    { id: '2co', nome: '2 Coríntios', abrev: '2Co', capitulos: 13 },
    { id: 'gl', nome: 'Gálatas', abrev: 'Gl', capitulos: 6 },
    { id: 'ef', nome: 'Efésios', abrev: 'Ef', capitulos: 6 },
    { id: 'fp', nome: 'Filipenses', abrev: 'Fp', capitulos: 4 },
    { id: 'cl', nome: 'Colossenses', abrev: 'Cl', capitulos: 4 },
    { id: '1ts', nome: '1 Tessalonicenses', abrev: '1Ts', capitulos: 5 },
    { id: '2ts', nome: '2 Tessalonicenses', abrev: '2Ts', capitulos: 3 },
    { id: '1tm', nome: '1 Timóteo', abrev: '1Tm', capitulos: 6 },
    { id: '2tm', nome: '2 Timóteo', abrev: '2Tm', capitulos: 4 },
    { id: 'tt', nome: 'Tito', abrev: 'Tt', capitulos: 3 },
    { id: 'fm', nome: 'Filemom', abrev: 'Fm', capitulos: 1 },
    { id: 'hb', nome: 'Hebreus', abrev: 'Hb', capitulos: 13 },
    { id: 'tg', nome: 'Tiago', abrev: 'Tg', capitulos: 5 },
    { id: '1pe', nome: '1 Pedro', abrev: '1Pe', capitulos: 5 },
    { id: '2pe', nome: '2 Pedro', abrev: '2Pe', capitulos: 3 },
    { id: '1jo', nome: '1 João', abrev: '1Jo', capitulos: 5 },
    { id: '2jo', nome: '2 João', abrev: '2Jo', capitulos: 1 },
    { id: '3jo', nome: '3 João', abrev: '3Jo', capitulos: 1 },
    { id: 'jd', nome: 'Judas', abrev: 'Jd', capitulos: 1 },
    { id: 'ap', nome: 'Apocalipse', abrev: 'Ap', capitulos: 22 },
  ]
}

export function BibliaPage() {
  const { livro: livroParam, capitulo: capituloParam } = useParams()
  const navigate = useNavigate()
  
  const [livroSelecionado, setLivroSelecionado] = useState(null)
  const [capituloSelecionado, setCapituloSelecionado] = useState(null)
  const [versao, setVersao] = useState('ARC')
  const [busca, setBusca] = useState('')
  const [tamanhoFonte, setTamanhoFonte] = useState(18)
  const [modoNoturno, setModoNoturno] = useState(false)
  const [versiculosFavoritos, setVersiculosFavoritos] = useState([])
  const [versiculoCopiado, setVersiculoCopiado] = useState(null)
  const [versiculos, setVersiculos] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const todosLivros = [...livrosBiblia.antigoTestamento, ...livrosBiblia.novoTestamento]

  // Carregar livro e capítulo da URL
  useEffect(() => {
    if (livroParam && capituloParam) {
      const livro = todosLivros.find(l => l.id === livroParam)
      if (livro) {
        setLivroSelecionado(livro)
        setCapituloSelecionado(parseInt(capituloParam))
      }
    }
  }, [livroParam, capituloParam])

  // Carregar versículos quando um capítulo é selecionado
  useEffect(() => {
    if (livroSelecionado && capituloSelecionado) {
      carregarVersiculos()
    }
  }, [livroSelecionado, capituloSelecionado, versao])

  const carregarVersiculos = async () => {
    console.log('🔍 Carregando versículos...', { livro: livroSelecionado?.id, capitulo: capituloSelecionado, versao })
    setCarregando(true)
    setErro(null)
    
    try {
      // Tentar buscar da API primeiro
      const dados = await bibliaApiService.buscarCapitulo(
        versao, 
        livroSelecionado.id, 
        capituloSelecionado
      )
      console.log('📖 Dados recebidos da API:', dados)
      
      if (dados && dados.verses) {
        setVersiculos(dados.verses)
        historicoService.salvarLeitura(livroSelecionado.nome, capituloSelecionado)
      } else {
        // Se API falhar, tentar bibliaCompleta primeiro, depois bibliaExemplo
        const chave = `${livroSelecionado.id}-${capituloSelecionado}`
        const dadosCompletos = bibliaCompleta[chave]
        const dadosExemplo = bibliaExemplo[chave]
        
        if (dadosCompletos) {
          console.log('✅ Usando dados completos:', chave)
          setVersiculos(dadosCompletos.verses)
          historicoService.salvarLeitura(livroSelecionado.nome, capituloSelecionado)
        } else if (dadosExemplo) {
          console.log('✅ Usando dados de exemplo:', chave)
          setVersiculos(dadosExemplo.verses)
          historicoService.salvarLeitura(livroSelecionado.nome, capituloSelecionado)
        } else {
          setErro('Não foi possível carregar os versículos')
          setVersiculos([])
        }
      }
    } catch (error) {
      console.error('❌ Erro ao carregar versículos:', error)
      
      // Fallback para dados completos ou de exemplo
      const chave = `${livroSelecionado.id}-${capituloSelecionado}`
      const dadosCompletos = bibliaCompleta[chave]
      const dadosExemplo = bibliaExemplo[chave]
      
      if (dadosCompletos) {
        console.log('✅ Usando dados completos (fallback):', chave)
        setVersiculos(dadosCompletos.verses)
        historicoService.salvarLeitura(livroSelecionado.nome, capituloSelecionado)
      } else if (dadosExemplo) {
        console.log('✅ Usando dados de exemplo (fallback):', chave)
        setVersiculos(dadosExemplo.verses)
        historicoService.salvarLeitura(livroSelecionado.nome, capituloSelecionado)
      } else {
        setErro('Erro ao carregar os versículos. Tente novamente.')
        setVersiculos([])
      }
    } finally {
      setCarregando(false)
    }
  }

  const copiarVersiculo = (livro, capitulo, versiculo) => {
    const texto = `${livro} ${capitulo}:${versiculo.number} - ${versiculo.text}`
    navigator.clipboard.writeText(texto)
    setVersiculoCopiado(versiculo.number)
    setTimeout(() => setVersiculoCopiado(null), 2000)
  }

  const toggleFavorito = (versiculo) => {
    const id = `${livroSelecionado.id}-${capituloSelecionado}-${versiculo.number}`
    
    if (versiculosFavoritos.includes(id)) {
      setVersiculosFavoritos(versiculosFavoritos.filter(v => v !== id))
      marcadoresService.removerMarcador(id)
    } else {
      setVersiculosFavoritos([...versiculosFavoritos, id])
      marcadoresService.salvarMarcador(
        livroSelecionado.nome, 
        capituloSelecionado, 
        versiculo.number, 
        versiculo.text
      )
    }
  }

  // Se um capítulo está selecionado, mostrar o leitor
  if (capituloSelecionado && livroSelecionado) {
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
                {carregando ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" style={{ color: '#7CB342' }} />
                    <p className={`text-lg ${modoNoturno ? 'text-gray-300' : 'text-gray-700'}`}>
                      Carregando versículos...
                    </p>
                  </div>
                ) : erro ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-red-500" />
                    <p className={`text-xl font-semibold mb-4 ${modoNoturno ? 'text-gray-300' : 'text-gray-700'}`}>
                      {erro}
                    </p>
                    <Button onClick={carregarVersiculos} variant="outline">
                      Tentar Novamente
                    </Button>
                  </div>
                ) : versiculos.length > 0 ? (
                  <div className="space-y-6">
                    {versiculos.map((versiculo) => (
                      <motion.div
                        key={versiculo.number}
                        className={`group p-4 rounded-lg transition-all ${
                          modoNoturno ? 'hover:bg-gray-700' : 'hover:bg-blue-50'
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: versiculo.number * 0.02 }}
                      >
                        <div className="flex gap-4">
                          <Badge 
                            variant="outline" 
                            className="h-8 w-8 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: '#7CB342', color: '#7CB342' }}
                          >
                            {versiculo.number}
                          </Badge>
                          
                          <div className="flex-1">
                            <p 
                              className={`leading-relaxed ${modoNoturno ? 'text-gray-200' : 'text-gray-800'}`}
                              style={{ fontSize: `${tamanhoFonte}px`, lineHeight: '1.8' }}
                            >
                              {versiculo.text}
                            </p>
                            
                            {/* Ações do versículo */}
                            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleFavorito(versiculo)}
                                className={versiculosFavoritos.includes(`${livroSelecionado.id}-${capituloSelecionado}-${versiculo.number}`) ? 'text-red-500' : ''}
                              >
                                <Heart className={`h-4 w-4 ${versiculosFavoritos.includes(`${livroSelecionado.id}-${capituloSelecionado}-${versiculo.number}`) ? 'fill-current' : ''}`} />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copiarVersiculo(livroSelecionado.nome, capituloSelecionado, versiculo)}
                              >
                                {versiculoCopiado === versiculo.number ? (
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
                      Nenhum versículo encontrado
                    </p>
                    <p className={`text-lg mb-2 ${modoNoturno ? 'text-gray-400' : 'text-gray-600'}`}>
                      Tente outro capítulo ou versão.
                    </p>
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
              disabled={capituloSelecionado === 1 || carregando}
              className={modoNoturno ? 'bg-gray-800 border-gray-700' : ''}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Capítulo Anterior
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={proximoCapitulo}
              disabled={capituloSelecionado === livroSelecionado.capitulos || carregando}
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
                <CardTitle className="text-3xl" style={{ color: '#2E3192' }}>
                  {livroSelecionado.nome}
                </CardTitle>
                <CardDescription>
                  Selecione um capítulo para começar a leitura
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                  {Array.from({ length: livroSelecionado.capitulos }, (_, i) => i + 1).map((cap) => (
                    <motion.div
                      key={cap}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-14 text-lg font-semibold hover:bg-blue-100"
                        style={{ borderColor: '#7CB342' }}
                        onClick={() => {
                          setCapituloSelecionado(cap)
                          navigate(`/biblia/${livroSelecionado.id}/${cap}`)
                        }}
                      >
                        {cap}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Tela inicial - Seleção de livros
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2E3192' }}>
            Bíblia Sagrada
          </h1>
          <p className="text-xl text-gray-600">
            Escolha um livro para começar sua leitura
          </p>
        </motion.div>

        <Tabs defaultValue="antigo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="antigo" className="text-lg">Antigo Testamento</TabsTrigger>
            <TabsTrigger value="novo" className="text-lg">Novo Testamento</TabsTrigger>
          </TabsList>

          <TabsContent value="antigo">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="initial"
              animate="animate"
            >
              {livrosBiblia.antigoTestamento.map((livro) => (
                <motion.div
                  key={livro.id}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all"
                    onClick={() => setLivroSelecionado(livro)}
                  >
                    <CardHeader className="text-center">
                      <BookOpen className="h-12 w-12 mx-auto mb-2" style={{ color: '#7CB342' }} />
                      <CardTitle className="text-xl" style={{ color: '#2E3192' }}>
                        {livro.nome}
                      </CardTitle>
                      <CardDescription>
                        {livro.capitulos} capítulos
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="novo">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="initial"
              animate="animate"
            >
              {livrosBiblia.novoTestamento.map((livro) => (
                <motion.div
                  key={livro.id}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all"
                    onClick={() => setLivroSelecionado(livro)}
                  >
                    <CardHeader className="text-center">
                      <BookOpen className="h-12 w-12 mx-auto mb-2" style={{ color: '#7CB342' }} />
                      <CardTitle className="text-xl" style={{ color: '#2E3192' }}>
                        {livro.nome}
                      </CardTitle>
                      <CardDescription>
                        {livro.capitulos} capítulos
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

