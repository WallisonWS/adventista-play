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
  },
  {
    id: 5,
    categoria: 'Profetas do Antigo Testamento',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Qual profeta foi levado ao céu em um carro de fogo?',
        opcoes: ['Elias', 'Eliseu', 'Isaías', 'Jeremias'],
        resposta: 'Elias'
      },
      {
        pergunta: 'Qual profeta teve visões de um vale de ossos secos?',
        opcoes: ['Daniel', 'Ezequiel', 'Jeremias', 'Isaías'],
        resposta: 'Ezequiel'
      },
      {
        pergunta: 'Qual profeta foi chamado ainda no ventre de sua mãe?',
        opcoes: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'],
        resposta: 'Jeremias'
      },
      {
        pergunta: 'Qual profeta interpretou os sonhos do rei Nabucodonosor?',
        opcoes: ['Daniel', 'Ezequiel', 'Isaías', 'Jeremias'],
        resposta: 'Daniel'
      },
      {
        pergunta: 'Qual profeta foi alimentado por corvos?',
        opcoes: ['Elias', 'Eliseu', 'Jonas', 'Amós'],
        resposta: 'Elias'
      }
    ]
  },
  {
    id: 6,
    categoria: 'Parábolas de Jesus',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Na parábola do filho pródigo, o que o filho mais novo pediu ao pai?',
        opcoes: ['Sua herança', 'Uma bênção', 'Perdão', 'Trabalho'],
        resposta: 'Sua herança'
      },
      {
        pergunta: 'Na parábola do bom samaritano, quem ajudou o homem ferido?',
        opcoes: ['Um sacerdote', 'Um levita', 'Um samaritano', 'Um fariseu'],
        resposta: 'Um samaritano'
      },
      {
        pergunta: 'Na parábola dos talentos, quantos talentos o servo preguiçoso recebeu?',
        opcoes: ['1', '2', '5', '10'],
        resposta: '1'
      },
      {
        pergunta: 'Na parábola do semeador, onde as sementes deram mais fruto?',
        opcoes: ['No caminho', 'Entre espinhos', 'Em pedregais', 'Em boa terra'],
        resposta: 'Em boa terra'
      },
      {
        pergunta: 'Na parábola das dez virgens, quantas eram prudentes?',
        opcoes: ['3', '5', '7', '10'],
        resposta: '5'
      }
    ]
  },
  {
    id: 7,
    categoria: 'Livros da Bíblia',
    dificuldade: 'Difícil',
    perguntas: [
      {
        pergunta: 'Qual é o menor livro do Antigo Testamento?',
        opcoes: ['Obadias', 'Jonas', 'Ageu', 'Malaquias'],
        resposta: 'Obadias'
      },
      {
        pergunta: 'Quantos livros tem o Novo Testamento?',
        opcoes: ['25', '27', '29', '31'],
        resposta: '27'
      },
      {
        pergunta: 'Qual livro vem depois de Juízes?',
        opcoes: ['Rute', '1 Samuel', 'Josué', '1 Reis'],
        resposta: 'Rute'
      },
      {
        pergunta: 'Quantas cartas Paulo escreveu?',
        opcoes: ['11', '13', '15', '17'],
        resposta: '13'
      },
      {
        pergunta: 'Qual é o último livro do Antigo Testamento?',
        opcoes: ['Zacarias', 'Ageu', 'Malaquias', 'Sofonias'],
        resposta: 'Malaquias'
      }
    ]
  },
  {
    id: 8,
    categoria: 'Mulheres da Bíblia',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Quem foi a mãe de Samuel?',
        opcoes: ['Ana', 'Sara', 'Rebeca', 'Raquel'],
        resposta: 'Ana'
      },
      {
        pergunta: 'Qual rainha visitou o rei Salomão?',
        opcoes: ['Rainha de Sabá', 'Rainha Ester', 'Rainha Jezabel', 'Rainha Vasti'],
        resposta: 'Rainha de Sabá'
      },
      {
        pergunta: 'Quem foi a profetisa que julgou Israel?',
        opcoes: ['Débora', 'Hulda', 'Miriã', 'Ana'],
        resposta: 'Débora'
      },
      {
        pergunta: 'Quem salvou os espias israelitas em Jericó?',
        opcoes: ['Raabe', 'Rute', 'Ester', 'Débora'],
        resposta: 'Raabe'
      },
      {
        pergunta: 'Quem foi a mãe de João Batista?',
        opcoes: ['Isabel', 'Maria', 'Ana', 'Marta'],
        resposta: 'Isabel'
      }
    ]
  },
  {
    id: 9,
    categoria: 'Os Dez Mandamentos',
    dificuldade: 'Fácil',
    perguntas: [
      {
        pergunta: 'Onde Deus entregou os Dez Mandamentos a Moisés?',
        opcoes: ['Monte Sinai', 'Monte Carmelo', 'Monte das Oliveiras', 'Monte Nebo'],
        resposta: 'Monte Sinai'
      },
      {
        pergunta: 'Em que material foram escritos os Dez Mandamentos?',
        opcoes: ['Tábuas de pedra', 'Pergaminho', 'Papiro', 'Madeira'],
        resposta: 'Tábuas de pedra'
      },
      {
        pergunta: 'Qual é o primeiro mandamento?',
        opcoes: ['Não terás outros deuses diante de mim', 'Não matarás', 'Honra teu pai e tua mãe', 'Não furtarás'],
        resposta: 'Não terás outros deuses diante de mim'
      },
      {
        pergunta: 'Qual mandamento fala sobre o dia de descanso?',
        opcoes: ['Terceiro', 'Quarto', 'Quinto', 'Sexto'],
        resposta: 'Quarto'
      },
      {
        pergunta: 'Quantos mandamentos Deus deu a Moisés?',
        opcoes: ['8', '10', '12', '15'],
        resposta: '10'
      }
    ]
  },
  {
    id: 10,
    categoria: 'Reis de Israel',
    dificuldade: 'Difícil',
    perguntas: [
      {
        pergunta: 'Quem foi o primeiro rei de Israel?',
        opcoes: ['Saul', 'Davi', 'Salomão', 'Samuel'],
        resposta: 'Saul'
      },
      {
        pergunta: 'Quantos anos Salomão reinou sobre Israel?',
        opcoes: ['30 anos', '40 anos', '50 anos', '60 anos'],
        resposta: '40 anos'
      },
      {
        pergunta: 'Qual rei construiu o templo em Jerusalém?',
        opcoes: ['Davi', 'Salomão', 'Ezequias', 'Josias'],
        resposta: 'Salomão'
      },
      {
        pergunta: 'Qual rei foi curado de uma doença mortal após orar?',
        opcoes: ['Ezequias', 'Josias', 'Asa', 'Josafá'],
        resposta: 'Ezequias'
      },
      {
        pergunta: 'Qual rei encontrou o livro da Lei no templo?',
        opcoes: ['Josias', 'Ezequias', 'Manassés', 'Amom'],
        resposta: 'Josias'
      }
    ]
  },
  {
    id: 11,
    categoria: 'Apóstolos de Jesus',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Qual apóstolo era cobrador de impostos?',
        opcoes: ['Mateus', 'Pedro', 'João', 'Tiago'],
        resposta: 'Mateus'
      },
      {
        pergunta: 'Quais eram os filhos de Zebedeu?',
        opcoes: ['Tiago e João', 'Pedro e André', 'Filipe e Bartolomeu', 'Tiago e Judas'],
        resposta: 'Tiago e João'
      },
      {
        pergunta: 'Qual apóstolo duvidou da ressurreição de Jesus?',
        opcoes: ['Tomé', 'Pedro', 'Filipe', 'André'],
        resposta: 'Tomé'
      },
      {
        pergunta: 'Quem substituiu Judas Iscariotes entre os doze apóstolos?',
        opcoes: ['Matias', 'Paulo', 'Barnabé', 'Silas'],
        resposta: 'Matias'
      },
      {
        pergunta: 'Qual apóstolo era irmão de Pedro?',
        opcoes: ['André', 'Tiago', 'João', 'Filipe'],
        resposta: 'André'
      }
    ]
  },
  {
    id: 12,
    categoria: 'Salmos e Provérbios',
    dificuldade: 'Difícil',
    perguntas: [
      {
        pergunta: 'Quem escreveu a maioria dos Salmos?',
        opcoes: ['Davi', 'Salomão', 'Moisés', 'Asafe'],
        resposta: 'Davi'
      },
      {
        pergunta: 'Qual é o Salmo mais longo?',
        opcoes: ['Salmo 119', 'Salmo 23', 'Salmo 91', 'Salmo 150'],
        resposta: 'Salmo 119'
      },
      {
        pergunta: 'Quem escreveu o livro de Provérbios?',
        opcoes: ['Salomão', 'Davi', 'Moisés', 'Daniel'],
        resposta: 'Salomão'
      },
      {
        pergunta: 'Qual Salmo começa com "O Senhor é o meu pastor"?',
        opcoes: ['Salmo 23', 'Salmo 91', 'Salmo 1', 'Salmo 100'],
        resposta: 'Salmo 23'
      },
      {
        pergunta: 'Quantos capítulos tem o livro de Provérbios?',
        opcoes: ['31', '27', '33', '29'],
        resposta: '31'
      }
    ]
  },
  {
    id: 13,
    categoria: 'Arca de Noé',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Quantos anos Noé tinha quando o dilúvio começou?',
        opcoes: ['500 anos', '600 anos', '700 anos', '800 anos'],
        resposta: '600 anos'
      },
      {
        pergunta: 'Quantos andares tinha a arca?',
        opcoes: ['2 andares', '3 andares', '4 andares', '5 andares'],
        resposta: '3 andares'
      },
      {
        pergunta: 'Quantos dias e noites choveu durante o dilúvio?',
        opcoes: ['30 dias', '40 dias', '50 dias', '60 dias'],
        resposta: '40 dias'
      },
      {
        pergunta: 'Qual ave Noé soltou primeiro para verificar se as águas tinham secado?',
        opcoes: ['Pomba', 'Corvo', 'Águia', 'Andorinha'],
        resposta: 'Corvo'
      },
      {
        pergunta: 'Qual foi o sinal do pacto de Deus com Noé?',
        opcoes: ['Uma estrela', 'Um arco-íris', 'Um relâmpago', 'Uma nuvem'],
        resposta: 'Um arco-íris'
      }
    ]
  },
  {
    id: 14,
    categoria: 'Êxodo do Egito',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Quantas pragas Deus enviou sobre o Egito?',
        opcoes: ['7 pragas', '10 pragas', '12 pragas', '15 pragas'],
        resposta: '10 pragas'
      },
      {
        pergunta: 'Qual foi a primeira praga enviada ao Egito?',
        opcoes: ['Água em sangue', 'Rãs', 'Piolhos', 'Moscas'],
        resposta: 'Água em sangue'
      },
      {
        pergunta: 'O que os israelitas deveriam passar nos umbrais das portas na noite da Páscoa?',
        opcoes: ['Óleo', 'Sangue de cordeiro', 'Água', 'Vinho'],
        resposta: 'Sangue de cordeiro'
      },
      {
        pergunta: 'Onde Deus deu os Dez Mandamentos a Moisés?',
        opcoes: ['Monte Sinai', 'Monte Nebo', 'Monte Carmelo', 'Monte das Oliveiras'],
        resposta: 'Monte Sinai'
      },
      {
        pergunta: 'O que Deus enviou do céu para alimentar os israelitas no deserto?',
        opcoes: ['Pão', 'Maná', 'Carne', 'Frutas'],
        resposta: 'Maná'
      }
    ]
  },
  {
    id: 15,
    categoria: 'Vida de Paulo',
    dificuldade: 'Difícil',
    perguntas: [
      {
        pergunta: 'Qual era o nome de Paulo antes de sua conversão?',
        opcoes: ['Saulo', 'Simão', 'Silas', 'Silvano'],
        resposta: 'Saulo'
      },
      {
        pergunta: 'Em que cidade Paulo teve a visão de Jesus?',
        opcoes: ['Jerusalém', 'Antioquia', 'Damasco', 'Tarso'],
        resposta: 'Damasco'
      },
      {
        pergunta: 'Quantas viagens missionárias Paulo fez?',
        opcoes: ['2 viagens', '3 viagens', '4 viagens', '5 viagens'],
        resposta: '3 viagens'
      },
      {
        pergunta: 'Quem era o companheiro de Paulo em sua primeira viagem missionária?',
        opcoes: ['Timóteo', 'Tito', 'Barnabé', 'Lucas'],
        resposta: 'Barnabé'
      },
      {
        pergunta: 'Quantas epístolas Paulo escreveu no Novo Testamento?',
        opcoes: ['10 epístolas', '13 epístolas', '15 epístolas', '17 epístolas'],
        resposta: '13 epístolas'
      }
    ]
  },
  {
    id: 16,
    categoria: 'Tabernáculo',
    dificuldade: 'Difícil',
    perguntas: [
      {
        pergunta: 'Quantos compartimentos tinha o tabernáculo?',
        opcoes: ['1 compartimento', '2 compartimentos', '3 compartimentos', '4 compartimentos'],
        resposta: '2 compartimentos'
      },
      {
        pergunta: 'Qual era o nome do compartimento mais sagrado do tabernáculo?',
        opcoes: ['Lugar Santo', 'Santíssimo', 'Altar', 'Átrio'],
        resposta: 'Santíssimo'
      },
      {
        pergunta: 'O que estava dentro da Arca da Aliança?',
        opcoes: ['Ouro e prata', 'As tábuas da lei', 'Incenso', 'Pães'],
        resposta: 'As tábuas da lei'
      },
      {
        pergunta: 'Quantas vezes por ano o sumo sacerdote entrava no Santíssimo?',
        opcoes: ['Uma vez', 'Duas vezes', 'Três vezes', 'Quatro vezes'],
        resposta: 'Uma vez'
      },
      {
        pergunta: 'Qual era o material usado para fazer o véu do tabernáculo?',
        opcoes: ['Linho fino', 'Lã', 'Seda', 'Algodão'],
        resposta: 'Linho fino'
      }
    ]
  },
  {
    id: 17,
    categoria: 'Juízes de Israel',
    dificuldade: 'Médio',
    perguntas: [
      {
        pergunta: 'Quem foi a única mulher juíza de Israel?',
        opcoes: ['Rute', 'Débora', 'Ester', 'Ana'],
        resposta: 'Débora'
      },
      {
        pergunta: 'Qual juiz derrotou os midianitas com apenas 300 homens?',
        opcoes: ['Gideão', 'Sansão', 'Jefté', 'Eli'],
        resposta: 'Gideão'
      },
      {
        pergunta: 'De onde Sansão tirava sua força?',
        opcoes: ['De Deus', 'Do seu cabelo', 'De sua espada', 'De sua armadura'],
        resposta: 'Do seu cabelo'
      },
      {
        pergunta: 'Quem traiu Sansão?',
        opcoes: ['Raquel', 'Rebeca', 'Dalila', 'Sara'],
        resposta: 'Dalila'
      },
      {
        pergunta: 'Quantos juízes principais são mencionados no livro de Juízes?',
        opcoes: ['10 juízes', '12 juízes', '14 juízes', '16 juízes'],
        resposta: '12 juízes'
      }
    ]
  },
  {
    id: 18,
    categoria: 'Livro de Apocalipse',
    dificuldade: 'Difícil',
    perguntas: [
      {
        pergunta: 'Quantas igrejas receberam cartas no Apocalipse?',
        opcoes: ['5 igrejas', '7 igrejas', '10 igrejas', '12 igrejas'],
        resposta: '7 igrejas'
      },
      {
        pergunta: 'Qual era a primeira igreja mencionada no Apocalipse?',
        opcoes: ['Éfeso', 'Esmirna', 'Pérgamo', 'Tiatira'],
        resposta: 'Éfeso'
      },
      {
        pergunta: 'Quantos selos são mencionados no Apocalipse?',
        opcoes: ['5 selos', '7 selos', '10 selos', '12 selos'],
        resposta: '7 selos'
      },
      {
        pergunta: 'Qual é o número da besta mencionado no Apocalipse?',
        opcoes: ['333', '555', '666', '777'],
        resposta: '666'
      },
      {
        pergunta: 'Quantos mil serão selados de cada tribo de Israel?',
        opcoes: ['10 mil', '12 mil', '15 mil', '20 mil'],
        resposta: '12 mil'
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

