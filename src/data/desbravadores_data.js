export const classesDesbravadores = [
    {
        id: 'amigo',
        nome: 'Amigo',
        idade: 10,
        cor: 'bg-blue-600',
        logo: 'https://mda.wiki.br/wp-content/uploads/2016/08/Amigo-300x300.png',
        secoes: [
            {
                titulo: "I. Gerais",
                itens: [
                    "Ter no mínimo 10 anos de idade.",
                    "Ser membro ativo do Clube de Desbravadores.",
                    "Memorizar e explicar o Voto e a Lei do Desbravador.",
                    "Ler o livro do Clube de Leitura do ano.",
                    "Ler o livro 'Pela Graça de Deus'."
                ]
            },
            {
                titulo: "II. Descoberta Espiritual",
                itens: [
                    "Memorizar os livros do Antigo Testamento e saber os grupos.",
                    "Ler os Evangelhos de Mateus e Marcos.",
                    "Discutir como Jesus salvava as pessoas.",
                    "Memorizar e explicar Salmo 23 ou 46."
                ]
            },
            {
                titulo: "III. Servindo a Outros",
                itens: [
                    "Dedicar duas horas ajudando alguém necessitado.",
                    "Participar de um projeto comunitário."
                ]
            },
            {
                titulo: "IV. Desenvolvimento da Amizade",
                itens: [
                    "Mencionar dez boas qualidades de um bom amigo.",
                    "Conversar sobre o respeito aos pais e autoridades."
                ]
            },
            {
                titulo: "V. Saúde e Aptidão Física",
                itens: [
                    "Completar a especialidade de Natação Principiante I.",
                    "Fazer uma caminhada de 3 km em uma hora.",
                    "Discutir os princípios de uma dieta saudável (Gênesis 1:29)."
                ]
            },
            {
                titulo: "VI. Estudo da Natureza",
                itens: [
                    "Completar uma especialidade em Gatos, Cães, Mamíferos ou Sementes.",
                    "Identificar 5 estrelas ou constelações.",
                    "Conhecer diferentes tipos de nuvens."
                ]
            },
            {
                titulo: "VII. Arte de Acampar",
                itens: [
                    "Saber fazer e usar nó direito, simples, cego e lais de guia.",
                    "Passar uma noite em acampamento.",
                    "Conhecer 10 regras de segurança em caminhadas."
                ]
            }
        ]
    },
    {
        id: 'companheiro',
        nome: 'Companheiro',
        idade: 11,
        cor: 'bg-red-600',
        logo: 'https://mda.wiki.br/wp-content/uploads/2016/08/Companheiro-300x300.png',
        secoes: [
            {
                titulo: "I. Gerais",
                itens: [
                    "Ter no mínimo 11 anos de idade.",
                    "Memorizar e explicar o Hino dos Desbravadores.",
                    "Ler o livro do Clube de Leitura do ano."
                ]
            },
            {
                titulo: "II. Descoberta Espiritual",
                itens: [
                    "Memorizar os livros do Novo Testamento.",
                    "Ler os Evangelhos de Lucas e João.",
                    "Discutir as Bem-Aventuranças."
                ]
            },
            {
                titulo: "III. Servindo a Outros",
                itens: [
                    "Planejar uma festa para um amigo deficiente ou idoso.",
                    "Participar de um projeto de limpeza comunitária."
                ]
            },
            {
                titulo: "IV. Estudo da Natureza",
                itens: [
                    "Identificar 7 árvores e 7 pássaros locais.",
                    "Observar a natureza e encontrar 3 lições de Jesus."
                ]
            },
            {
                titulo: "V. Arte de Acampar",
                itens: [
                    "Preparar uma refeição ao ar livre sem utensílios.",
                    "Saber usar uma bússola e um mapa.",
                    "Participar de uma caminhada de 8 km."
                ]
            }
        ]
    },
    {
        id: 'pesquisador',
        nome: 'Pesquisador',
        idade: 12,
        cor: 'bg-green-600',
        logo: 'https://mda.wiki.br/wp-content/uploads/2016/08/Pesquisador-300x300.png',
        secoes: [
            {
                titulo: "I. Gerais",
                itens: ["Ter 12 anos", "Decorar o Salmo 23", "Ler o livro do ano"]
            },
            {
                titulo: "II. Descoberta Espiritual",
                itens: ["Ler Atos dos Apóstolos", "Estudar a vida de Paulo"]
            },
            {
                titulo: "III. Arte de Acampar",
                itens: ["Fazer fogo sem fósforo", "Nós avançados", "Pernoite em abrigo improvisado"]
            }
        ]
    },
    {
        id: 'pioneiro',
        nome: 'Pioneiro',
        idade: 13,
        cor: 'bg-gray-600',
        logo: 'https://mda.wiki.br/wp-content/uploads/2016/08/Pioneiro-300x300.png',
        secoes: [
            { titulo: "I. Gerais", itens: ["Ter 13 anos", "Especialidade de Mapa e Bússola"] },
            { titulo: "II. Vida na Natureza", itens: ["Construir móvel de acampamento", "Projeto comunitário"] }
        ]
    },
    {
        id: 'excursionista',
        nome: 'Excursionista',
        idade: 14,
        cor: 'bg-purple-600',
        logo: 'https://mda.wiki.br/wp-content/uploads/2016/08/Excursionista-300x300.png',
        secoes: [
            { titulo: "I. Gerais", itens: ["Ter 14 anos", "Liderar unidade", "Primeiros Socorros"] },
            { titulo: "II. Vida na Natureza", itens: ["Cozinhar 3 refeições ao ar livre", "Caminhada de 20km"] }
        ]
    },
    {
        id: 'guia',
        nome: 'Guia',
        idade: 15,
        cor: 'bg-yellow-500',
        logo: 'https://mda.wiki.br/wp-content/uploads/2016/08/Guia-300x300.png',
        secoes: [
            { titulo: "I. Gerais", itens: ["Ter 15 anos", "Mestrado em Vida Campestre", "Batismo"] },
            { titulo: "II. Liderança", itens: ["Liderar grupo em evento", "Estudar história da igreja"] }
        ]
    }
];

