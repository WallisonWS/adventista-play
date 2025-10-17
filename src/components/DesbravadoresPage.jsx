import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoDesbravadores from '../assets/logo-desbravadores-pt.png'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { 
  Award, 
  BookOpen, 
  Compass, 
  Map,
  Users,
  ExternalLink,
  Download,
  Star,
  Trophy,
  Tent,
  Flame,
  Mountain,
  Heart,
  Shield,
  Target,
  Sparkles,
  ChevronRight
} from 'lucide-react'

// Dados dos cursos de Desbravadores
const cursosDesbravadores = [
  {
    id: 1,
    titulo: "Amigo",
    nivel: "Classe I",
    idade: "10 anos",
    cor: "bg-red-500",
    simbolo: "/simbolos-classes/amigo.png",
    descricao: "Primeira classe dos Desbravadores",
    requisitos: [
      "Ter no mínimo 10 anos de idade",
      "Ser membro ativo do Clube de Desbravadores",
      "Participar de acampamento de fim de semana",
      "Ler o livro do Clube do Livro Juvenil do ano em curso"
    ],
    areas: [
      { nome: "Descoberta Espiritual", atividades: 8 },
      { nome: "Servindo aos Outros", atividades: 4 },
      { nome: "Desenvolvendo Amizade", atividades: 5 },
      { nome: "Saúde e Aptidão Física", atividades: 6 },
      { nome: "Organização e Liderança", atividades: 3 },
      { nome: "Estudo da Natureza", atividades: 7 }
    ]
  },
  {
    id: 2,
    titulo: "Companheiro",
    nivel: "Classe II",
    idade: "11 anos",
    cor: "bg-blue-500",
    simbolo: "/simbolos-classes/companheiro.png",
    descricao: "Segunda classe dos Desbravadores",
    requisitos: [
      "Ter no mínimo 11 anos de idade",
      "Ser membro ativo do Clube de Desbravadores",
      "Ter a classe de Amigo",
      "Participar de acampamento de fim de semana"
    ],
    areas: [
      { nome: "Descoberta Espiritual", atividades: 9 },
      { nome: "Servindo aos Outros", atividades: 5 },
      { nome: "Desenvolvendo Amizade", atividades: 6 },
      { nome: "Saúde e Aptidão Física", atividades: 7 },
      { nome: "Organização e Liderança", atividades: 4 },
      { nome: "Estudo da Natureza", atividades: 8 }
    ]
  },
  {
    id: 3,
    titulo: "Pesquisador",
    nivel: "Classe III",
    idade: "12 anos",
    cor: "bg-green-500",
    simbolo: "/simbolos-classes/pesquisador.png",
    descricao: "Terceira classe dos Desbravadores",
    requisitos: [
      "Ter no mínimo 12 anos de idade",
      "Ser membro ativo do Clube de Desbravadores",
      "Ter a classe de Companheiro",
      "Participar de acampamento de fim de semana"
    ],
    areas: [
      { nome: "Descoberta Espiritual", atividades: 10 },
      { nome: "Servindo aos Outros", atividades: 6 },
      { nome: "Desenvolvendo Amizade", atividades: 7 },
      { nome: "Saúde e Aptidão Física", atividades: 8 },
      { nome: "Organização e Liderança", atividades: 5 },
      { nome: "Estudo da Natureza", atividades: 9 }
    ]
  },
  {
    id: 4,
    titulo: "Pioneiro",
    nivel: "Classe IV",
    idade: "13 anos",
    cor: "bg-yellow-500",
    simbolo: "/simbolos-classes/pioneiro.png",
    descricao: "Quarta classe dos Desbravadores",
    requisitos: [
      "Ter no mínimo 13 anos de idade",
      "Ser membro ativo do Clube de Desbravadores",
      "Ter a classe de Pesquisador",
      "Participar de acampamento de fim de semana"
    ],
    areas: [
      { nome: "Descoberta Espiritual", atividades: 11 },
      { nome: "Servindo aos Outros", atividades: 7 },
      { nome: "Desenvolvendo Amizade", atividades: 8 },
      { nome: "Saúde e Aptidão Física", atividades: 9 },
      { nome: "Organização e Liderança", atividades: 6 },
      { nome: "Estudo da Natureza", atividades: 10 }
    ]
  },
  {
    id: 5,
    titulo: "Excursionista",
    nivel: "Classe V",
    idade: "14 anos",
    cor: "bg-purple-500",
    simbolo: "/simbolos-classes/excursionista.png",
    descricao: "Quinta classe dos Desbravadores",
    requisitos: [
      "Ter no mínimo 14 anos de idade",
      "Ser membro ativo do Clube de Desbravadores",
      "Ter a classe de Pioneiro",
      "Participar de acampamento de fim de semana"
    ],
    areas: [
      { nome: "Descoberta Espiritual", atividades: 12 },
      { nome: "Servindo aos Outros", atividades: 8 },
      { nome: "Desenvolvendo Amizade", atividades: 9 },
      { nome: "Saúde e Aptidão Física", atividades: 10 },
      { nome: "Organização e Liderança", atividades: 7 },
      { nome: "Estudo da Natureza", atividades: 11 }
    ]
  },
  {
    id: 6,
    titulo: "Guia",
    nivel: "Classe VI",
    idade: "15 anos",
    cor: "bg-orange-500",
    simbolo: "/simbolos-classes/guia.png",
    descricao: "Sexta e última classe regular dos Desbravadores",
    requisitos: [
      "Ter no mínimo 15 anos de idade",
      "Ser membro ativo do Clube de Desbravadores",
      "Ter a classe de Excursionista",
      "Participar de acampamento de fim de semana"
    ],
    areas: [
      { nome: "Descoberta Espiritual", atividades: 13 },
      { nome: "Servindo aos Outros", atividades: 9 },
      { nome: "Desenvolvendo Amizade", atividades: 10 },
      { nome: "Saúde e Aptidão Física", atividades: 11 },
      { nome: "Organização e Liderança", atividades: 8 },
      { nome: "Estudo da Natureza", atividades: 12 }
    ]
  }
]

