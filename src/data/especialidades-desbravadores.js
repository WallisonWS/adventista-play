// Especialidades completas para Desbravadores

export const especialidadesCompletas = [
  {
    id: 1,
    nome: "Acampamento",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Participar de um acampamento de, no mínimo, 2 dias e 1 noite",
        descricao: "Você deve participar ativamente de todas as atividades do acampamento, incluindo montagem de barraca, preparo de refeições e atividades recreativas.",
        dicas: [
          "Leve uma lista de equipamentos necessários",
          "Chegue cedo para escolher um bom local para barraca",
          "Participe das atividades em grupo",
          "Mantenha seu espaço organizado"
        ]
      },
      {
        numero: 2,
        titulo: "Saber armar corretamente uma barraca",
        descricao: "Demonstre habilidade em armar e desarmar uma barraca, escolhendo local adequado e fixando corretamente.",
        passos: [
          "Escolha terreno plano, seco e protegido do vento",
          "Limpe o local de pedras e galhos",
          "Estenda o piso da barraca",
          "Monte a estrutura seguindo as instruções",
          "Estique bem as cordas e fixe as estacas em ângulo de 45°",
          "Teste a firmeza antes de colocar pertences dentro"
        ],
        cuidados: [
          "Nunca arme barraca em leito seco de rio",
          "Evite embaixo de árvores isoladas (raios)",
          "Mantenha distância de formigueiros",
          "Deixe ventilação adequada"
        ]
      },
      {
        numero: 3,
        titulo: "Saber fazer um abrigo de emergência",
        descricao: "Construir um abrigo temporário usando materiais naturais ou lona.",
        tipos: [
          {
            nome: "Abrigo de Lona Simples",
            passos: [
              "Estique uma corda entre duas árvores a 1,5m de altura",
              "Coloque a lona sobre a corda",
              "Fixe as pontas no chão com estacas",
              "Deixe uma lateral mais alta para ventilação"
            ]
          },
          {
            nome: "Abrigo de Galhos",
            passos: [
              "Apoie um galho grande entre duas árvores ou forquilhas",
              "Apoie galhos menores em ângulo de 45°",
              "Cubra com folhas, grama ou musgo",
              "Faça camada grossa para impermeabilizar"
            ]
          }
        ]
      },
      {
        numero: 4,
        titulo: "Conhecer 10 regras de segurança em acampamento",
        descricao: "Demonstrar conhecimento sobre segurança e boas práticas em acampamentos.",
        regras: [
          {
            regra: "Escolha de Local",
            detalhes: "Terreno plano, seco, longe de rios e árvores isoladas"
          },
          {
            regra: "Fogueira Segura",
            detalhes: "Círculo de pedras, longe de árvores, sempre com água por perto"
          },
          {
            regra: "Água Potável",
            detalhes: "Sempre ferva, filtre ou use purificador antes de beber"
          },
          {
            regra: "Alimentos",
            detalhes: "Guarde em recipientes fechados, longe de animais"
          },
          {
            regra: "Lixo",
            detalhes: "Leve todo o lixo de volta, não enterre nem queime"
          },
          {
            regra: "Higiene",
            detalhes: "Lave mãos antes de comer, use sanitário adequado"
          },
          {
            regra: "Animais Selvagens",
            detalhes: "Não alimente, mantenha distância, guarde comida"
          },
          {
            regra: "Plantas Venenosas",
            detalhes: "Aprenda a identificar e evitar"
          },
          {
            regra: "Clima",
            detalhes: "Verifique previsão, tenha plano para chuva/frio"
          },
          {
            regra: "Comunicação",
            detalhes: "Sempre avise alguém sobre seus planos e localização"
          }
        ]
      },
      {
        numero: 5,
        titulo: "Saber fazer e usar corretamente 5 nós de acampamento",
        descricao: "Demonstrar habilidade em fazer e aplicar nós essenciais.",
        nos: [
          {
            nome: "Lais de Guia",
            uso: "Fazer alça fixa, resgate, amarrar barraca"
          },
          {
            nome: "Nó Catau",
            uso: "Amarrar corda em árvore ou poste"
          },
          {
            nome: "Nó Direito",
            uso: "Unir duas cordas de mesma espessura"
          },
          {
            nome: "Nó de Escota",
            uso: "Unir cordas de espessuras diferentes"
          },
          {
            nome: "Nó de Oito",
            uso: "Impedir corda de passar por buraco"
          }
        ]
      },
      {
        numero: 6,
        titulo: "Preparar cardápio balanceado para 2 dias de acampamento",
        descricao: "Planejar refeições nutritivas e práticas para acampamento.",
        exemplo: {
          "Dia 1": {
            "Café da Manhã": ["Aveia com frutas", "Pão integral", "Suco natural"],
            "Almoço": ["Arroz integral", "Feijão", "Salada", "Frutas"],
            "Jantar": ["Macarrão", "Molho de tomate", "Legumes grelhados"]
          },
          "Dia 2": {
            "Café da Manhã": ["Granola", "Leite", "Banana", "Pão com pasta"],
            "Almoço": ["Arroz", "Lentilha", "Vegetais cozidos", "Salada"],
            "Jantar": ["Sopa de legumes", "Pão", "Frutas"]
          }
        },
        dicas: [
          "Leve alimentos não perecíveis ou em cooler",
          "Planeje refeições fáceis de preparar",
          "Inclua frutas e vegetais",
          "Leve água suficiente ou meio de purificação",
          "Considere restrições alimentares do grupo"
        ]
      },
      {
        numero: 7,
        titulo: "Cozinhar 3 refeições em fogueira ou fogareiro",
        descricao: "Demonstrar habilidade em preparar alimentos ao ar livre.",
        receitas: [
          {
            nome: "Arroz de Fogueira",
            ingredientes: ["2 xícaras de arroz", "4 xícaras de água", "Sal"],
            preparo: [
              "Ferva a água em panela sobre fogueira",
              "Adicione arroz e sal",
              "Cozinhe em fogo baixo por 20 minutos",
              "Deixe descansar 5 minutos antes de servir"
            ]
          },
          {
            nome: "Legumes Grelhados",
            ingredientes: ["Abobrinha", "Berinjela", "Pimentão", "Azeite", "Sal"],
            preparo: [
              "Corte legumes em fatias grossas",
              "Pincele com azeite e tempere",
              "Grelhe sobre brasas por 5-7 minutos cada lado",
              "Sirva quente"
            ]
          },
          {
            nome: "Banana Assada",
            ingredientes: ["Bananas", "Chocolate ou granola", "Papel alumínio"],
            preparo: [
              "Corte banana ao meio (sem tirar casca)",
              "Coloque chocolate ou granola no meio",
              "Embrulhe em papel alumínio",
              "Asse nas brasas por 10 minutos",
              "Sirva com colher"
            ]
          }
        ]
      },
      {
        numero: 8,
        titulo: "Demonstrar habilidade em acender fogueira",
        descricao: "Acender e manter fogueira de forma segura e eficiente.",
        passos: [
          "Escolha local seguro (longe de árvores, grama seca)",
          "Faça círculo de pedras",
          "Prepare 3 tipos de material: isca, gravetos finos, lenha grossa",
          "Monte estrutura (pirâmide, cabana ou estrela)",
          "Acenda a isca",
          "Adicione gravetos gradualmente",
          "Adicione lenha quando pegar bem",
          "Mantenha água por perto",
          "Apague completamente ao terminar"
        ],
        tipos_fogueira: [
          {
            nome: "Pirâmide",
            uso: "Cozinhar, aquecimento rápido"
          },
          {
            nome: "Cabana",
            uso: "Iluminação, queima longa"
          },
          {
            nome: "Estrela",
            uso: "Economia de lenha, controle de calor"
          }
        ]
      }
    ],
    materiaisNecessarios: [
      "Barraca",
      "Saco de dormir",
      "Isolante térmico",
      "Lanterna",
      "Kit de cozinha",
      "Corda",
      "Canivete",
      "Fósforos à prova d'água",
      "Kit de primeiros socorros",
      "Mochila"
    ],
    avaliacaoPratica: {
      descricao: "Para concluir esta especialidade, você deve demonstrar todas as habilidades em um acampamento real.",
      criterios: [
        "Armar e desarmar barraca corretamente",
        "Fazer todos os nós solicitados",
        "Acender fogueira com segurança",
        "Preparar pelo menos uma refeição",
        "Manter área de acampamento limpa e organizada",
        "Seguir todas as regras de segurança"
      ]
    }
  },
  {
    id: 2,
    nome: "Primeiros Socorros",
    categoria: "Habilidades Domésticas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer os princípios básicos de primeiros socorros",
        descricao: "Entender o que fazer e não fazer em situações de emergência.",
        principios: [
          {
            titulo: "Avaliar a Cena",
            detalhes: "Antes de ajudar, certifique-se de que o local é seguro para você e a vítima"
          },
          {
            titulo: "Chamar Ajuda",
            detalhes: "Ligue 192 (SAMU) ou 193 (Bombeiros) imediatamente em emergências graves"
          },
          {
            titulo: "ABC da Vida",
            detalhes: "A=Vias Aéreas, B=Boa respiração, C=Circulação"
          },
          {
            titulo: "Não Mover a Vítima",
            detalhes: "Exceto se houver perigo imediato (fogo, desabamento)"
          },
          {
            titulo: "Manter a Calma",
            detalhes: "Transmita confiança e tranquilidade para a vítima"
          }
        ]
      },
      {
        numero: 2,
        titulo: "Saber tratar ferimentos leves",
        descricao: "Demonstrar cuidados com cortes, arranhões e escoriações.",
        procedimento: [
          "Lave as mãos antes de tocar no ferimento",
          "Limpe o ferimento com água corrente e sabão neutro",
          "Remova sujeira visível com gaze limpa",
          "Aplique antisséptico (álcool 70% ou iodo)",
          "Cubra com curativo ou band-aid se necessário",
          "Troque o curativo diariamente",
          "Observe sinais de infecção (vermelhidão, inchaço, pus)"
        ],
        cuidados: [
          "Nunca use algodão diretamente no ferimento",
          "Não sopre o ferimento",
          "Não use pomadas sem orientação médica",
          "Procure médico se o ferimento for profundo ou extenso"
        ]
      },
      {
        numero: 3,
        titulo: "Saber fazer bandagens",
        descricao: "Aplicar diferentes tipos de bandagens corretamente.",
        tipos: [
          {
            nome: "Bandagem em Espiral",
            uso: "Braços e pernas",
            passos: [
              "Comece na parte mais fina do membro",
              "Dê duas voltas fixas",
              "Suba em espiral, cobrindo metade da volta anterior",
              "Finalize com duas voltas fixas",
              "Prenda com esparadrapo ou nó"
            ]
          },
          {
            nome: "Bandagem em Oito",
            uso: "Articulações (joelho, cotovelo)",
            passos: [
              "Faça voltas cruzadas formando um 8",
              "Mantenha articulação levemente flexionada",
              "Não aperte demais para não cortar circulação"
            ]
          },
          {
            nome: "Tipoia",
            uso: "Sustentar braço ou ombro machucado",
            passos: [
              "Use lenço triangular ou pedaço de tecido",
              "Coloque braço dobrado em 90°",
              "Amarre atrás do pescoço",
              "Verifique circulação nos dedos"
            ]
          }
        ]
      },
      {
        numero: 4,
        titulo: "Conhecer tratamento para queimaduras",
        descricao: "Saber classificar e tratar diferentes graus de queimaduras.",
        classificacao: [
          {
            grau: "1º Grau",
            caracteristicas: "Vermelhidão, dor, sem bolhas",
            tratamento: [
              "Resfrie com água corrente por 10-15 minutos",
              "Não use gelo diretamente",
              "Aplique pomada para queimaduras se disponível",
              "Não estoure bolhas se aparecerem"
            ],
            exemplos: "Queimadura de sol leve"
          },
          {
            grau: "2º Grau",
            caracteristicas: "Bolhas, muita dor, vermelhidão intensa",
            tratamento: [
              "Resfrie com água corrente",
              "NÃO estoure as bolhas",
              "Cubra com gaze limpa e úmida",
              "Procure atendimento médico",
              "Não aplique pasta de dente, manteiga ou outros"
            ],
            exemplos: "Queimadura com água fervente"
          },
          {
            grau: "3º Grau",
            caracteristicas: "Pele esbranquiçada ou carbonizada, pouca dor",
            tratamento: [
              "NÃO retire roupas grudadas",
              "Cubra com pano limpo e úmido",
              "Chame emergência imediatamente (192/193)",
              "Mantenha vítima aquecida",
              "Não aplique nada sobre a queimadura"
            ],
            exemplos: "Queimadura com fogo, eletricidade"
          }
        ]
      },
      {
        numero: 5,
        titulo: "Saber fazer RCP (Reanimação Cardiopulmonar)",
        descricao: "Realizar manobras de reanimação em caso de parada cardíaca.",
        importante: "Esta é uma habilidade que salva vidas! Pratique com instrutor qualificado.",
        passos: [
          {
            etapa: "Verificar Consciência",
            acao: "Chame a pessoa, toque no ombro. Se não responder, prossiga"
          },
          {
            etapa: "Chamar Ajuda",
            acao: "Grite por ajuda, peça para alguém ligar 192"
          },
          {
            etapa: "Posicionar",
            acao: "Coloque vítima de costas em superfície firme"
          },
          {
            etapa: "Compressões Torácicas",
            acao: "30 compressões no centro do peito, 5cm de profundidade, ritmo de 100-120/min"
          },
          {
            etapa: "Ventilações",
            acao: "2 ventilações boca-a-boca (se treinado)"
          },
          {
            etapa: "Continuar",
            acao: "Ciclos de 30:2 até chegada do socorro ou vítima voltar"
          }
        ],
        observacoes: [
          "Em crianças, use apenas uma mão",
          "Em bebês, use apenas dois dedos",
          "Se não souber fazer ventilação, faça apenas compressões",
          "Não pare até a chegada do socorro"
        ]
      },
      {
        numero: 6,
        titulo: "Conhecer sinais de choque e tratamento",
        descricao: "Identificar e tratar estado de choque.",
        sinais: [
          "Pele pálida, fria e úmida",
          "Pulso rápido e fraco",
          "Respiração rápida e superficial",
          "Confusão mental",
          "Náusea ou vômito",
          "Sede intensa"
        ],
        tratamento: [
          "Deite a vítima de costas",
          "Eleve as pernas cerca de 30cm (exceto se suspeitar de fratura)",
          "Mantenha vítima aquecida com cobertor",
          "Afrouxe roupas apertadas",
          "NÃO dê nada para beber ou comer",
          "Vire a cabeça de lado se vomitar",
          "Chame emergência (192)"
        ]
      },
      {
        numero: 7,
        titulo: "Saber tratar picadas de insetos e animais peçonhentos",
        descricao: "Identificar e tratar picadas venenosas.",
        tipos: [
          {
            animal: "Abelhas e Vespas",
            tratamento: [
              "Retire o ferrão raspando (não puxe)",
              "Lave com água e sabão",
              "Aplique gelo por 10 minutos",
              "Observe reação alérgica",
              "Procure médico se inchaço grave ou dificuldade respirar"
            ]
          },
          {
            animal: "Cobras",
            tratamento: [
              "Mantenha vítima calma e deitada",
              "Imobilize o membro afetado",
              "Lave com água e sabão",
              "NÃO faça torniquete",
              "NÃO corte o local",
              "NÃO chupe o veneno",
              "Leve ao hospital URGENTE",
              "Tente identificar a cobra (foto de longe)"
            ]
          },
          {
            animal: "Aranhas e Escorpiões",
            tratamento: [
              "Lave com água e sabão",
              "Aplique gelo",
              "Procure atendimento médico",
              "Leve o animal se possível (morto, em frasco)"
            ]
          }
        ]
      },
      {
        numero: 8,
        titulo: "Montar kit de primeiros socorros",
        descricao: "Preparar kit completo para emergências.",
        itensBasicos: [
          "Luvas descartáveis (2 pares)",
          "Gaze estéril (vários tamanhos)",
          "Ataduras (5cm e 10cm)",
          "Esparadrapo",
          "Band-aids variados",
          "Tesoura sem ponta",
          "Pinça",
          "Termômetro",
          "Álcool 70%",
          "Soro fisiológico",
          "Antisséptico (iodo)",
          "Analgésico (paracetamol)",
          "Pomada para queimaduras",
          "Manual de primeiros socorros",
          "Lista de telefones de emergência"
        ],
        cuidados: [
          "Verifique validade dos medicamentos regularmente",
          "Mantenha em local fresco e seco",
          "Reponha itens usados imediatamente",
          "Deixe em local de fácil acesso",
          "Todos da família devem saber onde está"
        ]
      }
    ],
    telefones_emergencia: {
      "SAMU": "192",
      "Bombeiros": "193",
      "Polícia": "190",
      "Defesa Civil": "199",
      "Centro de Intoxicações": "0800 722 6001"
    },
    avaliacaoPratica: {
      descricao: "Demonstração prática de todas as habilidades aprendidas.",
      simulacoes: [
        "Tratar ferimento simulado",
        "Fazer bandagem em diferentes partes do corpo",
        "Demonstrar RCP em boneco",
        "Montar kit de primeiros socorros",
        "Responder corretamente a cenários de emergência"
      ]
    }
  },
  {
    id: 3,
    nome: "Nós e Amarras",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Definir os seguintes termos",
        descricao: "Conhecer a terminologia básica sobre cordas e nós.",
        termos: [
          {
            termo: "Chicote",
            definicao: "A ponta livre da corda"
          },
          {
            termo: "Seio",
            definicao: "A parte curva da corda entre as pontas"
          },
          {
            termo: "Firme",
            definicao: "A parte principal da corda, oposta ao chicote"
          },
          {
            termo: "Alça",
            definicao: "Curva fechada formada na corda"
          },
          {
            termo: "Volta",
            definicao: "Quando a corda dá uma volta completa ao redor de algo"
          },
          {
            termo: "Cote",
            definicao: "Nó simples usado para prender corda"
          }
        ]
      },
      {
        numero: 2,
        titulo: "Conhecer cuidados com cordas",
        descricao: "Saber como manter e preservar cordas.",
        cuidados: [
          "Nunca pisar na corda",
          "Não arrastar no chão",
          "Guardar limpa e seca",
          "Enrolar corretamente após uso",
          "Lavar com água e sabão neutro se sujar",
          "Secar à sombra",
          "Verificar desgaste antes de usar",
          "Descartar se muito desgastada"
        ]
      },
      {
        numero: 3,
        titulo: "Fazer 20 nós e demonstrar uso prático",
        descricao: "Dominar os nós essenciais e suas aplicações.",
        nos: [
          "Nó Direito",
          "Nó de Escota",
          "Lais de Guia",
          "Nó Catau",
          "Volta do Fiel",
          "Nó de Pescador",
          "Nó de Correr",
          "Nó de Oito",
          "Nó de Cirurgião",
          "Nó Prussik",
          "Nó de Fateixa",
          "Nó de Arnês",
          "Nó de Cadeira",
          "Nó de Azelha",
          "Nó de Estribo",
          "Nó de Porco",
          "Nó Balso pelo Seio",
          "Nó de Frade",
          "Nó de Savoia",
          "Nó de Gancho"
        ]
      },
      {
        numero: 4,
        titulo: "Fazer 3 tipos de amarração",
        descricao: "Demonstrar amarrações para construções.",
        amarracoes: [
          {
            nome: "Amarração Quadrada",
            uso: "Unir bastões em ângulo reto",
            aplicacao: "Mesas, cadeiras, estruturas"
          },
          {
            nome: "Amarração Diagonal",
            uso: "Unir bastões que se cruzam",
            aplicacao: "Tripés, torres, pontes"
          },
          {
            nome: "Amarração Paralela",
            uso: "Unir bastões paralelos",
            aplicacao: "Escadas, prolongamento de bastões"
          }
        ]
      },
      {
        numero: 5,
        titulo: "Construir projeto usando nós e amarras",
        descricao: "Aplicar conhecimentos em projeto prático.",
        projetos: [
          "Mesa de acampamento",
          "Cadeira rústica",
          "Escada de corda",
          "Ponte suspensa",
          "Torre de observação",
          "Maca de emergência",
          "Varal resistente"
        ]
      }
    ]
  }
]

