// Dados completos sobre nós e amarras para Desbravadores

export const nosDesbravadores = [
  {
    id: 1,
    nome: "Nó Direito (ou Nó Quadrado)",
    categoria: "Básicos",
    dificuldade: "Fácil",
    usos: ["Unir duas cordas de mesma espessura", "Primeiros socorros", "Embalagens"],
    passos: [
      "Segure uma ponta da corda em cada mão",
      "Passe a ponta direita sobre a esquerda e por baixo (primeiro meio-nó)",
      "Agora passe a ponta esquerda sobre a direita e por baixo (segundo meio-nó)",
      "Puxe as duas pontas firmemente para apertar o nó"
    ],
    dicas: [
      "Lembre-se: 'Direita sobre esquerda, esquerda sobre direita'",
      "Se fizer errado, vira um 'nó de vaca' que é perigoso",
      "Teste puxando as pontas - deve ficar firme e quadrado"
    ],
    cuidados: [
      "Não use para unir cordas de espessuras diferentes",
      "Não use onde a segurança é crítica (escalada, rapel)",
      "Desfaz facilmente quando molhado"
    ],
    imagem: "/nos/no-direito.png"
  },
  {
    id: 2,
    nome: "Nó de Escota",
    categoria: "Básicos",
    dificuldade: "Fácil",
    usos: ["Unir cordas de espessuras diferentes", "Amarrar velas de barco", "Prender cordas"],
    passos: [
      "Faça uma alça com a corda mais grossa",
      "Passe a corda mais fina por dentro da alça, de baixo para cima",
      "Contorne a alça passando por trás das duas pontas",
      "Passe a ponta da corda fina por baixo dela mesma",
      "Aperte puxando a corda fina e a ponta da corda grossa"
    ],
    dicas: [
      "A corda mais fina deve fazer todo o movimento",
      "Mantenha a alça da corda grossa sempre firme",
      "Para maior segurança, faça o 'Nó de Escota Duplo'"
    ],
    cuidados: [
      "Não use para cargas muito pesadas",
      "Verifique se está bem apertado antes de usar",
      "Pode afrouxar se não houver tensão constante"
    ],
    imagem: "/nos/no-escota.png"
  },
  {
    id: 3,
    nome: "Lais de Guia (Nó do Enforcado)",
    categoria: "Alças",
    dificuldade: "Médio",
    usos: ["Fazer alça fixa que não aperta", "Resgate", "Escalada", "Amarração de barcos"],
    passos: [
      "Faça uma pequena volta (laço) na corda, deixando bastante corda sobrando",
      "Passe a ponta livre por dentro da volta, de baixo para cima",
      "Contorne a corda principal por trás",
      "Volte passando a ponta por dentro da volta novamente, de cima para baixo",
      "Aperte puxando a alça e a corda principal"
    ],
    historia: "Dizem que o coelho sai da toca, dá a volta na árvore e volta para a toca",
    dicas: [
      "Memorize: 'O coelho sai da toca, rodeia a árvore e volta'",
      "A alça não aperta nem afrouxa, permanece do tamanho que você fizer",
      "É um dos nós mais importantes para um Desbravador dominar"
    ],
    cuidados: [
      "Certifique-se de que está bem apertado antes de usar para segurança",
      "Pratique muito até conseguir fazer com os olhos fechados",
      "Verifique se a ponta saiu no lado correto"
    ],
    imagem: "/nos/lais-de-guia.png"
  },
  {
    id: 4,
    nome: "Nó Catau (ou Nó de Fiel)",
    categoria: "Amarração",
    dificuldade: "Fácil",
    usos: ["Amarrar corda em poste ou árvore", "Início de amarrações", "Prender barracas"],
    passos: [
      "Passe a corda ao redor do poste",
      "Cruze a ponta sobre a corda principal formando um X",
      "Passe a ponta por baixo da corda principal",
      "Passe novamente por cima, formando outro X",
      "Finalize com dois coques (meios-nós) para travar"
    ],
    dicas: [
      "Quanto mais tensão, mais firme fica o nó",
      "Sempre finalize com coques para não afrouxar",
      "Pode ser feito rapidamente com prática"
    ],
    cuidados: [
      "Não use em superfícies muito lisas",
      "Pode afrouxar se não houver tensão",
      "Sempre faça os coques finais"
    ],
    imagem: "/nos/no-catau.png"
  },
  {
    id: 5,
    nome: "Volta do Fiel",
    categoria: "Amarração",
    dificuldade: "Fácil",
    usos: ["Prender corda em árvore ou poste", "Início de construções", "Amarrar animais"],
    passos: [
      "Passe a corda ao redor do poste",
      "Cruze a ponta sobre a corda principal",
      "Dê outra volta completa ao redor do poste",
      "Passe a ponta por baixo da segunda volta",
      "Aperte bem puxando as duas pontas"
    ],
    dicas: [
      "Mais seguro que o nó catau para cargas pesadas",
      "As duas voltas distribuem melhor a pressão",
      "Fácil de desfazer mesmo após muita tensão"
    ],
    cuidados: [
      "Certifique-se de que as voltas estão bem juntas",
      "Não deixe folgas entre as voltas",
      "Teste puxando antes de usar"
    ],
    imagem: "/nos/volta-do-fiel.png"
  },
  {
    id: 6,
    nome: "Nó de Pescador",
    categoria: "Emenda",
    dificuldade: "Médio",
    usos: ["Unir duas cordas", "Fazer alças em cordas", "Pesca"],
    passos: [
      "Coloque as duas cordas paralelas, com pontas em direções opostas",
      "Com a primeira corda, faça um nó simples ao redor da segunda",
      "Com a segunda corda, faça um nó simples ao redor da primeira",
      "Puxe as cordas principais para unir os dois nós",
      "Aperte bem puxando as quatro pontas"
    ],
    dicas: [
      "Os dois nós devem ficar bem juntos",
      "Funciona bem com cordas molhadas",
      "Muito usado em pesca e escalada"
    ],
    cuidados: [
      "Deixe pontas longas (pelo menos 10cm)",
      "Verifique se os nós estão bem apertados",
      "Pode ser difícil de desfazer após muita tensão"
    ],
    imagem: "/nos/no-pescador.png"
  },
  {
    id: 7,
    nome: "Nó de Correr (Laço)",
    categoria: "Alças",
    dificuldade: "Fácil",
    usos: ["Fazer laços ajustáveis", "Captura de animais", "Amarrações temporárias"],
    passos: [
      "Faça uma alça simples na corda",
      "Passe a ponta livre por dentro da alça",
      "Puxe a ponta para formar o laço",
      "O laço aperta quando você puxa a corda principal"
    ],
    dicas: [
      "Útil quando precisa de um laço que aperta",
      "Fácil de ajustar o tamanho puxando a ponta",
      "Pode ser desfeito rapidamente"
    ],
    cuidados: [
      "NUNCA use ao redor do pescoço de pessoas ou animais",
      "Pode apertar demais e causar ferimentos",
      "Use apenas para objetos inanimados"
    ],
    imagem: "/nos/no-correr.png"
  },
  {
    id: 8,
    nome: "Nó de Oito",
    categoria: "Básicos",
    dificuldade: "Fácil",
    usos: ["Impedir que corda passe por um buraco", "Escalada", "Náutica"],
    passos: [
      "Faça uma volta simples na corda",
      "Passe a ponta por trás da corda principal",
      "Passe a ponta por dentro da volta, de cima para baixo",
      "Aperte puxando a ponta e a corda principal"
    ],
    dicas: [
      "Parece um número 8 quando pronto",
      "Mais seguro que o nó simples",
      "Fácil de desfazer mesmo após muita tensão"
    ],
    cuidados: [
      "Certifique-se de que está bem apertado",
      "Deixe ponta suficiente (pelo menos 10cm)",
      "Verifique regularmente se não afrouxou"
    ],
    imagem: "/nos/no-oito.png"
  },
  {
    id: 9,
    nome: "Nó de Cirurgião",
    categoria: "Básicos",
    dificuldade: "Fácil",
    usos: ["Primeiros socorros", "Amarrar pacotes", "Situações que precisam segurar enquanto aperta"],
    passos: [
      "Faça um nó direito normal",
      "Mas no primeiro meio-nó, dê duas voltas em vez de uma",
      "Complete com o segundo meio-nó normal",
      "O nó trava sozinho, não precisa segurar"
    ],
    dicas: [
      "Perfeito para quando você precisa das duas mãos livres",
      "Muito usado em medicina para suturas",
      "Trava temporariamente antes de apertar o segundo nó"
    ],
    cuidados: [
      "Não substitui o nó direito em situações críticas",
      "Sempre complete o segundo meio-nó",
      "Teste antes de soltar"
    ],
    imagem: "/nos/no-cirurgiao.png"
  },
  {
    id: 10,
    nome: "Nó Prussik",
    categoria: "Avançados",
    dificuldade: "Difícil",
    usos: ["Escalada", "Subir em cordas", "Sistemas de segurança"],
    passos: [
      "Use uma corda fina ao redor de uma corda mais grossa",
      "Dê 3 voltas completas ao redor da corda principal",
      "Passe a ponta por dentro de todas as voltas",
      "Aperte bem as voltas",
      "O nó desliza quando solto, mas trava quando puxado"
    ],
    dicas: [
      "A corda fina deve ter metade da espessura da principal",
      "Quanto mais voltas, mais seguro",
      "Usado por bombeiros e em resgate"
    ],
    cuidados: [
      "APENAS para uso com treinamento adequado",
      "Pode falhar se as cordas estiverem molhadas",
      "Nunca use para suportar peso humano sem supervisão"
    ],
    imagem: "/nos/no-prussik.png"
  }
]

