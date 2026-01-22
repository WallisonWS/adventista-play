export const cursos = [
    {
        id: 1,
        titulo: "Apocalipse Revelado",
        categoria: "Profecia",
        instrutor: "Pr. Luís Gonçalves",
        duracao: "18 aulas",
        progresso: 0,
        imagem: "https://images.unsplash.com/photo-1628510118714-d2124aea0b5c?q=80&w=1600&auto=format&fit=crop", // Dramatic sky/Apocalyptic vibe
        aulas: [
            { id: 1, titulo: "O Início do Fim", duracao: "45 min" },
            { id: 2, titulo: "As 7 Igrejas", duracao: "50 min" },
            { id: 3, titulo: "Os 7 Selos", duracao: "48 min" }
        ]
    },
    {
        id: 2,
        titulo: "Culinária Saudável",
        categoria: "Saúde",
        instrutor: "Dra. Sandra",
        duracao: "12 aulas",
        progresso: 30,
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop", // Healthy food
        aulas: [
            { id: 1, titulo: "Café da Manhã Ideal", duracao: "20 min" },
            { id: 2, titulo: "Substituindo o Açúcar", duracao: "25 min" }
        ]
    },
    {
        id: 3,
        titulo: "Finanças para Casais",
        categoria: "Família",
        instrutor: "Pr. Jorge",
        duracao: "8 aulas",
        progresso: 0,
        imagem: "https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=1600&auto=format&fit=crop", // Finance/Couple
        aulas: [
            { id: 1, titulo: "Orçamento Familiar", duracao: "35 min" },
            { id: 2, titulo: "Dívidas: Como Sair", duracao: "40 min" }
        ]
    },
    {
        id: 4,
        titulo: "Doutrinas Bíblicas",
        categoria: "Bíblia",
        instrutor: "Pr. Bullón",
        duracao: "28 aulas",
        progresso: 10,
        imagem: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1600&auto=format&fit=crop", // Bible study
        aulas: [
            { id: 1, titulo: "A Palavra de Deus", duracao: "55 min" },
            { id: 2, titulo: "A Trindade", duracao: "60 min" }
        ]
    }
];

export const categoriasCursos = ["Todos", "Bíblia", "Profecia", "Saúde", "Família", "Liderança"];
