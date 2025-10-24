import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { 
  Award, 
  CheckCircle2,
  Circle,
  Trophy,
  Star,
  Sparkles,
  Download,
  Share2
} from 'lucide-react'
import logoCertificado from '../assets/logo-certificado.png'

// Dados das classes com requisitos detalhados
const classesDesbravadores = [
  {
    id: 1,
    titulo: "Amigo",
    cor: "bg-red-500",
    requisitos: [
      {
        area: "Descoberta Espiritual",
        itens: [
          "Memorizar e explicar o Voto do Desbravador",
          "Memorizar e explicar a Lei do Desbravador",
          "Ler o livro do Clube do Livro Juvenil do ano",
          "Participar de um projeto missionário",
          "Estudar a Bíblia diariamente por 1 semana"
        ]
      },
      {
        area: "Servindo aos Outros",
        itens: [
          "Ajudar a planejar e participar de um projeto comunitário",
          "Visitar um asilo ou hospital",
          "Fazer um cartão para alguém especial"
        ]
      },
      {
        area: "Desenvolvendo Amizade",
        itens: [
          "Identificar as bandeiras de 5 países",
          "Conhecer e explicar o Hino Nacional",
          "Fazer um novo amigo"
        ]
      },
      {
        area: "Saúde e Aptidão Física",
        itens: [
          "Completar uma caminhada de 3 km",
          "Aprender sobre alimentação saudável",
          "Participar de atividades físicas regularmente"
        ]
      },
      {
        area: "Organização e Liderança",
        itens: [
          "Participar de cerimônia de abertura",
          "Conhecer a estrutura do clube",
          "Ajudar em uma atividade do clube"
        ]
      },
      {
        area: "Estudo da Natureza",
        itens: [
          "Completar uma especialidade de Estudo da Natureza",
          "Cuidar de uma planta por 1 mês",
          "Identificar 10 tipos de folhas"
        ]
      }
    ]
  },
  {
	    id: 2,
	    titulo: "Companheiro",
cor: "bg-blue-500",
		    requisitos: [
		      {
		        area: "Descoberta Espiritual",
		        itens: [
		          "Ler o livro do Clube do Livro Juvenil",
		          "Participar de um projeto missionário da igreja",
		          "Estudar a Bíblia diariamente por 2 semanas",
		          "Memorizar um Salmo",
		          "Participar de um culto JA"
		        ]
		      },
		      {
		        area: "Servindo aos Outros",
		        itens: [
		          "Participar de 2 projetos comunitários",
		          "Ajudar alguém em necessidade",
		          "Fazer uma boa ação diária por 1 semana"
		        ]
		      },
		      {
		        area: "Desenvolvendo Amizade",
		        itens: [
		          "Conhecer os hinos do clube",
		          "Participar de uma atividade social",
		          "Fazer 2 novos amigos"
		        ]
		      },
		      {
		        area: "Saúde e Aptidão Física",
		        itens: [
		          "Completar uma caminhada de 5 km",
		          "Aprender sobre os 8 remédios naturais",
		          "Praticar exercícios 3x por semana"
		        ]
		      },
		      {
		        area: "Organização e Liderança",
		        itens: [
		          "Liderar uma atividade do clube",
		          "Participar do conselho de unidade",
		          "Ensinar algo para outro desbravador"
		        ]
		      },
		      {
		        area: "Estudo da Natureza",
		        itens: [
		          "Completar 2 especialidades de Natureza",
		          "Fazer uma coleção de folhas",
		          "Observar estrelas por uma noite"
		        ]
		      }
		    ]
		  },
	  {
	    id: 3,
	    titulo: "Pesquisador",
	    cor: "bg-green-500",
requisitos: [
		      {
		        area: "Descoberta Espiritual",
		        itens: [
		          "Ler o livro do Clube do Livro Juvenil",
		          "Participar de um projeto missionário da igreja",
		          "Estudar a Bíblia diariamente por 2 semanas",
		          "Memorizar um Salmo",
		          "Participar de um culto JA"
		        ]
		      },
		      {
		        area: "Servindo aos Outros",
		        itens: [
		          "Participar de 2 projetos comunitários",
		          "Ajudar alguém em necessidade",
		          "Fazer uma boa ação diária por 1 semana"
		        ]
		      },
		      {
		        area: "Desenvolvendo Amizade",
		        itens: [
		          "Conhecer os hinos do clube",
		          "Participar de uma atividade social",
		          "Fazer 2 novos amigos"
		        ]
		      },
		      {
		        area: "Saúde e Aptidão Física",
		        itens: [
		          "Completar uma caminhada de 5 km",
		          "Aprender sobre os 8 remédios naturais",
		          "Praticar exercícios 3x por semana"
		        ]
		      },
		      {
		        area: "Organização e Liderança",
		        itens: [
		          "Liderar uma atividade do clube",
		          "Participar do conselho de unidade",
		          "Ensinar algo para outro desbravador"
		        ]
		      },
		      {
		        area: "Estudo da Natureza",
		        itens: [
		          "Completar 2 especialidades de Natureza",
		          "Fazer uma coleção de folhas",
		          "Observar estrelas por uma noite"
		        ]
		      }
		    ]
	  },
	  {
	    id: 4,
	    titulo: "Pioneiro",
	    cor: "bg-yellow-500",
	    requisitos: [
	      {
	        area: "Descoberta Espiritual",
	        itens: [
	          "Ler o livro do Clube do Livro Juvenil",
	          "Participar de um projeto missionário da igreja",
	          "Estudar a Bíblia diariamente por 4 semanas",
	          "Fazer um estudo bíblico com um amigo",
	          "Participar de uma semana de oração"
	        ]
	      },
	      {
	        area: "Servindo aos Outros",
	        itens: [
	          "Participar de 4 projetos comunitários",
	          "Ajudar um necessitado por 10 horas",
	          "Doar sangue ou participar de campanha"
	        ]
	      },
	      {
	        area: "Desenvolvendo Amizade",
	        itens: [
	          "Conhecer a história do uniforme dos Desbravadores",
	          "Participar de um evento de união",
	          "Fazer 4 novos amigos"
	        ]
	      },
	      {
	        area: "Saúde e Aptidão Física",
	        itens: [
	          "Completar uma caminhada de 10 km",
	          "Aprender sobre nutrição avançada",
	          "Praticar exercícios 5x por semana"
	        ]
	      },
	      {
	        area: "Organização e Liderança",
	        itens: [
	          "Liderar uma seção de uma reunião",
	          "Participar do planejamento de um acampamento",
	          "Mentorear um desbravador mais novo"
	        ]
	      },
	      {
	        area: "Estudo da Natureza",
	        itens: [
	          "Completar 4 especialidades de Natureza",
	          "Fazer um álbum de fotos de natureza",
	          "Identificar 10 tipos de árvores"
	        ]
	      }
	    ]
	  },
	  {
	    id: 5,
	    titulo: "Excursionista",
	    cor: "bg-purple-500",
	    requisitos: [
	      {
	        area: "Descoberta Espiritual",
	        itens: [
	          "Ler o livro do Clube do Livro Juvenil",
	          "Participar de um projeto missionário da igreja",
	          "Estudar a Bíblia diariamente por 5 semanas",
	          "Preparar e apresentar um estudo bíblico",
	          "Participar de um congresso de jovens"
	        ]
	      },
	      {
	        area: "Servindo aos Outros",
	        itens: [
	          "Participar de 5 projetos comunitários",
	          "Liderar um projeto de serviço",
	          "Fazer um trabalho voluntário por 15 horas"
	        ]
	      },
	      {
	        area: "Desenvolvendo Amizade",
	        itens: [
	          "Conhecer a história do lenço dos Desbravadores",
	          "Participar de um evento internacional",
	          "Fazer 5 novos amigos"
	        ]
	      },
	      {
	        area: "Saúde e Aptidão Física",
	        itens: [
	          "Completar uma caminhada de 15 km",
	          "Aprender sobre resgate aquático",
	          "Praticar exercícios 6x por semana"
	        ]
	      },
	      {
	        area: "Organização e Liderança",
	        itens: [
	          "Liderar uma reunião completa",
	          "Participar do planejamento de um evento regional",
	          "Organizar uma atividade para a unidade"
	        ]
	      },
	      {
	        area: "Estudo da Natureza",
	        itens: [
	          "Completar 5 especialidades de Natureza",
	          "Fazer um diário de campo",
	          "Identificar 10 tipos de insetos"
	        ]
	      }
	    ]
	  },
	  {
	    id: 6,
	    titulo: "Guia",
	    cor: "bg-indigo-500",
	    requisitos: [
	      {
	        area: "Descoberta Espiritual",
	        itens: [
	          "Ler o livro do Clube do Livro Juvenil",
	          "Participar de um projeto missionário da igreja",
	          "Estudar a Bíblia diariamente por 6 semanas",
	          "Liderar um estudo bíblico em grupo",
	          "Participar de um retiro espiritual"
	        ]
	      },
	      {
	        area: "Servindo aos Outros",
	        itens: [
	          "Participar de 6 projetos comunitários",
	          "Liderar 2 projetos de serviço",
	          "Fazer um trabalho voluntário por 20 horas"
	        ]
	      },
	      {
	        area: "Desenvolvendo Amizade",
	        itens: [
	          "Conhecer a história da bandeira dos Desbravadores",
	          "Participar de um evento de divisão",
	          "Fazer 6 novos amigos"
	        ]
	      },
	      {
	        area: "Saúde e Aptidão Física",
	        itens: [
	          "Completar uma caminhada de 20 km",
	          "Aprender sobre sobrevivência na selva",
	          "Manter um plano de exercícios por 3 meses"
	        ]
	      },
	      {
	        area: "Organização e Liderança",
	        itens: [
	          "Liderar a diretoria do clube em uma atividade",
	          "Participar do planejamento de um evento de união",
	          "Treinar um desbravador para uma classe"
	        ]
	      },
	      {
	        area: "Estudo da Natureza",
	        itens: [
	          "Completar 6 especialidades de Natureza",
	          "Fazer um projeto de conservação",
	          "Identificar 10 tipos de rochas"
	        ]
	      }
	    ]
	  }
	]
	
	export function ProgressoDesbravador() {
	  const [classeAtual, setClasseAtual] = useState(0)
	  const [progresso, setProgresso] = useState({})
	  const [progressoGeral, setProgressoGeral] = useState(0)
	
	  // Carregar progresso do localStorage
	  useEffect(() => {
	    const progressoSalvo = localStorage.getItem('progressoDesbravador')
	    if (progressoSalvo) {
	      setProgresso(JSON.parse(progressoSalvo))
	    }
	  }, [])
	
	  // Salvar progresso no localStorage
	  useEffect(() => {
	    localStorage.setItem('progressoDesbravador', JSON.stringify(progresso))
	    calcularProgressoGeral()
	  }, [progresso])
	
	  const toggleItem = (areaIndex, itemIndex) => {
	    const key = `${classeAtual}-${areaIndex}-${itemIndex}`
	    setProgresso(prev => ({
	      ...prev,
	      [key]: !prev[key]
	    }))
	  }
	
	  const calcularProgressoGeral = () => {
	    const classe = classesDesbravadores[classeAtual]
	    if (!classe) return
	
	    let total = 0
	    let concluidos = 0
	
	    classe.requisitos.forEach((area, areaIndex) => {
	      area.itens.forEach((_, itemIndex) => {
	        total++
	        const key = `${classeAtual}-${areaIndex}-${itemIndex}`
	        if (progresso[key]) concluidos++
	      })
	    })
	
	    const percentual = total > 0 ? (concluidos / total) * 100 : 0
	    setProgressoGeral(percentual)
	  }
	
	  useEffect(() => {
	    calcularProgressoGeral()
	  }, [classeAtual, progresso])
	
	  const gerarCertificado = () => {
	    if (progressoGeral < 100) {
	      alert('Complete todos os requisitos para gerar o certificado!')
	      return
	    }
	
	    const classe = classesDesbravadores[classeAtual]
	    const canvas = document.createElement('canvas')
	    canvas.width = 1200
	    canvas.height = 800
	    const ctx = canvas.getContext('2d')
	
	    // Fundo
	    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
	    gradient.addColorStop(0, '#2E3192')
	    gradient.addColorStop(1, '#7CB342')
	    ctx.fillStyle = gradient
	    ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	    // Borda
	    ctx.strokeStyle = '#FFD700'
	    ctx.lineWidth = 20
	    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)
	
	    // Título
	    ctx.fillStyle = '#FFFFFF'
	    ctx.font = 'bold 60px Arial'
	    ctx.textAlign = 'center'
	    ctx.fillText('CERTIFICADO DE CONCLUSÃO', canvas.width / 2, 150)
	
	    // Classe
	    ctx.font = 'bold 80px Arial'
	    ctx.fillStyle = '#FFD700'
	    ctx.fillText(`CLASSE ${classe.titulo.toUpperCase()}`, canvas.width / 2, 280)
	
	    // Texto
	    ctx.font = '30px Arial'
	    ctx.fillStyle = '#FFFFFF'
	    ctx.fillText('Certificamos que', canvas.width / 2, 380)
	
	    // Nome (placeholder)
	    ctx.font = 'bold 50px Arial'
	    ctx.fillStyle = '#FFD700'
	    ctx.fillText('DESBRAVADOR(A)', canvas.width / 2, 460)
	
	    // Texto final
	    ctx.font = '25px Arial'
	    ctx.fillStyle = '#FFFFFF'
	    ctx.fillText('completou com sucesso todos os requisitos da', canvas.width / 2, 530)
	    ctx.fillText(`Classe ${classe.titulo} dos Desbravadores`, canvas.width / 2, 570)
	
	    // Data
	    const dataAtual = new Date().toLocaleDateString('pt-BR')
	    ctx.font = '20px Arial'
	    ctx.fillText(dataAtual, canvas.width / 2, 650)
	
	    // Logo
	    const logoImg = new Image()
	    logoImg.src = logoCertificado
	    logoImg.onload = () => {
	      ctx.drawImage(logoImg, canvas.width / 2 - 50, 670, 100, 100)
	      
	      // Download
	      canvas.toBlob(blob => {
	        const url = URL.createObjectURL(blob)
	        const a = document.createElement('a')
	        a.href = url
	        a.download = `certificado-${classe.titulo.toLowerCase()}-desbravador.png`
	        a.click()
	        URL.revokeObjectURL(url)
	        alert('Certificado gerado com sucesso!')
	      })
	    }
	  }
	
	  const classe = classesDesbravadores[classeAtual]
	
	  return (
	    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
	      <div className="container mx-auto max-w-6xl">
	        {/* Header */}
	        <motion.div
	          initial={{ opacity: 0, y: -20 }}
	          animate={{ opacity: 1, y: 0 }}
	          className="text-center mb-8"
	        >
	          <h1 className="text-4xl font-bold mb-4">
	            Meu Progresso <span className="text-primary">Desbravador</span>
	          </h1>
	          <p className="text-muted-foreground">
	            Acompanhe seu progresso nas classes de Desbravadores
	          </p>
	        </motion.div>
	
	        {/* Seletor de Classe */}
	        <Card className="mb-8">
	          <CardHeader>
	            <CardTitle>Selecione sua Classe</CardTitle>
	          </CardHeader>
	          <CardContent>
	            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
	              {classesDesbravadores.map((c, index) => (
	                <Button
	                  key={c.id}
	                  variant={classeAtual === index ? 'default' : 'outline'}
	                  onClick={() => setClasseAtual(index)}
	                  className={classeAtual === index ? c.cor : ''}
	                >
	                  {c.titulo}
	                </Button>
	              ))}
	            </div>
	          </CardContent>
	        </Card>
	
	        {/* Progresso Geral */}
	        <Card className="mb-8">
	          <CardHeader>
	            <div className="flex items-center justify-between">
	              <div>
	                <CardTitle className="text-2xl">Classe {classe.titulo}</CardTitle>
	                <CardDescription>Progresso Geral: {progressoGeral.toFixed(0)}%</CardDescription>
	              </div>
	              <Trophy className={`h-12 w-12 ${progressoGeral === 100 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
	            </div>
	          </CardHeader>
	          <CardContent>
	            <Progress value={progressoGeral} className="h-4" />
	            
	            {progressoGeral === 100 && (
	              <motion.div
	                initial={{ opacity: 0, scale: 0.9 }}
	                animate={{ opacity: 1, scale: 1 }}
	                className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary"
	              >
	                <div className="flex items-center justify-between">
	                  <div className="flex items-center space-x-3">
	                    <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
	                    <div>
	                      <h3 className="font-bold text-lg">Parabéns! Classe Concluída!</h3>
	                      <p className="text-sm text-muted-foreground">Você completou todos os requisitos</p>
	                    </div>
	                  </div>
	                  <Button onClick={gerarCertificado} className="bg-primary">
	                    <Download className="h-4 w-4 mr-2" />
	                    Gerar Certificado
	                  </Button>
	                </div>
	              </motion.div>
	            )}
	          </CardContent>
	        </Card>
	
	        {/* Requisitos por Área */}
	        <div className="space-y-6">
	          {classe.requisitos.map((area, areaIndex) => {
	            const totalItens = area.itens.length
	            const concluidos = area.itens.filter((_, itemIndex) => {
	              const key = `${classeAtual}-${areaIndex}-${itemIndex}`
	              return progresso[key]
	            }).length
	            const percentualArea = (concluidos / totalItens) * 100
	
	            return (
	              <motion.div
	                key={areaIndex}
	                initial={{ opacity: 0, y: 20 }}
	                animate={{ opacity: 1, y: 0 }}
	                transition={{ delay: areaIndex * 0.1 }}
	              >
	                <Card>
	                  <CardHeader>
	                    <div className="flex items-center justify-between">
	                      <div>
	                        <CardTitle>{area.area}</CardTitle>
	                        <CardDescription>
	                          {concluidos} de {totalItens} concluídos ({percentualArea.toFixed(0)}%)
	                        </CardDescription>
	                      </div>
	                      {percentualArea === 100 && (
	                        <CheckCircle2 className="h-8 w-8 text-green-500" />
	                      )}
	                    </div>
	                  </CardHeader>
	                  <CardContent className="space-y-4">
	                    <Progress value={percentualArea} className="h-2" />
	                    
	                    <div className="space-y-3">
	                      {area.itens.map((item, itemIndex) => {
	                        const key = `${classeAtual}-${areaIndex}-${itemIndex}`
	                        const isChecked = progresso[key] || false
	
	                        return (
	                          <div
	                            key={itemIndex}
	                            className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
	                              isChecked ? 'bg-primary/10' : 'bg-muted/50'
	                            }`}
	                          >
	                            <Checkbox
	                              checked={isChecked}
	                              onCheckedChange={() => toggleItem(areaIndex, itemIndex)}
	                              className="mt-1"
	                            />
	                            <label
	                              className={`flex-1 cursor-pointer ${
	                                isChecked ? 'line-through text-muted-foreground' : ''
	                              }`}
	                              onClick={() => toggleItem(areaIndex, itemIndex)}
	                            >
	                              {item}
	                            </label>
	                            {isChecked && (
	                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
	                            )}
	                          </div>
	                        )
	                      })}
	                    </div>
	                  </CardContent>
	                </Card>
	              </motion.div>
	            )
	          })}
	        </div>
	
	        {/* Botão de Compartilhar */}
	        <Card className="mt-8">
	          <CardContent className="pt-6">
	            <div className="flex items-center justify-between">
	              <div>
	                <h3 className="font-bold text-lg">Compartilhe seu Progresso</h3>
	                <p className="text-sm text-muted-foreground">
	                  Mostre suas conquistas para seus amigos
	                </p>
	              </div>
	              <Button variant="outline">
	                <Share2 className="h-4 w-4 mr-2" />
	                Compartilhar
	              </Button>
	            </div>
	          </CardContent>
	        </Card>
	      </div>
	    </div>
	  )
	}
	
	
  {
    id: 3,
    titulo: "Pesquisador",
    cor: "bg-green-500",
    requisitos: [
      {
        area: "Descoberta Espiritual",
        itens: [
          "Ler o livro do Clube do Livro Juvenil",
          "Participar de um projeto missionário da igreja",
          "Estudar a Bíblia diariamente por 3 semanas",
          "Memorizar um capítulo da Bíblia",
          "Participar de um acampamento espiritual"
        ]
      },
      {
        area: "Servindo aos Outros",
        itens: [
          "Participar de 3 projetos comunitários",
          "Ajudar um idoso ou deficiente",
          "Fazer um trabalho voluntário por 5 horas"
        ]
      },
      {
        area: "Desenvolvendo Amizade",
        itens: [
          "Conhecer a história do Clube de Desbravadores",
          "Participar de um evento regional",
          "Fazer 3 novos amigos"
        ]
      },
      {
        area: "Saúde e Aptidão Física",
        itens: [
          "Completar uma caminhada de 8 km",
          "Aprender sobre primeiros socorros básicos",
          "Praticar exercícios 4x por semana"
        ]
      },
      {
        area: "Organização e Liderança",
        itens: [
          "Liderar uma unidade em uma atividade",
          "Participar do planejamento de um evento",
          "Apresentar um relatório para o clube"
        ]
      },
      {
        area: "Estudo da Natureza",
        itens: [
          "Completar 3 especialidades de Natureza",
          "Montar um herbário",
          "Identificar 10 tipos de pássaros"
        ]
      }
    ]
  },
  {
    id: 4,
    titulo: "Pioneiro",
    cor: "bg-yellow-500",
    requisitos: [
      {
        area: "Descoberta Espiritual",
        itens: [
          "Ler o livro do Clube do Livro Juvenil",
          "Participar de um projeto missionário da igreja",
          "Estudar a Bíblia diariamente por 4 semanas",
          "Fazer um estudo bíblico com um amigo",
          "Participar de uma semana de oração"
        ]
      },
      {
        area: "Servindo aos Outros",
        itens: [
          "Participar de 4 projetos comunitários",
          "Ajudar um necessitado por 10 horas",
          "Doar sangue ou participar de campanha"
        ]
      },
      {
        area: "Desenvolvendo Amizade",
        itens: [
          "Conhecer a história do uniforme dos Desbravadores",
          "Participar de um evento de união",
          "Fazer 4 novos amigos"
        ]
      },
      {
        area: "Saúde e Aptidão Física",
        itens: [
          "Completar uma caminhada de 10 km",
          "Aprender sobre nutrição avançada",
          "Praticar exercícios 5x por semana"
        ]
      },
      {
        area: "Organização e Liderança",
        itens: [
          "Liderar uma seção de uma reunião",
          "Participar do planejamento de um acampamento",
          "Mentorear um desbravador mais novo"
        ]
      },
      {
        area: "Estudo da Natureza",
        itens: [
          "Completar 4 especialidades de Natureza",
          "Fazer um álbum de fotos de natureza",
          "Identificar 10 tipos de árvores"
        ]
      }
    ]
  },
  {
    id: 5,
    titulo: "Excursionista",
    cor: "bg-purple-500",
    requisitos: [
      {
        area: "Descoberta Espiritual",
        itens: [
          "Ler o livro do Clube do Livro Juvenil",
          "Participar de um projeto missionário da igreja",
          "Estudar a Bíblia diariamente por 5 semanas",
          "Preparar e apresentar um estudo bíblico",
          "Participar de um congresso de jovens"
        ]
      },
      {
        area: "Servindo aos Outros",
        itens: [
          "Participar de 5 projetos comunitários",
          "Liderar um projeto de serviço",
          "Fazer um trabalho voluntário por 15 horas"
        ]
      },
      {
        area: "Desenvolvendo Amizade",
        itens: [
          "Conhecer a história do lenço dos Desbravadores",
          "Participar de um evento internacional",
          "Fazer 5 novos amigos"
        ]
      },
      {
        area: "Saúde e Aptidão Física",
        itens: [
          "Completar uma caminhada de 15 km",
          "Aprender sobre resgate aquático",
          "Praticar exercícios 6x por semana"
        ]
      },
      {
        area: "Organização e Liderança",
        itens: [
          "Liderar uma reunião completa",
          "Participar do planejamento de um evento regional",
          "Organizar uma atividade para a unidade"
        ]
      },
      {
        area: "Estudo da Natureza",
        itens: [
          "Completar 5 especialidades de Natureza",
          "Fazer um diário de campo",
          "Identificar 10 tipos de insetos"
        ]
      }
    ]
  },
  {
    id: 6,
    titulo: "Guia",
    cor: "bg-indigo-500",
    requisitos: [
      {
        area: "Descoberta Espiritual",
        itens: [
          "Ler o livro do Clube do Livro Juvenil",
          "Participar de um projeto missionário da igreja",
          "Estudar a Bíblia diariamente por 6 semanas",
          "Liderar um estudo bíblico em grupo",
          "Participar de um retiro espiritual"
        ]
      },
      {
        area: "Servindo aos Outros",
        itens: [
          "Participar de 6 projetos comunitários",
          "Liderar 2 projetos de serviço",
          "Fazer um trabalho voluntário por 20 horas"
        ]
      },
      {
        area: "Desenvolvendo Amizade",
        itens: [
          "Conhecer a história da bandeira dos Desbravadores",
          "Participar de um evento de divisão",
          "Fazer 6 novos amigos"
        ]
      },
      {
        area: "Saúde e Aptidão Física",
        itens: [
          "Completar uma caminhada de 20 km",
          "Aprender sobre sobrevivência na selva",
          "Manter um plano de exercícios por 3 meses"
        ]
      },
      {
        area: "Organização e Liderança",
        itens: [
          "Liderar a diretoria do clube em uma atividade",
          "Participar do planejamento de um evento de união",
          "Treinar um desbravador para uma classe"
        ]
      },
      {
        area: "Estudo da Natureza",
        itens: [
          "Completar 6 especialidades de Natureza",
          "Fazer um projeto de conservação",
          "Identificar 10 tipos de rochas"
        ]
      }
    ]
  }
]