// Especialidades populares
const especialidades = [
  { id: 1, nome: "Acampamento", categoria: "Atividades Recreativas", icone: Tent },
  { id: 2, nome: "Primeiros Socorros", categoria: "Habilidades Domésticas", icone: Heart },
  { id: 3, nome: "Nós e Amarras", categoria: "Atividades Recreativas", icone: Target },
  { id: 4, nome: "Natação", categoria: "Atividades Recreativas", icone: Mountain },
  { id: 5, nome: "Cozinha", categoria: "Habilidades Domésticas", icone: Flame },
  { id: 6, nome: "Orientação", categoria: "Atividades Recreativas", icone: Compass },
  { id: 7, nome: "Excursionismo", categoria: "Atividades Recreativas", icone: Mountain },
  { id: 8, nome: "Segurança Básica", categoria: "Habilidades Domésticas", icone: Shield }
]

// Links úteis
const linksUteis = [
  {
    id: 1,
    titulo: "Clube de Desbravadores - Site Oficial",
    url: "https://www.desbravadores.org.br",
    descricao: "Portal oficial dos Desbravadores no Brasil",
    icone: Shield
  },
  {
    id: 2,
    titulo: "Manual de Especialidades",
    url: "https://www.clubedesbravadores.com.br/especialidades",
    descricao: "Todas as especialidades disponíveis",
    icone: BookOpen
  },
  {
    id: 3,
    titulo: "Classes Regulares",
    url: "https://www.desbravadores.org.br/classes",
    descricao: "Informações sobre todas as classes",
    icone: Award
  },
  {
    id: 4,
    titulo: "Cartão de Classes",
    url: "https://www.clubedesbravadores.com.br/cartoes",
    descricao: "Download dos cartões de classes",
    icone: Download
  },
  {
    id: 5,
    titulo: "Acampamentos e Eventos",
    url: "https://www.desbravadores.org.br/eventos",
    descricao: "Calendário de eventos nacionais",
    icone: Tent
  },
  {
    id: 6,
    titulo: "Loja Oficial",
    url: "https://loja.desbravadores.org.br",
    descricao: "Uniformes e materiais oficiais",
    icone: Target
  }
]

// Estudos bíblicos
const estudosBiblicos = [
  {
    id: 1,
    titulo: "Voto e Lei do Desbravador",
    descricao: "Estudo profundo sobre o significado do voto e da lei",
    licoes: 8
  },
  {
    id: 2,
    titulo: "Heróis da Bíblia",
    descricao: "Conhecendo os grandes heróis da fé",
    licoes: 12
  },
  {
    id: 3,
    titulo: "Criação vs Evolução",
    descricao: "Evidências científicas da criação",
    licoes: 6
  },
  {
    id: 4,
    titulo: "Profecia e História",
    descricao: "Como a profecia se cumpre na história",
    licoes: 10
  },
  {
    id: 5,
    titulo: "Liderança Cristã",
    descricao: "Princípios bíblicos de liderança",
    licoes: 8
  },
  {
    id: 6,
    titulo: "Família e Relacionamentos",
    descricao: "Valores cristãos para a vida familiar",
    licoes: 7
  }
]

