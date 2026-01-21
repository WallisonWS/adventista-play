import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import {
  BookOpen,
  Music,
  BookText,
  GraduationCap,
  Globe,
  Heart,
  Menu,
  X,
  User,
  Search,
  ChevronRight,
  Home as HomeIcon,
  LogOut,
  Sparkles,
  Star,
  Play,
  Volume2,
  MessageSquare,
  Mail,
  Phone,
  Trophy,
  Calendar,
  Newspaper
} from 'lucide-react'
import './App.css'
import './styles/dark-mode.css'
import './styles/themes.css'
import './styles/colors.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext.jsx'
import { Toaster } from 'react-hot-toast'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Dock from './components/21st-dev/Dock'
import { ContatoPage } from './components/ContatoPage.jsx'
import { FeedbackPage } from './components/FeedbackPage.jsx'
import { NoticiasDesbravadores } from './components/NoticiasDesbravadores.jsx'
import { Feliz7Play } from './components/Feliz7Play.jsx'
import { BibliaPage } from './components/BibliaPage.jsx'
import { PerfilPage } from './components/PerfilPage.jsx'
import { VersiculoDoDia } from './components/VersiculoDoDia.jsx'
import { ConquistasPage } from './components/ConquistasPage.jsx'
import { LessonViewer } from './components/LessonViewer.jsx'
import DemoPage from './components/21st-dev/DemoPage.jsx'
import { PlanosLeituraPage } from './components/PlanosLeituraPage.jsx'
import { QuizBiblico } from './components/QuizBiblico.jsx'
import { EscolaSabatina } from './components/EscolaSabatina'
import { EscolaSabatinaCompleta } from './components/EscolaSabatinaCompleta.jsx'
import { LivrosEllenWhite } from './components/LivrosEllenWhite.jsx'
import { DicionarioBiblico } from './components/DicionarioBiblico.jsx'
import { DevocionaisEllenWhite } from './components/DevocionaisEllenWhite.jsx'
import { CompartilharOracao } from './components/CompartilharOracao.jsx'
import { CursosAdventistas } from './components/CursosAdventistas.jsx'
import { DesbravadoresPage } from './components/DesbravadoresPage.jsx'
import { NosDesbravadores } from './components/NosDesbravadores.jsx'
import { EspecialidadeTutorial } from './components/EspecialidadeTutorial.jsx'
import { ProgressoDesbravador } from './components/ProgressoDesbravador.jsx'
import { CertificadoCurso } from './components/CertificadoCurso.jsx'
import { DoacaoPage } from './components/DoacaoPage.jsx'
import { DoacaoPageDesktop } from './components/DoacaoPageDesktop.jsx'
import { DoacaoSucesso, DoacaoFalha, DoacaoPendente } from './components/DoacaoResultado.jsx'
import { ConnectionStatus } from './components/ConnectionStatus.jsx'
import { ChristianAnimations, DivineLightEffect, TwinklingStars } from './components/ChristianAnimations.jsx'
import { NewHomePage } from './components/NewHomePage.jsx'
import MobileHomePage from './components/21st-dev/MobileHomePage.jsx'
import MobileBiblePage from './components/21st-dev/MobileBiblePage.jsx'
import MobileDevotionalPage from './components/21st-dev/MobileDevotionalPage.jsx'
import MobileHymnalPage from './components/21st-dev/MobileHymnalPage.jsx'
import MobilePathfindersPage from './components/21st-dev/MobilePathfindersPage.jsx'
import MobileStudiesPage from './components/21st-dev/MobileStudiesPage.jsx'
import { NewEstudosPage } from './components/NewEstudosPage.jsx'
import { DestaquesCarousel } from './components/DestaquesCarousel.jsx'
import { EnhancedWebHomePage } from './components/EnhancedWebHomePage.jsx'
import { ImprovedHomePageDesktop } from './components/ImprovedHomePageDesktop.jsx'
import { PageTransition } from './components/PageTransition.jsx'
import { ChristianBackground3D, ChristianBackground3DMobile } from './components/ChristianBackground3D.jsx'
import { Enhanced3DFooter } from './components/Enhanced3DFooter.jsx'
import { Enhanced3DLogin } from './components/Enhanced3DLogin.jsx'
import { Enhanced3DRegister } from './components/Enhanced3DRegister.jsx'
import { Enhanced3DBiblePage } from './components/Enhanced3DBiblePage.jsx'
import { EnhancedHinarioPage } from './components/EnhancedHinarioPage.jsx'
import { EnhancedEstudosPage } from './components/EnhancedEstudosPage.jsx'
import { EnhancedDevocionalPage } from './components/EnhancedDevocionalPage.jsx'
import { CategoriaEstudosPage } from './components/CategoriaEstudosPage.jsx'
import { DetalheCursoPage } from './components/DetalheCursoPage.jsx'
import { useIsMobile } from './hooks/useIsMobile.js'
import { loginUser, registerUser, logoutUser, getCurrentUser } from './services/authService.js'
// Importar dados
import { devocionais } from './data/devocionais.js'
import { hinos } from './data/hinario.js'
import { estudos } from './data/estudos.js'
import { estudosCompletos } from './data/estudos-completos.js'
import { personagensBiblicos } from './data/personagens-biblicos.js'
import { planosLeitura } from './data/planos-leitura.js'