const commonTeachingContent = {
    titulo: "Conteúdo Prático",
    itens: [
        { pergunta: "Requisito 1: O que é necessário?", resposta: "Completar a parte teórica e prática com o instrutor." },
        { pergunta: "Requisito 2: Atividade Prática", resposta: "Demonstrar habilidade na área específica." }
    ]
};

export const especialidades = [
    {
        id: 'adra',
        nome: 'ADRA',
        icon: 'hand-heart',
        cor: 'text-blue-500',
        conteudoEnsino: {
            titulo: "Avaliação e Ajuda Comunitária",
            itens: [
                { pergunta: "1. O que significa a sigla ADRA?", resposta: "Agência Adventista de Desenvolvimento e Recursos Assistenciais." },
                { pergunta: "2. Qual o propósito da ADRA?", resposta: "Servir a humanidade para que todos vivam como Deus planejou." },
                { pergunta: "3. Cite 3 tipos de projetos.", resposta: "Segurança Alimentar, Educação Básica e Saúde Primária." }
            ]
        }
    },
    {
        id: 'felinos',
        nome: 'Felinos',
        icon: 'cat',
        cor: 'text-orange-500',
        conteudoEnsino: {
            titulo: "Estudo da Natureza: Felinos",
            itens: [
                { pergunta: "1. Família dos gatos?", resposta: "Felidae." },
                { pergunta: "2. Diferença de patas cães/gatos?", resposta: "Gatos têm garras retráteis." },
                { pergunta: "3. 4 Grandes Felinos?", resposta: "Leão, Tigre, Onça, Leopardo." }
            ]
        }
    },
    {
        id: 'prim_soc',
        nome: 'Primeiros Socorros',
        icon: 'medkit',
        cor: 'text-red-500',
        conteudoEnsino: {
            titulo: "Saúde e Segurança",
            itens: [
                { pergunta: "1. Definição?", resposta: "Cuidados imediatos antes da ajuda médica." },
                { pergunta: "2. Regra ABC?", resposta: "Airway, Breathing, Circulation." },
                { pergunta: "3. Sangramento Nasal?", resposta: "Inclinar frente, pressionar narinas." }
            ]
        }
    },
    {
        id: 'artes',
        nome: 'Artes Manuais',
        icon: 'palette',
        cor: 'text-purple-500',
        conteudoEnsino: {
            titulo: "Habilidades Manuais",
            itens: [
                { pergunta: "1. Segurança", resposta: "Sempre usar ferramentas corretas e proteção." },
                { pergunta: "2. Materiais", resposta: "Conhecer tipos de tintas, papéis ou tecidos." },
                { pergunta: "3. Prática", resposta: "Fazer um item artesanal completo." }
            ]
        }
    },
    {
        id: 'agric',
        nome: 'Agricultura',
        icon: 'sprout',
        cor: 'text-green-600',
        conteudoEnsino: {
            titulo: "Cultivo e Terra",
            itens: [
                { pergunta: "1. Solo", resposta: "Diferenciar terra preta de argilosa." },
                { pergunta: "2. Plantio", resposta: "Saber plantar uma hortaliça e cuidar até a colheita." },
                { pergunta: "3. Ferramentas", resposta: "Uso correto de enxada e rastelo." }
            ]
        }
    },
    {
        id: 'missi',
        nome: 'Missionárias',
        icon: 'cross',
        cor: 'text-red-600',
        conteudoEnsino: {
            titulo: "Evangelismo",
            itens: [
                { pergunta: "1. Grande Comissão", resposta: "Ide por todo mundo (Mateus 28)." },
                { pergunta: "2. Testemunho", resposta: "Contar sua história pessoal com Jesus." },
                { pergunta: "3. Ação", resposta: "Participar de um projeto comunitário ou distribuição de livros." }
            ]
        }
    },
    {
        id: 'prof',
        nome: 'Profissões',
        icon: 'briefcase',
        cor: 'text-gray-500',
        conteudoEnsino: {
            titulo: "Vocação",
            itens: [
                { pergunta: "1. Ética", resposta: "Honestidade e pontualidade no trabalho." },
                { pergunta: "2. Entrevista", resposta: "Conversar com um profissional da área desejada." },
                { pergunta: "3. Educação", resposta: "Saber qual formação é necessária." }
            ]
        }
    },
    {
        id: 'cienc',
        nome: 'Ciência',
        icon: 'flask',
        cor: 'text-teal-500',
        conteudoEnsino: {
            titulo: "Descoberta",
            itens: [
                { pergunta: "1. Método Científico", resposta: "Observação, Hipótese, Experimento, Conclusão." },
                { pergunta: "2. Criação", resposta: "Relacionar ciência com o Criador." },
                { pergunta: "3. Experimento", resposta: "Demonstrar um princípio físico ou químico." }
            ]
        }
    },
    {
        id: 'domes',
        nome: 'Domésticas',
        icon: 'home',
        cor: 'text-orange-500',
        conteudoEnsino: {
            titulo: "Lar e Família",
            itens: [
                { pergunta: "1. Organização", resposta: "Manter quarto e armários arrumados." },
                { pergunta: "2. Culinária", resposta: "Preparar um prato simples e saudável." },
                { pergunta: "3. Limpeza", resposta: "Ajudar na limpeza geral da casa por 1 semana." }
            ]
        }
    },
    {
        id: 'recre',
        nome: 'Recreação',
        icon: 'bike',
        cor: 'text-yellow-500',
        conteudoEnsino: {
            titulo: "Físico",
            itens: [
                { pergunta: "1. Fair Play", resposta: "Respeitar regras e adversários." },
                { pergunta: "2. Exercício", resposta: "Praticar atividade física 3x na semana." },
                { pergunta: "3. Liderança", resposta: "Organizar um jogo para a unidade." }
            ]
        }
    }
];

export const ideais = {
    voto: "Pela graça de Deus, serei puro, bondoso e leal. Guardarei a Lei do Desbravador, serei servo de Deus e amigo de todos.",
    lei: [
        "Observar a devoção matinal",
        "Cumprir fielmente a parte que me corresponde",
        "Cuidar de meu corpo",
        "Manter a consciência limpa",
        "Ser cortês e obediente",
        "Andar com reverência na casa de Deus",
        "Ter sempre um cântico no coração",
        "Ir aonde Deus mandar"
    ]
};
