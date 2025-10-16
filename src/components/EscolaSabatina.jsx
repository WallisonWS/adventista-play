import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Download,
  Share2,
  Clock,
  CheckCircle
} from 'lucide-react'

// Dados dos estudos da Escola Sabatina
const estudosEscolaSabatina = {
  trimestre: "4º Trimestre 2025",
  tema: "O Grande Conflito",
  autor: "Ellen G. White",
  periodo: "Outubro - Dezembro 2025",
  licoes: [
    {
      numero: 1,
      titulo: "Por que Existe o Sofrimento?",
      data: "05/10/2025",
      versiculo: "Apocalipse 12:7-9",
      resumo: "Exploramos a origem do mal e o grande conflito entre Cristo e Satanás.",
      topicos: [
        "A origem do pecado",
        "A queda de Lúcifer",
        "O conflito no céu",
        "A guerra espiritual"
      ],
      leitura: [
        "Segunda - A perfeição de Lúcifer",
        "Terça - O orgulho e a rebelião",
        "Quarta - A guerra no céu",
        "Quinta - A expulsão de Satanás",
        "Sexta - Reflexões sobre o conflito"
      ]
    },
    {
      numero: 2,
      titulo: "A Crise no Éden",
      data: "12/10/2025",
      versiculo: "Gênesis 3:1-6",
      resumo: "A tentação de Eva e a entrada do pecado no mundo através da desobediência.",
      topicos: [
        "A tentação da serpente",
        "A dúvida sobre Deus",
        "A desobediência",
        "As consequências do pecado"
      ],
      leitura: [
        "Segunda - O jardim perfeito",
        "Terça - A estratégia do tentador",
        "Quarta - A escolha fatal",
        "Quinta - As consequências imediatas",
        "Sexta - A promessa de redenção"
      ]
    },
    {
      numero: 3,
      titulo: "Caim e Abel: Dois Caminhos",
      data: "19/10/2025",
      versiculo: "Gênesis 4:1-16",
      resumo: "A história dos primeiros irmãos e a escolha entre adoração verdadeira e falsa.",
      topicos: [
        "Duas ofertas diferentes",
        "A rejeição e a ira",
        "O primeiro homicídio",
        "A marca de Caim"
      ],
      leitura: [
        "Segunda - Os filhos de Adão",
        "Terça - Ofertas a Deus",
        "Quarta - A advertência divina",
        "Quinta - O crime e o castigo",
        "Sexta - A misericórdia de Deus"
      ]
    },
    {
      numero: 4,
      titulo: "O Dilúvio",
      data: "26/10/2025",
      versiculo: "Gênesis 6-9",
      resumo: "O juízo de Deus sobre um mundo corrupto e a salvação através da arca.",
      topicos: [
        "A corrupção da humanidade",
        "A construção da arca",
        "O dilúvio universal",
        "O pacto do arco-íris"
      ],
      leitura: [
        "Segunda - A maldade humana",
        "Terça - Noé encontra graça",
        "Quarta - A pregação de Noé",
        "Quinta - O dilúvio vem",
        "Sexta - Um novo começo"
      ]
    },
    {
      numero: 5,
      titulo: "Fé Contra Cultura",
      data: "02/11/2025",
      versiculo: "Daniel 1",
      resumo: "Daniel e seus amigos mantêm sua fé em um ambiente hostil.",
      topicos: [
        "O cativeiro babilônico",
        "A decisão de Daniel",
        "A prova dos dez dias",
        "A sabedoria divina"
      ],
      leitura: [
        "Segunda - Exilados em Babilônia",
        "Terça - A proposta do rei",
        "Quarta - A decisão de não contaminar-se",
        "Quinta - O resultado da fidelidade",
        "Sexta - Honrando a Deus"
      ]
    },
    {
      numero: 6,
      titulo: "A Fornalha Ardente",
      data: "09/11/2025",
      versiculo: "Daniel 3",
      resumo: "Três jovens hebreus enfrentam a morte por não adorarem a estátua de ouro.",
      topicos: [
        "A estátua de Nabucodonosor",
        "A recusa em adorar",
        "A fornalha aquecida",
        "O quarto homem no fogo"
      ],
      leitura: [
        "Segunda - A imagem de ouro",
        "Terça - A acusação",
        "Quarta - A resposta de fé",
        "Quinta - No meio do fogo",
        "Sexta - Deus é glorificado"
      ]
    },
    {
      numero: 7,
      titulo: "A Cova dos Leões",
      data: "16/11/2025",
      versiculo: "Daniel 6",
      resumo: "Daniel permanece fiel em oração mesmo diante da ameaça de morte.",
      topicos: [
        "O decreto do rei",
        "A fidelidade de Daniel",
        "A cova dos leões",
        "O livramento divino"
      ],
      leitura: [
        "Segunda - Daniel no governo",
        "Terça - A conspiração",
        "Quarta - A oração de Daniel",
        "Quinta - Na cova dos leões",
        "Sexta - O testemunho do rei"
      ]
    },
    {
      numero: 8,
      titulo: "O Messias Prometido",
      data: "23/11/2025",
      versiculo: "Isaías 53",
      resumo: "As profecias sobre o Messias sofredor e sua obra redentora.",
      topicos: [
        "O servo sofredor",
        "Ferido por nossas transgressões",
        "O cordeiro de Deus",
        "A vitória através do sofrimento"
      ],
      leitura: [
        "Segunda - As profecias messiânicas",
        "Terça - O servo desprezado",
        "Quarta - Levou nossas dores",
        "Quinta - A expiação vicária",
        "Sexta - A ressurreição prometida"
      ]
    },
    {
      numero: 9,
      titulo: "A Vida de Cristo",
      data: "30/11/2025",
      versiculo: "João 1:1-14",
      resumo: "O Verbo se fez carne e habitou entre nós, revelando o amor de Deus.",
      topicos: [
        "A encarnação",
        "O ministério de Jesus",
        "Os milagres",
        "O ensino do Reino"
      ],
      leitura: [
        "Segunda - O Verbo eterno",
        "Terça - O nascimento virginal",
        "Quarta - O batismo e tentação",
        "Quinta - Os milagres de Jesus",
        "Sexta - O Sermão do Monte"
      ]
    },
    {
      numero: 10,
      titulo: "A Cruz de Cristo",
      data: "07/12/2025",
      versiculo: "João 19:17-30",
      resumo: "O sacrifício supremo de Jesus na cruz do Calvário.",
      topicos: [
        "A traição e prisão",
        "O julgamento injusto",
        "A crucificação",
        "Está consumado"
      ],
      leitura: [
        "Segunda - A última ceia",
        "Terça - O Getsêmani",
        "Quarta - O julgamento",
        "Quinta - A crucificação",
        "Sexta - A morte de Jesus"
      ]
    },
    {
      numero: 11,
      titulo: "A Ressurreição",
      data: "14/12/2025",
      versiculo: "1 Coríntios 15:3-8",
      resumo: "Cristo ressuscitou! A vitória sobre a morte e o pecado.",
      topicos: [
        "O túmulo vazio",
        "As aparições de Jesus",
        "A grande comissão",
        "A esperança da ressurreição"
      ],
      leitura: [
        "Segunda - O sábado de descanso",
        "Terça - O primeiro dia da semana",
        "Quarta - As testemunhas oculares",
        "Quinta - A ascensão",
        "Sexta - A promessa do retorno"
      ]
    },
    {
      numero: 12,
      titulo: "O Juízo Final",
      data: "21/12/2025",
      versiculo: "Apocalipse 20:11-15",
      resumo: "O juízo de Deus e a erradicação final do pecado.",
      topicos: [
        "O juízo investigativo",
        "O grande trono branco",
        "O livro da vida",
        "A segunda morte"
      ],
      leitura: [
        "Segunda - O santuário celestial",
        "Terça - O dia da expiação",
        "Quarta - O juízo dos ímpios",
        "Quinta - O lago de fogo",
        "Sexta - O fim do mal"
      ]
    },
    {
      numero: 13,
      titulo: "Tudo Novo",
      data: "28/12/2025",
      versiculo: "Apocalipse 21:1-5",
      resumo: "A nova terra e a restauração completa da criação de Deus.",
      topicos: [
        "Novos céus e nova terra",
        "A Nova Jerusalém",
        "Deus habitará conosco",
        "Não haverá mais morte"
      ],
      leitura: [
        "Segunda - A promessa de restauração",
        "Terça - A cidade santa",
        "Quarta - O rio da vida",
        "Quinta - A árvore da vida",
        "Sexta - Eternidade com Deus"
      ]
    }
  ]
}