// Amarrações (combinações de nós)
export const amarracoes = [
  {
    id: 1,
    nome: "Amarração Quadrada",
    usos: ["Unir dois bastões em ângulo reto", "Construir mesas", "Fazer estruturas"],
    passos: [
      "Comece com um nó catau no bastão vertical",
      "Passe a corda sobre o bastão horizontal",
      "Passe por baixo do bastão vertical",
      "Continue alternando por cima e por baixo (3-4 voltas)",
      "Mude para voltas perpendiculares (3-4 voltas)",
      "Finalize com um nó catau no bastão horizontal"
    ],
    dicas: [
      "Mantenha a corda sempre esticada",
      "As voltas devem ficar bem juntas",
      "Quanto mais voltas, mais forte a amarração"
    ]
  },
  {
    id: 2,
    nome: "Amarração Diagonal",
    usos: ["Unir bastões que se cruzam em X", "Reforçar estruturas", "Fazer tripés"],
    passos: [
      "Comece com volta do fiel onde os bastões se cruzam",
      "Dê 3-4 voltas ao redor de ambos os bastões em uma diagonal",
      "Dê 3-4 voltas na diagonal oposta",
      "Dê 2-3 voltas apertadas entre os bastões (frechamento)",
      "Finalize com nó catau"
    ],
    dicas: [
      "Muito forte para estruturas que recebem pressão",
      "O frechamento é essencial para apertar bem",
      "Use em pontes e torres"
    ]
  },
  {
    id: 3,
    nome: "Amarração Paralela",
    usos: ["Unir bastões paralelos", "Fazer escadas", "Prolongar bastões"],
    passos: [
      "Comece com nó catau no primeiro bastão",
      "Passe a corda em volta dos dois bastões em forma de 8",
      "Dê 6-8 voltas bem apertadas",
      "Faça o frechamento entre os bastões",
      "Finalize com nó catau no segundo bastão"
    ],
    dicas: [
      "Mantenha os bastões bem juntos",
      "As voltas devem ficar paralelas e organizadas",
      "Muito usada em construções de acampamento"
    ]
  }
]

