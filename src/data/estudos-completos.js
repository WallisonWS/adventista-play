import { bibliaExemplo } from './biblia-exemplo'
import { videoAulasCursos } from './video-aulas-cursos'



export const estudosCompletos = {
  // Cursos da Escola Sabatina (usando Estudos Bíblicos)
  escolaSabatina: [
    {
      id: 'escola-sabatina-adultos',
      titulo: 'Lição da Escola Sabatina',
      descricao: 'Estudo aprofundado da Bíblia, trimestralmente.',
      capitulos: 13,
      videoaulas: videoAulasCursos.estudosBiblicos,
      // ... outros campos
    },
    {
      id: 'escola-sabatina-jovens',
      titulo: 'Lição da Escola Sabatina Jovem',
      descricao: 'Estudo da Bíblia focado em temas relevantes para a juventude.',
      capitulos: 13,
      videoaulas: videoAulasCursos.estudosBiblicos,
      // ... outros campos
    },
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

  // Estudos Temáticos
  estudosTematicos: [
    {
      id: 'profecias-daniel',
      titulo: 'Profecias de Daniel',
      descricao: 'Desvende as profecias do livro de Daniel e sua relevância para os dias atuais.',
      capitulos: 6,
      videoaulas: videoAulasCursos.profeciasDaniel,
      // ... outros campos
    },
    {
      id: 'vida-cristo',
      titulo: 'A Vida de Cristo',
      descricao: 'Um estudo detalhado sobre a vida, ministério e ensinamentos de Jesus.',
      capitulos: 6,
      videoaulas: videoAulasCursos.vidaCristo,
      // ... outros campos
    },
    {
      id: 'doutrina-essencial',
      titulo: 'Doutrina Cristã Essencial',
      descricao: 'Fundamentos da fé cristã e crenças distintivas da Igreja Adventista.',
      capitulos: 6,
      videoaulas: videoAulasCursos.doutrinaEssencial,
      // ... outros campos
    }
  ],

  // Personagens Bíblicos
  personagensBiblicos: [
    {
      id: 'jose-egito',
      titulo: 'José do Egito',
      descricao: 'A história de fé, perdão e providência de José, filho de Jacó.',
      capitulos: 6,
      videoaulas: videoAulasCursos.joseEgito,
      // ... outros campos
    },
    {
      id: 'apostolo-paulo',
      titulo: 'O Apóstolo Paulo',
      descricao: 'A vida e o legado do maior missionário do cristianismo primitivo.',
      capitulos: 6,
      videoaulas: videoAulasCursos.apostoloPaulo,
      // ... outros campos
    },
    {
      id: 'mulheres-biblia',
      titulo: 'Mulheres da Bíblia',
      descricao: 'Estudo sobre a vida e o impacto de mulheres importantes nas Escrituras.',
      capitulos: 6,
      videoaulas: videoAulasCursos.mulheresBiblia,
      // ... outros campos
    },
    {
      id: 'reis-israel',
      titulo: 'Reis de Israel e Judá',
      descricao: 'Análise do reinado e das lições dos reis do Antigo Testamento.',
      capitulos: 6,
      videoaulas: videoAulasCursos.reisIsrael,
      // ... outros campos
    }
  ],

  // Livros da Bíblia
  livrosBiblia: [
    {
      id: 'evangelho-joao',
      titulo: 'Evangelho de João',
      descricao: 'O Evangelho que revela a divindade de Cristo e o caminho para a vida eterna.',
      capitulos: 6,
      videoaulas: videoAulasCursos.evangelhoJoao,
      // ... outros campos
    },
    {
      id: 'apocalipse',
      titulo: 'Apocalipse',
      descricao: 'Desvendando as mensagens de esperança e o futuro revelado no último livro da Bíblia.',
      capitulos: 6,
      videoaulas: videoAulasCursos.apocalipse,
      // ... outros campos
    },
    {
      id: 'genesis',
      titulo: 'Gênesis: O Livro das Origens',
      descricao: 'Estudo dos primeiros capítulos da Bíblia: criação, queda e o início da história da salvação.',
      capitulos: 6,
      videoaulas: videoAulasCursos.genesis,
      // ... outros campos
    },
    {
      id: 'romanos-justica',
      titulo: 'Romanos: O Evangelho da Justiça de Deus',
      descricao: 'Estudo da epístola de Paulo que define a doutrina da justificação pela fé.',
      capitulos: 6,
      videoaulas: videoAulasCursos.romanos,
      // ... outros campos
    }
  ],

  // Finanças
  financas: [
    {
      id: 'mordomia-financeira',
      titulo: 'Mordomia Financeira',
      descricao: 'Princípios bíblicos de mordomia e gestão financeira para uma vida de contentamento e generosidade.',
      capitulos: 6,
      videoaulas: videoAulasCursos.financas,
      // ... outros campos
    }
  ],

  // Relacionamentos
  relacionamentos: [
    {
      id: 'vinculos-saudaveis',
      titulo: 'Construindo Vínculos Saudáveis',
      descricao: 'Aprenda a estabelecer e manter relacionamentos saudáveis e duradouros, baseados em princípios cristãos.',
      capitulos: 6,
      videoaulas: videoAulasCursos.relacionamentos,
      // ... outros campos
    }
  ],

  // Família
  familia: [
    {
      id: 'lacos-familiares',
      titulo: 'Fortalecendo os Laços Familiares',
      descricao: 'Estratégias e princípios para construir um lar sólido e feliz, seguindo o modelo bíblico.',
      capitulos: 6,
      videoaulas: videoAulasCursos.familia,
      // ... outros campos
    }
  ],

  // Vida Cristã
  vidaCrista: [
    {
      id: 'jornada-espiritual',
      titulo: 'Cresça em sua Jornada Espiritual',
      descricao: 'Aprofunde sua fé e desenvolva hábitos espirituais que o levarão a um relacionamento mais íntimo com Deus.',
      capitulos: 6,
      videoaulas: videoAulasCursos.vidaCrista,
      // ... outros campos
    }
  ],
}