// Categorias de especialidades
export const categoriasEspecialidades = [
  {
    id: 1,
    nome: "Atividades Recreativas",
    descricao: "Especialidades relacionadas a atividades ao ar livre e recreação",
    icone: "🏕️",
    especialidades: ["Acampamento", "Nós e Amarras", "Orientação", "Excursionismo", "Natação"]
  },
  {
    id: 2,
    nome: "Habilidades Domésticas",
    descricao: "Especialidades práticas para o dia a dia",
    icone: "🏠",
    especialidades: ["Primeiros Socorros", "Cozinha", "Costura", "Jardinagem", "Marcenaria"]
  },
  {
    id: 3,
    nome: "Ciência e Saúde",
    descricao: "Especialidades científicas e de saúde",
    icone: "🔬",
    especialidades: ["Astronomia", "Geologia", "Nutrição", "Temperança", "Saúde"]
  },
  {
    id: 4,
    nome: "Artes e Habilidades",
    descricao: "Especialidades artísticas e criativas",
    icone: "🎨",
    especialidades: ["Música", "Fotografia", "Desenho", "Pintura", "Artesanato"]
  },
  {
    id: 5,
    nome: "Estudo da Natureza",
    descricao: "Especialidades sobre flora, fauna e meio ambiente",
    icone: "🌿",
    especialidades: ["Aves", "Mamíferos", "Árvores", "Flores", "Insetos"]
  },
  {
    id: 6,
    nome: "Atividades Missionárias",
    descricao: "Especialidades voltadas para serviço e evangelismo",
    icone: "📖",
    especialidades: ["Evangelismo", "Amigo Atencioso", "Testemunho Juvenil", "Mordomia"]
  }
]