// Dicas gerais sobre cordas e nós
export const dicasGerais = [
  {
    titulo: "Cuidados com a Corda",
    itens: [
      "Nunca pise na corda - isso danifica as fibras",
      "Guarde enrolada e seca",
      "Evite arrastar no chão",
      "Lave cordas sujas com água e sabão neutro",
      "Seque à sombra, nunca ao sol direto",
      "Descarte cordas muito desgastadas"
    ]
  },
  {
    titulo: "Escolhendo a Corda Certa",
    itens: [
      "Corda de sisal: natural, áspera, boa para amarrações",
      "Corda de nylon: sintética, resistente, boa para escalada",
      "Corda de algodão: macia, boa para decoração",
      "Paracord: leve, resistente, multiuso",
      "Verifique sempre a carga máxima suportada"
    ]
  },
  {
    titulo: "Segurança",
    itens: [
      "Sempre teste o nó antes de usar",
      "Deixe pontas de pelo menos 10cm",
      "Nunca confie sua vida a um nó que não domina",
      "Pratique em situação segura antes de usar em altura",
      "Inspecione a corda antes de cada uso",
      "Tenha sempre um plano B de segurança"
    ]
  },
  {
    titulo: "Prática",
    itens: [
      "Pratique cada nó pelo menos 10 vezes",
      "Tente fazer com os olhos fechados",
      "Pratique com diferentes espessuras de corda",
      "Ensine para outra pessoa - é a melhor forma de aprender",
      "Faça competições de velocidade",
      "Crie desafios práticos (montar barraca, fazer maca, etc)"
    ]
  }
]