export function EscolaSabatina() {
  const [licaoAtual, setLicaoAtual] = useState(null)
  const [diaAtual, setDiaAtual] = useState(new Date())

  useEffect(() => {
    // Determinar a lição atual baseada na data
    const hoje = new Date()
    const licaoHoje = estudosEscolaSabatina.licoes.find(licao => {
      const dataLicao = new Date(licao.data.split('/').reverse().join('-'))
      const proximaSemana = new Date(dataLicao)
      proximaSemana.setDate(proximaSemana.getDate() + 7)
      return hoje >= dataLicao && hoje < proximaSemana
    })
    
    if (licaoHoje) {
      setLicaoAtual(licaoHoje)
    } else {
      // Se não encontrar, usar a primeira lição
      setLicaoAtual(estudosEscolaSabatina.licoes[0])
    }
  }, [])

  const getDiaSemana = () => {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return dias[diaAtual.getDay()]
  }

  const getLeituraHoje = () => {
    if (!licaoAtual) return null
    const diaSemana = diaAtual.getDay()
    // 0=Domingo, 1=Segunda, ..., 6=Sábado
    // Leitura: 0=Segunda, 1=Terça, 2=Quarta, 3=Quinta, 4=Sexta
    if (diaSemana >= 1 && diaSemana <= 5) {
      return licaoAtual.leitura[diaSemana - 1]
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#2E3192' }}>
            Escola Sabatina
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {estudosEscolaSabatina.trimestre}
          </p>
          <Badge className="text-lg px-4 py-2" style={{ backgroundColor: '#7CB342' }}>
            {estudosEscolaSabatina.tema}
          </Badge>
        </motion.div>

        {/* Lição de Hoje */}
        {licaoAtual && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="border-2" style={{ borderColor: '#7CB342' }}>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      Lição {licaoAtual.numero}: {licaoAtual.titulo}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {licaoAtual.data}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {licaoAtual.versiculo}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    Atual
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg text-gray-700 mb-6">
                  {licaoAtual.resumo}
                </p>

                {/* Leitura de Hoje */}
                {getLeituraHoje() && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <h3 className="font-bold text-green-800">
                        Leitura de Hoje ({getDiaSemana()})
                      </h3>
                    </div>
                    <p className="text-green-700 text-lg">
                      {getLeituraHoje()}
                    </p>
                  </div>
                )}

                {/* Tópicos */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3" style={{ color: '#2E3192' }}>
                    Tópicos Principais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {licaoAtual.topicos.map((topico, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{topico}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leitura da Semana */}
                <div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: '#2E3192' }}>
                    Leitura da Semana
                  </h3>
                  <div className="space-y-2">
                    {licaoAtual.leitura.map((leitura, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" style={{ color: '#7CB342' }} />
                        <span className="text-gray-700">{leitura}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1" style={{ backgroundColor: '#2E3192' }}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Todas as Lições */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2E3192' }}>
            Todas as Lições do Trimestre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {estudosEscolaSabatina.licoes.map((licao) => (
              <motion.div
                key={licao.numero}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    licao.numero === licaoAtual?.numero 
                      ? 'border-2 border-green-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setLicaoAtual(licao)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          Lição {licao.numero}
                        </CardTitle>
                        <CardDescription className="font-semibold text-gray-800">
                          {licao.titulo}
                        </CardDescription>
                      </div>
                      {licao.numero === licaoAtual?.numero && (
                        <Badge style={{ backgroundColor: '#7CB342' }}>
                          Atual
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      {licao.data}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      {licao.versiculo}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

