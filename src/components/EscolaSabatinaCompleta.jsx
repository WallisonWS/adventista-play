import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { Users, UserCheck, BookOpen, Calendar, ChevronRight, ArrowLeft } from 'lucide-react'

// Lições para Adultos
const licoesAdultos = {
  trimestre: '4º Trimestre 2025',
  tema: 'O Grande Conflito',
  licoes: [
    {
      numero: 1,
      titulo: 'Por que Existe o Sofrimento?',
      versiculo: 'Apocalipse 12:7-9',
      data: '05/10/2025',
      dias: {
        domingo: {
          titulo: 'A Origem do Pecado',
          conteudo: 'Lúcifer era o querubim ungido, perfeito em seus caminhos desde o dia em que foi criado (Ezequiel 28:14-15). Ele era o mais belo e sábio dos anjos, mas o orgulho entrou em seu coração. "Como caíste do céu, ó estrela da manhã, filha da alva!" (Isaías 14:12). Lúcifer desejou ser igual a Deus e iniciou uma rebelião no céu, enganando um terço dos anjos.'
        },
        segunda: {
          titulo: 'O Conflito no Céu',
          conteudo: '"Houve guerra no céu: Miguel e os seus anjos batalhavam contra o dragão" (Apocalipse 12:7). Esta não foi uma guerra física, mas uma batalha de princípios e lealdades. Satanás e seus anjos foram expulsos do céu. "E foi precipitado o grande dragão, a antiga serpente, chamada o Diabo e Satanás" (Apocalipse 12:9).'
        },
        terca: {
          titulo: 'Por que Deus Permitiu?',
          conteudo: 'Deus criou seres com capacidade de escolha. O amor verdadeiro não pode ser forçado, deve ser uma escolha livre. Deus permitiu que o pecado seguisse seu curso para que todo o universo pudesse ver suas terríveis consequências e a verdadeira natureza de Satanás.'
        },
        quarta: {
          titulo: 'O Sofrimento Hoje',
          conteudo: 'O sofrimento não é culpa de Deus, mas resultado da rebelião contra Seus princípios perfeitos de amor. "Deus enxugará dos seus olhos toda lágrima" (Apocalipse 21:4). O conflito terá fim e o sofrimento será erradicado para sempre.'
        },
        quinta: {
          titulo: 'A Esperança da Vitória',
          conteudo: 'Mesmo sem entender tudo, podemos confiar no caráter amoroso de Deus. O sofrimento é temporário, a vitória de Cristo é eterna. Em breve, Ele voltará para restaurar todas as coisas.'
        },
        sexta: {
          titulo: 'Estudo Adicional',
          conteudo: 'Leia "O Grande Conflito", capítulo 1, de Ellen G. White. Reflita sobre como o conhecimento da origem do pecado afeta sua compreensão do caráter de Deus e Sua justiça.'
        }
      }
    },
    {
      numero: 2,
      titulo: 'A Crise no Éden',
      versiculo: 'Gênesis 3:1-6',
      data: '12/10/2025',
      dias: {
        domingo: {
          titulo: 'O Jardim Perfeito',
          conteudo: 'Deus criou Adão e Eva à Sua imagem e os colocou em um jardim perfeito, com tudo o que precisavam para serem felizes. "De toda árvore do jardim comerás livremente, mas da árvore do conhecimento do bem e do mal, dela não comerás" (Gênesis 2:16-17).'
        },
        segunda: {
          titulo: 'A Estratégia do Tentador',
          conteudo: '"É assim que Deus disse?" (Gênesis 3:1). Satanás começou plantando dúvida sobre o que Deus realmente disse. "Certamente não morrereis" (Gênesis 3:4). O tentador contradiz diretamente a advertência de Deus.'
        },
        terca: {
          titulo: 'A Escolha Fatal',
          conteudo: '"Viu a mulher que a árvore era boa para se comer, agradável aos olhos e árvore desejável para dar entendimento" (Gênesis 3:6). Eva comeu e deu também a Adão, que comeu. Naquele momento, o pecado entrou no mundo perfeito de Deus.'
        },
        quarta: {
          titulo: 'As Consequências Imediatas',
          conteudo: '"Então foram abertos os olhos de ambos, e conheceram que estavam nus" (Gênesis 3:7). A inocência foi perdida. "Ouvi a tua voz no jardim e tive medo... e escondi-me" (Gênesis 3:10). O pecado sempre nos afasta de Deus.'
        },
        quinta: {
          titulo: 'A Promessa de Redenção',
          conteudo: '"Porei inimizade entre ti e a mulher, entre a tua descendência e o seu descendente. Este te ferirá a cabeça, e tu lhe ferirás o calcanhar" (Gênesis 3:15). Mesmo no momento da queda, Deus já prometeu um Salvador.'
        },
        sexta: {
          titulo: 'Estudo Adicional',
          conteudo: 'Leia "Patriarcas e Profetas", capítulo 3, de Ellen G. White. Reflita sobre as táticas de Satanás e como você pode reconhecê-las em sua vida hoje.'
        }
      }
    }
  ]
}