// Testes e desafios
export const desafiosNos = [
  {
    nivel: "Iniciante",
    descricao: "Desafios para quem está começando a aprender nós",
    desafios: [
      {
        titulo: "Velocidade Básica",
        descricao: "Fazer 5 nós direitos perfeitos em 2 minutos",
        pontos: 10,
        dica: "Pratique o movimento 'direita sobre esquerda, esquerda sobre direita'"
      },
      {
        titulo: "Memória Muscular",
        descricao: "Fazer lais de guia com os olhos fechados",
        pontos: 15,
        dica: "Lembre da história do coelho: sai da toca, rodeia a árvore e volta"
      },
      {
        titulo: "Aplicação Prática",
        descricao: "Amarrar uma mochila usando apenas nó de escota",
        pontos: 10,
        dica: "Use a alça da mochila como a corda mais grossa"
      },
      {
        titulo: "Contra o Relógio",
        descricao: "Fazer nó catau em 10 segundos",
        pontos: 10,
        dica: "Pratique o movimento até ficar automático"
      },
      {
        titulo: "Nó de Segurança",
        descricao: "Fazer 3 nós de oito perfeitos seguidos",
        pontos: 10,
        dica: "O nó deve parecer um número 8 quando pronto"
      },
      {
        titulo: "Primeiros Socorros",
        descricao: "Fazer nó de cirurgião e demonstrar sua aplicação",
        pontos: 15,
        dica: "Útil quando você precisa das mãos livres enquanto amarra"
      }
    ]
  },
  {
    nivel: "Intermediário",
    descricao: "Desafios para quem já domina os nós básicos",
    desafios: [
      {
        titulo: "Sequência Completa",
        descricao: "Fazer todos os 10 nós básicos em sequência sem erro",
        pontos: 25,
        dica: "Crie uma ordem lógica: básicos → alças → amarração → emenda → avançados"
      },
      {
        titulo: "Construção de Mesa",
        descricao: "Construir uma mesa usando amarração quadrada que aguente 10kg",
        pontos: 30,
        dica: "Use pelo menos 4 voltas em cada direção e faça bom frechamento"
      },
      {
        titulo: "Escada Funcional",
        descricao: "Fazer uma escada de corda com 5 degraus que aguente seu peso",
        pontos: 35,
        dica: "Use amarração paralela para os degraus e teste antes de subir"
      },
      {
        titulo: "Professor Desbravador",
        descricao: "Ensinar 3 nós diferentes para um iniciante até ele conseguir fazer sozinho",
        pontos: 20,
        dica: "Ensinar é a melhor forma de aprender. Seja paciente e demonstre devagar"
      },
      {
        titulo: "Resgate Simulado",
        descricao: "Criar um sistema de içamento usando nós e polias improvisadas",
        pontos: 30,
        dica: "Use lais de guia para as alças e volta do fiel para fixação"
      },
      {
        titulo: "Tripé Estável",
        descricao: "Construir um tripé de 2 metros que fique em pé sozinho",
        pontos: 25,
        dica: "Use amarração diagonal e distribua bem o peso dos bastões"
      }
    ]
  },
  {
    nivel: "Avançado",
    descricao: "Desafios para mestres em nós e amarrações",
    desafios: [
      {
        titulo: "Ponte Suspensa",
        descricao: "Construir uma ponte suspensa de 3 metros que aguente 3 pessoas",
        pontos: 50,
        dica: "Use cabos principais fortes e amarrações diagonais para estabilidade"
      },
      {
        titulo: "Maca de Emergência",
        descricao: "Fazer uma maca funcional apenas com cordas e 2 bastões em 10 minutos",
        pontos: 45,
        dica: "Use a técnica de tecelagem com a corda entre os bastões"
      },
      {
        titulo: "Circuito Completo",
        descricao: "Completar circuito de 15 nós diferentes em menos de 5 minutos",
        pontos: 40,
        dica: "Pratique a transição entre os nós para não perder tempo"
      },
      {
        titulo: "Inovação Criativa",
        descricao: "Criar e documentar uma nova aplicação prática para um nó conhecido",
        pontos: 35,
        dica: "Pense em situações reais de acampamento ou resgate"
      },
      {
        titulo: "Torre de Observação",
        descricao: "Construir uma torre de 4 metros de altura que aguente uma pessoa no topo",
        pontos: 60,
        dica: "Use amarrações quadradas e diagonais. Segurança em primeiro lugar!"
      },
      {
        titulo: "Mestre Instrutor",
        descricao: "Conduzir um workshop completo de nós para 10+ pessoas",
        pontos: 50,
        dica: "Prepare material visual, demonstrações práticas e exercícios progressivos"
      },
      {
        titulo: "Resgate Real",
        descricao: "Montar sistema completo de resgate vertical com segurança redundante",
        pontos: 55,
        dica: "Use nó prussik para backup, lais de guia para cadeirinha e volta do fiel para ancoragem"
      }
    ]
  }
]

