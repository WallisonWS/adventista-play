import { videoAulasCursos, cursosRelacionados } from './video-aulas-cursos'

export const estudosCompletos = {
  escolaSabatina: [
    {
      id: 'josue',
      titulo: 'Fé no Livro de Josué',
      trimestre: '1º Trimestre 2024',
      videoaulas: videoAulasCursos.biblicos,
      descricao: 'Lições sobre conquista, fé e obediência através do livro de Josué',
      categoria: 'Escola Sabatina',
      tipo: 'Escola Sabatina',
      licoes: [
        { numero: 1, titulo: 'Preparação para a Conquista', texto: 'Josué 1:1-9', conteudo: 'Deus chama Josué para liderar Israel após a morte de Moisés. A promessa divina de estar com ele em cada passo demonstra que Deus nunca abandona Seus servos. Josué recebe três comandos: ser forte, corajoso e meditar na lei. O sucesso vem da obediência à Palavra de Deus.', reflexao: 'Assim como Josué, somos chamados para grandes desafios. A chave do sucesso não está em nossa força, mas em nossa conexão com Deus através de Sua Palavra.', aplicacao: 'Dedique tempo diário para meditar na Palavra de Deus antes de enfrentar os desafios do dia.' },
        { numero: 2, titulo: 'Atravessando o Jordão', texto: 'Josué 3:1-17', conteudo: 'O milagre da travessia do Jordão demonstra o poder de Deus e fortalece a fé do povo. Os sacerdotes deram o primeiro passo de fé antes que as águas se abrissem. Isso ensina que Deus espera nossa obediência antes de manifestar Seu poder.', aplicacao: 'Dê o primeiro passo de fé, mesmo quando o caminho não está claro.' },
        { numero: 3, titulo: 'A Queda de Jericó', texto: 'Josué 6:1-27', conteudo: 'A vitória em Jericó mostra que a obediência a Deus traz resultados sobrenaturais. O método de Deus parecia ilógico - marchar ao redor da cidade - mas a obediência trouxe vitória completa.', aplicacao: 'Confie nos métodos de Deus, mesmo quando não fazem sentido humano.' },
        { numero: 4, titulo: 'O Pecado de Acã', texto: 'Josué 7:1-26', conteudo: 'As consequências do pecado individual afetam toda a comunidade. Acã tomou do anátema e trouxe derrota para Israel. O pecado escondido sempre traz consequências.', aplicacao: 'Confesse e abandone pecados ocultos antes que afetem outros.' },
        { numero: 5, titulo: 'A Conquista de Ai', texto: 'Josué 8:1-29', conteudo: 'Após o arrependimento, Deus restaura e dá vitória. A segunda tentativa contra Ai foi bem-sucedida porque o pecado foi removido.', aplicacao: 'Nunca é tarde para recomeçar após o arrependimento genuíno.' },
        { numero: 6, titulo: 'O Engano dos Gibeonitas', texto: 'Josué 9:1-27', conteudo: 'A importância de buscar a orientação de Deus em todas as decisões. Israel fez aliança sem consultar a Deus e sofreu as consequências.', aplicacao: 'Busque a direção de Deus antes de tomar decisões importantes.' },
        { numero: 7, titulo: 'O Sol que Parou', texto: 'Josué 10:1-15', conteudo: 'Deus intervém de forma sobrenatural em favor de Seu povo. O milagre do sol parado mostra que nada é impossível para Deus.', aplicacao: 'Ore com ousadia, Deus pode fazer o impossível.' },
        { numero: 8, titulo: 'Conquista do Sul', texto: 'Josué 10:16-43', conteudo: 'Vitórias sucessivas demonstram a fidelidade de Deus. Cada vitória fortalece a fé para a próxima batalha.', aplicacao: 'Lembre-se das vitórias passadas quando enfrentar novos desafios.' },
        { numero: 9, titulo: 'Conquista do Norte', texto: 'Josué 11:1-23', conteudo: 'Completando a conquista da Terra Prometida. Deus cumpre todas as Suas promessas.', aplicacao: 'Confie que Deus completará a boa obra que começou em você.' },
        { numero: 10, titulo: 'Divisão da Terra', texto: 'Josué 13-21', conteudo: 'Cada tribo recebe sua herança conforme a promessa. Deus é justo e fiel em distribuir bênçãos.', aplicacao: 'Agradeça pela herança espiritual que você recebeu em Cristo.' },
        { numero: 11, titulo: 'Cidades de Refúgio', texto: 'Josué 20:1-9', conteudo: 'A misericórdia de Deus manifestada na provisão de proteção. As cidades de refúgio simbolizam Cristo, nosso refúgio.', aplicacao: 'Corra para Cristo quando estiver em perigo espiritual.' },
        { numero: 12, titulo: 'O Altar de Testemunho', texto: 'Josué 22:1-34', conteudo: 'Importância da unidade e comunicação entre irmãos. Mal-entendidos podem ser resolvidos com diálogo.', aplicacao: 'Busque entender antes de julgar seus irmãos.' },
        { numero: 13, titulo: 'Escolhei Hoje', texto: 'Josué 24:1-33', conteudo: 'O desafio final de Josué: servir ao Senhor com integridade. Cada pessoa deve fazer sua escolha pessoal.', aplicacao: 'Renove hoje seu compromisso de servir a Deus.' }
      ]
    },
    {
      id: 'genesis',
      titulo: 'Gênesis - O Livro dos Começos',
      trimestre: '2º Trimestre 2024',
      videoaulas: videoAulasCursos.biblicos,
      descricao: 'Explorando as origens da humanidade e as promessas de Deus',
      categoria: 'Escola Sabatina',
      tipo: 'Escola Sabatina',
      licoes: [
        { numero: 1, titulo: 'A Criação', texto: 'Gênesis 1-2', conteudo: 'Deus cria o universo em seis dias e descansa no sétimo. Cada dia da criação revela o caráter ordenado e amoroso de Deus. O ser humano é criado à imagem de Deus, com dignidade e propósito.', aplicacao: 'Reconheça que você foi criado com propósito divino.' },
        { numero: 2, titulo: 'A Queda', texto: 'Gênesis 3', conteudo: 'O pecado entra no mundo através da desobediência. A serpente questiona a Palavra de Deus, e o casal cede à tentação. As consequências são imediatas e devastadoras.', aplicacao: 'Resista às tentações que questionam a Palavra de Deus.' },
        { numero: 3, titulo: 'Caim e Abel', texto: 'Gênesis 4', conteudo: 'O primeiro homicídio revela a progressão do pecado. A oferta de Abel foi aceita por fé, enquanto Caim ofereceu por obrigação.', aplicacao: 'Adore a Deus com coração sincero, não por mera formalidade.' },
        { numero: 4, titulo: 'Noé e o Dilúvio', texto: 'Gênesis 6-9', conteudo: 'Deus julga o pecado mas preserva os fiéis. Noé encontrou graça aos olhos de Deus e obedeceu completamente.', aplicacao: 'Seja fiel a Deus mesmo quando todos ao redor estão errados.' },
        { numero: 5, titulo: 'A Torre de Babel', texto: 'Gênesis 11', conteudo: 'O orgulho humano leva à confusão. Deus frustra os planos de auto-exaltação.', aplicacao: 'Busque glorificar a Deus, não a si mesmo.' },
        { numero: 6, titulo: 'O Chamado de Abraão', texto: 'Gênesis 12', conteudo: 'Deus chama Abraão para uma jornada de fé. A obediência traz bênção não apenas para si, mas para todas as nações.', aplicacao: 'Responda prontamente ao chamado de Deus.' },
        { numero: 7, titulo: 'A Promessa a Abraão', texto: 'Gênesis 15', conteudo: 'Deus faz aliança com Abraão. A fé é contada como justiça.', aplicacao: 'Confie nas promessas de Deus, mesmo quando parecem impossíveis.' },
        { numero: 8, titulo: 'Sodoma e Gomorra', texto: 'Gênesis 18-19', conteudo: 'O juízo de Deus sobre o pecado é real. Ló é salvo por misericórdia.', aplicacao: 'Não se conforme com a cultura pecaminosa ao redor.' },
        { numero: 9, titulo: 'O Sacrifício de Isaque', texto: 'Gênesis 22', conteudo: 'Abraão demonstra fé suprema ao obedecer a Deus. Deus provê o sacrifício substituto.', aplicacao: 'Coloque Deus em primeiro lugar, acima de tudo.' },
        { numero: 10, titulo: 'Jacó e Esaú', texto: 'Gênesis 25-33', conteudo: 'Deus transforma Jacó, o enganador, em Israel, príncipe de Deus.', aplicacao: 'Permita que Deus transforme seu caráter.' },
        { numero: 11, titulo: 'José no Egito', texto: 'Gênesis 37-50', conteudo: 'Deus usa as adversidades para cumprir Seus propósitos. José permanece fiel em todas as circunstâncias.', aplicacao: 'Confie que Deus está no controle, mesmo nas dificuldades.' },
        { numero: 12, titulo: 'A Família de Jacó', texto: 'Gênesis 49', conteudo: 'As bênçãos proféticas de Jacó revelam o plano de Deus para Israel.', aplicacao: 'Reconheça que Deus tem um plano para sua família.' },
        { numero: 13, titulo: 'Lições de Gênesis', texto: 'Gênesis 1-50', conteudo: 'Revisão dos temas principais: criação, queda, redenção e promessa.', aplicacao: 'Viva à luz das promessas de Deus reveladas em Gênesis.' }
      ]
    },
    {
      id: 'salmos',
      titulo: 'Salmos - Canções de Fé',
      trimestre: '3º Trimestre 2024',
      videoaulas: videoAulasCursos.biblicos,
      descricao: 'Adoração, louvor e oração através dos Salmos',
      categoria: 'Escola Sabatina',
      tipo: 'Escola Sabatina',
      licoes: [
        { numero: 1, titulo: 'Introdução aos Salmos', texto: 'Salmo 1', conteudo: 'Os Salmos são o hinário de Israel e expressam toda gama de emoções humanas diante de Deus.', aplicacao: 'Use os Salmos em sua vida devocional.' },
        { numero: 2, titulo: 'Salmos de Louvor', texto: 'Salmos 145-150', conteudo: 'Louvar a Deus é nossa resposta natural à Sua bondade e grandeza.', aplicacao: 'Comece cada dia com louvor a Deus.' },
        { numero: 3, titulo: 'Salmos de Lamentação', texto: 'Salmo 13, 22', conteudo: 'É permitido expressar dor e angústia a Deus honestamente.', aplicacao: 'Seja honesto com Deus sobre seus sentimentos.' },
        { numero: 4, titulo: 'Salmos de Confiança', texto: 'Salmo 23, 91', conteudo: 'Deus é nosso pastor, protetor e refúgio seguro.', aplicacao: 'Descanse na proteção de Deus.' },
        { numero: 5, titulo: 'Salmos Messiânicos', texto: 'Salmo 22, 110', conteudo: 'Muitos salmos profetizam sobre o Messias vindouro.', aplicacao: 'Veja Cristo revelado nos Salmos.' },
        { numero: 6, titulo: 'Salmos de Sabedoria', texto: 'Salmo 1, 37', conteudo: 'Os salmos ensinam princípios para viver sabiamente.', aplicacao: 'Aplique a sabedoria dos Salmos em decisões diárias.' },
        { numero: 7, titulo: 'Salmos Históricos', texto: 'Salmo 78, 105', conteudo: 'Relembrar as obras de Deus fortalece nossa fé.', aplicacao: 'Conte para outros o que Deus fez por você.' },
        { numero: 8, titulo: 'Salmos de Arrependimento', texto: 'Salmo 32, 51', conteudo: 'O arrependimento genuíno traz restauração e alegria.', aplicacao: 'Confesse seus pecados e receba perdão.' },
        { numero: 9, titulo: 'Salmos da Lei', texto: 'Salmo 19, 119', conteudo: 'A Palavra de Deus é lâmpada e luz para nosso caminho.', aplicacao: 'Ame e obedeça a Palavra de Deus.' },
        { numero: 10, titulo: 'Salmos de Ação de Graças', texto: 'Salmo 100, 136', conteudo: 'Gratidão deve caracterizar o povo de Deus.', aplicacao: 'Cultive um coração grato.' },
        { numero: 11, titulo: 'Salmos de Peregrinação', texto: 'Salmo 120-134', conteudo: 'A jornada espiritual rumo a Deus.', aplicacao: 'Veja a vida como peregrinação para o céu.' },
        { numero: 12, titulo: 'Salmos de Reinado', texto: 'Salmo 93-99', conteudo: 'Deus reina sobre toda a criação.', aplicacao: 'Submeta-se ao reinado de Deus em sua vida.' },
        { numero: 13, titulo: 'Vivendo os Salmos', texto: 'Salmos 1-150', conteudo: 'Aplicação prática dos Salmos na vida cristã moderna.', aplicacao: 'Faça dos Salmos parte de sua adoração diária.' }
      ]
    }
  ],

  estudosTematicos: [
    {
      titulo: 'A Vida de Cristo',
      id: 'vida-cristo',
      categoria: 'Vida de Cristo',
      descricao: 'Um estudo aprofundado sobre o ministério, os ensinamentos e a obra de Jesus Cristo.',
      tipo: 'Estudos Temáticos',
      videoaulas: [
        { numero: 1, titulo: 'A Divindade de Cristo', videoId: '6-ZeZVog1Ig', duracao: '15 min' },
        { numero: 2, titulo: 'O Nascimento e a Infância', videoId: 'veDz4rYQDcI', duracao: '12 min' },
        { numero: 3, titulo: 'O Batismo e a Tentação', videoId: 'PVWHRMIyElA', duracao: '18 min' },
        { numero: 4, titulo: 'Os Ensinamentos de Jesus', videoId: 'VaLiCMwemYU', duracao: '10 min' },
        { numero: 5, titulo: 'Os Milagres e a Compaixão', videoId: 'vi6pv5yTJiQ', duracao: '14 min' },
        { numero: 6, titulo: 'A Morte e a Ressurreição', videoId: 'SgAijm_NXcA', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'O Verbo que se Fez Carne', conteudo: 'A preexistência e encarnação de Jesus.' },
        { numero: 2, titulo: 'O Exemplo de Serviço', conteudo: 'O ministério de Cristo como modelo.' },
      ],
    },
    {
      titulo: 'Profecias de Daniel',
      id: 'profecias-daniel',
      categoria: 'Profecia',
      descricao: 'Um estudo detalhado das profecias de Daniel e seu cumprimento histórico.',
      tipo: 'Estudos Temáticos',
      videoaulas: [
        { numero: 1, titulo: 'A Estátua e os Reinos', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'As 70 Semanas', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'O Santuário e a Purificação', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'O Chifre Pequeno', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'O Tempo do Fim', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'A Ressurreição', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'A Estátua de Nabucodonosor', conteudo: 'Os quatro grandes impérios mundiais.' },
        { numero: 2, titulo: 'As Setenta Semanas', conteudo: 'A profecia sobre a vinda do Messias.' },
      ],
    },
    {
      titulo: 'Doutrinas Fundamentais',
      id: 'doutrinas-fundamentais',
      categoria: 'Doutrina',
      descricao: 'Estudo das 28 Crenças Fundamentais da Igreja Adventista do Sétimo Dia.',
      tipo: 'Estudos Temáticos',
      videoaulas: [
        { numero: 1, titulo: 'A Bíblia e a Palavra de Deus', videoId: 'N53mrt5K7Tc', duracao: '15 min' },
        { numero: 2, titulo: 'A Trindade e a Divindade', videoId: 'D8HL7tjwgrQ', duracao: '12 min' },
        { numero: 3, titulo: 'O Sábado e a Lei de Deus', videoId: 'mCcI3oE-86E', duracao: '18 min' },
        { numero: 4, titulo: 'A Volta de Cristo', videoId: 'M8fyFcYcZbc', duracao: '10 min' },
        { numero: 5, titulo: 'O Juízo Investigativo', videoId: '0KGDgbYNuWE', duracao: '14 min' },
        { numero: 6, titulo: 'O Estado do Homem na Morte', videoId: 'D8HL7tjwgrQ', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'As Escrituras Sagradas', conteudo: 'A Bíblia como única regra de fé e prática.' },
        { numero: 2, titulo: 'O Deus Trino', conteudo: 'Pai, Filho e Espírito Santo.' },
      ],
    }
  ],

  personagensBiblicos: [
    {
      titulo: 'O Apóstolo Paulo',
      id: 'apostolo-paulo',
      categoria: 'Líderes',
      descricao: 'Estudo sobre a vida, conversão e as viagens missionárias do Apóstolo Paulo.',
      tipo: 'Personagens Bíblicos',
      videoaulas: [
        { numero: 1, titulo: 'A Conversão de Saulo', videoId: '5MNAkKKRx4M', duracao: '10 min' },
        { numero: 2, titulo: 'Cronologia da Vida de Paulo', videoId: 'Y5tHHpgoY7c', duracao: '15 min' },
        { numero: 3, titulo: 'Paulo no Poder do Espírito', videoId: 'jS16ICNOrLo', duracao: '12 min' },
        { numero: 4, titulo: 'A Segunda Viagem Missionária', videoId: 'Kw4LSfc0s44', duracao: '18 min' },
        { numero: 5, titulo: 'As Aflições de um Apóstolo', videoId: 'bqhBoPKFhHE', duracao: '14 min' },
        { numero: 6, titulo: 'Instruções Finais aos Gálatas', videoId: 'Kw4LSfc0s44', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'De Perseguidor a Apóstolo', conteudo: 'O impacto da conversão de Paulo.' },
        { numero: 2, titulo: 'O Evangelho da Graça', conteudo: 'A mensagem central das cartas paulinas.' },
      ],
    },
    {
      titulo: 'José do Egito: Lições de Fé e Perdão',
      id: 'jose-egito',
      categoria: 'Patriarcas',
      descricao: 'A história de José, desde a cisterna até o palácio, e suas lições de fidelidade e perdão.',
      tipo: 'Personagens Bíblicos',
      videoaulas: [
        { numero: 1, titulo: 'O Sonhador e a Túnica', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'Vendido como Escravo', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'Fidelidade na Prisão', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'Do Cárcere ao Palácio', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'O Reencontro com os Irmãos', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'O Perdão e a Provisão', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'Sonhos e Inveja', conteudo: 'Os sonhos de José e a reação de seus irmãos.' },
        { numero: 2, titulo: 'Fidelidade em Meio à Provação', conteudo: 'A integridade de José na casa de Potifar e na prisão.' },
      ],
    },
    {
      titulo: 'Mulheres da Bíblia',
      id: 'mulheres-biblia',
      categoria: 'Mulheres da Bíblia',
      descricao: 'Histórias inspiradoras de fé, coragem e liderança de mulheres na Bíblia.',
      tipo: 'Personagens Bíblicos',
      videoaulas: [
        { numero: 1, titulo: 'Miriã: Uma Líder Nata', videoId: 'DIyEwXrELHc', duracao: '10 min' },
        { numero: 2, titulo: 'Ester: Coragem e Propósito', videoId: 'rDLwnL8ePAc', duracao: '15 min' },
        { numero: 3, titulo: 'A Mulher de Noé: Lições de Obediência', videoId: 'TtaxuBNCDQY', duracao: '12 min' },
        { numero: 4, titulo: 'Maria: A Serva do Senhor', videoId: 'BuLOkQdLA70', duracao: '18 min' },
        { numero: 5, titulo: 'Débora: Juíza e Profetisa', videoId: 'rDLwnL8ePAc', duracao: '14 min' },
        { numero: 6, titulo: 'Ana: O Poder da Oração', videoId: 'DIyEwXrELHc', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'Liderança Feminina', conteudo: 'O papel das mulheres na história da salvação.' },
        { numero: 2, titulo: 'Fé em Meio à Adversidade', conteudo: 'Exemplos de perseverança.' },
      ],
    }
  ],

  livrosBiblia: [
    {
      titulo: 'Gênesis: O Livro das Origens',
      id: 'genesis',
      categoria: 'Antigo Testamento',
      descricao: 'Estudo detalhado do livro de Gênesis, explorando a Criação, a Queda e o início da história da salvação.',
      tipo: 'Livros da Bíblia',
      videoaulas: [
        { numero: 1, titulo: 'A Criação e o Éden (Cap. 1-2)', videoId: 'N3l8IghjBZE', duracao: '15 min' },
        { numero: 2, titulo: 'A Queda e a Promessa (Cap. 3)', videoId: '1jWBAGGBYGE', duracao: '12 min' },
        { numero: 3, titulo: 'Noé e o Dilúvio (Cap. 6-9)', videoId: 'BHznFyJLTn0', duracao: '18 min' },
        { numero: 4, titulo: 'A Torre de Babel (Cap. 11)', videoId: '8Ufbn5ePcj0', duracao: '10 min' },
        { numero: 5, titulo: 'O Chamado de Abraão (Cap. 12)', videoId: 'N3l8IghjBZE', duracao: '14 min' },
        { numero: 6, titulo: 'A História de José (Cap. 37-50)', videoId: '1jWBAGGBYGE', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'As Origens', conteudo: 'O relato da Criação e sua importância.' },
        { numero: 2, titulo: 'As Alianças de Deus', conteudo: 'A aliança com Noé e Abraão.' },
      ],
    },
    {
      titulo: 'Apocalipse: A Revelação de Jesus Cristo',
      id: 'apocalipse',
      categoria: 'Profecia',
      descricao: 'Desvende o último livro da Bíblia e compreenda o plano de Deus para o fim dos tempos.',
      tipo: 'Livros da Bíblia',
      videoaulas: [
        { numero: 1, titulo: 'A Visão do Trono (Cap. 4 e 5)', videoId: '7Xyy6uxZQt8', duracao: '15 min' },
        { numero: 2, titulo: 'Os Sete Selos (Cap. 6)', videoId: '4RcB48ER5j4', duracao: '12 min' },
        { numero: 3, titulo: 'As Sete Trombetas', videoId: '7wpDynHx1yM', duracao: '18 min' },
        { numero: 4, titulo: 'A Mulher e o Dragão (Cap. 12)', videoId: '7Xyy6uxZQt8', duracao: '10 min' },
        { numero: 5, titulo: 'A Marca da Besta (Cap. 13)', videoId: '4RcB48ER5j4', duracao: '14 min' },
        { numero: 6, titulo: 'A Nova Terra (Cap. 21 e 22)', videoId: '7wpDynHx1yM', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'O Propósito do Apocalipse', conteudo: 'Entendendo a mensagem central do livro.' },
        { numero: 2, titulo: 'As Sete Igrejas', conteudo: 'Mensagens para a igreja em todas as eras.' },
      ],
    },
    {
      titulo: 'Evangelho de João: A Divindade de Cristo',
      id: 'evangelho-joao',
      categoria: 'Novo Testamento',
      descricao: 'Estudo do Evangelho que mais enfatiza a divindade de Jesus.',
      tipo: 'Livros da Bíblia',
      videoaulas: [
        { numero: 1, titulo: 'O Verbo se Fez Carne', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'As Bodas de Caná', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'O Encontro com Nicodemos', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'A Mulher Samaritana', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'A Ressurreição de Lázaro', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'A Última Ceia e o Lava-pés', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'Eu Sou o Pão da Vida', conteudo: 'Jesus como sustento espiritual.' },
        { numero: 2, titulo: 'Eu Sou a Luz do Mundo', conteudo: 'Jesus como guia na escuridão.' },
      ],
    }
  ],

  financas: [
    {
      titulo: 'Mordomia Financeira Cristã',
      id: 'mordomia-financeira',
      categoria: 'Finanças',
      descricao: 'Princípios bíblicos de mordomia e gestão financeira para uma vida de contentamento e generosidade.',
      tipo: 'Finanças',
      videoaulas: [
        { numero: 1, titulo: 'O Princípio da Mordomia', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'Dízimos e Ofertas', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'Como Sair das Dívidas', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'Planejamento Financeiro Familiar', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'Investindo com Propósito', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'O Contentamento', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'Tudo é de Deus', conteudo: 'Reconhecendo a soberania de Deus sobre nossos bens.' },
        { numero: 2, titulo: 'O Dízimo como Teste de Fidelidade', conteudo: 'A importância de devolver a Deus o que Lhe pertence.' },
      ],
    }
  ],
  relacionamentos: [
    {
      titulo: 'Construindo Vínculos Saudáveis',
      id: 'vinculos-saudaveis',
      categoria: 'Relacionamentos',
      descricao: 'Aprenda a estabelecer e manter relacionamentos saudáveis e duradouros, baseados em princípios cristãos.',
      tipo: 'Relacionamentos',
      videoaulas: [
        { numero: 1, titulo: 'A Arte de Ouvir', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'Comunicação Não-Violenta', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'Perdão e Reconciliação', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'Lidando com Conflitos', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'O Amor Ágape', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'Amizades com Propósito', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'O Fundamento do Amor', conteudo: 'O amor de Deus como base de todo relacionamento.' },
        { numero: 2, titulo: 'O Poder da Empatia', conteudo: 'Colocando-se no lugar do outro.' },
      ],
    }
  ],
  familia: [
    {
      titulo: 'Fortalecendo os Laços Familiares',
      id: 'fortalecendo-familia',
      categoria: 'Família',
      descricao: 'Estratégias e princípios para construir um lar sólido e feliz, seguindo o modelo bíblico.',
      tipo: 'Família',
      videoaulas: [
        { numero: 1, titulo: 'O Propósito do Casamento', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'Educação de Filhos com Princípios', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'A Comunicação no Lar', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'O Culto Familiar', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'Gerenciando as Finanças Familiares', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'Tempo de Qualidade', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'O Plano Original de Deus', conteudo: 'O casamento como instituição divina.' },
        { numero: 2, titulo: 'A Responsabilidade dos Pais', conteudo: 'Criando filhos no caminho do Senhor.' },
      ],
    }
  ],
  vidaCrista: [
    {
      titulo: 'Cresça em sua Jornada Espiritual',
      id: 'jornada-espiritual',
      categoria: 'Vida Cristã',
      descricao: 'Aprofunde sua fé e desenvolva hábitos espirituais que o levarão a um relacionamento mais íntimo com Deus.',
      tipo: 'Vida Cristã',
      videoaulas: [
        { numero: 1, titulo: 'O Poder da Oração', videoId: 'bwZW8scYt3g', duracao: '15 min' },
        { numero: 2, titulo: 'Estudo Diário da Bíblia', videoId: 'rURhzzBRdAE', duracao: '12 min' },
        { numero: 3, titulo: 'Testemunho e Missão', videoId: 'iJy_wStI0RI', duracao: '18 min' },
        { numero: 4, titulo: 'Como Vencer a Tentação', videoId: 'Wto3csK-nw8', duracao: '10 min' },
        { numero: 5, titulo: 'O Fruto do Espírito', videoId: 'p_KW206p7eA', duracao: '14 min' },
        { numero: 6, titulo: 'A Esperança da Volta de Jesus', videoId: 'MUQH7h9AgSk', duracao: '16 min' },
      ],
      licoes: [
        { numero: 1, titulo: 'A Disciplina Espiritual', conteudo: 'A importância de hábitos regulares de devoção.' },
        { numero: 2, titulo: 'O Poder do Espírito Santo', conteudo: 'Vivendo uma vida cheia do Espírito.' },
      ],
    }
  ]
}
