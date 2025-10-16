import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Brain, Trophy, CheckCircle, XCircle, Play, RotateCcw } from 'lucide-react'

const quizzes = [
  {
    id: 1,
    categoria: 'Antigo Testamento',
    dificuldade: 'Fácil',
    perguntas: [
      {
        pergunta: 'Quem foi o primeiro homem criado por Deus?',
        opcoes: ['Noé', 'Abraão', 'Adão', 'Moisés'],
        resposta: 'Adão'
      },
      {
        pergunta: 'Quantos dias Deus levou para criar o mundo?',
        opcoes: ['5 dias', '6 dias', '7 dias', '8 dias'],
        resposta: '6 dias'
      },
      {
        pergunta: 'Quem construiu a arca para escapar do dilúvio?',
        opcoes: ['Abraão', 'Noé', 'Moisés', 'Davi'],
        resposta: 'Noé'
      },
      {
        pergunta: 'Qual era o nome do irmão de Moisés?',
        opcoes: ['Arão', 'José', 'Jacó', 'Isaías'],
        resposta: 'Arão'
      },
      {
        pergunta: 'Quem matou o gigante Golias?',
        opcoes: ['Saul', 'Davi', 'Salomão', 'Samuel'],
        resposta: 'Davi'
      }
    ]
  },
  {
    id: 2,
    categoria: 'Novo Testamento',
    dificuldade: 'Fácil',
    perguntas: [
      {
        pergunta: 'Onde Jesus nasceu?',
        opcoes: ['Jerusalém', 'Nazaré', 'Belém', 'Cafarnaum'],
        resposta: 'Belém'
      },
      {
        pergunta: 'Quantos discípulos Jesus escolheu?',
        opcoes: ['10', '11', '12', '13'],
        resposta: '12'
      },
      {
        pergunta: 'Quem traiu Jesus?',
        opcoes: ['Pedro', 'João', 'Judas', 'Tiago'],
        resposta: 'Judas'
      },
      {
        pergunta: 'Quantos dias Jesus ficou no deserto?',
        opcoes: ['30 dias', '40 dias', '50 dias', '60 dias'],
        resposta: '40 dias'
      },
      {
        pergunta: 'Quem negou Jesus três vezes?',
        opcoes: ['Pedro', 'João', 'Tiago', 'André'],
        resposta: 'Pedro'
      }
    ]
  },
  {
    id: 3,
    categoria: 'Personagens Bíblicos',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Quem foi vendido como escravo por seus irmãos?',
        opcoes: ['José', 'Benjamim', 'Judá', 'Simeão'],
        resposta: 'José'
      },
      {
        pergunta: 'Quem foi engolido por um grande peixe?',
        opcoes: ['Jonas', 'Elias', 'Eliseu', 'Ezequiel'],
        resposta: 'Jonas'
      },
      {
        pergunta: 'Quem foi a primeira mulher criada por Deus?',
        opcoes: ['Sara', 'Rebeca', 'Eva', 'Raquel'],
        resposta: 'Eva'
      },
      {
        pergunta: 'Quem foi o homem mais sábio do Antigo Testamento?',
        opcoes: ['Davi', 'Salomão', 'Daniel', 'Isaías'],
        resposta: 'Salomão'
      },
      {
        pergunta: 'Quem foi lançado na cova dos leões?',
        opcoes: ['Daniel', 'Davi', 'José', 'Moisés'],
        resposta: 'Daniel'
      }
    ]
  },
  {
    id: 4,
    categoria: 'Milagres de Jesus',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Quantos pães e peixes Jesus usou para alimentar 5000 pessoas?',
        opcoes: ['3 pães e 2 peixes', '5 pães e 2 peixes', '7 pães e 3 peixes', '10 pães e 5 peixes'],
        resposta: '5 pães e 2 peixes'
      },
      {
        pergunta: 'Quem Jesus ressuscitou depois de 4 dias morto?',
        opcoes: ['Lázaro', 'Jairo', 'A filha de Jairo', 'O filho da viúva'],
        resposta: 'Lázaro'
      },
      {
        pergunta: 'Em que Jesus transformou a água?',
        opcoes: ['Vinho', 'Azeite', 'Leite', 'Mel'],
        resposta: 'Vinho'
      },
      {
        pergunta: 'Quantos leprosos Jesus curou, mas apenas um voltou para agradecer?',
        opcoes: ['5', '7', '10', '12'],
        resposta: '10'
      },
      {
        pergunta: 'Sobre o que Jesus andou?',
        opcoes: ['Fogo', 'Água', 'Ar', 'Areia'],
        resposta: 'Água'
      }
    ]
  }
]