export function ProgressoDesbravador() {
  const [classeAtual, setClasseAtual] = useState(0)
  const [progresso, setProgresso] = useState({})
  const [progressoGeral, setProgressoGeral] = useState(0)

  // Carregar progresso do localStorage
  useEffect(() => {
    const progressoSalvo = localStorage.getItem('progressoDesbravador')
    if (progressoSalvo) {
      setProgresso(JSON.parse(progressoSalvo))
    }
  }, [])

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem('progressoDesbravador', JSON.stringify(progresso))
    calcularProgressoGeral()
  }, [progresso])

  const toggleItem = (areaIndex, itemIndex) => {
    const key = `${classeAtual}-${areaIndex}-${itemIndex}`
    setProgresso(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const calcularProgressoGeral = () => {
    const classe = classesDesbravadores[classeAtual]
    if (!classe) return

    let total = 0
    let concluidos = 0

    classe.requisitos.forEach((area, areaIndex) => {
      area.itens.forEach((_, itemIndex) => {
        total++
        const key = `${classeAtual}-${areaIndex}-${itemIndex}`
        if (progresso[key]) concluidos++
      })
    })

    const percentual = total > 0 ? (concluidos / total) * 100 : 0
    setProgressoGeral(percentual)
  }

  useEffect(() => {
    calcularProgressoGeral()
  }, [classeAtual, progresso])

  const gerarCertificado = () => {
    if (progressoGeral < 100) {
      alert('Complete todos os requisitos para gerar o certificado!')
      return
    }

    const classe = classesDesbravadores[classeAtual]
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext('2d')

    // Fundo
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#2E3192')
    gradient.addColorStop(1, '#7CB342')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Borda
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 20
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

    // Título
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('CERTIFICADO DE CONCLUSÃO', canvas.width / 2, 150)

    // Classe
    ctx.font = 'bold 80px Arial'
    ctx.fillStyle = '#FFD700'
    ctx.fillText(`CLASSE ${classe.titulo.toUpperCase()}`, canvas.width / 2, 280)

    // Texto
    ctx.font = '30px Arial'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText('Certificamos que', canvas.width / 2, 380)

    // Nome (placeholder)
    ctx.font = 'bold 50px Arial'
    ctx.fillStyle = '#FFD700'
    ctx.fillText('DESBRAVADOR(A)', canvas.width / 2, 460)

    // Texto final
    ctx.font = '25px Arial'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText('completou com sucesso todos os requisitos da', canvas.width / 2, 530)
    ctx.fillText(`Classe ${classe.titulo} dos Desbravadores`, canvas.width / 2, 570)

    // Data
    const dataAtual = new Date().toLocaleDateString('pt-BR')
    ctx.font = '20px Arial'
    ctx.fillText(dataAtual, canvas.width / 2, 650)

    // Logo
    const logoImg = new Image()
    logoImg.src = logoCertificado
    logoImg.onload = () => {
      ctx.drawImage(logoImg, canvas.width / 2 - 50, 670, 100, 100)
      
      // Download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `certificado-${classe.titulo.toLowerCase()}-desbravador.png`
        a.click()
        URL.revokeObjectURL(url)
        alert('Certificado gerado com sucesso!')
      })
    }
  }

  const classe = classesDesbravadores[classeAtual]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Meu Progresso <span className="text-primary">Desbravador</span>
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso nas classes de Desbravadores
          </p>
        </motion.div>

        {/* Seletor de Classe */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selecione sua Classe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {classesDesbravadores.map((c, index) => (
                <Button
                  key={c.id}
                  variant={classeAtual === index ? 'default' : 'outline'}
                  onClick={() => setClasseAtual(index)}
                  className={classeAtual === index ? c.cor : ''}
                >
                  {c.titulo}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progresso Geral */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Classe {classe.titulo}</CardTitle>
                <CardDescription>Progresso Geral: {progressoGeral.toFixed(0)}%</CardDescription>
              </div>
              <Trophy className={`h-12 w-12 ${progressoGeral === 100 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressoGeral} className="h-4" />
            
            {progressoGeral === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                    <div>
                      <h3 className="font-bold text-lg">Parabéns! Classe Concluída!</h3>
                      <p className="text-sm text-muted-foreground">Você completou todos os requisitos</p>
                    </div>
                  </div>
                  <Button onClick={gerarCertificado} className="bg-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Certificado
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Requisitos por Área */}
        <div className="space-y-6">
          {classe.requisitos.map((area, areaIndex) => {
            const totalItens = area.itens.length
            const concluidos = area.itens.filter((_, itemIndex) => {
              const key = `${classeAtual}-${areaIndex}-${itemIndex}`
              return progresso[key]
            }).length
            const percentualArea = (concluidos / totalItens) * 100

            return (
              <motion.div
                key={areaIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: areaIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{area.area}</CardTitle>
                        <CardDescription>
                          {concluidos} de {totalItens} concluídos ({percentualArea.toFixed(0)}%)
                        </CardDescription>
                      </div>
                      {percentualArea === 100 && (
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={percentualArea} className="h-2" />
                    
                    <div className="space-y-3">
                      {area.itens.map((item, itemIndex) => {
                        const key = `${classeAtual}-${areaIndex}-${itemIndex}`
                        const isChecked = progresso[key] || false

                        return (
                          <div
                            key={itemIndex}
                            className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                              isChecked ? 'bg-primary/10' : 'bg-muted/50'
                            }`}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => toggleItem(areaIndex, itemIndex)}
                              className="mt-1"
                            />
                            <label
                              className={`flex-1 cursor-pointer ${
                                isChecked ? 'line-through text-muted-foreground' : ''
                              }`}
                              onClick={() => toggleItem(areaIndex, itemIndex)}
                            >
                              {item}
                            </label>
                            {isChecked && (
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Botão de Compartilhar */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Compartilhe seu Progresso</h3>
                <p className="text-sm text-muted-foreground">
                  Mostre suas conquistas para seus amigos
                </p>
              </div>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

