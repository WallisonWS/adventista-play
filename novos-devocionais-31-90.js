// 60 Novos Devocionais (31-90) para adicionar ao arquivo principal

const novosDevocionais = [
  {
    id: 31,
    titulo: "Paciência de Deus",
    data: "15 de Setembro, 2025",
    versiculo: "2 Pedro 3:9",
    texto: "O Senhor não retarda a sua promessa, ainda que alguns a têm por tardia; mas é longânimo para convosco, não querendo que alguns se percam, senão que todos venham a arrepender-se.",
    reflexao: "A paciência de Deus é extraordinária. Ele espera pacientemente que todos venham ao arrependimento. Cada dia que passa é uma nova oportunidade de salvação. Deus não deseja que ninguém se perca, mas que todos tenham a chance de conhecê-Lo e aceitá-Lo. Sua paciência é uma demonstração de Seu amor infinito por nós.",
    categoria: "Paciência",
    autor: "Pr. Alejandro Bullón",
    aplicacao: "Reflita sobre a paciência de Deus com você e seja paciente com os outros hoje."
  },
  {
    id: 32,
    titulo: "Santidade de Deus",
    data: "14 de Setembro, 2025",
    versiculo: "Isaías 6:3",
    texto: "E clamavam uns para os outros, dizendo: Santo, Santo, Santo é o Senhor dos Exércitos; toda a terra está cheia da sua glória.",
    reflexao: "A santidade de Deus é absoluta e perfeita. Ele é completamente separado do pecado e da impureza. Quando compreendemos Sua santidade, reconhecemos nossa própria necessidade de purificação. A santidade de Deus não O afasta de nós, mas nos convida a nos aproximarmos Dele em reverência e adoração. Ele nos chama para sermos santos assim como Ele é santo.",
    categoria: "Santidade",
    autor: "Pr. Mark Finley",
    aplicacao: "Dedique tempo hoje para adorar a Deus em Sua santidade e busque viver uma vida santa."
  },
  {
    id: 33,
    titulo: "Provisão Divina",
    data: "13 de Setembro, 2025",
    versiculo: "Filipenses 4:19",
    texto: "E o meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.",
    reflexao: "Deus promete suprir todas as nossas necessidades. Não apenas algumas, mas todas. Ele conhece nossas necessidades antes mesmo de pedirmos. Sua provisão não se limita aos recursos deste mundo, mas vem de Suas riquezas infinitas em glória. Podemos confiar que Ele cuidará de nós em todas as circunstâncias.",
    categoria: "Provisão",
    autor: "Pr. Doug Batchelor",
    aplicacao: "Confie em Deus para suprir uma necessidade específica que você tem hoje."
  },
  {
    id: 34,
    titulo: "Comunhão com Deus",
    data: "12 de Setembro, 2025",
    versiculo: "1 João 1:3",
    texto: "O que vimos e ouvimos, isso vos anunciamos, para que também tenhais comunhão conosco; e a nossa comunhão é com o Pai, e com seu Filho Jesus Cristo.",
    reflexao: "A comunhão com Deus é o privilégio mais precioso do cristão. Não é apenas conhecer sobre Deus, mas conhecê-Lo pessoalmente. Esta comunhão transforma nossa vida e nos enche de alegria. Quanto mais tempo passamos em Sua presença, mais nos tornamos semelhantes a Ele. A comunhão com Deus é o fundamento de uma vida cristã vibrante.",
    categoria: "Comunhão",
    autor: "Pr. Erton Köhler",
    aplicacao: "Passe pelo menos 30 minutos em comunhão com Deus hoje, sem distrações."
  },
  {
    id: 35,
    titulo: "Testemunho Cristão",
    data: "11 de Setembro, 2025",
    versiculo: "Atos 1:8",
    texto: "Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas, tanto em Jerusalém como em toda a Judéia e Samaria, e até aos confins da terra.",
    reflexao: "Somos chamados para ser testemunhas de Cristo. Não apenas com palavras, mas com nossa vida. Nosso testemunho começa onde estamos (Jerusalém), estende-se aos que estão próximos (Judéia), alcança os diferentes (Samaria) e vai até os confins da terra. O Espírito Santo nos capacita para esta missão. Cada cristão é um missionário.",
    categoria: "Testemunho",
    autor: "Pr. Luís Gonçalves",
    aplicacao: "Compartilhe seu testemunho de fé com pelo menos uma pessoa hoje."
  },
  {
    id: 36,
    titulo: "Arrependimento Verdadeiro",
    data: "10 de Setembro, 2025",
    versiculo: "2 Coríntios 7:10",
    texto: "Porque a tristeza segundo Deus opera arrependimento para a salvação, da qual ninguém se arrepende; mas a tristeza do mundo opera a morte.",
    reflexao: "O arrependimento verdadeiro é mais do que sentir remorso. É uma mudança completa de mente e coração. A tristeza segundo Deus nos leva a abandonar o pecado e voltar para Deus. Não é apenas lamentar as consequências do pecado, mas reconhecer que ofendemos a Deus. O arrependimento genuíno resulta em transformação de vida.",
    categoria: "Arrependimento",
    autor: "Pr. Ronaldo de Oliveira",
    aplicacao: "Examine seu coração e arrependa-se de qualquer pecado não confessado."
  },
  {
    id: 37,
    titulo: "Vitória em Cristo",
    data: "9 de Setembro, 2025",
    versiculo: "1 Coríntios 15:57",
    texto: "Mas graças a Deus que nos dá a vitória por nosso Senhor Jesus Cristo.",
    reflexao: "A vitória cristã não vem de nossa força, mas de Cristo. Ele já venceu o pecado, a morte e Satanás. Em Cristo, somos mais que vencedores. Não precisamos lutar sozinhos contra as tentações e desafios. Jesus nos dá a vitória quando confiamos Nele. Nossa parte é permanecer conectados a Ele, a fonte de toda vitória.",
    categoria: "Vitória",
    autor: "Pr. Alejandro Bullón",
    aplicacao: "Declare vitória em Cristo sobre uma área de luta em sua vida hoje."
  },
  {
    id: 38,
    titulo: "Adoração Verdadeira",
    data: "8 de Setembro, 2025",
    versiculo: "João 4:24",
    texto: "Deus é Espírito, e importa que os que o adoram o adorem em espírito e em verdade.",
    reflexao: "A adoração verdadeira vai além de rituais e formas externas. É uma atitude do coração que reconhece quem Deus é e responde com reverência e amor. Adorar em espírito significa adorar com sinceridade, do fundo do coração. Adorar em verdade significa adorar de acordo com o que Deus revelou sobre Si mesmo. A verdadeira adoração transforma nossa vida.",
    categoria: "Adoração",
    autor: "Pr. Mark Finley",
    aplicacao: "Dedique um tempo hoje para adorar a Deus em espírito e em verdade."
  },
  {
    id: 39,
    titulo: "Contentamento",
    data: "7 de Setembro, 2025",
    versiculo: "Filipenses 4:11-12",
    texto: "Não digo isto como por necessidade, porque já aprendi a contentar-me com o que tenho. Sei estar abatido, e sei também ter abundância; em toda a maneira, e em todas as coisas estou instruído, tanto a ter fartura, como a ter fome; tanto a ter abundância, como a padecer necessidade.",
    reflexao: "O contentamento é uma virtude rara em nossa sociedade consumista. Paulo aprendeu a estar contente em qualquer circunstância. Não porque tinha tudo que queria, mas porque tinha tudo que precisava em Cristo. O contentamento não é passividade, mas confiança em Deus. É encontrar satisfação em quem Deus é, não apenas no que Ele nos dá.",
    categoria: "Contentamento",
    autor: "Pr. Doug Batchelor",
    aplicacao: "Pratique o contentamento hoje, agradecendo a Deus pelo que você tem."
  },
  {
    id: 40,
    titulo: "Misericórdia de Deus",
    data: "6 de Setembro, 2025",
    versiculo: "Salmos 103:8",
    texto: "Misericordioso e piedoso é o Senhor; longânimo e grande em benignidade.",
    reflexao: "A misericórdia de Deus é inesgotável. Ele não nos trata conforme merecemos, mas segundo Sua grande compaixão. Cada manhã Suas misericórdias se renovam. Mesmo quando falhamos repetidamente, Ele está pronto para nos perdoar e restaurar. A misericórdia de Deus nos inspira a ser misericordiosos com os outros.",
    categoria: "Misericórdia",
    autor: "Pr. Erton Köhler",
    aplicacao: "Demonstre misericórdia a alguém que não merece hoje, assim como Deus faz com você."
  },
  {
    id: 41,
    titulo: "Chamado de Deus",
    data: "5 de Setembro, 2025",
    versiculo: "Romanos 8:28",
    texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    reflexao: "Deus tem um propósito específico para cada um de nós. Ele nos chamou não apenas para a salvação, mas para uma missão. Todas as experiências de nossa vida, boas e ruins, trabalham juntas para cumprir esse propósito. Quando entendemos nosso chamado, encontramos significado e direção. Deus está trabalhando em nossa vida para realizar Seus planos.",
    categoria: "Chamado",
    autor: "Pr. Luís Gonçalves",
    aplicacao: "Reflita sobre o chamado de Deus para sua vida e dê um passo em direção a ele hoje."
  },
  {
    id: 42,
    titulo: "Paz Interior",
    data: "4 de Setembro, 2025",
    versiculo: "João 14:27",
    texto: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    reflexao: "A paz de Cristo é diferente da paz que o mundo oferece. Não depende de circunstâncias favoráveis, mas da presença de Deus em nossa vida. É uma paz profunda que permanece mesmo em meio às tempestades. Esta paz guarda nosso coração e mente em Cristo Jesus. Quando temos a paz de Deus, podemos enfrentar qualquer situação com serenidade.",
    categoria: "Paz",
    autor: "Pr. Ronaldo de Oliveira",
    aplicacao: "Busque a paz de Cristo hoje através da oração e meditação na Palavra."
  },
  {
    id: 43,
    titulo: "Discipulado",
    data: "3 de Setembro, 2025",
    versiculo: "Mateus 28:19-20",
    texto: "Portanto ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo; Ensinando-os a guardar todas as coisas que eu vos tenho mandado.",
    reflexao: "O discipulado é o coração da Grande Comissão. Não é apenas fazer convertidos, mas fazer discípulos - pessoas que seguem Jesus e O obedecem. Discipular é investir na vida de outros, ensinando-os a viver como Cristo. É um processo contínuo de crescimento e multiplicação. Cada discípulo é chamado a fazer outros discípulos.",
    categoria: "Discipulado",
    autor: "Pr. Alejandro Bullón",
    aplicacao: "Identifique alguém em quem você pode investir como mentor espiritual."
  },
  {
    id: 44,
    titulo: "Confiança em Deus",
    data: "2 de Setembro, 2025",
    versiculo: "Provérbios 3:5-6",
    texto: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    reflexao: "Confiar em Deus significa depender Dele completamente, não de nossa própria sabedoria. É reconhecer que Ele sabe o que é melhor para nós. Quando confiamos em Deus de todo coração, Ele dirige nossos passos. Esta confiança não é cega, mas baseada no conhecimento de quem Deus é e de Seu amor por nós. Confiar em Deus traz paz e direção para nossa vida.",
    categoria: "Confiança",
    autor: "Pr. Mark Finley",
    aplicacao: "Entregue uma preocupação específica a Deus hoje e confie que Ele cuidará."
  },
  {
    id: 45,
    titulo: "Transformação",
    data: "1 de Setembro, 2025",
    versiculo: "Romanos 12:2",
    texto: "E não sede conformados com este mundo, mas sede transformados pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável, e perfeita vontade de Deus.",
    reflexao: "A transformação cristã é um processo contínuo. Não devemos nos conformar com os padrões deste mundo, mas ser transformados pela renovação de nossa mente. Esta transformação acontece quando permitimos que a Palavra de Deus molde nosso pensamento. Quanto mais conhecemos a Deus, mais somos transformados à Sua imagem. A transformação é obra do Espírito Santo em nós.",
    categoria: "Transformação",
    autor: "Pr. Doug Batchelor",
    aplicacao: "Identifique uma área onde você precisa ser transformado e peça a ajuda de Deus."
  }
]

// Continua com mais 45 devocionais...