export function QuizBiblico() {
  const [quizSelecionado, setQuizSelecionado] = useState(null)
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState([])
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [mostrarFeedback, setMostrarFeedback] = useState(false)

  const iniciarQuiz = (quiz) => {
    setQuizSelecionado(quiz)
    setPerguntaAtual(0)
    setRespostas([])
    setMostrarResultado(false)
    setRespostaSelecionada(null)
    setMostrarFeedback(false)
  }

  const selecionarResposta = (opcao) => {
    if (respostaSelecionada) return // Já respondeu

    const quiz = quizSelecionado
    const pergunta = quiz.perguntas[perguntaAtual]
    const correta = opcao === pergunta.resposta

    setRespostaSelecionada(opcao)
    setRespostas([...respostas, { pergunta: pergunta.pergunta, resposta: opcao, correta }])
    setMostrarFeedback(true)

    // Avançar após 2 segundos
    setTimeout(() => {
      if (perguntaAtual < quiz.perguntas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1)
        setRespostaSelecionada(null)
        setMostrarFeedback(false)
      } else {
        setMostrarResultado(true)
      }
    }, 2000)
  }

  const reiniciarQuiz = () => {
    setQuizSelecionado(null)
    setPerguntaAtual(0)
    setRespostas([])
    setMostrarResultado(false)
    setRespostaSelecionada(null)
    setMostrarFeedback(false)
  }

  // Tela de resultado
  if (mostrarResultado && quizSelecionado) {
    const acertos = respostas.filter(r => r.correta).length
    const total = quizSelecionado.perguntas.length
    const porcentagem = Math.round((acertos / total) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-2xl">
              <CardHeader className="text-center bg-gradient-to-r from-primary to-secondary text-white">
                <Trophy className="h-20 w-20 mx-auto mb-4" />
                <CardTitle className="text-4xl mb-2">Quiz Concluído!</CardTitle>
                <CardDescription className="text-white/90 text-xl">
                  Veja seu desempenho
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold mb-2" style={{ color: porcentagem >= 70 ? '#7CB342' : porcentagem >= 50 ? '#FFA726' : '#EF5350' }}>
                    {porcentagem}%
                  </div>
                  <p className="text-2xl text-gray-600">
                    {acertos} de {total} corretas
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {respostas.map((r, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${r.correta ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        {r.correta ? (
                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{r.pergunta}</p>
                          <p className={r.correta ? 'text-green-700' : 'text-red-700'}>
                            Sua resposta: {r.resposta}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button onClick={reiniciarQuiz} className="flex-1" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Novo Quiz
                  </Button>
                  <Button onClick={() => iniciarQuiz(quizSelecionado)} variant="outline" className="flex-1" size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Repetir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Tela do quiz
  if (quizSelecionado) {
    const pergunta = quizSelecionado.perguntas[perguntaAtual]
    const progresso = ((perguntaAtual + 1) / quizSelecionado.perguntas.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {perguntaAtual + 1} de {quizSelecionado.perguntas.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progresso)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={perguntaAtual}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                  <Badge variant="secondary" className="w-fit mb-2">
                    {quizSelecionado.categoria}
                  </Badge>
                  <CardTitle className="text-2xl">
                    {pergunta.pergunta}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="space-y-4">
                    {pergunta.opcoes.map((opcao, index) => {
                      const isSelected = respostaSelecionada === opcao
                      const isCorrect = opcao === pergunta.resposta
                      const showFeedback = mostrarFeedback && isSelected

                      return (
                        <motion.button
                          key={index}
                          onClick={() => selecionarResposta(opcao)}
                          disabled={respostaSelecionada !== null}
                          className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${
                            showFeedback
                              ? isCorrect
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-red-500 bg-red-50 text-red-700'
                              : isSelected
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                          } ${respostaSelecionada ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          whileHover={!respostaSelecionada ? { scale: 1.02 } : {}}
                          whileTap={!respostaSelecionada ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opcao}</span>
                            {showFeedback && (
                              isCorrect ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-600" />
                              )
                            )}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // Tela de seleção de quiz
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Brain className="h-20 w-20 mx-auto mb-4" style={{ color: '#2E3192' }} />
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#2E3192' }}>
            Quiz Bíblico
          </h1>
          <p className="text-xl text-gray-600">
            Teste seus conhecimentos sobre a Palavra de Deus
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-primary h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{quiz.categoria}</Badge>
                    <Badge 
                      variant="outline"
                      className={
                        quiz.dificuldade === 'Fácil' ? 'border-green-500 text-green-700' :
                        quiz.dificuldade === 'Médio' ? 'border-yellow-500 text-yellow-700' :
                        'border-red-500 text-red-700'
                      }
                    >
                      {quiz.dificuldade}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{quiz.categoria}</CardTitle>
                  <CardDescription>
                    {quiz.perguntas.length} perguntas sobre {quiz.categoria.toLowerCase()}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button onClick={() => iniciarQuiz(quiz)} className="w-full" size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Iniciar Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

