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
  ChevronRight,
  Trophy,
  Award,
  Zap,
  BookOpen
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { especialidadesCompletas } from '../data/especialidades-desbravadores'

// Mapeamento de ícones para os requisitos (pode ser expandido)
const iconMap = {
  'requisitos': BookOpen,
  'dicas': Lightbulb,
  'cuidados': AlertTriangle,
  'passos': ChevronRight,
  'regras': CheckCircle,
  'termos': Target,
  'amarracoes': Target,
  'avaliacaoPratica': Trophy,
  'materiaisNecessarios': Zap,
}

// Componente para renderizar um bloco de requisito
function RequisitoBloco({ titulo, dados, Icone, tipo }) {
  if (!dados || (Array.isArray(dados) && dados.length === 0)) return null

  const getDetalhe = (item) => {
    if (typeof item === 'string') return item
    if (item.nome) return item.nome
    if (item.titulo) return item.titulo
    if (item.regra) return item.regra
    if (item.termo) return item.termo
    return 'Detalhe'
  }

  const getSubDetalhe = (item) => {
    if (item.descricao) return item.descricao
    if (item.detalhes) return item.detalhes
    if (item.definicao) return item.definicao
    if (item.uso) return item.uso
    if (item.aplicacao) return item.aplicacao
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3 flex items-center">
        <Icone className="h-5 w-5 mr-2 text-primary" />
        {titulo}
      </h3>
      
      {Array.isArray(dados) ? (
        <ul className="space-y-3">
          {dados.map((item, i) => (
            <li key={i} className="flex items-start space-x-3 p-3 bg-card rounded-lg shadow-sm border">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs mt-1">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{getDetalhe(item)}</p>
                {getSubDetalhe(item) && <p className="text-sm text-muted-foreground mt-1">{getSubDetalhe(item)}</p>}
                
                {/* Renderizar sub-listas (ex: passos, preparo) */}
                {item.passos && (
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Passos:</p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground">
                      {item.passos.map((passo, pIndex) => <li key={pIndex}>{passo}</li>)}
                    </ul>
                  </div>
                )}
                {item.preparo && (
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Preparo:</p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground">
                      {item.preparo.map((passo, pIndex) => <li key={pIndex}>{passo}</li>)}
                    </ul>
                  </div>
                )}
                {item.ingredientes && (
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Ingredientes:</p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground">
                      {item.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                  </div>
                )}
                {item.regras && (
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Regras:</p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground">
                      {item.regras.map((regra, i) => <li key={i}>{regra.regra}: {regra.detalhes}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // Renderização para objetos únicos (ex: avaliacaoPratica)
        <Card className="p-4 bg-primary/5 border-primary/20">
          <CardTitle className="text-lg">{dados.descricao || dados.titulo}</CardTitle>
          {dados.criterios && (
            <div className="mt-3">
              <p className="font-medium">Critérios:</p>
              <ul className="list-disc list-inside ml-4 text-muted-foreground">
                {dados.criterios.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
          {dados.simulacoes && (
            <div className="mt-3">
              <p className="font-medium">Simulações:</p>
              <ul className="list-disc list-inside ml-4 text-muted-foreground">
                {dados.simulacoes.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

// Componente principal
export function EspecialidadeTutorial() {
  const { id } = useParams()
  const especialidade = especialidadesCompletas.find(e => e.id === parseInt(id))
  const [tabSelecionada, setTabSelecionada] = useState('requisitos')

  if (!especialidade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardTitle>Especialidade Não Encontrada</CardTitle>
          <CardDescription className="mt-2">O ID {id} não corresponde a nenhuma especialidade completa.</CardDescription>
          <Link to="/desbravadores">
            <Button className="mt-4">Voltar para Desbravadores</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Mapear os requisitos para as abas
  const abas = [
    { id: 'requisitos', titulo: 'Requisitos', dados: especialidade.requisitos, icone: BookOpen },
    { id: 'materiais', titulo: 'Materiais', dados: especialidade.materiaisNecessarios, icone: Zap },
    { id: 'avaliacao', titulo: 'Avaliação', dados: especialidade.avaliacaoPratica, icone: Trophy },
  ].filter(aba => aba.dados)

  // Adicionar abas dinâmicas se houver dados aninhados nos requisitos
  if (especialidade.requisitos) {
    especialidade.requisitos.forEach(req => {
      Object.keys(req).forEach(key => {
        if (key !== 'numero' && key !== 'titulo' && key !== 'descricao' && req[key] && (Array.isArray(req[key]) || typeof req[key] === 'object')) {
          const tabId = key
          const tabTitulo = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
          const Icone = iconMap[key] || Lightbulb

          // Evitar duplicidade de abas (ex: se todos os requisitos tiverem 'dicas', só cria uma aba)
          if (!abas.find(a => a.id === tabId)) {
            abas.push({
              id: tabId,
              titulo: tabTitulo,
              dados: especialidade.requisitos.map(r => ({ titulo: r.titulo, [key]: r[key] })).filter(r => r[key]),
              icone: Icone
            })
          }
        }
      })
    })
  }
  
  // A aba de requisitos deve ser a primeira
  abas.sort((a, b) => {
    if (a.id === 'requisitos') return -1
    if (b.id === 'requisitos') return 1
    return 0
  })


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

          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-primary">Especialidade:</span> {especialidade.nome}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Categoria: {especialidade.categoria} • Nível: {especialidade.nivel}
          </p>
        </motion.div>

        <Tabs value={tabSelecionada} onValueChange={setTabSelecionada} className="space-y-6">
          <TabsList className="flex flex-wrap w-full gap-2 h-auto p-2">
            {abas.map(aba => (
              <TabsTrigger key={aba.id} value={aba.id} className="flex items-center space-x-2">
                <aba.icone className="h-4 w-4" />
                <span>{aba.titulo}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {abas.map(aba => (
            <TabsContent key={aba.id} value={aba.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{aba.titulo} da Especialidade</CardTitle>
                  <CardDescription>
                    {aba.id === 'requisitos' && 'Lista completa de tudo que você precisa saber e fazer.'}
                    {aba.id === 'materiais' && 'Itens essenciais para completar a especialidade.'}
                    {aba.id === 'avaliacao' && 'Como você será avaliado ao final do processo.'}
                    {aba.id === 'passos' && 'Passos detalhados para cumprir os requisitos práticos.'}
                    {aba.id === 'dicas' && 'Dicas e truques para facilitar o aprendizado.'}
                    {aba.id === 'cuidados' && 'Informações de segurança e o que evitar.'}
                    {aba.id === 'regras' && 'Regras e princípios a serem seguidos.'}
                    {aba.id === 'termos' && 'Terminologia e definições importantes.'}
                    {aba.id === 'amarracoes' && 'Detalhes sobre as amarrações necessárias.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {aba.id === 'requisitos' && (
                    <div className="space-y-6">
                      {especialidade.requisitos.map((req, i) => (
                        <Card key={i} className="p-4 border-l-4 border-primary/70 shadow-md">
                          <CardTitle className="text-xl mb-2 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            {req.numero}. {req.titulo}
                          </CardTitle>
                          <CardDescription className="mb-3">{req.descricao}</CardDescription>
                          
                          <div className="space-y-4 mt-4">
                            {/* Renderizar sub-blocos dentro do requisito, se houver */}
                            {Object.keys(req).map(key => {
                              if (key !== 'numero' && key !== 'titulo' && key !== 'descricao' && req[key] && (Array.isArray(req[key]) || typeof req[key] === 'object')) {
                                const subTitulo = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
                                const SubIcone = iconMap[key] || Lightbulb
                                
                                // Para o requisito de acampamento (exemplo)
                                if (especialidade.id === 1 && key === 'exemplo') {
                                  return (
                                    <div key={key} className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
                                      <p className="font-semibold mb-2">Exemplo de Cardápio:</p>
                                      {Object.keys(req[key]).map(dia => (
                                        <div key={dia} className="mb-2">
                                          <p className="font-medium">{dia}:</p>
                                          <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground">
                                            {Object.keys(req[key][dia]).map(refeicao => (
                                              <li key={refeicao}>{refeicao}: {req[key][dia][refeicao].join(', ')}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  )
                                }

                                if (Array.isArray(req[key])) {
                                  return (
                                    <div key={key} className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
                                      <p className="font-semibold mb-2 flex items-center gap-2">
                                        <SubIcone className="h-4 w-4 text-secondary-foreground" />
                                        {subTitulo}:
                                      </p>
                                      <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                                        {req[key].map((item, index) => (
                                          <li key={index}>
                                            {typeof item === 'string' ? item : (item.nome || item.titulo || item.regra || item.termo)}
                                            {item.detalhes && `: ${item.detalhes}`}
                                            {item.uso && `: ${item.uso}`}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )
                                }
                                
                                return null
                              }
                              return null
                            })}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Renderização para abas dinâmicas (ex: Passos, Dicas, Cuidados, etc) */}
                  {aba.id !== 'requisitos' && aba.id !== 'materiais' && aba.id !== 'avaliacao' && (
                    <div className="space-y-6">
                      {aba.dados.map((reqComDetalhe, i) => (
                        <Card key={i} className="p-4 border-l-4 border-secondary/70 shadow-sm">
                          <CardTitle className="text-lg mb-2">{reqComDetalhe.titulo}</CardTitle>
                          <RequisitoBloco 
                            titulo={aba.titulo} 
                            dados={reqComDetalhe[aba.id]} 
                            Icone={aba.icone} 
                            tipo={aba.id}
                          />
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Renderização para Materiais */}
                  {aba.id === 'materiais' && (
                    <RequisitoBloco 
                      titulo="Materiais Necessários" 
                      dados={especialidade.materiaisNecessarios.map(m => ({ nome: m }))} 
                      Icone={Zap} 
                      tipo="materiais"
                    />
                  )}

                  {/* Renderização para Avaliação */}
                  {aba.id === 'avaliacao' && (
                    <RequisitoBloco 
                      titulo="Avaliação Prática" 
                      dados={especialidade.avaliacaoPratica} 
                      Icone={Trophy} 
                      tipo="avaliacao"
                    />
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-8 text-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Trophy className="h-5 w-5 mr-2" />
                  Concluir Especialidade
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
