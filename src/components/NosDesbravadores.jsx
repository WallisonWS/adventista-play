import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  ChevronRight
} from 'lucide-react'
import { nosDesbravadores, amarracoes, dicasGerais, desafiosNos } from '../data/nos-desbravadores'
import { Link } from 'react-router-dom'

export function NosDesbravadores() {
  const [noSelecionado, setNoSelecionado] = useState(null)

  const categorias = ['Todos', 'Básicos', 'Alças', 'Amarração', 'Emenda', 'Avançados']

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/desbravadores">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Desbravadores
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nós e <span className="text-primary">Amarras</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Aprenda os nós essenciais para acampamento, resgate e construções
          </p>
        </motion.div>

        {noSelecionado ? (
          /* Visualizador de Nó Individual */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Button onClick={() => setNoSelecionado(null)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Lista
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl">{noSelecionado.nome}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Categoria: {noSelecionado.categoria} • Dificuldade: {noSelecionado.dificuldade}
                    </CardDescription>
                  </div>
                  <Badge className="text-lg px-4 py-2">{noSelecionado.dificuldade}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Usos */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Usos Principais
                  </h3>
                  <ul className="space-y-2">
                    {noSelecionado.usos.map((uso, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{uso}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Passo a Passo */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Passo a Passo</h3>
                  <div className="space-y-4">
                    {noSelecionado.passos.map((passo, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <p className="flex-1 pt-1">{passo}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* História (se houver) */}
                {noSelecionado.historia && (
                  <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                    <p className="italic">💡 {noSelecionado.historia}</p>
                  </div>
                )}

                {/* Dicas */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                    Dicas Importantes
                  </h3>
                  <ul className="space-y-2">
                    {noSelecionado.dicas.map((dica, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{dica}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cuidados */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                    Cuidados e Segurança
                  </h3>
                  <ul className="space-y-2">
                    {noSelecionado.cuidados.map((cuidado, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{cuidado}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Lista de Nós */
          <Tabs defaultValue="nos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="nos">Nós</TabsTrigger>
              <TabsTrigger value="amarracoes">Amarrações</TabsTrigger>
              <TabsTrigger value="dicas">Dicas</TabsTrigger>
              <TabsTrigger value="desafios">Desafios</TabsTrigger>
            </TabsList>

            {/* Tab: Nós */}
            <TabsContent value="nos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nosDesbravadores.map((no, index) => (
                  <motion.div
                    key={no.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setNoSelecionado(no)}>
                      <CardHeader>
                        <CardTitle>{no.nome}</CardTitle>
                        <CardDescription>{no.categoria}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Badge>{no.dificuldade}</Badge>
                        
                        <div>
                          <p className="text-sm font-semibold mb-2">Usos:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {no.usos.slice(0, 2).map((uso, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{uso}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full">
                          Ver Tutorial Completo
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tab: Amarrações */}
            <TabsContent value="amarracoes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amarracoes.map((amarracao, index) => (
                  <motion.div
                    key={amarracao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{amarracao.nome}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold mb-2">Usos:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {amarracao.usos.map((uso, i) => (
                              <li key={i}>• {uso}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm font-semibold mb-2">Passo a Passo:</p>
                          <ol className="text-sm text-muted-foreground space-y-2">
                            {amarracao.passos.map((passo, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="font-bold">{i + 1}.</span>
                                <span>{passo}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-primary/10 p-3 rounded-lg">
                          <p className="text-sm font-semibold mb-1">💡 Dicas:</p>
                          <ul className="text-sm space-y-1">
                            {amarracao.dicas.map((dica, i) => (
                              <li key={i}>• {dica}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tab: Dicas */}
            <TabsContent value="dicas">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dicasGerais.map((categoria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{categoria.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {categoria.itens.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tab: Desafios */}
            <TabsContent value="desafios">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {desafiosNos.map((nivel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${
                      nivel.nivel === 'Iniciante' ? 'border-green-500' :
                      nivel.nivel === 'Intermediário' ? 'border-yellow-500' :
                      'border-red-500'
                    }`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {nivel.nivel}
                          <Badge className={
                            nivel.nivel === 'Iniciante' ? 'bg-green-500' :
                            nivel.nivel === 'Intermediário' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }>
                            {nivel.nivel}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {nivel.desafios.map((desafio, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{desafio}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