// Lições para Jovens
const licoesJovens = {
  trimestre: '4º Trimestre 2025',
  tema: 'Heróis da Fé',
  licoes: [
    {
      numero: 1,
      titulo: 'Daniel: Coragem para Ser Diferente',
      versiculo: 'Daniel 1:8',
      data: '05/10/2025',
      dias: {
        domingo: {
          titulo: 'Longe de Casa',
          conteudo: 'Daniel e seus amigos foram levados cativos para Babilônia quando ainda eram adolescentes. Imagine ser arrancado de sua família, sua casa, sua igreja e levado para um país estrangeiro. Mas Daniel não perdeu sua fé.'
        },
        segunda: {
          titulo: 'A Decisão Difícil',
          conteudo: '"Daniel, porém, propôs no seu coração não se contaminar com a porção do manjar do rei" (Daniel 1:8). Daniel tinha apenas 16 anos, mas já sabia o que era certo. Ele escolheu obedecer a Deus, mesmo que isso o tornasse diferente.'
        },
        terca: {
          titulo: 'Pressão dos Colegas',
          conteudo: 'Todos ao redor de Daniel estavam comendo a comida do rei. Seria fácil apenas seguir a multidão. Mas Daniel tinha convicções. Você tem coragem de ser diferente na escola, mesmo quando todos estão fazendo algo errado?'
        },
        quarta: {
          titulo: 'Deus Honra a Fidelidade',
          conteudo: 'Depois de 10 dias comendo apenas vegetais, Daniel e seus amigos estavam mais saudáveis que todos os outros. Deus sempre honra aqueles que O honram. Quando você escolhe fazer o certo, Deus está com você.'
        },
        quinta: {
          titulo: 'Seja um Daniel Hoje',
          conteudo: 'Você enfrenta pressões todos os dias: colar na prova, mentir para os pais, assistir coisas inadequadas. Mas você pode ser um Daniel. Você pode escolher fazer o certo, mesmo quando é difícil.'
        },
        sexta: {
          titulo: 'Desafio da Semana',
          conteudo: 'Esta semana, identifique uma área em sua vida onde você precisa ter coragem como Daniel. Talvez seja defender um colega que sofre bullying, ou recusar participar de fofocas. Peça a Deus coragem e faça o certo!'
        }
      }
    },
    {
      numero: 2,
      titulo: 'Ester: Coragem para Salvar Outros',
      versiculo: 'Ester 4:14',
      data: '12/10/2025',
      dias: {
        domingo: {
          titulo: 'Uma Garota Comum',
          conteudo: 'Ester era uma garota judia órfã, criada por seu primo Mordecai. Ela nunca imaginou que se tornaria rainha. Mas Deus tinha um plano especial para ela. Deus também tem um plano para você!'
        },
        segunda: {
          titulo: 'O Plano Maligno',
          conteudo: 'Hamã, um homem mau, planejou matar todos os judeus no império persa. Ester estava em posição de ajudar, mas isso significava arriscar sua própria vida. Às vezes, fazer o certo envolve riscos.'
        },
        terca: {
          titulo: 'Para um Momento Como Este',
          conteudo: '"Quem sabe se para tal tempo como este chegaste a este reino?" (Ester 4:14). Mordecai lembrou Ester de que ela estava ali por um propósito. Você também está onde está por um propósito de Deus.'
        },
        quarta: {
          titulo: 'Coragem em Ação',
          conteudo: '"Se perecer, pereci" (Ester 4:16). Ester decidiu arriscar tudo para salvar seu povo. Ela jejuou, orou e então agiu com coragem. Deus nos dá coragem quando precisamos.'
        },
        quinta: {
          titulo: 'Deus Usa Jovens',
          conteudo: 'Ester era jovem, mas Deus a usou para salvar uma nação inteira. Você não precisa esperar ser adulto para ser usado por Deus. Ele pode usar você agora, onde você está!'
        },
        sexta: {
          titulo: 'Desafio da Semana',
          conteudo: 'Pense em alguém que precisa de ajuda: um colega sendo intimidado, um amigo com problemas. Ore pedindo coragem e faça algo para ajudar essa pessoa esta semana. Seja uma Ester!'
        }
      }
    }
  ]
}