// Importar imagens
import logo from './assets/logo-adventista-play-transparent.png'
import mission1 from './assets/06ODUmgeXDAv.jpg'
import mission2 from './assets/ceVxJtPGZzDg.jpeg'
import mission3 from './assets/1jBZXZ4E8jtT.jpg'
import mission4 from './assets/HF6RqExkDpl0.jpg'
import mission5 from './assets/P07w5fmsquqm.jpg'

const projetos = [
  {
    id: 1,
    titulo: "Escola de Missões",
    descricao: "Formação de missionários para alcançar os não alcançados",
    imagem: mission1,
    localizacao: "América do Sul"
  },
  {
    id: 2,
    titulo: "Identidade Missionária",
    descricao: "Fortalecendo a identidade e o propósito missionário da igreja",
    imagem: mission2,
    localizacao: "Global"
  },
  {
    id: 3,
    titulo: "Super Missionários",
    descricao: "Programa de evangelismo infantil e juvenil",
    imagem: mission3,
    localizacao: "Brasil"
  },
  {
    id: 4,
    titulo: "Missão Global",
    descricao: "Alcançando grupos não evangelizados ao redor do mundo",
    imagem: mission4,
    localizacao: "Janela 10/40"
  },
  {
    id: 5,
    titulo: "Missão no Mar",
    descricao: "Evangelismo em comunidades ribeirinhas e costeiras",
    imagem: mission5,
    localizacao: "Ásia-Pacífico"
  }
]

// Animações
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  whileHover: { scale: 1.05 }
}

