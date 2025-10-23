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
  },
  {
    id: 7,
    nome: "Excursionismo",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Fazer uma caminhada de 10km",
        descricao: "Completar uma trilha de 10 quilômetros em terreno variado (plano, subida e descida).",
        dicas: [
          "Use calçados adequados e amaciados",
          "Leve água e lanches energéticos",
          "Faça alongamento antes e depois da caminhada",
          "Mantenha um ritmo constante"
        ]
      },
      {
        numero: 2,
        titulo: "Conhecer equipamentos de trilha",
        descricao: "Saber a função e como usar os equipamentos essenciais.",
        equipamentos: [
          { nome: "Mochila de Ataque", uso: "Para caminhadas curtas, leve e confortável" },
          { nome: "Cantil/Bolsa de Hidratação", uso: "Manter-se hidratado" },
          { nome: "Kit de Primeiros Socorros Individual", uso: "Para pequenos ferimentos" },
          { nome: "Lanterna com pilhas extras", uso: "Para emergências ou caminhada noturna" },
          { nome: "Capa de Chuva/Anorak", uso: "Proteção contra chuva e vento" }
        ]
      },
      {
        numero: 3,
        titulo: "Planejar uma excursão",
        descricao: "Elaborar um plano detalhado para uma trilha de 1 dia.",
        plano: [
          "Definir o objetivo e o local da trilha",
          "Estudar o mapa e o perfil de elevação",
          "Calcular o tempo estimado de caminhada",
          "Preparar a lista de equipamentos e alimentação",
          "Definir um plano de emergência e rota de fuga"
        ]
      },
      {
        numero: 4,
        titulo: "Conhecer 5 sinais de tempo",
        descricao: "Observar a natureza para prever mudanças no clima.",
        sinais: [
          { sinal: "Nuvens escuras e baixas", previsao: "Chuva ou tempestade próxima" },
          { sinal: "Céu vermelho ao pôr do sol", previsao: "Tempo bom no dia seguinte" },
          { sinal: "Vento forte e constante", previsao: "Mudança brusca no clima" },
          { sinal: "Animais agitados ou escondidos", previsao: "Mudança no clima" },
          { sinal: "Anel em volta do sol/lua", previsao: "Chuva ou neve em 24-48 horas" }
        ]
      }
    ],
    materiaisNecessarios: [
      "Mochila",
      "Água",
      "Lanches",
      "Mapa e Bússola",
      "Calçados de trilha"
    ],
    avaliacaoPratica: {
      descricao: "Participar de uma trilha de 10km e apresentar o plano de excursão.",
      criterios: [
        "Completar a trilha no tempo estipulado",
        "Uso correto dos equipamentos",
        "Apresentação do plano de excursão",
        "Identificação correta dos sinais de tempo"
      ]
    }
  },
  {
    id: 8,
    nome: "Segurança Básica",
    categoria: "Habilidades Domésticas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer números de emergência",
        descricao: "Saber para quem ligar em diferentes situações de emergência.",
        numeros: [
          { servico: "SAMU (Ambulância)", telefone: "192" },
          { servico: "Corpo de Bombeiros", telefone: "193" },
          { servico: "Polícia Militar", telefone: "190" },
          { servico: "Defesa Civil", telefone: "199" },
          { servico: "Emergência de Energia", telefone: "0800..." }
        ]
      },
      {
        numero: 2,
        titulo: "Fazer um plano de evacuação familiar",
        descricao: "Criar um plano para sair de casa rapidamente em caso de incêndio ou emergência.",
        passos: [
          "Desenhe um mapa da casa com 2 rotas de fuga por cômodo",
          "Defina um ponto de encontro seguro fora de casa",
          "Pratique o plano com a família (simulação de incêndio)",
          "Verifique se janelas e portas abrem facilmente"
        ]
      },
      {
        numero: 3,
        titulo: "Conhecer segurança contra incêndio",
        descricao: "Saber como prevenir e como agir em caso de fogo.",
        prevencao: [
          "Nunca deixe panelas no fogo sem supervisão",
          "Mantenha fósforos e isqueiros longe do alcance de crianças",
          "Não sobrecarregue tomadas com muitos aparelhos",
          "Verifique vazamentos de gás regularmente"
        ],
        acao: [
          "Mantenha a calma e chame os bombeiros",
          "Use extintor (se souber usar) para fogo pequeno",
          "Se a roupa pegar fogo, pare, deite e role",
          "Não use elevadores",
          "Rasteje para sair (fumaça sobe)"
        ]
      },
      {
        numero: 4,
        titulo: "Demonstrar segurança elétrica",
        descricao: "Conhecer os riscos e como evitar acidentes elétricos.",
        dicas: [
          "Nunca toque em fios desencapados",
          "Não use aparelhos elétricos molhado",
          "Não tente consertar aparelhos ligados na tomada",
          "Use protetores nas tomadas com crianças em casa"
        ]
      }
    ],
    materiaisNecessarios: [
      "Telefone",
      "Mapa da casa",
      "Extintor (para demonstração)"
    ],
    avaliacaoPratica: {
      descricao: "Demonstração do plano de evacuação e simulação de chamada de emergência.",
      criterios: [
        "Apresentação do plano de evacuação",
        "Conhecimento dos números de emergência",
        "Demonstração de como usar um extintor",
        "Conhecimento das regras de segurança"
      ]
    }
  },
  {
    id: 9,
    nome: "Fotografia",
    categoria: "Artes e Habilidades",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer as partes básicas de uma câmera",
        descricao: "Saber a função do obturador, abertura (diafragma) e ISO.",
        termos: [
          { termo: "Obturador", definicao: "Tempo que o sensor fica exposto à luz (velocidade)" },
          { termo: "Abertura (Diafragma)", definicao: "Tamanho da abertura da lente (controla a profundidade de campo)" },
          { termo: "ISO", definicao: "Sensibilidade do sensor à luz (controla o ruído)" },
          { termo: "Lente", definicao: "Parte que capta a imagem" },
          { termo: "Visor", definicao: "Onde o fotógrafo vê a cena" }
        ]
      },
      {
        numero: 2,
        titulo: "Tirar 20 fotos temáticas",
        descricao: "Produzir um portfólio com fotos em diferentes temas (ex: natureza, retrato, ação).",
        temas: [
          "Retrato (pessoa)",
          "Paisagem (natureza)",
          "Macro (detalhe)",
          "Ação (esporte, movimento)",
          "Arquitetura (prédios)",
          "Pôr do Sol/Nascer do Sol"
        ]
      },
      {
        numero: 3,
        titulo: "Conhecer composição fotográfica",
        descricao: "Aplicar técnicas para tornar a foto mais agradável e interessante.",
        tecnicas: [
          { tecnica: "Regra dos Terços", detalhes: "Dividir a cena em 9 partes iguais e posicionar o objeto de interesse nas linhas ou interseções" },
          { tecnica: "Linhas Guias", detalhes: "Usar linhas naturais (estrada, rio) para guiar o olhar" },
          { tecnica: "Simetria e Padrões", detalhes: "Usar elementos repetitivos ou espelhados" },
          { tecnica: "Espaço Negativo", detalhes: "Deixar espaço vazio ao redor do objeto para destacá-lo" }
        ]
      },
      {
        numero: 4,
        titulo: "Fazer edição básica de fotos",
        descricao: "Usar um software (ou app) para ajustar brilho, contraste e cor.",
        passos: [
          "Ajustar o balanço de branco (cor)",
          "Corrigir a exposição (brilho)",
          "Aumentar o contraste",
          "Recortar e endireitar a imagem"
        ]
      }
    ],
    materiaisNecessarios: [
      "Câmera (pode ser celular)",
      "Software de edição (Lightroom, Snapseed)",
      "Caderno para anotações"
    ],
    avaliacaoPratica: {
      descricao: "Apresentação do portfólio de 20 fotos e explicação das técnicas usadas.",
      criterios: [
        "Qualidade técnica das fotos",
        "Aplicação das regras de composição",
        "Variedade de temas",
        "Edição básica bem feita"
      ]
    }
  },
  {
    id: 10,
    nome: "Ciclismo",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Pedalar 25km em terreno variado",
        descricao: "Completar um percurso de 25 quilômetros, demonstrando resistência e controle.",
        dicas: [
          "Use capacete sempre",
          "Verifique os freios e pneus antes de sair",
          "Leve kit de reparo de pneu",
          "Mantenha-se hidratado"
        ]
      },
      {
        numero: 2,
        titulo: "Fazer manutenção básica de bicicleta",
        descricao: "Saber como cuidar da bicicleta e fazer pequenos reparos.",
        manutencao: [
          "Calibrar pneus corretamente",
          "Ajustar a altura do selim",
          "Lubrificar a corrente",
          "Trocar um pneu furado",
          "Ajustar o freio"
        ]
      },
      {
        numero: 3,
        titulo: "Conhecer 10 sinais de trânsito para ciclistas",
        descricao: "Saber as regras de circulação e sinalização manual.",
        sinais: [
          "Parar (braço esquerdo esticado para baixo)",
          "Virar à esquerda (braço esquerdo esticado para a esquerda)",
          "Virar à direita (braço esquerdo dobrado para cima)",
          "Reduzir a velocidade (mão aberta para baixo, balançando)",
          "Sinalização de buraco/obstáculo (apontar para o chão)",
          "Sinalização de 'siga em frente'",
          "Sinalização de 'passar por mim'",
          "Sinalização de 'cuidado'",
          "Sinalização de 'pare'",
          "Sinalização de 'mantenha a linha'"
        ]
      },
      {
        numero: 4,
        titulo: "Usar equipamentos de segurança",
        descricao: "Conhecer e usar corretamente os equipamentos de proteção.",
        equipamentos: [
          "Capacete (obrigatório)",
          "Luvas",
          "Óculos de proteção",
          "Luzes (dianteira branca, traseira vermelha)",
          "Roupas refletivas"
        ]
      }
    ],
    materiaisNecessarios: [
      "Bicicleta em bom estado",
      "Capacete",
      "Kit de reparo de pneu",
      "Água"
    ],
    avaliacaoPratica: {
      descricao: "Completar a trilha de 25km e demonstrar a manutenção básica.",
      criterios: [
        "Conclusão da trilha",
        "Uso correto dos equipamentos de segurança",
        "Demonstração dos sinais de trânsito",
        "Reparo de pneu furado"
      ]
    }
  },
  {
    id: 11,
    nome: "Canoagem",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Remar 1km em canoa",
        descricao: "Completar um percurso de 1 quilômetro em canoa ou caiaque, demonstrando controle.",
        dicas: [
          "Mantenha o remo na vertical",
          "Use o corpo, não apenas os braços",
          "Remar em linha reta é mais eficiente",
          "Mantenha o equilíbrio do corpo"
        ]
      },
      {
        numero: 2,
        titulo: "Conhecer segurança em canoagem",
        descricao: "Saber como prevenir acidentes e como agir em caso de emborque.",
        regras: [
          "Usar colete salva-vidas sempre",
          "Nunca remar sozinho",
          "Verificar previsão do tempo",
          "Saber como desvirar a canoa (emborque)",
          "Manter-se afastado de áreas de correnteza forte"
        ]
      },
      {
        numero: 3,
        titulo: "Fazer manobras básicas",
        descricao: "Demonstrar manobras essenciais para controle da embarcação.",
        manobras: [
          "Remada para frente (propulsão)",
          "Remada para trás (freio)",
          "Remada em J (direção)",
          "Apoio alto e baixo (equilíbrio)"
        ]
      },
      {
        numero: 4,
        titulo: "Conhecer tipos de embarcações",
        descricao: "Diferenciar canoa, caiaque e bote.",
        tipos: [
          { tipo: "Canoa", detalhes: "Aberta, geralmente com 2 lugares, usa remo de uma pá" },
          { tipo: "Caiaque", detalhes: "Fechado, 1 ou 2 lugares, usa remo de duas pás" },
          { tipo: "Bote Inflável", detalhes: "Inflável, usado para águas mais agitadas ou resgate" }
        ]
      }
    ],
    materiaisNecessarios: [
      "Canoa/Caiaque",
      "Remo",
      "Colete salva-vidas",
      "Água"
    ],
    avaliacaoPratica: {
      descricao: "Completar o percurso de 1km e demonstrar as manobras básicas.",
      criterios: [
        "Conclusão do percurso",
        "Uso correto do colete salva-vidas",
        "Execução das manobras",
        "Conhecimento das regras de segurança"
      ]
    }
  },
  {
    id: 12,
    nome: "Ordem Unida",
    categoria: "Atividades Recreativas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer 15 comandos de ordem unida",
        descricao: "Saber o significado e a execução de comandos básicos.",
        comandos: [
          "Sentido",
          "Descansar",
          "À Vontade",
          "Cobrir",
          "Frente para a Direita/Esquerda",
          "Meia Volta, Volver",
          "Direita/Esquerda, Volver",
          "Olhar à Direita/Esquerda",
          "Em Frente, Marche",
          "Alto",
          "Passo Ordinário",
          "Passo Sem Cadência",
          "Atenção, Olhar à Direita/Esquerda, Volver",
          "Apresentar Arma (com bastão)",
          "Ombro Arma (com bastão)"
        ]
      },
      {
        numero: 2,
        titulo: "Demonstrar a execução correta de 5 comandos",
        descricao: "Executar 5 comandos de sua escolha com precisão e vigor.",
        dicas: [
          "Mantenha a postura ereta",
          "Movimentos devem ser rápidos e precisos",
          "O pé esquerdo é o pé de marcha",
          "O calcanhar deve bater no chão com energia"
        ]
      },
      {
        numero: 3,
        titulo: "Liderar uma equipe em ordem unida",
        descricao: "Comandar um pequeno grupo (pelo menos 4 pessoas) em 5 comandos diferentes.",
        passos: [
          "Posicione-se corretamente",
          "Dê os comandos com voz alta e clara",
          "Corrija os erros da equipe",
          "Mantenha a cadência e o ritmo"
        ]
      },
      {
        numero: 4,
        titulo: "Participar de uma cerimônia oficial",
        descricao: "Participar de uma formatura ou cerimônia do clube, demonstrando disciplina.",
        cerimonia: [
          "Hasteamento da Bandeira",
          "Baixamento da Bandeira",
          "Desfile",
          "Formação em 'U' ou em Coluna"
        ]
      }
    ],
    materiaisNecessarios: [
      "Uniforme de Desbravador",
      "Bastão (para comandos com arma)"
    ],
    avaliacaoPratica: {
      descricao: "Demonstração prática dos comandos e liderança de uma pequena equipe.",
      criterios: [
        "Execução correta dos comandos individuais",
        "Voz de comando clara e forte",
        "Capacidade de liderar a equipe",
        "Postura e disciplina"
      ]
    }
  },
  {
    id: 13,
    nome: "Costura",
    categoria: "Habilidades Domésticas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Identificar diferentes tipos de tecidos",
        descricao: "Conhecer pelo menos 5 tipos de tecidos e suas características.",
        tecidos: [
          { nome: "Algodão", caracteristicas: "Natural, respirável, absorvente" },
          { nome: "Linho", caracteristicas: "Natural, fresco, amassa fácil" },
          { nome: "Seda", caracteristicas: "Natural, luxuosa, delicada" },
          { nome: "Poliéster", caracteristicas: "Sintético, durável, não amassa" },
          { nome: "Lã", caracteristicas: "Natural, quente, elástica" }
        ]
      },
      {
        numero: 2,
        titulo: "Fazer 3 tipos de pontos à mão",
        descricao: "Demonstrar habilidade em costura manual.",
        pontos: ["Ponto Reto", "Ponto Atrás", "Ponto Caseado"]
      },
      {
        numero: 3,
        titulo: "Pregar um botão",
        descricao: "Saber pregar botões de 2 e 4 furos corretamente."
      },
      {
        numero: 4,
        titulo: "Fazer uma bainha",
        descricao: "Fazer bainha em uma peça de roupa."
      }
    ]
  },
  {
    id: 14,
    nome: "Jardinagem",
    categoria: "Habilidades Domésticas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Plantar e cuidar de 3 tipos de plantas",
        descricao: "Cultivar plantas por pelo menos 2 meses.",
        cuidados: ["Regar regularmente", "Adubar mensalmente", "Controlar pragas", "Podar quando necessário"]
      },
      {
        numero: 2,
        titulo: "Conhecer tipos de solo",
        descricao: "Identificar 3 tipos de solo e suas características.",
        solos: [
          { tipo: "Arenoso", caracteristicas: "Leve, drena rápido, pobre em nutrientes" },
          { tipo: "Argiloso", caracteristicas: "Pesado, retém água, rico em nutrientes" },
          { tipo: "Humoso", caracteristicas: "Rico em matéria orgânica, fértil" }
        ]
      }
    ]
  },
  {
    id: 15,
    nome: "Marcenaria",
    categoria: "Habilidades Domésticas",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer 10 ferramentas de marcenaria",
        descricao: "Identificar ferramentas e seus usos.",
        ferramentas: ["Martelo", "Serrote", "Plaina", "Formão", "Esquadro", "Trena", "Nível", "Furadeira", "Lixa", "Grampo"]
      },
      {
        numero: 2,
        titulo: "Construir um objeto simples de madeira",
        descricao: "Fazer um porta-lápis, caixa ou prateleira pequena."
      }
    ]
  },
  {
    id: 16,
    nome: "Astronomia",
    categoria: "Ciência e Saúde",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Identificar 10 constelações",
        descricao: "Reconhecer constelações no céu noturno.",
        constelacoes: ["Cruzeiro do Sul", "Orion", "Escorpião", "Ursa Maior", "Ursa Menor", "Cão Maior", "Cão Menor", "Leão", "Virgo", "Centauro"]
      },
      {
        numero: 2,
        titulo: "Conhecer os planetas do Sistema Solar",
        descricao: "Saber a ordem e características dos 8 planetas.",
        planetas: ["Mercúrio", "Vênus", "Terra", "Marte", "Júpiter", "Saturno", "Urano", "Netuno"]
      }
    ]
  },
  {
    id: 17,
    nome: "Geologia",
    categoria: "Ciência e Saúde",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Identificar 10 tipos de rochas e minerais",
        descricao: "Conhecer rochas ígneas, sedimentares e metamórficas.",
        tipos: ["Granito", "Basalto", "Arenito", "Calcário", "Mármore", "Quartzo", "Feldspato", "Mica", "Ardósia", "Gnaisse"]
      },
      {
        numero: 2,
        titulo: "Fazer uma coleção de 15 rochas",
        descricao: "Coletar, identificar e catalogar rochas da sua região."
      }
    ]
  },
  {
    id: 18,
    nome: "Nutrição",
    categoria: "Ciência e Saúde",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer os grupos alimentares",
        descricao: "Entender a pirâmide alimentar e porções diárias.",
        grupos: ["Cereais", "Frutas", "Vegetais", "Proteínas", "Laticínios", "Gorduras"]
      },
      {
        numero: 2,
        titulo: "Planejar um cardápio saudável",
        descricao: "Criar cardápio balanceado para uma semana."
      }
    ]
  },
  {
    id: 19,
    nome: "Temperança",
    categoria: "Ciência e Saúde",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer os 8 remédios naturais",
        descricao: "Entender os benefícios de cada remédio natural.",
        remedios: ["Sol", "Água", "Ar Puro", "Exercício", "Repouso", "Alimentação", "Temperança", "Confiança em Deus"]
      },
      {
        numero: 2,
        titulo: "Fazer um compromisso de vida saudável",
        descricao: "Comprometer-se a evitar substâncias nocivas."
      }
    ]
  },
  {
    id: 20,
    nome: "Saúde",
    categoria: "Ciência e Saúde",
    nivel: "1",
    requisitos: [
      {
        numero: 1,
        titulo: "Conhecer hábitos de higiene pessoal",
        descricao: "Praticar higiene diária adequada.",
        habitos: ["Escovar dentes 3x ao dia", "Banho diário", "Lavar mãos", "Cortar unhas", "Cuidar do cabelo"]
      },
      {
        numero: 2,
        titulo: "Entender importância do sono",
        descricao: "Saber quantas horas de sono são necessárias por idade."
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

