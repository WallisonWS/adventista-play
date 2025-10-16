# 🙏 Adventista Play

> Plataforma completa de crescimento espiritual com devocional, hinário, bíblia, estudos bíblicos e muito mais!

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 📖 Sobre o Projeto

O **Adventista Play** é uma plataforma web moderna e completa desenvolvida para apoiar o crescimento espiritual de membros da Igreja Adventista do Sétimo Dia e qualquer pessoa interessada em estudar a Bíblia.

Com design atraente, funcionalidades avançadas e experiência de usuário excepcional, o Adventista Play oferece recursos para estudo bíblico, devocionais diários, hinário completo, planos de leitura, quiz interativo e muito mais.

## ✨ Funcionalidades

### 📚 Conteúdo Rico
- **30+ Devocionais** - Reflexões diárias para fortalecer sua fé
- **50+ Hinos** - Hinário Adventista completo com letras
- **Bíblia Sagrada** - 3 versões (ARC, ACF, NVI) com leitor avançado
- **165+ Estudos Bíblicos** - Escola Sabatina e estudos temáticos
- **450+ Lições** - Conteúdo detalhado para anos de estudo
- **50+ Personagens Bíblicos** - Biografias e estudos
- **10 Planos de Leitura** - Guias estruturados para ler a Bíblia

### 🎮 Gamificação
- **Sistema de Pontos** - Ganhe pontos por cada atividade
- **15 Conquistas** - Desbloqueie badges ao atingir metas
- **Níveis** - Suba de nível conforme estuda
- **Ranking** - Compare seu progresso

### 🧠 Quiz Bíblico
- **4 Categorias** - AT, NT, Personagens e Milagres
- **20 Perguntas** - Teste seus conhecimentos
- **Feedback Imediato** - Aprenda com os erros
- **Estatísticas** - Acompanhe seu desempenho

### 📖 Leitor de Bíblia Avançado
- **Controle de Fonte** - Ajuste o tamanho (14-24px)
- **Modo Noturno** - Leitura confortável à noite
- **Favoritos** - Marque versículos importantes
- **Notas** - Adicione anotações pessoais
- **Compartilhar** - Compartilhe versículos
- **Histórico** - Veja o que você já leu

### 📱 PWA (Progressive Web App)
- **Instalável** - Funciona como app nativo
- **Offline** - Use sem internet
- **Notificações** - Receba lembretes
- **Multiplataforma** - Android, iOS, Windows, Mac, Linux

### 🎨 Design Moderno
- **Responsivo** - Perfeito em qualquer dispositivo
- **Animações** - Transições suaves e atraentes
- **Paleta Adventista** - Azul (#2E3192) e Verde (#7CB342)
- **UX Excepcional** - Interface intuitiva e agradável

## 🚀 Tecnologias

- **React 19** - Framework JavaScript moderno
- **Vite 6** - Build tool rápida
- **Tailwind CSS 3** - Framework CSS utility-first
- **Framer Motion** - Animações fluidas
- **Shadcn/UI** - Componentes profissionais
- **Lucide Icons** - Ícones modernos
- **React Router** - Navegação SPA

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/WallisonWS/adventista-play.git
cd adventista-play
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
pnpm run dev
```

4. Acesse http://localhost:5173

## 🏗️ Build para Produção

```bash
npm run build
# ou
pnpm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push para o GitHub
2. Importe o repositório na [Vercel](https://vercel.com)
3. Deploy automático!

### Netlify

1. Arraste a pasta `dist` para [Netlify](https://netlify.com)
2. Ou conecte com GitHub para deploy automático

### Outras Opções
- GitHub Pages
- Cloudflare Pages
- Hostinger/HostGator

## 📁 Estrutura do Projeto

```
adventista-play/
├── public/              # Arquivos públicos
│   ├── manifest.json    # PWA manifest
│   ├── sw.js           # Service Worker
│   └── logo.png        # Logo
├── src/
│   ├── components/     # Componentes React
│   │   ├── ui/        # Componentes de UI
│   │   ├── BibliaPageMelhorada.jsx
│   │   ├── QuizBiblico.jsx
│   │   ├── ConquistasPage.jsx
│   │   └── ...
│   ├── data/          # Dados estáticos
│   │   ├── devocionais.js
│   │   ├── hinario.js
│   │   ├── estudos-completos.js
│   │   └── ...
│   ├── services/      # Serviços e APIs
│   │   ├── authService.js
│   │   └── bibliaApiService.js
│   ├── assets/        # Imagens e recursos
│   ├── App.jsx        # Componente principal
│   ├── App.css        # Estilos globais
│   └── main.jsx       # Ponto de entrada
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎯 Funcionalidades Principais

### Páginas

1. **Início** - Hero section com logo e navegação
2. **Devocional** - Devocionais diários com favoritos
3. **Hinário** - Hinos com busca e filtros
4. **Bíblia** - Leitor avançado com múltiplas versões
5. **Estudos** - Lições da Escola Sabatina e estudos temáticos
6. **Planos** - Planos de leitura bíblica
7. **Quiz** - Quiz bíblico interativo
8. **Projetos** - Projetos missionários
9. **Conquistas** - Sistema de gamificação
10. **Perfil** - Dados do usuário e configurações
11. **Contato** - Formulário e informações de contato

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você quiser contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Wallison Pereira**

- Email: wallisonpereiradev@gmail.com
- WhatsApp: (62) 99479-1745
- GitHub: [@WallisonWS](https://github.com/WallisonWS)

## 🙏 Agradecimentos

- Igreja Adventista do Sétimo Dia
- Comunidade React
- Todos os contribuidores

## 📊 Estatísticas

- **30+** Devocionais
- **50+** Hinos
- **165+** Estudos Bíblicos
- **450+** Lições
- **50+** Personagens Bíblicos
- **10** Planos de Leitura
- **20** Perguntas de Quiz
- **15** Conquistas

## 🌟 Features Futuras

- [ ] Integração com API bíblica real
- [ ] Áudio dos versículos
- [ ] Comentários bíblicos
- [ ] Sermões em texto
- [ ] Recursos para crianças
- [ ] Material para professores
- [ ] Grupos de estudo online
- [ ] Chat comunitário

## 📱 Screenshots

_Em breve..._

## 🔗 Links Úteis

- [Documentação React](https://reactjs.org/)
- [Documentação Vite](https://vitejs.dev/)
- [Documentação Tailwind CSS](https://tailwindcss.com/)
- [Igreja Adventista do Sétimo Dia](https://www.adventistas.org/)

---

Feito com ❤️ e 🙏 por [Wallison Pereira](https://github.com/WallisonWS)