// Componente de Navegação
function Navigation({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'} shadow-lg sticky top-0 z-50 backdrop-blur-sm`}
      style={{ borderBottom: isDarkMode ? '3px solid #4B5563' : '3px solid #2E3192' }}
    >
      <div className="w-full px-6 relative">
        <div className="flex items-center justify-center h-16">
          {/* Logo no cabeçalho - Fixo no canto esquerdo */}
          <Link to="/" className="absolute left-6 flex items-center">
            <motion.img
              src="/logo-adventista-play-transparent.png"
              alt="Adventista Play"
              className="h-10 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Menu - Centralizado */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink to="/" icon={<HomeIcon className="h-4 w-4" />} isDarkMode={isDarkMode}>Início</NavLink>
            <NavLink to="/devocional" icon={<Heart className="h-4 w-4" />} isDarkMode={isDarkMode}>Devocional</NavLink>
            <NavLink to="/hinario" icon={<Music className="h-4 w-4" />} isDarkMode={isDarkMode}>Hinário</NavLink>
            <NavLink to="/biblia" icon={<BookText className="h-4 w-4" />} isDarkMode={isDarkMode}>Bíblia</NavLink>
            <NavLink to="/estudos" icon={<GraduationCap className="h-4 w-4" />} isDarkMode={isDarkMode}>Estudos</NavLink>
            <NavLink to="/ellen-white" icon={<BookOpen className="h-4 w-4" />} isDarkMode={isDarkMode}>Ellen White</NavLink>
            <NavLink to="/planos" icon={<Calendar className="h-4 w-4" />} isDarkMode={isDarkMode}>Planos</NavLink>
            <NavLink to="/quiz" icon={<Trophy className="h-4 w-4" />} isDarkMode={isDarkMode}>Quiz</NavLink>
            <NavLink to="/projetos" icon={<Globe className="h-4 w-4" />} isDarkMode={isDarkMode}>Projetos</NavLink>
            <NavLink to="/cursos" icon={<GraduationCap className="h-4 w-4" />} isDarkMode={isDarkMode}>Cursos</NavLink>
            <NavLink to="/desbravadores" icon={<Star className="h-4 w-4" />} isDarkMode={isDarkMode}>Desbravadores</NavLink>
            <NavLink to="/oracao" icon={<Heart className="h-4 w-4" />} isDarkMode={isDarkMode}>Oração</NavLink>
            {user && <NavLink to="/conquistas" icon={<Trophy className="h-4 w-4" />} isDarkMode={isDarkMode}>Conquistas</NavLink>}
            <NavLink to="/feliz7play" icon={<Play className="h-4 w-4" />} isDarkMode={isDarkMode}>Feliz7 Play</NavLink>
            <NavLink to="/noticias-desbravadores" icon={<Newspaper className="h-4 w-4" />} isDarkMode={isDarkMode}>Notícias</NavLink>
            <NavLink to="/feedback" icon={<MessageSquare className="h-4 w-4" />} isDarkMode={isDarkMode}>Feedback</NavLink>
            <NavLink to="/contato" icon={<Phone className="h-4 w-4" />} isDarkMode={isDarkMode}>Contato</NavLink>

            {/* Toggle Modo Noturno */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/perfil">
                  <motion.span
                    className={`flex items-center space-x-1 cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors font-medium`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="h-4 w-4" />
                    <span>{user.nome}</span>
                  </motion.span>
                </Link>
                <Button variant="outline" size="sm" onClick={onLogout} className="border-primary text-primary hover:bg-primary hover:text-white">
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Fixo no canto direito */}
          <motion.button
            className={`lg:hidden absolute right-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4 space-y-2 overflow-hidden"
            >
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Início</Link>
              <Link to="/devocional" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Devocional</Link>
              <Link to="/hinario" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Hinário</Link>
              <Link to="/biblia" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Bíblia</Link>
              <Link to="/estudos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Estudos</Link>
              <Link to="/ellen-white" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Ellen White</Link>
              <Link to="/planos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Planos de Leitura</Link>
              <Link to="/quiz" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Quiz Bíblico</Link>
              <Link to="/projetos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Projetos</Link>
              <Link to="/cursos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Cursos</Link>
              <Link to="/desbravadores" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Desbravadores</Link>
              <Link to="/oracao" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Oração</Link>
              <Link to="/feliz7play" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Feliz7 Play</Link>
              <Link to="/noticias-desbravadores" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Notícias</Link>
              <Link to="/feedback" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Feedback</Link>
              <Link to="/contato" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary transition-colors font-medium">Contato</Link>
              {user ? (
                <>
                  <div className="py-2 text-primary font-semibold">{user.nome}</div>
                  <Button variant="outline" size="sm" onClick={onLogout} className="w-full">Sair</Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button variant="outline" size="sm" className="w-full">Entrar</Button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

function NavLink({ to, icon, children, isDarkMode }) {
  return (
    <Link to={to} className={`${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-gray-700 hover:text-primary'} transition-colors flex items-center space-x-1.5 group font-medium whitespace-nowrap text-base`}>
      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="flex items-center">
        <span className="scale-125">{icon}</span>
      </motion.div>
      <span>{children}</span>
    </Link>
  )
}

// Página Inicial
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Animações Cristãs no Background */}
        <ChristianAnimations />
        <DivineLightEffect />
        <TwinklingStars count={30} />

        <motion.div
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block mb-6"
          >
            <img src={logo} alt="Adventista Play" className="h-32 md:h-40 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#2E3192' }}
          >
            Bem-vindo ao <span style={{ color: '#7CB342' }}>Adventista Play</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Seu espaço para crescimento espiritual com devocionais, hinário, bíblia, estudos e projetos missionários
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/devocional">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg group shadow-lg hover:shadow-xl">
                  Devocional do Dia
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <Link to="/estudos">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg shadow-lg hover:shadow-xl">
                  Explorar Estudos
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Seção de Destaques Dinâmicos */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#2E3192' }}>
              ✨ Destaques do Dia
            </h2>
            <DestaquesCarousel />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <motion.div
          className="container mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              to="/devocional"
              icon={<Heart className="h-12 w-12 text-primary" />}
              title="Devocional Diário"
              description="Meditações e reflexões para fortalecer sua fé todos os dias"
              color="from-red-500/10 to-pink-500/10"
            />

            <FeatureCard
              to="/hinario"
              icon={<Music className="h-12 w-12 text-primary" />}
              title="Hinário Adventista"
              description="Acesse todos os hinos do hinário adventista com letras completas"
              color="from-purple-500/10 to-indigo-500/10"
            />

            <FeatureCard
              to="/biblia"
              icon={<BookText className="h-12 w-12 text-primary" />}
              title="Bíblia Sagrada"
              description="Leia e estude a Palavra de Deus com ferramentas de busca"
              color="from-blue-500/10 to-cyan-500/10"
            />

            <FeatureCard
              to="/estudos"
              icon={<GraduationCap className="h-12 w-12 text-primary" />}
              title="Estudos Bíblicos"
              description="Lições da Escola Sabatina e estudos temáticos aprofundados"
              color="from-pink-500/10 to-rose-500/10"
            />

            <FeatureCard
              to="/projetos"
              icon={<Globe className="h-12 w-12 text-primary" />}
              title="Projetos Missionários"
              description="Conheça e apoie missões ao redor do mundo"
              color="from-amber-500/10 to-orange-500/10"
            />

            <FeatureCard
              to="/doacao"
              icon={<Heart className="h-12 w-12 text-primary" />}
              title="Apoie a Missão"
              description="Contribua para manter e expandir este ministério digital"
              color="from-green-500/10 to-emerald-500/10"
            />

            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-primary to-secondary text-primary-foreground h-full">
                <CardHeader>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <BookOpen className="h-12 w-12 mb-4" />
                  </motion.div>
                  <CardTitle className="text-primary-foreground">Comunidade</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Conecte-se com outros membros e compartilhe sua jornada de fé
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Versículo do Dia */}
      <section className="py-16 px-4">
        <motion.div
          className="container mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <VersiculoDoDia />
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece sua jornada espiritual hoje
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Cadastre-se gratuitamente e tenha acesso a todos os recursos
          </p>
          <Link to="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg">
                Criar Conta Gratuita
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

function FeatureCard({ to, icon, title, description, color }) {
  return (
    <Link to={to}>
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full bg-gradient-to-br ${color} border-2 hover:border-primary/50`}>
          <CardHeader>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="mb-4"
            >
              {icon}
            </motion.div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  )
}

// Página de Login/Cadastro
function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    idade: '',
    senha: '',
    confirmarSenha: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      // Login
      const result = loginUser(formData.email, formData.senha)
      if (result.success) {
        onLogin(result.user)
        navigate('/')
      } else {
        alert(result.message)
      }
    } else {
      // Cadastro
      if (formData.senha !== formData.confirmarSenha) {
        alert('As senhas não coincidem!')
        return
      }
      if (formData.senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!')
        return
      }
      const result = registerUser(formData)
      if (result.success) {
        alert(result.message)
        setIsLogin(true)
        setFormData({ nome: '', email: '', idade: '', senha: '', confirmarSenha: '' })
      } else {
        alert(result.message)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-2xl">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? 'Acesse sua conta do Portal Adventista'
                : 'Cadastre-se gratuitamente no Portal Adventista'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="idade">Idade</Label>
                    <Input
                      id="idade"
                      type="number"
                      placeholder="Sua idade"
                      min="13"
                      max="120"
                      value={formData.idade}
                      onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  required
                />
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                    <Input
                      id="confirmarSenha"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmarSenha}
                      onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin
                    ? 'Não tem uma conta? Cadastre-se'
                    : 'Já tem uma conta? Faça login'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Página de Devocional
function DevocionalPage() {
  const [selectedDevocional, setSelectedDevocional] = useState(devocionais[0])
  const [favoritos, setFavoritos] = useState([])
  const conteudoRef = useRef(null)

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="h-8 w-8" />
            </motion.div>
            Devocional Diário
          </h1>
          <p className="text-muted-foreground">Fortaleça sua fé com reflexões diárias</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Devocionais */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Devocionais Recentes</h2>
            {devocionais.map((dev, index) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${selectedDevocional.id === dev.id ? 'ring-2 ring-primary' : ''
                    }`}
                  onClick={() => {
                    setSelectedDevocional(dev)
                    // Scroll automático para o conteúdo do devocional
                    setTimeout(() => {
                      conteudoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 100)
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{dev.titulo}</CardTitle>
                        <CardDescription>{dev.data}</CardDescription>
                        {dev.categoria && (
                          <Badge variant="secondary" className="mt-2">{dev.categoria}</Badge>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorito(dev.id)
                        }}
                      >
                        <Star
                          className={`h-5 w-5 ${favoritos.includes(dev.id) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            }`}
                        />
                      </motion.button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Devocional Selecionado */}
          <div className="lg:col-span-2" ref={conteudoRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDevocional.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Heart className="h-4 w-4" />
                      <span>{selectedDevocional.data}</span>
                    </div>
                    <CardTitle className="text-3xl mb-4">{selectedDevocional.titulo}</CardTitle>
                    <motion.div
                      className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm font-semibold text-primary mb-2">{selectedDevocional.versiculo}</p>
                      <p className="italic">{selectedDevocional.texto}</p>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-3">Reflexão</h3>
                    <motion.p
                      className="text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedDevocional.reflexao}
                    </motion.p>

                    <div className="mt-6 pt-6 border-t flex gap-3">
                      <Button
                        className="flex-1 md:flex-initial"
                        onClick={() => toggleFavorito(selectedDevocional.id)}
                      >
                        <Star className={`mr-2 h-4 w-4 ${favoritos.includes(selectedDevocional.id) ? 'fill-current' : ''}`} />
                        {favoritos.includes(selectedDevocional.id) ? 'Favoritado' : 'Adicionar aos Favoritos'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// Continua na próxima parte...



// Página de Hinário
function HinarioPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedHino, setSelectedHino] = useState(null)

  const categories = ['Todos', ...new Set(hinos.map(h => h.categoria))]

  const filteredHinos = hinos.filter(hino => {
    const matchesSearch = hino.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hino.numero.toString().includes(searchTerm)
    const matchesCategory = selectedCategory === 'Todos' || hino.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background pt-4 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Music className="h-7 w-7 md:h-8 md:w-8" />
            </motion.div>
            Hinário Adventista
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">Explore e cante os hinos da nossa fé</p>
        </motion.div>

        {/* Busca e Filtros */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número ou título..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Grid de categorias */}
              <div className="grid grid-cols-3 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Hinos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredHinos.map((hino, index) => (
            <motion.div
              key={hino.numero}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedHino(hino)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
                        >
                          <Music className="h-4 w-4 text-primary" />
                        </motion.div>
                        <span className="text-sm font-semibold text-primary">Hino {hino.numero}</span>
                      </div>
                      <CardTitle className="text-lg">{hino.titulo}</CardTitle>
                      <Badge variant="secondary" className="mt-2">{hino.categoria}</Badge>
                    </div>
                    {hino.letra && (
                      <motion.div whileHover={{ scale: 1.2 }} className="flex-shrink-0 mt-1">
                        <Volume2 className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <a href="/hinario-completo.pdf" download="Hinario_Adventista_Completo.pdf">
            <Button size="lg" className="text-lg">
              <BookText className="mr-2 h-5 w-5" />
              Baixar Hinário Adventista Completo (PDF)
            </Button>
          </a>
        </motion.div>

        {filteredHinos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum hino encontrado</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Modal de Hino */}
        <AnimatePresence>
          {selectedHino && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedHino(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Music className="h-5 w-5 text-primary" />
                          <span className="text-sm font-semibold text-primary">Hino {selectedHino.numero}</span>
                        </div>
                        <CardTitle className="text-2xl">{selectedHino.titulo}</CardTitle>
                        <Badge variant="secondary" className="mt-2">{selectedHino.categoria}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedHino(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedHino.letra ? (
                      <div className="whitespace-pre-line text-lg leading-relaxed">
                        {selectedHino.letra}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">Letra em breve...</p>
                    )}
                  </CardContent>
                  <div className="p-6 pt-0 flex gap-3">
                    {selectedHino.url && (
                      <a href={selectedHino.url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          Ouvir Hino (YouTube)
                        </Button>
                      </a>
                    )}
                    <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(`Hino ${selectedHino.numero}: ${selectedHino.titulo}\n\n${selectedHino.letra}`)}`} download={`hino-${selectedHino.numero}.txt`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <BookText className="mr-2 h-4 w-4" />
                        Baixar Letra
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Página de Estudos
function EstudosPage() {
  const [selectedEstudo, setSelectedEstudo] = useState(null)

  // Combinar estudos antigos com novos
  const todosEstudos = [
    ...estudos,
    ...estudosCompletos.escolaSabatina,
    ...estudosCompletos.estudosTematicos,
    ...estudosCompletos.personagensBiblicos,
    ...estudosCompletos.livrosBiblia,
    ...personagensBiblicos
  ]

  const escolaSabatina = todosEstudos.filter(e => e.tipo === 'Escola Sabatina')
  const estudosTematicos = todosEstudos.filter(e => e.categoria === 'Profecia' || e.categoria === 'Vida de Cristo' || e.categoria === 'Doutrina' || e.categoria === 'Vida Cristã')
  const personagens = todosEstudos.filter(e => e.categoria === 'Personagens' || e.categoria === 'Patriarcas' || e.categoria === 'Mulheres da Bíblia' || e.categoria === 'Líderes' || e.categoria === 'Profetas' || e.categoria === 'Reis')
  const livros = todosEstudos.filter(e => e.categoria === 'Novo Testamento' || e.categoria === 'Antigo Testamento')

  // Se um estudo foi selecionado, mostrar o visualizador de lições
  if (selectedEstudo) {
    return (
      <AnimatePresence>
        <LessonViewer
          estudo={selectedEstudo}
          onClose={() => setSelectedEstudo(null)}
        />
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <GraduationCap className="h-8 w-8" />
            </motion.div>
            Estudos Bíblicos
          </h1>
          <p className="text-muted-foreground">Aprofunde seu conhecimento da Palavra de Deus</p>
        </motion.div>

        <Tabs defaultValue="escola-sabatina" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="escola-sabatina">Escola Sabatina ({escolaSabatina.length})</TabsTrigger>
            <TabsTrigger value="estudos-tematicos">Temáticos ({estudosTematicos.length})</TabsTrigger>
            <TabsTrigger value="personagens">Personagens ({personagens.length})</TabsTrigger>
            <TabsTrigger value="livros">Livros ({livros.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="escola-sabatina" className="mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {escolaSabatina.map((estudo, index) => (
                <motion.div
                  key={estudo.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer h-full" onClick={() => setSelectedEstudo(estudo)}>
                    <CardHeader>
                      <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                        >
                          <GraduationCap className="h-4 w-4" />
                        </motion.div>
                        <span>{estudo.trimestre}</span>
                      </div>
                      <CardTitle>{estudo.titulo}</CardTitle>
                      <CardDescription>{estudo.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {estudo.licoes && (
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-semibold">Lições:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {estudo.licoes.slice(0, 3).map((licao) => (
                              <li key={licao.numero}>• {licao.titulo}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button className="w-full">
                        Acessar Lições
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="estudos-tematicos" className="mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {estudosTematicos.map((estudo, index) => (
                <motion.div
                  key={estudo.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer h-full" onClick={() => setSelectedEstudo(estudo)}>
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 3, delay: index * 0.3 }}
                        >
                          <BookOpen className="h-4 w-4 text-primary" />
                        </motion.div>
                        <Badge variant="secondary">{estudo.tipo}</Badge>
                        {estudo.categoria && <Badge>{estudo.categoria}</Badge>}
                      </div>
                      <CardTitle>{estudo.titulo}</CardTitle>
                      <CardDescription>{estudo.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {estudo.topicos && (
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-semibold">Tópicos:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {estudo.topicos.slice(0, 3).map((topico, i) => (
                              <li key={i}>• {topico}</li>
                            ))}
                            {estudo.topicos.length > 3 && (
                              <li className="text-primary">+ {estudo.topicos.length - 3} mais...</li>
                            )}
                          </ul>
                        </div>
                      )}
                      <Button className="w-full">
                        Começar Estudo
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="personagens" className="mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {personagens.map((estudo, index) => (
                <motion.div
                  key={estudo.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer h-full" onClick={() => setSelectedEstudo(estudo)}>
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{estudo.categoria}</Badge>
                      </div>
                      <CardTitle>{estudo.titulo}</CardTitle>
                      <CardDescription>{estudo.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {estudo.licoes && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold mb-2">{estudo.licoes.length} lições</p>
                        </div>
                      )}
                      <Button className="w-full">
                        Estudar Personagem
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="livros" className="mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {livros.map((estudo, index) => (
                <motion.div
                  key={estudo.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer h-full" onClick={() => setSelectedEstudo(estudo)}>
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge>{estudo.categoria}</Badge>
                      </div>
                      <CardTitle>{estudo.titulo}</CardTitle>
                      <CardDescription>{estudo.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {estudo.licoes && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold mb-2">{estudo.licoes.length} lições</p>
                        </div>
                      )}
                      <Button className="w-full">
                        Estudar Livro
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Recursos Adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle>Recursos de Estudo</CardTitle>
              <CardDescription>Ferramentas para aprofundar seu aprendizado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                >
                  <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Comentários Bíblicos</h3>
                    <p className="text-sm text-muted-foreground">Análises detalhadas de cada livro</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                >
                  <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Guias de Estudo</h3>
                    <p className="text-sm text-muted-foreground">Roteiros estruturados de aprendizado</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                >
                  <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Grupos de Estudo</h3>
                    <p className="text-sm text-muted-foreground">Conecte-se com outros estudantes</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Página de Projetos Missionários
function ProjetosPage() {
  const [selectedProjeto, setSelectedProjeto] = useState(null)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            >
              <Globe className="h-8 w-8" />
            </motion.div>
            Projetos Missionários
          </h1>
          <p className="text-muted-foreground">Conheça e apoie missões ao redor do mundo</p>
        </motion.div>

        {/* Grid de Projetos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {projetos.map((projeto, index) => (
            <motion.div
              key={projeto.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <Card
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedProjeto(projeto)}
              >
                <div className="aspect-video lg:aspect-auto overflow-hidden relative group">
                  <motion.img
                    src={projeto.imagem}
                    alt={projeto.titulo}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                    >
                      <Globe className="h-4 w-4" />
                    </motion.div>
                    <span>{projeto.localizacao}</span>
                  </div>
                  <CardTitle>{projeto.titulo}</CardTitle>
                  <CardDescription>{projeto.descricao}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Detalhes do Projeto Selecionado */}
        <AnimatePresence>
          {selectedProjeto && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-8"
            >
              <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={selectedProjeto.imagem}
                      alt={selectedProjeto.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                      <Globe className="h-4 w-4" />
                      <span>{selectedProjeto.localizacao}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{selectedProjeto.titulo}</h2>
                    <p className="text-muted-foreground mb-6">{selectedProjeto.descricao}</p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Sobre o Projeto</h3>
                        <p className="text-sm text-muted-foreground">
                          Este projeto faz parte da Missão Global da Igreja Adventista do Sétimo Dia,
                          trabalhando para levar o evangelho a regiões não alcançadas e fortalecer
                          comunidades através do amor de Cristo.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1">
                          Saiba Mais
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Apoiar Projeto
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informações sobre Missão Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Faça Parte da Missão</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                A Missão Global é o braço missionário da Igreja Adventista, trabalhando para alcançar
                grupos não evangelizados ao redor do mundo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <h3 className="font-bold text-lg mb-2">Ore</h3>
                  <p className="text-sm opacity-90">
                    Interceda pelos missionários e pelos que ainda não conhecem o evangelho
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <h3 className="font-bold text-lg mb-2">Contribua</h3>
                  <p className="text-sm opacity-90">
                    Apoie financeiramente os projetos missionários ao redor do mundo
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <h3 className="font-bold text-lg mb-2">Vá</h3>
                  <p className="text-sm opacity-90">
                    Considere ser um missionário voluntário e levar esperança a outros povos
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Componente Principal
function AppContent() {
  const [user, setUser] = useState(null)
  const isMobile = useIsMobile()

  // Verificar se há usuário logado ao carregar
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <Router>
      <div className="min-h-screen bg-background relative">
        {/* Background 3D Cristão */}
        {isMobile ? <ChristianBackground3DMobile /> : <ChristianBackground3D />}

        <ConnectionStatus />
        <Navigation user={user} onLogout={handleLogout} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<EnhancedWebHomePage user={user} />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/login" element={<Enhanced3DLogin onLogin={handleLogin} />} />
            <Route path="/cadastro" element={<Enhanced3DRegister onLogin={handleLogin} />} />
            <Route path="/devocional" element={<EnhancedDevocionalPage />} />
            <Route path="/hinario" element={<EnhancedHinarioPage />} />
            <Route path="/biblia" element={<Enhanced3DBiblePage />} />
            <Route path="/biblia/:livro/:capitulo" element={<Enhanced3DBiblePage />} />
            <Route path="/estudos" element={<EnhancedEstudosPage />} />
            <Route path="/estudos/:categoria" element={<CategoriaEstudosPage />} />
            <Route path="/estudos/:categoria/:cursoId" element={<DetalheCursoPage />} />
            <Route path="/escola-sabatina" element={<EscolaSabatinaCompleta />} />
            <Route path="/ellen-white" element={<LivrosEllenWhite />} />
            <Route path="/dicionario" element={<DicionarioBiblico />} />
            <Route path="/devocionais-ellen" element={<DevocionaisEllenWhite />} />
            <Route path="/planos" element={<PlanosLeituraPage planos={planosLeitura} />} />
            <Route path="/quiz" element={<QuizBiblico />} />
            <Route path="/projetos" element={<ProjetosPage />} />
            <Route path="/cursos" element={<CursosAdventistas />} />
            <Route path="/desbravadores" element={isMobile ? <MobilePathfindersPage /> : <DesbravadoresPage />} />
            <Route path="/nos-desbravadores" element={<NosDesbravadores />} />
            <Route path="/desbravadores/especialidade/:id" element={<EspecialidadeTutorial />} />
            <Route path="/progresso-desbravador" element={<ProgressoDesbravador />} />
            <Route path="/certificado" element={<CertificadoCurso />} />
            <Route path="/oracao" element={<CompartilharOracao />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/noticias-desbravadores" element={<NoticiasDesbravadores />} />
            <Route path="/feliz7play" element={<Feliz7Play />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/conquistas" element={<ConquistasPage />} />
            <Route path="/doacao" element={isMobile ? <DoacaoPage /> : <DoacaoPageDesktop />} />
            <Route path="/doacao/sucesso" element={<DoacaoSucesso />} />
            <Route path="/doacao/falha" element={<DoacaoFalha />} />
            <Route path="/doacao/pendente" element={<DoacaoPendente />} />
          </Routes>
        </AnimatePresence>

        {/* Dock Navigation */}
        <Dock onItemClick={(id) => {
          const navigate = window.location
          if (id === 'home') navigate.href = '/'
          else if (id === 'search') navigate.href = '/biblia'
          else if (id === 'bible') navigate.href = '/biblia'
          else if (id === 'favorites') navigate.href = '/perfil'
          else if (id === 'profile') navigate.href = '/perfil'
        }} />

        {/* Footer Melhorado */}
        <Enhanced3DFooter />
      </div>
    </Router>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <DarkModeProvider>
        <ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <AppContent />
        </ThemeProvider>
      </DarkModeProvider>
    </I18nextProvider>
  )
}

export default App