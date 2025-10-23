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
          "Limpe o ferimento com água e sabão neutro",
          "Aplique antisséptico",
          "Cubra com curativo estéril",
          "Troque o curativo diariamente"
        ],
        cuidados: [
          "Não assopre o ferimento",
          "Não use algodão diretamente no ferimento",
          "Não use produtos caseiros (café, pó de sapato)"
        ]
      },
      {
        numero: 3,
        titulo: "Saber tratar queimaduras",
        descricao: "Conhecer os tipos de queimadura e como tratar cada uma.",
        tipos: [
          {
            grau: "1º Grau",
            caracteristicas: "Vermelhidão, dor, inchaço leve",
            tratamento: "Água fria por 10 minutos, pomada para queimadura, não estourar bolhas"
          },
          {
            grau: "2º Grau",
            caracteristicas: "Bolhas, dor intensa, vermelhidão",
            tratamento: "Água fria, cobrir com gaze estéril, procurar ajuda médica"
          },
          {
            grau: "3º Grau",
            caracteristicas: "Pele carbonizada, indolor (nervos destruídos)",
            tratamento: "Chamar emergência, cobrir com pano limpo, não remover roupas grudadas"
          }
        ]
      },
      {
        numero: 4,
        titulo: "Demonstrar RCP (Ressuscitação Cardiopulmonar) básica",
        descricao: "Saber como agir em caso de parada cardiorrespiratória.",
        passos: [
          "Verifique a segurança da cena",
          "Cheque a responsividade da vítima (chame)",
          "Ligue para a emergência (192 ou 193)",
          "Faça 30 compressões torácicas (5-6cm de profundidade)",
          "Faça 2 ventilações (se treinado)",
          "Continue até a chegada da ajuda ou a vítima reagir"
        ],
        dicas: [
          "Use as duas mãos no centro do peito",
          "Mantenha os braços esticados",
          "Ritmo de 100 a 120 compressões por minuto"
        ]
      },
      {
        numero: 5,
        titulo: "Montar um kit de primeiros socorros",
        descricao: "Organizar um kit completo para emergências.",
        itens: [
          "Curativos e gazes estéreis",
          "Esparadrapo ou fita micropore",
          "Tesoura e pinça",
          "Luvas descartáveis",
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
    materiaisNecessarios: [
      "Kit de Primeiros Socorros",
      "Luvas",
      "Máscara de RCP",
      "Gaze e ataduras",
      "Antisséptico",
      "Telefone de emergência"
    ],
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
    ],
    materiaisNecessarios: [
      "Corda de 6mm a 10mm",
      "Bastões de madeira (30cm a 1m)",
      "Canivete ou faca",
      "Manual de nós",
      "Luvas"
    ],
    avaliacaoPratica: {
      descricao: "Demonstração prática de 10 nós e realização de uma amarração completa.",
      criterios: [
        "Execução correta dos 10 nós",
        "Explicação do uso de cada nó",
        "Construção de um projeto de amarração (ex: tripé)",
        "Cuidados e armazenamento da corda"
      ]
    }
  },
  {
    id: 4,
    nome: "Natação",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Saber nadar 50 metros ininterruptamente",
        descricao: "Demonstrar a capacidade de nadar 50 metros em qualquer estilo, sem parar.",
        dicas: [
          "Mantenha a respiração rítmica",
          "Use um estilo que você domine (crawl ou peito)",
          "Não force demais no início"
        ]
      },
      {
        numero: 2,
        titulo: "Demonstrar 3 estilos de nado diferentes",
        descricao: "Executar pelo menos 3 estilos de nado (ex: crawl, costas, peito, borboleta).",
        estilos: [
          "Crawl (nado livre)",
          "Costas",
          "Peito"
        ]
      },
      {
        numero: 3,
        titulo: "Conhecer 5 regras de segurança aquática",
        descricao: "Saber como se comportar em piscinas, rios e praias.",
        regras: [
          { regra: "Nunca nade sozinho", detalhes: "Sempre tenha um amigo ou salva-vidas por perto" },
          { regra: "Não pule em água rasa", detalhes: "Pode causar ferimentos graves" },
          { regra: "Respeite a sinalização", detalhes: "Bandeiras e placas indicam perigos" },
          { regra: "Não superestime sua capacidade", detalhes: "Se estiver cansado, saia da água" },
          { regra: "Evite nadar após comer", detalhes: "Espere pelo menos 1 hora" }
        ]
      },
      {
        numero: 4,
        titulo: "Demonstrar um salvamento básico",
        descricao: "Simular o resgate de uma vítima sem entrar na água (salvamento de alcance).",
        passos: [
          "Grite por ajuda e chame o salva-vidas",
          "Use um objeto flutuante (boia, corda, galho) para alcançar a vítima",
          "Deite-se no chão para manter o equilíbrio",
          "Puxe a vítima com calma para a borda"
        ]
      }
    ],
    materiaisNecessarios: [
      "Traje de banho",
      "Óculos de natação",
      "Protetor solar",
      "Piscina ou local seguro para nado"
    ],
    avaliacaoPratica: {
      descricao: "Demonstração prática dos estilos de nado e do salvamento básico.",
      criterios: [
        "Nadar 50m sem parar",
        "Executar 3 estilos corretamente",
        "Demonstrar salvamento de alcance",
        "Responder sobre as regras de segurança"
      ]
    }
  },
  {
    id: 5,
    nome: "Cozinha",
    categoria: "Habilidades Domésticas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer 5 regras de segurança na cozinha",
        descricao: "Saber como evitar acidentes com fogo, facas e eletricidade.",
        regras: [
          { regra: "Mantenha cabos de panelas para dentro", detalhes: "Evita que sejam puxados ou derrubados" },
          { regra: "Use luvas para forno", detalhes: "Protege contra queimaduras" },
          { regra: "Não use água em fogo de óleo", detalhes: "Use bicarbonato de sódio ou abafador" },
          { regra: "Mantenha facas afiadas", detalhes: "Facas cegas são mais perigosas" },
          { regra: "Desligue aparelhos após uso", detalhes: "Evita superaquecimento e choque" }
        ]
      },
      {
        numero: 2,
        titulo: "Preparar 3 refeições completas (café, almoço e jantar)",
        descricao: "Cozinhar um menu completo e balanceado.",
        refeicoes: [
          {
            tipo: "Café da Manhã",
            exemplo: "Pão integral, frutas, suco natural, ovos mexidos"
          },
          {
            tipo: "Almoço",
            exemplo: "Arroz, feijão, salada colorida, proteína vegetal (lentilha, grão de bico)"
          },
          {
            tipo: "Jantar",
            exemplo: "Sopa de legumes, sanduíche natural, salada de frutas"
          }
        ]
      },
      {
        numero: 3,
        titulo: "Fazer um pão e um bolo",
        descricao: "Demonstrar habilidades básicas de panificação e confeitaria.",
        dicas: [
          "Use ingredientes frescos",
          "Siga a receita com precisão",
          "Pré-aqueça o forno",
          "Não abra o forno durante o cozimento do bolo"
        ]
      },
      {
        numero: 4,
        titulo: "Conhecer a pirâmide alimentar e nutrição básica",
        descricao: "Saber a importância de cada grupo alimentar.",
        grupos: [
          "Carboidratos (base da energia)",
          "Frutas e Vegetais (vitaminas e fibras)",
          "Proteínas (construção e reparo)",
          "Laticínios/Alternativas (cálcio)",
          "Gorduras e Açúcares (uso moderado)"
        ]
      }
    ],
    materiaisNecessarios: [
      "Utensílios de cozinha",
      "Ingredientes",
      "Receitas",
      "Avental"
    ],
    avaliacaoPratica: {
      descricao: "Apresentação e degustação das refeições e produtos de panificação.",
      criterios: [
        "Sabor e apresentação dos pratos",
        "Higiene e segurança durante o preparo",
        "Conhecimento sobre nutrição",
        "Qualidade do pão e do bolo"
      ]
    }
  },
  {
    id: 6,
    nome: "Orientação",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer e usar uma bússola e um mapa topográfico",
        descricao: "Saber identificar direções e ler mapas.",
        passos: [
          "Identifique o Norte magnético na bússola",
          "Alinhe a bússola com o mapa",
          "Calcule o azimute (direção) para um ponto",
          "Siga a direção mantendo o azimute",
          "Identifique símbolos básicos do mapa (curvas de nível, rios, estradas)"
        ]
      },
      {
        numero: 2,
        titulo: "Encontrar direções sem bússola",
        descricao: "Usar métodos naturais para se orientar.",
        metodos: [
          { nome: "Sol e Relógio", detalhes: "Aponte o ponteiro das horas para o sol. O Sul estará no meio do ângulo entre o ponteiro das horas e o número 12." },
          { nome: "Estrelas", detalhes: "Use o Cruzeiro do Sul para encontrar o Sul (4,5 vezes o braço maior)." },
          { nome: "Sombra", detalhes: "Marque a ponta da sombra de um bastão no chão em dois momentos. A linha entre as marcas aponta Leste-Oeste." }
        ]
      },
      {
        numero: 3,
        titulo: "Completar uma trilha de orientação",
        descricao: "Participar de uma atividade prática de orientação com mapa e bússola.",
        dicas: [
          "Planeje a rota antes de começar",
          "Mantenha o mapa sempre orientado",
          "Use pontos de referência para confirmar a posição",
          "Caminhe no ritmo do mais lento do grupo"
        ]
      },
      {
        numero: 4,
        titulo: "Conhecer 5 sinais de trilha",
        descricao: "Saber como marcar e seguir trilhas.",
        sinais: [
          { sinal: "Seguir em frente", descricao: "Três pedras empilhadas ou dois riscos paralelos" },
          { sinal: "Virar à direita", descricao: "Uma pedra grande à direita ou uma seta no chão" },
          { sinal: "Virar à esquerda", descricao: "Uma pedra grande à esquerda ou uma seta no chão" },
          { sinal: "Perigo", descricao: "Um X grande no chão ou três pedras em triângulo" },
          { sinal: "Água", descricao: "Um círculo com um ponto no centro ou um W" }
        ]
      }
    ],
    materiaisNecessarios: [
      "Bússola",
      "Mapa topográfico da área",
      "Caderno e lápis",
      "Relógio (para método do sol)"
    ],
    avaliacaoPratica: {
      descricao: "Realização de uma prova de orientação no campo.",
      criterios: [
        "Leitura correta do mapa e bússola",
        "Encontrar todos os pontos de controle",
        "Usar um método de orientação natural",
        "Tempo de conclusão da trilha"
      ]
    }
  }
]

// Categorias de especialidades
export const categoriasEspecialidades = [
  {
    id: 1,
    nome: "Atividades Recreativas",
    descricao: "Especialidades relacionadas a atividades ao ar livre e recreação",
    icone: "🏕️",
    especialidades: ["Acampamento", "Nós e Amarras", "Natação", "Orientação", "Excursionismo", "Ciclismo", "Canoagem", "Ordem Unida"]
  },
  {
    id: 2,
    nome: "Habilidades Domésticas",
    descricao: "Especialidades práticas para o dia a dia",
    icone: "🏠",
    especialidades: ["Primeiros Socorros", "Cozinha", "Segurança Básica", "Costura", "Jardinagem", "Marcenaria"]
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

