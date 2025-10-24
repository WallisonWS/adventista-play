import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoDesbravadores from '../assets/logo-desbravadores-pt.png'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { TextToSpeech } from './TextToSpeech.jsx'
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
  ChevronRight,
  Volume2,
  CheckCircle,
  Play,
  Waves,
  ChefHat,
  Anchor,
  Bike,
  TreePine
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

// Especialidades populares com logos oficiais
const especialidades = [
  { 
    id: 1, 
    nome: "Acampamento", 
    categoria: "Atividades Recreativas", 
    icone: Tent, 
    cor: "bg-green-500",
    requisitos: [
      "Participar de um acampamento de fim de semana",
      "Montar e desmontar uma barraca corretamente",
      "Conhecer 5 regras de segurança em acampamentos",
      "Fazer uma fogueira e apagá-la com segurança",
      "Preparar uma refeição ao ar livre"
    ]
  },
  { 
    id: 2, 
    nome: "Primeiros Socorros", 
    categoria: "Habilidades Domésticas", 
    icone: Heart, 
    cor: "bg-red-500",
    requisitos: [
      "Conhecer e demonstrar RCP básico",
      "Saber tratar queimaduras, cortes e fraturas",
      "Montar um kit de primeiros socorros",
      "Conhecer sinais vitais e como medi-los",
      "Demonstrar a posição lateral de segurança"
    ]
  },
  { 
    id: 3, 
    nome: "Nós e Amarras", 
    categoria: "Atividades Recreativas", 
    icone: Anchor, 
    cor: "bg-green-500",
    requisitos: [
      "Fazer 10 nós diferentes e explicar seu uso",
      "Fazer 3 tipos de amarras",
      "Construir um projeto usando nós e amarras",
      "Conhecer a história dos nós",
      "Ensinar 5 nós para outra pessoa"
    ]
  },
  { 
    id: 4, 
    nome: "Natação", 
    categoria: "Atividades Recreativas", 
    icone: Waves, 
    cor: "bg-blue-500",
    requisitos: [
      "Nadar 50 metros estilo livre",
      "Nadar 25 metros de costas",
      "Demonstrar 3 tipos de nado",
      "Conhecer regras de segurança aquática",
      "Fazer um salvamento básico"
    ]
  },
  { 
    id: 5, 
    nome: "Cozinha", 
    categoria: "Habilidades Domésticas", 
    icone: ChefHat, 
    cor: "bg-orange-500",
    requisitos: [
      "Preparar 5 refeições completas",
      "Conhecer nutrição básica",
      "Fazer um bolo e um pão",
      "Conhecer segurança na cozinha",
      "Planejar um cardápio saudável"
    ]
  },
  { 
    id: 6, 
    nome: "Orientação", 
    categoria: "Atividades Recreativas", 
    icone: Compass, 
    cor: "bg-green-500",
    requisitos: [
      "Usar bússola e mapa topográfico",
      "Encontrar direções sem bússola",
      "Completar uma trilha de orientação",
      "Conhecer sinais de trilha",
      "Usar GPS básico"
    ]
  },
  { 
    id: 7, 
    nome: "Excursionismo", 
    categoria: "Atividades Recreativas", 
    icone: TreePine, 
    cor: "bg-green-600",
    requisitos: [
      "Fazer uma caminhada de 10km",
      "Conhecer equipamentos de trilha",
      "Planejar uma excursão",
      "Conhecer sinais de tempo",
      "Fazer um relatório de trilha"
    ]
  },
  { 
    id: 8, 
    nome: "Segurança Básica", 
    categoria: "Habilidades Domésticas", 
    icone: Shield, 
    cor: "bg-yellow-500",
    requisitos: [
      "Conhecer números de emergência",
      "Fazer um plano de evacuação",
      "Conhecer segurança contra incêndio",
      "Demonstrar segurança elétrica",
      "Ensinar segurança para crianças"
    ]
  },
  { 
    id: 9, 
    nome: "Fotografia", 
    categoria: "Artes e Habilidades", 
    icone: Target, 
    cor: "bg-blue-600",
    requisitos: [
      "Conhecer partes de uma câmera",
      "Tirar 20 fotos temáticas",
      "Editar fotos básicas",
      "Conhecer composição fotográfica",
      "Fazer uma exposição de fotos"
    ]
  },
  { 
    id: 10, 
    nome: "Ciclismo", 
    categoria: "Atividades Recreativas", 
    icone: Mountain, 
    cor: "bg-green-500",
    requisitos: [
      "Pedalar 25km em terreno variado",
      "Fazer manutenção básica de bicicleta",
      "Conhecer sinais de trânsito",
      "Usar equipamentos de segurança",
      "Planejar um passeio ciclístico"
    ]
  },
  { 
    id: 11, 
    nome: "Canoagem", 
    categoria: "Atividades Recreativas", 
    icone: Mountain, 
    cor: "bg-blue-600",
    requisitos: [
      "Remar 1km em canoa",
      "Conhecer segurança em canoagem",
      "Fazer manobras básicas",
      "Conhecer tipos de embarcações",
      "Participar de um passeio de canoa"
    ]
  },
  { 
    id: 12, 
    nome: "Ordem Unida", 
    categoria: "Atividades Recreativas", 
    icone: Target, 
    cor: "bg-red-600",
    requisitos: [
      "Conhecer 15 comandos de ordem unida",
      "Marchar em formação",
      "Apresentar bandeiras corretamente",
      "Liderar uma equipe em ordem unida",
      "Participar de uma cerimônia oficial"
    ]
  }
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
    licoes: 8,
    topicos: [
      "O significado do Voto do Desbravador",
      "Pela graça de Deus - Entendendo a salvação",
      "Serei puro - Pureza em pensamentos e ações",
      "Serei leal - Lealdade a Deus e aos outros",
      "A Lei do Desbravador - Princípios de vida",
      "Atencioso, Obediente e Puro",
      "Bondoso, Leal e Respeitoso",
      "Vivendo o Voto e a Lei no dia a dia"
    ]
  },
  {
    id: 2,
    titulo: "Heróis da Bíblia",
    descricao: "Conhecendo os grandes heróis da fé",
    licoes: 12,
    topicos: [
      "Noé - Fé em meio à zombaria",
      "Abraão - Obediência radical",
      "José - Integridade na adversidade",
      "Moisés - Liderança humilde",
      "Davi - Coração segundo Deus",
      "Daniel - Fidelidade inabalável",
      "Ester - Coragem para salvar",
      "Pedro - Transformação pelo perdão",
      "Paulo - Dedicação missionária",
      "Maria - Submissão à vontade de Deus",
      "Estêvão - Primeiro mártir cristão",
      "Timóteo - Jovem líder fiel"
    ]
  },
  {
    id: 3,
    titulo: "Criação vs Evolução",
    descricao: "Evidências científicas da criação",
    licoes: 6,
    topicos: [
      "O relato bíblico da criação",
      "Evidências fósseis e geológicas",
      "Design inteligente na natureza",
      "Complexidade irredutível",
      "A idade da Terra - Perspectiva bíblica",
      "Fé e ciência em harmonia"
    ]
  },
  {
    id: 4,
    titulo: "Profecia e História",
    descricao: "Como a profecia se cumpre na história",
    licoes: 10,
    topicos: [
      "Introdução à profecia bíblica",
      "Daniel 2 - A estátua de Nabucodonosor",
      "Daniel 7 - As quatro bestas",
      "Daniel 8 e 9 - As 70 semanas",
      "Apocalipse - Visão geral",
      "As 7 igrejas do Apocalipse",
      "Os selos e as trombetas",
      "O tempo do fim",
      "A segunda vinda de Cristo",
      "O novo céu e a nova terra"
    ]
  },
  {
    id: 5,
    titulo: "Liderança Cristã",
    descricao: "Princípios bíblicos de liderança",
    licoes: 8,
    topicos: [
      "O que é liderança cristã?",
      "Jesus como modelo de líder",
      "Liderança servidora",
      "Comunicação eficaz",
      "Trabalho em equipe",
      "Resolução de conflitos",
      "Tomada de decisões sábias",
      "Desenvolvendo novos líderes"
    ]
  },
  {
    id: 6,
    titulo: "Família e Relacionamentos",
    descricao: "Valores cristãos para a vida familiar",
    licoes: 7,
    topicos: [
      "O plano de Deus para a família",
      "Honrando pai e mãe",
      "Relacionamentos saudáveis",
      "Pureza e namoro cristão",
      "Amizades que edificam",
      "Resolvendo conflitos familiares",
      "Preparando-se para o futuro"
    ]
  }
]

