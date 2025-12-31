import { licoesEscolaSabatina } from './escola-sabatina-licoes.js'
import escolaSabatinaAuto from './escola-sabatina-licoes-auto.json'

export const estudos = [
  // Conteúdo da Escola Sabatina gerado automaticamente
  {
    id: escolaSabatinaAuto.id,
    titulo: escolaSabatinaAuto.titulo,
    trimestre: escolaSabatinaAuto.trimestre,
    tipo: escolaSabatinaAuto.tipo,
    descricao: escolaSabatinaAuto.descricao,
    capa: escolaSabatinaAuto.capa,
    licoes: escolaSabatinaAuto.licoes.map(licao => ({
      numero: licao.numero,
      titulo: licao.titulo,
      texto: licao.texto,
      conteudo: licao.conteudo,
      versiculoChave: licao.versiculoChave,
      perguntas: licao.licoes_detalhes.map(detalhe => detalhe.titulo) // Usando títulos dos dias como perguntas
    }))
  },
  // Conteúdo da Escola Sabatina estático (antigo)
  ...licoesEscolaSabatina.map(licao => ({
    id: licao.id,
    titulo: licao.titulo,
    trimestre: '4º Trimestre 2025',
    tipo: licao.categoria,
    descricao: licao.descricao,
    capa: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=400',
    licoes: [{
      numero: 1,
      titulo: licao.titulo,
      texto: licao.versiculo,
      conteudo: licao.conteudo,
      versiculoChave: licao.versiculo,
      perguntas: licao.topicos.map(t => `Explique sobre: ${t}`)
    }]
  })),
  {
    id: 1,
    titulo: "Lições de Fé no Livro de Josué",
    trimestre: "4º Trimestre 2025",
    tipo: "Escola Sabatina",
    descricao: "Estudos sobre fé, coragem e conquista através da história de Josué e a entrada em Canaã.",
    capa: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400",
    licoes: [
      { 
        numero: 1, 
        titulo: "Preparação para a Conquista", 
        texto: "Josué 1:1-9",
        conteudo: "Após a morte de Moisés, Deus chama Josué para liderar o povo de Israel na conquista de Canaã. Esta lição nos ensina sobre preparação espiritual, coragem e confiança em Deus. Josué recebe três comandos importantes: ser forte, corajoso e meditar na lei dia e noite. A promessa de Deus é clara: 'Não te deixarei nem te desampararei'. Aplicação prática: Antes de enfrentar grandes desafios, precisamos nos preparar espiritualmente através da oração e estudo da Palavra.",
        versiculoChave: "Josué 1:9 - Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.",
        perguntas: [
          "Quais foram os três comandos que Deus deu a Josué?",
          "O que significa meditar na lei dia e noite?",
          "Como podemos aplicar a coragem de Josué em nossa vida hoje?"
        ]
      },
      { 
        numero: 2, 
        titulo: "Atravessando o Jordão", 
        texto: "Josué 3:1-17",
        conteudo: "O milagre da travessia do Jordão demonstra o poder de Deus e a importância da obediência. Os sacerdotes deveriam entrar no rio primeiro, demonstrando fé antes de ver o milagre. Somente quando seus pés tocaram as águas, o rio parou. Esta lição nos ensina que muitas vezes precisamos dar o primeiro passo de fé antes de ver a provisão de Deus. A arca da aliança (representando a presença de Deus) ia à frente do povo.",
        versiculoChave: "Josué 3:5 - Santificai-vos, porque amanhã fará o Senhor maravilhas no meio de vós.",
        perguntas: [
          "Por que os sacerdotes precisavam entrar na água primeiro?",
          "O que a arca da aliança representava?",
          "Qual 'Jordão' você precisa atravessar pela fé hoje?"
        ]
      },
      { 
        numero: 3, 
        titulo: "A Queda de Jericó", 
        texto: "Josué 6:1-27",
        conteudo: "A conquista de Jericó revela que as vitórias de Deus não dependem de métodos humanos, mas de obediência. O plano de Deus parecia estranho: marchar ao redor da cidade por sete dias. Não havia lógica militar nisso, apenas fé e obediência. No sétimo dia, ao som das trombetas e do grito do povo, os muros caíram. Lição: Os métodos de Deus podem parecer estranhos, mas sempre funcionam quando obedecemos.",
        versiculoChave: "Josué 6:20 - Gritou, pois, o povo, tocando os sacerdotes as buzinas; e sucedeu que, ouvindo o povo o sonido da buzina, gritou o povo com grande grita; e o muro caiu abaixo.",
        perguntas: [
          "Por que Deus escolheu um método tão incomum?",
          "O que nos ensina sobre obediência mesmo quando não entendemos?",
          "Quais 'muros' em sua vida precisam cair?"
        ]
      },
      { 
        numero: 4, 
        titulo: "O Pecado de Acã", 
        texto: "Josué 7:1-26",
        conteudo: "Após a grande vitória em Jericó, Israel sofre uma derrota humilhante em Ai por causa do pecado oculto de Acã. Esta lição nos ensina que o pecado não confessado afeta não apenas o indivíduo, mas toda a comunidade. Acã tomou do anátema (coisas consagradas à destruição) e escondeu em sua tenda. Deus revelou o pecado e a justiça foi executada. Aplicação: Não podemos esconder nada de Deus, e o pecado sempre tem consequências.",
        versiculoChave: "Josué 7:13 - Levanta-te, santifica o povo, e dize: Santificai-vos para amanhã, porque assim diz o Senhor Deus de Israel: Anátema há no meio de ti, Israel.",
        perguntas: [
          "Por que o pecado de um homem afetou toda a nação?",
          "O que significa 'anátema'?",
          "Há algum pecado oculto que você precisa confessar?"
        ]
      }
    ]
  },
  {
    id: 2,
    titulo: "O Livro de Êxodo",
    trimestre: "3º Trimestre 2025",
    tipo: "Escola Sabatina",
    descricao: "A libertação do povo de Israel e as lições sobre liberdade e obediência a Deus.",
    capa: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400",
    licoes: [
      { 
        numero: 1, 
        titulo: "A Escravidão no Egito", 
        texto: "Êxodo 1:1-22",
        conteudo: "Os descendentes de Jacó se multiplicaram no Egito, mas um novo faraó que não conhecia José os escravizou. A opressão aumentou, mas quanto mais eram afligidos, mais se multiplicavam. Esta lição nos ensina que Deus está no controle mesmo em meio à opressão. As parteiras hebreias temeram a Deus mais do que ao faraó, salvando os meninos. Aplicação: Devemos obedecer a Deus acima de qualquer autoridade humana quando há conflito.",
        versiculoChave: "Êxodo 1:12 - Mas quanto mais os afligiam, tanto mais se multiplicavam.",
        perguntas: [
          "Por que o novo faraó temia os israelitas?",
          "Como as parteiras demonstraram coragem?",
          "Você já teve que escolher entre obedecer a Deus ou aos homens?"
        ]
      },
      { 
        numero: 2, 
        titulo: "O Nascimento de Moisés", 
        texto: "Êxodo 2:1-25",
        conteudo: "Moisés nasce em um tempo de perseguição. Sua mãe o esconde por três meses e depois o coloca em um cesto no rio Nilo. A filha de Faraó o encontra e o adota. Ironicamente, a mãe de Moisés é paga para amamentá-lo. Deus usa até mesmo os planos do inimigo para cumprir Seus propósitos. Moisés cresce no palácio, mas nunca esquece seu povo.",
        versiculoChave: "Êxodo 2:10 - E, quando o menino era já grande, ela o trouxe à filha de Faraó, a qual o adotou; e chamou o seu nome Moisés.",
        perguntas: [
          "Como Deus protegeu Moisés desde o nascimento?",
          "Qual foi o propósito de Moisés crescer no palácio?",
          "Como Deus tem preparado você para Seus propósitos?"
        ]
      },
      { 
        numero: 3, 
        titulo: "A Sarça Ardente", 
        texto: "Êxodo 3:1-22",
        conteudo: "Após 40 anos no deserto, Moisés tem um encontro com Deus na sarça ardente. Deus se revela como 'EU SOU O QUE SOU' e comissiona Moisés para libertar Israel. Moisés apresenta desculpas, mas Deus promete estar com ele. Esta lição nos ensina que Deus chama pessoas imperfeitas e as capacita para Sua obra. O chamado de Deus vem com Sua presença e poder.",
        versiculoChave: "Êxodo 3:14 - E disse Deus a Moisés: EU SOU O QUE SOU.",
        perguntas: [
          "Por que a sarça ardia mas não se consumia?",
          "Quais desculpas Moisés apresentou?",
          "Deus está chamando você para algo? Quais são suas desculpas?"
        ]
      },
      { 
        numero: 4, 
        titulo: "As Dez Pragas", 
        texto: "Êxodo 7-12",
        conteudo: "Deus envia dez pragas sobre o Egito para demonstrar Seu poder e libertar Israel. Cada praga era um julgamento sobre os deuses do Egito. Faraó endurece seu coração repetidamente. A décima praga (morte dos primogênitos) finalmente quebra a resistência de Faraó. A Páscoa é instituída como memorial da libertação. Esta lição nos ensina sobre a justiça de Deus, Seu poder sobre todas as coisas e o perigo de endurecer o coração.",
        versiculoChave: "Êxodo 12:13 - E aquele sangue vos será por sinal nas casas em que estiverdes; vendo eu sangue, passarei por cima de vós.",
        perguntas: [
          "Por que foram necessárias dez pragas?",
          "O que a Páscoa simboliza?",
          "Como Jesus é nosso Cordeiro pascal?"
        ]
      }
    ]
  },
  {
    id: 3,
    titulo: "Jesus e as Escrituras Sagradas",
    tipo: "Estudo Bíblico",
    categoria: "Cristologia",
    descricao: "Como Jesus utilizava e ensinava as Escrituras, revelando o plano da salvação.",
    capa: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=400",
    licoes: [
      {
        numero: 1,
        titulo: "Jesus como Cumprimento das Profecias",
        texto: "Lucas 24:44-47",
        conteudo: "Jesus afirmou que toda a Escritura testifica dEle. Desde Gênesis até Malaquias, há profecias messiânicas que Jesus cumpriu. Ele é a semente da mulher (Gênesis 3:15), o descendente de Abraão (Gênesis 22:18), o profeta como Moisés (Deuteronômio 18:15), o filho de Davi (2 Samuel 7:12-13), nascido em Belém (Miqueias 5:2), de uma virgem (Isaías 7:14). Mais de 300 profecias foram cumpridas em Jesus.",
        versiculoChave: "Lucas 24:44 - Importava que se cumprisse tudo o que de mim estava escrito na lei de Moisés, nos profetas e nos Salmos.",
        perguntas: [
          "Por que é importante que Jesus cumpriu as profecias?",
          "Quais profecias messiânicas você conhece?",
          "Como isso fortalece sua fé?"
        ]
      },
      {
        numero: 2,
        titulo: "O Uso das Escrituras por Jesus",
        texto: "Mateus 4:1-11",
        conteudo: "Durante a tentação no deserto, Jesus respondeu a Satanás três vezes com 'Está escrito'. Ele usou a Palavra de Deus como arma espiritual. Jesus memorizou as Escrituras e as aplicou corretamente. Ele citou Deuteronômio 8:3, 6:16 e 6:13. Esta lição nos ensina a importância de conhecer e usar a Bíblia em nossa vida diária e batalhas espirituais.",
        versiculoChave: "Mateus 4:4 - Está escrito: Nem só de pão viverá o homem, mas de toda palavra que sai da boca de Deus.",
        perguntas: [
          "Por que Jesus usou a Escritura contra Satanás?",
          "Como podemos memorizar a Bíblia?",
          "Qual versículo tem ajudado você em tentações?"
        ]
      }
    ],
    topicos: [
      "Jesus como cumprimento das profecias",
      "O uso das Escrituras por Jesus",
      "Interpretação cristocêntrica da Bíblia",
      "A autoridade das Escrituras",
      "Jesus e a Lei",
      "Jesus e os Profetas"
    ]
  },
  {
    id: 4,
    titulo: "O Santuário - O Caminho de Deus",
    tipo: "Estudo Temático",
    categoria: "Doutrinas",
    descricao: "Compreendendo o plano da salvação através do santuário terrestre e celestial.",
    capa: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400",
    licoes: [
      {
        numero: 1,
        titulo: "O Pátio e o Altar de Sacrifícios",
        texto: "Êxodo 27:1-8",
        conteudo: "O altar de sacrifícios era a primeira coisa que o pecador encontrava ao entrar no santuário. Ali os animais eram sacrificados, simbolizando que o pecado resulta em morte. O sangue era derramado, apontando para o sacrifício de Jesus. Ninguém podia se aproximar de Deus sem primeiro passar pelo altar. Aplicação: Jesus é nosso sacrifício. Não há outro caminho para Deus senão através dEle.",
        versiculoChave: "Hebreus 9:22 - Sem derramamento de sangue não há remissão.",
        perguntas: [
          "Por que era necessário sacrificar animais?",
          "O que o altar simboliza?",
          "Como Jesus é nosso sacrifício perfeito?"
        ]
      },
      {
        numero: 2,
        titulo: "A Pia de Bronze",
        texto: "Êxodo 30:17-21",
        conteudo: "Entre o altar e o lugar santo havia a pia de bronze, onde os sacerdotes lavavam as mãos e os pés antes de ministrar. A pia simboliza purificação e santificação. Após o sacrifício (justificação), vem a limpeza (santificação). A água representa a Palavra de Deus que nos purifica. Aplicação: Precisamos de purificação diária através da Palavra e do Espírito Santo.",
        versiculoChave: "Efésios 5:26 - Para a santificar, purificando-a com a lavagem da água, pela palavra.",
        perguntas: [
          "Por que os sacerdotes precisavam se lavar?",
          "O que a água simboliza?",
          "Como somos purificados hoje?"
        ]
      }
    ],
    topicos: [
      "O pátio e o altar de sacrifícios",
      "A pia de bronze",
      "O lugar santo e seus móveis",
      "O lugar santíssimo e a arca",
      "O ministério de Cristo no santuário celestial",
      "O juízo investigativo"
    ]
  },
  {
    id: 5,
    titulo: "Daniel e Apocalipse",
    tipo: "Estudo Profético",
    categoria: "Profecias",
    descricao: "Desvendando as profecias de Daniel e Apocalipse para nossos dias.",
    capa: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    licoes: [
      {
        numero: 1,
        titulo: "A Estátua de Nabucodonosor",
        texto: "Daniel 2",
        conteudo: "O rei Nabucodonosor teve um sonho de uma grande estátua com cabeça de ouro, peito de prata, ventre de bronze, pernas de ferro e pés de ferro e barro. Daniel interpretou: cabeça de ouro = Babilônia, peito de prata = Medo-Pérsia, ventre de bronze = Grécia, pernas de ferro = Roma, pés = reinos divididos da Europa. Uma pedra (Jesus) destruirá todos os reinos e estabelecerá o reino eterno. Esta profecia mostra que Deus controla a história.",
        versiculoChave: "Daniel 2:44 - O Deus do céu levantará um reino que não será jamais destruído.",
        perguntas: [
          "Quais impérios a estátua representa?",
          "O que a pedra simboliza?",
          "Como esta profecia fortalece sua fé?"
        ]
      },
      {
        numero: 2,
        titulo: "As Quatro Bestas de Daniel 7",
        texto: "Daniel 7",
        conteudo: "Daniel vê quatro bestas: leão (Babilônia), urso (Medo-Pérsia), leopardo (Grécia) e besta terrível (Roma). Da quarta besta surge um chifre pequeno que persegue os santos e muda tempos e lei. Este poder perseguidor atuaria por 'um tempo, tempos e metade de um tempo' (1260 anos). A profecia termina com o juízo celestial e a vinda do Filho do Homem. Aplicação: Deus vencerá todos os poderes opressores.",
        versiculoChave: "Daniel 7:27 - O reino, e o domínio, e a majestade dos reinos debaixo de todo o céu serão dados ao povo dos santos do Altíssimo.",
        perguntas: [
          "Quais impérios as bestas representam?",
          "Quem é o chifre pequeno?",
          "O que significa mudar tempos e lei?"
        ]
      }
    ],
    topicos: [
      "A estátua de Nabucodonosor",
      "As quatro bestas de Daniel 7",
      "As 2300 tardes e manhãs",
      "Os sete selos do Apocalipse",
      "As sete trombetas",
      "A mensagem dos três anjos",
      "As sete pragas",
      "A Nova Jerusalém"
    ]
  },
  {
    id: 6,
    titulo: "O Sábado nas Escrituras",
    tipo: "Estudo Doutrinário",
    categoria: "Doutrinas",
    descricao: "O significado e a importância do sábado desde a criação até os dias atuais.",
    capa: "https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=400",
    licoes: [
      {
        numero: 1,
        titulo: "O Sábado na Criação",
        texto: "Gênesis 2:1-3",
        conteudo: "Deus criou o mundo em seis dias e descansou no sétimo. Ele abençoou e santificou o sábado. O sábado não foi criado para os judeus (que ainda não existiam), mas para toda a humanidade. É um memorial da criação e um lembrete de que Deus é o Criador. Guardar o sábado é reconhecer a soberania de Deus sobre nossa vida e tempo.",
        versiculoChave: "Gênesis 2:3 - E abençoou Deus o dia sétimo, e o santificou.",
        perguntas: [
          "Por que Deus descansou no sétimo dia?",
          "O sábado foi criado apenas para os judeus?",
          "O que significa santificar o sábado?"
        ]
      },
      {
        numero: 2,
        titulo: "O Sábado nos Dez Mandamentos",
        texto: "Êxodo 20:8-11",
        conteudo: "O quarto mandamento ordena lembrar do sábado para santificá-lo. É o único mandamento que começa com 'lembra-te', indicando que seria esquecido. O mandamento do sábado é o mais longo dos dez e o único que identifica quem é Deus (o Criador). Guardar o sábado é um sinal de lealdade a Deus. O sábado é para descanso, adoração e bênção.",
        versiculoChave: "Êxodo 20:8 - Lembra-te do dia do sábado, para o santificar.",
        perguntas: [
          "Por que o mandamento diz 'lembra-te'?",
          "Como devemos santificar o sábado?",
          "Qual é o propósito do sábado?"
        ]
      }
    ],
    topicos: [
      "O sábado na criação",
      "O sábado nos Dez Mandamentos",
      "Jesus e o sábado",
      "O sábado no Novo Testamento",
      "A mudança do sábado para o domingo",
      "O sábado na nova terra"
    ]
  },
  {
    id: 7,
    titulo: "Vida Cristã Vitoriosa",
    tipo: "Estudo Prático",
    categoria: "Vida Cristã",
    descricao: "Princípios bíblicos para uma vida cristã abundante e vitoriosa.",
    capa: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400",
    topicos: [
      "Oração e comunhão com Deus",
      "Estudo da Bíblia",
      "Testemunho cristão",
      "Mordomia cristã",
      "Vida em comunidade",
      "Vencendo tentações",
      "Frutificando para Deus"
    ]
  },
  {
    id: 8,
    titulo: "O Espírito Santo",
    tipo: "Estudo Doutrinário",
    categoria: "Doutrinas",
    descricao: "Conhecendo a pessoa e a obra do Espírito Santo na vida do crente.",
    capa: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    topicos: [
      "Quem é o Espírito Santo",
      "O batismo do Espírito Santo",
      "Os dons espirituais",
      "O fruto do Espírito",
      "Sendo cheio do Espírito",
      "Entristecendo o Espírito Santo"
    ]
  },
  {
    id: 9,
    titulo: "A Segunda Vinda de Cristo",
    tipo: "Estudo Profético",
    categoria: "Profecias",
    descricao: "Sinais e promessas relacionados ao retorno de Jesus à Terra.",
    capa: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400",
    topicos: [
      "Promessas da segunda vinda",
      "Sinais dos últimos dias",
      "Como Jesus voltará",
      "Preparação para Sua vinda",
      "A ressurreição dos justos",
      "O milênio",
      "A terra renovada"
    ]
  },
  {
    id: 10,
    titulo: "Família Cristã",
    tipo: "Estudo Prático",
    categoria: "Vida Cristã",
    descricao: "Princípios bíblicos para construir uma família forte e feliz.",
    capa: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
    topicos: [
      "O casamento no plano de Deus",
      "Criação de filhos",
      "Comunicação no lar",
      "Finanças familiares",
      "Culto familiar",
      "Resolvendo conflitos",
      "Educação cristã"
    ]
  }
]

// Função para buscar estudo por ID
export function buscarEstudoPorId(id) {
  return estudos.find(e => e.id === id)
}

// Função para buscar estudos por tipo
export function buscarEstudosPorTipo(tipo) {
  if (tipo === 'Todos') return estudos
  return estudos.filter(e => e.tipo === tipo)
}

// Função para buscar estudos por categoria
export function buscarEstudosPorCategoria(categoria) {
  return estudos.filter(e => e.categoria === categoria)
}

// Tipos disponíveis
export const tiposEstudo = [
  'Todos',
  ...new Set(estudos.map(e => e.tipo))
]

// Categorias disponíveis
export const categoriasEstudo = [
  ...new Set(estudos.filter(e => e.categoria).map(e => e.categoria))
]