export function EscolaSabatinaCompleta() {
  const [categoria, setCategoria] = useState(null) // 'adultos' ou 'jovens'
  const [licaoSelecionada, setLicaoSelecionada] = useState(null)
  const [diaSelecionado, setDiaSelecionado] = useState(null)

  const diasDaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta']
  const diasNomes = {
    domingo: 'Domingo',
    segunda: 'Segunda-feira',
    terca: 'Terça-feira',
    quarta: 'Quarta-feira',
    quinta: 'Quinta-feira',
    sexta: 'Sexta-feira'
  }

  // Se nenhuma categoria selecionada, mostrar escolha
  if (!categoria) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Escola Sabatina
            </h1>
            <p className="text-xl text-gray-600">
              Escolha sua categoria de estudo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500"
                onClick={() => setCategoria('adultos')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl">Adultos</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Estudos profundos e reflexivos sobre temas bíblicos
                  </p>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    {licoesAdultos.licoes.length} lições disponíveis
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500"
                onClick={() => setCategoria('jovens')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-12 h-12 text-purple-600" />
                  </div>
                  <CardTitle className="text-3xl">Jovens</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Lições práticas e relevantes para a vida dos jovens
                  </p>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    {licoesJovens.licoes.length} lições disponíveis
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const licoesAtual = categoria === 'adultos' ? licoesAdultos : licoesJovens
  const corPrincipal = categoria === 'adultos' ? 'blue' : 'purple'

  // Se nenhuma lição selecionada, mostrar lista de lições
  if (!licaoSelecionada) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setCategoria(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className={`bg-${corPrincipal}-600 mb-4`}>
              {licoesAtual.trimestre}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {licoesAtual.tema}
            </h1>
            <p className="text-xl text-gray-600">
              Lições para {categoria === 'adultos' ? 'Adultos' : 'Jovens'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {licoesAtual.licoes.map((licao, index) => (
              <motion.div
                key={licao.numero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setLicaoSelecionada(licao)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`bg-${corPrincipal}-600`}>
                            Lição {licao.numero}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {licao.data}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {licao.titulo}
                        </h3>
                        <p className="text-gray-600">
                          {licao.versiculo}
                        </p>
                      </div>
                      <ChevronRight className={`w-6 h-6 text-${corPrincipal}-600`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Se nenhum dia selecionado, mostrar lista de dias
  if (!diaSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLicaoSelecionada(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className={`bg-${corPrincipal}-600 mb-4`}>
              Lição {licaoSelecionada.numero}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {licaoSelecionada.titulo}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {licaoSelecionada.versiculo}
            </p>
            <p className="text-gray-500">
              {licaoSelecionada.data}
            </p>
          </motion.div>

          <div className="space-y-4">
            {diasDaSemana.map((dia, index) => {
              const conteudoDia = licaoSelecionada.dias[dia]
              return (
                <motion.div
                  key={dia}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => setDiaSelecionado(dia)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className={`text-${corPrincipal}-600 border-${corPrincipal}-600 mb-2`}>
                            {diasNomes[dia]}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900">
                            {conteudoDia.titulo}
                          </h3>
                        </div>
                        <ChevronRight className={`w-6 h-6 text-${corPrincipal}-600`} />
                      </div>
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

  // Mostrar conteúdo do dia selecionado
  const conteudoDia = licaoSelecionada.dias[diaSelecionado]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setDiaSelecionado(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`bg-${corPrincipal}-600`}>
                  Lição {licaoSelecionada.numero}
                </Badge>
                <Badge variant="outline" className={`text-${corPrincipal}-600 border-${corPrincipal}-600`}>
                  {diasNomes[diaSelecionado]}
                </Badge>
              </div>
              <CardTitle className="text-3xl">
                {conteudoDia.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-gray-700">
                  {conteudoDia.conteudo}
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                {diasDaSemana.indexOf(diaSelecionado) > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setDiaSelecionado(diasDaSemana[diasDaSemana.indexOf(diaSelecionado) - 1])}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Dia Anterior
                  </Button>
                )}
                {diasDaSemana.indexOf(diaSelecionado) < diasDaSemana.length - 1 && (
                  <Button
                    className={`bg-${corPrincipal}-600 hover:bg-${corPrincipal}-700 ml-auto`}
                    onClick={() => setDiaSelecionado(diasDaSemana[diasDaSemana.indexOf(diaSelecionado) + 1])}
                  >
                    Próximo Dia
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