export function DesbravadoresPage() {
  const [classeSelecionada, setClasseSelecionada] = useState(null)
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null)
  const [estudoSelecionado, setEstudoSelecionado] = useState(null)

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
            <img src={logoDesbravadores} alt="Logo Desbravadores" className="h-32 w-32 object-contain" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-primary">Desbravadores</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            A mensagem do advento a todo mundo nesta geração
          </p>
          <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-6 max-w-2xl mx-auto mb-6">
            <h3 className="font-bold text-lg mb-3">Voto do Desbravador</h3>
            <p className="italic">
              "Pela graça de Deus, serei puro, bondoso e leal. Guardarei a Lei do Desbravador, 
              serei servo de Deus e amigo de todos."
            </p>
          </div>
          <Link to="/progresso-desbravador">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Trophy className="h-5 w-5 mr-2" />
              Acompanhar Meu Progresso
            </Button>
          </Link>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="classes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="classes" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Classes</span>
            </TabsTrigger>
            <TabsTrigger value="especialidades" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Especialidades</span>
            </TabsTrigger>
            <TabsTrigger value="estudos" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Estudos</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span>Links Úteis</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Classes */}
          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosDesbravadores.map((classe, index) => (
                <motion.div
                  key={classe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
                    <CardHeader className={`${classe.cor} text-white rounded-t-lg`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">{classe.titulo}</CardTitle>
                          <CardDescription className="text-white/90">{classe.nivel}</CardDescription>
                        </div>
                        <img src={classe.simbolo} alt={`Símbolo ${classe.titulo}`} className="h-16 w-16 object-contain" />
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <Badge variant="outline">{classe.idade}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">{classe.descricao}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Requisitos Básicos:</h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          {classe.requisitos.slice(0, 2).map((req, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Áreas de Estudo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {classe.areas.slice(0, 4).map((area, i) => (
                            <div key={i} className="flex items-center space-x-1">
                              <Sparkles className="h-3 w-3 text-primary" />
                              <span className="truncate">{area.nome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full" onClick={() => setClasseSelecionada(classe)}>
                        Ver Detalhes
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Especialidades */}
          <TabsContent value="especialidades" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {especialidades.map((esp, index) => {
                const Icone = esp.icone
                return (
                  <motion.div
                    key={esp.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setEspecialidadeSelecionada(esp)}>
                      <CardContent className="pt-6 space-y-3">
                        <div className="flex justify-center">
                          <div className="p-4 bg-primary/10 rounded-full">
                            <Icone className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-bold">{esp.nome}</h3>
                        <Badge variant="outline" className="text-xs">{esp.categoria}</Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Trophy className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mais de 300 Especialidades Disponíveis!</h3>
                    <p className="text-muted-foreground mb-4">
                      Explore especialidades em diversas áreas: Artes e Habilidades Manuais, Atividades Missionárias, 
                      Atividades Profissionais, Atividades Recreativas, Ciência e Saúde, Habilidades Domésticas, 
                      e Estudo da Natureza.
                    </p>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Todas as Especialidades
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Estudos */}
          <TabsContent value="estudos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {estudosBiblicos.map((estudo, index) => (
                <motion.div
                  key={estudo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{estudo.titulo}</CardTitle>
                          <CardDescription>{estudo.descricao}</CardDescription>
                        </div>
                        <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge>{estudo.licoes} lições</Badge>
                        <Button size="sm" onClick={() => setEstudoSelecionado(estudo)}>
                          Iniciar Estudo
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Links Úteis */}
          <TabsContent value="links" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {linksUteis.map((link, index) => {
                const Icone = link.icone
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icone className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{link.titulo}</CardTitle>
                            <CardDescription>{link.descricao}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            Acessar
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Detalhes da Classe */}
      <Dialog open={!!classeSelecionada} onOpenChange={() => setClasseSelecionada(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{classeSelecionada?.titulo} - {classeSelecionada?.nivel}</DialogTitle>
            <DialogDescription>{classeSelecionada?.descricao}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Badge>{classeSelecionada?.idade}</Badge>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-3">Requisitos Básicos</h3>
              <ul className="space-y-2">
                {classeSelecionada?.requisitos.map((req, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Áreas de Estudo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classeSelecionada?.areas.map((area, i) => (
                  <Card key={i}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{area.nome}</span>
                        <Badge variant="outline">{area.atividades} atividades</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/progresso-desbravador" className="flex-1">
                <Button className="w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Iniciar Progresso
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setClasseSelecionada(null)}>Fechar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Especialidade */}
      <Dialog open={!!especialidadeSelecionada} onOpenChange={() => setEspecialidadeSelecionada(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{especialidadeSelecionada?.nome}</DialogTitle>
            <DialogDescription>Categoria: {especialidadeSelecionada?.categoria}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Esta especialidade faz parte da categoria <strong>{especialidadeSelecionada?.categoria}</strong> e é uma ótima oportunidade para desenvolver novas habilidades e conhecimentos.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm">
                📌 Para obter esta especialidade, você precisará completar uma série de requisitos práticos e teóricos sob a orientação de um instrutor qualificado.
              </p>
            </div>
            <Button className="w-full" onClick={() => setEspecialidadeSelecionada(null)}>
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Estudo */}
      <Dialog open={!!estudoSelecionado} onOpenChange={() => setEstudoSelecionado(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{estudoSelecionado?.titulo}</DialogTitle>
            <DialogDescription>{estudoSelecionado?.descricao}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">{estudoSelecionado?.licoes} lições disponíveis</span>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm">
                📖 Este estudo bíblico foi desenvolvido especialmente para Desbravadores, com linguagem acessível e aplicações práticas para o dia a dia.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                O conteúdo completo estará disponível em breve. Enquanto isso, você pode explorar outros recursos da plataforma.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/estudos" className="flex-1">
                <Button className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ver Estudos Disponíveis
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setEstudoSelecionado(null)}>Fechar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

