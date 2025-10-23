// Planos de Leitura Bíblica

export const planosLeitura = [
  {
    id: 'biblia-ano',
    titulo: 'Bíblia em 1 Ano',
    descricao: 'Leia toda a Bíblia em 365 dias',
    duracao: '365 dias',
    categoria: 'Completo',
    tipo: 'Plano de Leitura',
    nivel: 'Todos',
    diasPorSemana: 7,
    tempoMedioDiario: '15-20 minutos',
    licoes: [
      { dia: 1, leitura: 'Gênesis 1-3', reflexao: 'A criação e a queda' },
      { dia: 2, leitura: 'Gênesis 4-7', reflexao: 'Caim e Abel, Noé' },
      { dia: 3, leitura: 'Gênesis 8-11', reflexao: 'O dilúvio e Babel' },
      { dia: 4, leitura: 'Gênesis 12-15', reflexao: 'O chamado de Abraão' },
      { dia: 5, leitura: 'Gênesis 16-19', reflexao: 'Agar e Sodoma' },
      // ... continua até dia 365
    ]
  },
  {
    id: 'novo-testamento-90',
    titulo: 'Novo Testamento em 90 Dias',
    descricao: 'Leia todo o Novo Testamento em 3 meses',
    duracao: '90 dias',
    categoria: 'Novo Testamento',
    tipo: 'Plano de Leitura',
    nivel: 'Iniciante',
    diasPorSemana: 7,
    tempoMedioDiario: '20-25 minutos',
    licoes: [
      { dia: 1, leitura: 'Mateus 1-4', reflexao: 'Nascimento e batismo de Jesus' },
      { dia: 2, leitura: 'Mateus 5-7', reflexao: 'O Sermão do Monte' },
      { dia: 3, leitura: 'Mateus 8-10', reflexao: 'Milagres e missão' },
      // ... continua até dia 90
    ]
  },
  {
    id: 'salmos-30',
    titulo: 'Salmos em 30 Dias',
    descricao: 'Mergulhe nos Salmos em um mês',
    duracao: '30 dias',
    categoria: 'Salmos',
    tipo: 'Plano de Leitura',
    nivel: 'Todos',
    diasPorSemana: 7,
    tempoMedioDiario: '10-15 minutos',
    licoes: [
      { dia: 1, leitura: 'Salmos 1-5', reflexao: 'Bem-aventurado o homem' },
      { dia: 2, leitura: 'Salmos 6-10', reflexao: 'Clamor e confiança' },
      { dia: 3, leitura: 'Salmos 11-15', reflexao: 'O Senhor é meu refúgio' },
      // ... continua até dia 30
    ]
  },
  {
    id: 'proverbios-31',
    titulo: 'Provérbios em 31 Dias',
    descricao: 'Um capítulo de sabedoria por dia',
    duracao: '31 dias',
    categoria: 'Sabedoria',
    tipo: 'Plano de Leitura',
    nivel: 'Todos',
    diasPorSemana: 7,
    tempoMedioDiario: '5-10 minutos',
    licoes: [
      { dia: 1, leitura: 'Provérbios 1', reflexao: 'O princípio da sabedoria' },
      { dia: 2, leitura: 'Provérbios 2', reflexao: 'Benefícios da sabedoria' },
      { dia: 3, leitura: 'Provérbios 3', reflexao: 'Confia no Senhor' },
      // ... continua até dia 31
    ]
  },
  {
    id: 'evangelhos-40',
    titulo: 'Os 4 Evangelhos em 40 Dias',
    descricao: 'Conheça a vida de Jesus através dos evangelhos',
    duracao: '40 dias',
    categoria: 'Evangelhos',
    tipo: 'Plano de Leitura',
    nivel: 'Iniciante',
    diasPorSemana: 7,
    tempoMedioDiario: '15-20 minutos',
    licoes: [
      { dia: 1, leitura: 'Mateus 1-2, Lucas 1-2', reflexao: 'O nascimento de Jesus' },
      { dia: 2, leitura: 'Mateus 3-4, Marcos 1, Lucas 3-4', reflexao: 'Batismo e tentação' },
      // ... continua até dia 40
    ]
  },
  {
    id: 'genesis-exodo-50',
    titulo: 'Gênesis e Êxodo em 50 Dias',
    descricao: 'Da criação à libertação',
    duracao: '50 dias',
    categoria: 'Pentateuco',
    tipo: 'Plano de Leitura',
    nivel: 'Intermediário',
    diasPorSemana: 7,
    tempoMedioDiario: '20 minutos',
    licoes: [
      { dia: 1, leitura: 'Gênesis 1-2', reflexao: 'A criação perfeita' },
      { dia: 2, leitura: 'Gênesis 3-4', reflexao: 'A entrada do pecado' },
      // ... continua até dia 50
    ]
  },
  {
    id: 'cartas-paulo-60',
    titulo: 'Cartas de Paulo em 60 Dias',
    descricao: 'Estude as epístolas paulinas',
    duracao: '60 dias',
    categoria: 'Epístolas',
    tipo: 'Plano de Leitura',
    nivel: 'Intermediário',
    diasPorSemana: 7,
    tempoMedioDiario: '15 minutos',
    licoes: [
      { dia: 1, leitura: 'Romanos 1-3', reflexao: 'Todos pecaram' },
      { dia: 2, leitura: 'Romanos 4-6', reflexao: 'Justificação pela fé' },
      // ... continua até dia 60
    ]
  },
  {
    id: 'profetas-maiores-80',
    titulo: 'Profetas Maiores em 80 Dias',
    descricao: 'Isaías, Jeremias, Ezequiel e Daniel',
    duracao: '80 dias',
    categoria: 'Profetas',
    tipo: 'Plano de Leitura',
    nivel: 'Avançado',
    diasPorSemana: 7,
    tempoMedioDiario: '20-25 minutos',
    licoes: [
      { dia: 1, leitura: 'Isaías 1-4', reflexao: 'Visão de Isaías' },
      { dia: 2, leitura: 'Isaías 5-8', reflexao: 'Cântico da vinha' },
      // ... continua até dia 80
    ]
  },
  {
    id: 'vida-jesus-30',
    titulo: 'A Vida de Jesus em 30 Dias',
    descricao: 'Cronologia da vida de Cristo',
    duracao: '30 dias',
    categoria: 'Vida de Cristo',
    tipo: 'Plano de Leitura',
    nivel: 'Todos',
    diasPorSemana: 7,
    tempoMedioDiario: '15 minutos',
    licoes: [
      { dia: 1, leitura: 'Lucas 1:26-38, Mateus 1:18-25', reflexao: 'Anunciação' },
      { dia: 2, leitura: 'Lucas 2:1-20', reflexao: 'Nascimento' },
      { dia: 3, leitura: 'Mateus 2:1-12', reflexao: 'Visita dos magos' },
      // ... continua até dia 30
    ]
  },
  {
    id: 'mulheres-biblia-21',
    titulo: 'Mulheres da Bíblia em 21 Dias',
    descricao: 'Histórias inspiradoras de mulheres de fé',
    duracao: '21 dias',
    categoria: 'Personagens',
    tipo: 'Plano de Leitura',
    nivel: 'Todos',
    diasPorSemana: 7,
    tempoMedioDiario: '10-15 minutos',
    licoes: [
      { dia: 1, leitura: 'Gênesis 2-3', reflexao: 'Eva - A primeira mulher' },
      { dia: 2, leitura: 'Gênesis 16, 21', reflexao: 'Sara - Mãe da promessa' },
      { dia: 3, leitura: 'Rute 1-4', reflexao: 'Rute - Lealdade' },
      // ... continua até dia 21
    ]
  }
]

