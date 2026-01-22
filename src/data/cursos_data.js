export const cursos = [
    {
        id: 1,
        titulo: "Apocalipse Revelado",
        autor: "Pr. Luís Gonçalves",
        instrutor: "Pr. Luís Gonçalves",
        categoria: "Profecia",
        imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000&auto=format&fit=crop",
        progresso: 45,
        totalAulas: 12,
        duracao: "6h 30m",
        videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
        aulas: [
            { id: 1, titulo: "O Início do Fim", duracao: "45 min" },
            { id: 2, titulo: "As 7 Igrejas", duracao: "50 min" },
            { id: 3, titulo: "Os 7 Selos", duracao: "48 min" }
        ]
    },
    {
        id: 2,
        titulo: "Família Restaurada",
        autor: "Pr. Adolfo Suárez",
        instrutor: "Pr. Adolfo Suárez",
        categoria: "Família",
        imagem: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000&auto=format&fit=crop",
        progresso: 10,
        totalAulas: 8,
        duracao: "4h 15m",
        videoUrl: "https://www.youtube.com/embed/tlwwp1iLbIU",
        aulas: [
            { id: 1, titulo: "Comunicação no Lar", duracao: "35 min" },
            { id: 2, titulo: "Educando Filhos", duracao: "40 min" }
        ]
    },
    {
        id: 3,
        titulo: "Saúde Total",
        autor: "Dra. Rosana",
        instrutor: "Dra. Rosana",
        categoria: "Saúde",
        imagem: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1000&auto=format&fit=crop",
        progresso: 0,
        totalAulas: 15,
        duracao: "8h 00m",
        videoUrl: "https://www.youtube.com/embed/3a-2D5H8FzU",
        aulas: [
            { id: 1, titulo: "Os 8 Remédios", duracao: "20 min" },
            { id: 2, titulo: "Alimentação Viva", duracao: "25 min" }
        ]
    },
    {
        id: 4,
        titulo: "Doutrinas Bíblicas",
        autor: "Pr. Bullón",
        instrutor: "Pr. Bullón",
        categoria: "Bíblia",
        imagem: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000&auto=format&fit=crop",
        progresso: 80,
        totalAulas: 20,
        duracao: "12h 45m",
        videoUrl: "https://www.youtube.com/embed/1y88q6f_0vQ",
        aulas: [
            { id: 1, titulo: "A Inspiração da Bíblia", duracao: "55 min" },
            { id: 2, titulo: "A Divindade", duracao: "60 min" }
        ]
    },
    {
        id: 5,
        titulo: "Liderança Cristã",
        autor: "Pr. Erton Köhler",
        instrutor: "Pr. Erton Köhler",
        categoria: "Liderança",
        imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
        progresso: 5,
        totalAulas: 6,
        duracao: "3h 20m",
        videoUrl: "https://www.youtube.com/embed/example",
        aulas: [
            { id: 1, titulo: "O Líder Servo", duracao: "40 min" },
            { id: 2, titulo: "Gestão de Equipes", duracao: "45 min" }
        ]
    }
];

export const categoriasCursos = ["Todos", "Bíblia", "Profecia", "Saúde", "Família", "Liderança"];