export function DesbravadoresPage() {
  const [classeSelecionada, setClasseSelecionada] = useState(null)
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null)
  const [estudoSelecionado, setEstudoSelecionado] = useState(null)
  const classesRef = useRef(null)
  const especialidadesRef = useRef(null)
  const estudosRef = useRef(null)

  // Scroll automático ao carregar a página (se houver hash na URL)
  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#classes' && classesRef.current) {
      setTimeout(() => classesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500)
    } else if (hash === '#especialidades' && especialidadesRef.current) {
      setTimeout(() => especialidadesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500)
    } else if (hash === '#estudos' && estudosRef.current) {
      setTimeout(() => estudosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500)
    }
  }, [])

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
          <TabsContent value="classes" className="space-y-6" ref={classesRef}>
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
          <TabsContent value="especialidades" className="space-y-8" ref={especialidadesRef}>
            {/* Banner de Especialidades com Imagem Oficial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-white p-8 md:p-12 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('/src/assets/especialidades-oficiais-1.jpg')] bg-cover bg-center opacity-20"></div>
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Trophy className="h-16 w-16 mb-4 text-yellow-300" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Especialidades de Desbravadores</h2>
                <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl">
                  Desenvolva habilidades incríveis e conquiste especialidades oficiais! Mais de 300 opções em 8 categorias diferentes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-sm py-2 px-4">
                    <Star className="h-4 w-4 mr-2" />
                    300+ Especialidades
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-sm py-2 px-4">
                    <Award className="h-4 w-4 mr-2" />
                    8 Categorias
                  </Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-sm py-2 px-4">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Certificado Oficial
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Grid de Especialidades Populares */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="h-7 w-7 text-primary" />
                Especialidades Mais Populares
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {especialidades.map((esp, index) => {
                  const Icone = esp.icone
                  return (
                    <motion.div
                      key={esp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card 
                        className="text-center hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary group overflow-hidden h-full"
                        onClick={() => setEspecialidadeSelecionada(esp)}
                      >
                        <CardContent className="pt-6 pb-4 space-y-3 relative flex flex-col items-center">
                          {/* Efeito de brilho no hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="flex justify-center relative">
                            <motion.div 
                              className={`p-4 ${esp.cor} rounded-full shadow-lg relative overflow-hidden`}
                              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                              transition={{ duration: 0.6 }}
                            >
                              {/* Efeito de pulsação */}
                              <motion.div
                                className={`absolute inset-0 ${esp.cor} rounded-full`}
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <Icone className="h-8 w-8 text-white relative z-10" />
                            </motion.div>
                          </div>
                          
                          <h3 className="font-bold text-sm md:text-base group-hover:text-primary transition-colors text-center">{esp.nome}</h3>
                          <Badge variant="secondary" className="text-xs text-center w-full justify-center">{esp.categoria}</Badge>
                          
                          {/* Indicador de clique */}
                          <motion.div
                            className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <ChevronRight className="h-4 w-4 mx-auto" />
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
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
          <TabsContent value="estudos" className="space-y-6" ref={estudosRef}>
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
            
            {especialidadeSelecionada?.requisitos && (
              <div className="space-y-2">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Requisitos para Conclusão:
                </h4>
                <ul className="space-y-2">
                  {especialidadeSelecionada.requisitos.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm">
                📌 Para obter esta especialidade, você precisará completar todos os requisitos acima sob a orientação de um instrutor qualificado.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline" onClick={() => setEspecialidadeSelecionada(null)}>
                Fechar
              </Button>
              <Link to={`/desbravadores/especialidade/${especialidadeSelecionada?.id}`} className="flex-1">
                <Button className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Iniciar Especialidade
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Estudo */}
      <Dialog open={!!estudoSelecionado} onOpenChange={() => setEstudoSelecionado(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{estudoSelecionado?.titulo}</DialogTitle>
            <DialogDescription>{estudoSelecionado?.descricao}</DialogDescription>
          </DialogHeader>
          
          {/* Text-to-Speech para ouvir o estudo */}
          {estudoSelecionado?.topicos && (
            <div className="mb-4">
              <TextToSpeech 
                text={`${estudoSelecionado.titulo}. ${estudoSelecionado.descricao}. Este estudo possui ${estudoSelecionado.licoes} lições. Os tópicos são: ${estudoSelecionado.topicos.join('. ')}`}
                compact={true}
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">{estudoSelecionado?.licoes} lições disponíveis</span>
            </div>
            
            {estudoSelecionado?.topicos && (
              <div className="space-y-2">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Tópicos do Estudo:
                </h4>
                <div className="max-h-60 overflow-y-auto">
                  <ul className="space-y-2">
                    {estudoSelecionado.topicos.map((topico, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{topico}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm">
                📖 Este estudo bíblico foi desenvolvido especialmente para Desbravadores, com linguagem acessível e aplicações práticas para o dia a dia.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setEstudoSelecionado(null)}>
                Fechar
              </Button>
              <Button className="flex-1" onClick={() => setEstudoSelecionado(null)}>
                <Play className="h-4 w-4 mr-2" />
                Iniciar Estudo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}