// Total: 10 planos com centenas de dias de leitura!


,
  {
    id: '7-dias-fe',
    titulo: '7 Dias de Fé e Esperança',
    descricao: 'Um plano rápido para fortalecer sua fé em uma semana',
    duracao: '7 dias',
    categoria: 'Fé',
    tipo: 'Plano de Leitura',
    nivel: 'Iniciante',
    diasPorSemana: 7,
    tempoMedioDiario: '5 minutos',
    licoes: [
      { dia: 1, leitura: 'Salmos 23', reflexao: 'O Senhor é meu pastor' },
      { dia: 2, leitura: 'João 14:1-6', reflexao: 'Não se turbe o vosso coração' },
      { dia: 3, leitura: 'Romanos 8:28-39', reflexao: 'Mais que vencedores' },
      { dia: 4, leitura: 'Filipenses 4:4-7', reflexao: 'A paz que excede todo o entendimento' },
      { dia: 5, leitura: 'Hebreus 11:1-6', reflexao: 'A essência da fé' },
      { dia: 6, leitura: 'Isaías 41:10', reflexao: 'Não temas, eu sou contigo' },
      { dia: 7, leitura: 'Apocalipse 21:1-7', reflexao: 'Nova Terra e Novo Céu' }
    ]
  },
  {
    id: '10-dias-oracao',
    titulo: '10 Dias de Oração e Consagração',
    descricao: 'Um desafio para aprofundar sua vida de oração',
    duracao: '10 dias',
    categoria: 'Oração',
    tipo: 'Plano de Leitura',
    nivel: 'Todos',
    diasPorSemana: 7,
    tempoMedioDiario: '10 minutos',
    licoes: [
      { dia: 1, leitura: 'Mateus 6:5-15', reflexao: 'O Pai Nosso como modelo' },
      { dia: 2, leitura: 'Lucas 11:1-13', reflexao: 'A Parábola do Amigo Importuno' },
      { dia: 3, leitura: 'Tiago 5:13-18', reflexao: 'A oração eficaz do justo' },
      { dia: 4, leitura: '1 João 5:14-15', reflexao: 'Orar segundo a vontade de Deus' },
      { dia: 5, leitura: 'Salmos 51', reflexao: 'Oração de arrependimento' },
      { dia: 6, leitura: 'Salmos 100', reflexao: 'Oração de louvor' },
      { dia: 7, leitura: 'Salmos 27', reflexao: 'Oração de confiança' },
      { dia: 8, leitura: 'Efésios 6:18', reflexao: 'Orando em todo tempo' },
      { dia: 9, leitura: 'Atos 4:23-31', reflexao: 'A oração da igreja primitiva' },
      { dia: 10, leitura: 'Marcos 11:24', reflexao: 'O poder da oração com fé' }
    ]
  }
]
