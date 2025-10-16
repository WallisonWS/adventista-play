import { useState, useEffect } from 'react'
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
  BookMarked,
  Play,
  Volume2,
  MessageSquare,
  Mail,
  Phone,
  Trophy
} from 'lucide-react'
import './App.css'
import { ContatoPage } from './components/ContatoPage.jsx'
import { BibliaPageNova } from './components/BibliaPageNova.jsx'
import { PerfilPage } from './components/PerfilPage.jsx'
import { VersiculoDoDia } from './components/VersiculoDoDia.jsx'
import { ConquistasPage } from './components/ConquistasPage.jsx'
import { LessonViewer } from './components/LessonViewer.jsx'
import { loginUser, registerUser, logoutUser, getCurrentUser } from './services/authService.js'

// Importar dados
import { devocionais } from './data/devocionais.js'
import { hinos } from './data/hinario.js'
import { livrosBiblia } from './data/biblia.js'
import { estudos } from './data/estudos.js'

// Importar imagens
import mission1 from './assets/06ODUmgeXDAv.jpg'
import mission2 from './assets/ceVxJtPGZzDg.jpeg'
import mission3 from './assets/HF6RqExkDpl0.jpg'
import mission4 from './assets/P07w5fmsquqm.jpg'
import mission5 from './assets/1jBZXZ4E8jtT.jpg'

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

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-6 w-6" />
            </motion.div>
            <span className="group-hover:text-accent transition-colors">Portal Adventista</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<HomeIcon className="h-4 w-4" />}>Início</NavLink>
            <NavLink to="/devocional" icon={<Heart className="h-4 w-4" />}>Devocional</NavLink>
            <NavLink to="/hinario" icon={<Music className="h-4 w-4" />}>Hinário</NavLink>
            <NavLink to="/biblia" icon={<BookText className="h-4 w-4" />}>Bíblia</NavLink>
            <NavLink to="/estudos" icon={<GraduationCap className="h-4 w-4" />}>Estudos</NavLink>
            <NavLink to="/projetos" icon={<Globe className="h-4 w-4" />}>Projetos</NavLink>
            {user && <NavLink to="/conquistas" icon={<Trophy className="h-4 w-4" />}>Conquistas</NavLink>}
            <NavLink to="/contato" icon={<MessageSquare className="h-4 w-4" />}>Contato</NavLink>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/perfil">
                  <motion.span 
                    className="flex items-center space-x-1 cursor-pointer hover:text-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="h-4 w-4" />
                    <span>{user.nome}</span>
                  </motion.span>
                </Link>
                <Button variant="outline" size="sm" onClick={onLogout} className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden"
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
              <Link to="/" className="block py-2 hover:text-accent transition-colors">Início</Link>
              <Link to="/devocional" className="block py-2 hover:text-accent transition-colors">Devocional</Link>
              <Link to="/hinario" className="block py-2 hover:text-accent transition-colors">Hinário</Link>
              <Link to="/biblia" className="block py-2 hover:text-accent transition-colors">Bíblia</Link>
              <Link to="/estudos" className="block py-2 hover:text-accent transition-colors">Estudos</Link>
              <Link to="/projetos" className="block py-2 hover:text-accent transition-colors">Projetos</Link>
              <Link to="/contato" className="block py-2 hover:text-accent transition-colors">Contato</Link>
              {user ? (
                <>
                  <div className="py-2 text-accent">{user.nome}</div>
                  <Button variant="outline" size="sm" onClick={onLogout} className="w-full">Sair</Button>
                </>
              ) : (
                <Link to="/login" className="block">
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

function NavLink({ to, icon, children }) {
  return (
    <Link to={to} className="hover:text-accent transition-colors flex items-center space-x-1 group">
      <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
        {icon}
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
            <Sparkles className="h-16 w-16 text-accent mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-primary"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Bem-vindo ao Portal Adventista
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
              <Button size="lg" className="text-lg group">
                Devocional do Dia
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </Link>
            <Link to="/estudos">
              <Button size="lg" variant="outline" className="text-lg">
                Explorar Estudos
              </Button>
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
      <motion.div variants={fadeInUp}>
        <Card className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full bg-gradient-to-br ${color}`}>
          <CardHeader>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-4"
            >
              {icon}
            </motion.div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
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
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, idade: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, senha: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
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
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedDevocional.id === dev.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDevocional(dev)}
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
                          className={`h-5 w-5 ${
                            favoritos.includes(dev.id) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
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
          <div className="lg:col-span-2">
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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Music className="h-8 w-8" />
            </motion.div>
            Hinário Adventista
          </h1>
          <p className="text-muted-foreground">Explore e cante os hinos da nossa fé</p>
        </motion.div>

        {/* Busca e Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por número ou título..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 md:grid-cols-6">
                  {categories.map(cat => (
                    <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
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
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
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
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Volume2 className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
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
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Página da Bíblia
function BibliaPage() {
  const [selectedTestament, setSelectedTestament] = useState('Antigo Testamento')
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(1)

  const testaments = Object.keys(livrosBiblia)

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
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <BookText className="h-8 w-8" />
            </motion.div>
            Bíblia Sagrada
          </h1>
          <p className="text-muted-foreground">Leia e estude a Palavra de Deus</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seleção de Livro */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Livros da Bíblia</CardTitle>
                <Tabs value={selectedTestament} onValueChange={setSelectedTestament}>
                  <TabsList className="grid grid-cols-2 w-full">
                    {testaments.map(testament => (
                      <TabsTrigger key={testament} value={testament}>
                        {testament.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {livrosBiblia[selectedTestament].map((livro, index) => (
                  <motion.button
                    key={livro.nome}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => {
                      setSelectedBook(livro)
                      setSelectedChapter(1)
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedBook?.nome === livro.nome
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="font-semibold">{livro.nome}</div>
                    <div className="text-sm opacity-80">{livro.capitulos} capítulos</div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedBook ? (
                <motion.div
                  key={selectedBook.nome}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <BookMarked className="h-6 w-6 text-primary" />
                        {selectedBook.nome} {selectedChapter}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {Array.from({ length: selectedBook.capitulos }, (_, i) => i + 1).map((cap) => (
                          <motion.div
                            key={cap}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant={cap === selectedChapter ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedChapter(cap)}
                            >
                              {cap}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="prose max-w-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-muted-foreground italic mb-4">
                          Capítulo {selectedChapter} de {selectedBook.nome}
                        </p>
                        <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                          <p>
                            <sup className="text-primary font-bold mr-1">1</sup> 
                            No princípio criou Deus os céus e a terra.
                          </p>
                          <p>
                            <sup className="text-primary font-bold mr-1">2</sup> 
                            E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; 
                            e o Espírito de Deus se movia sobre a face das águas.
                          </p>
                          <p>
                            <sup className="text-primary font-bold mr-1">3</sup> 
                            E disse Deus: Haja luz. E houve luz.
                          </p>
                          <p className="text-sm text-muted-foreground italic mt-6 pt-6 border-t">
                            * Conteúdo de exemplo. Integração completa com API de Bíblia será implementada em breve.
                          </p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <BookText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      </motion.div>
                      <p className="text-muted-foreground">Selecione um livro para começar a leitura</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// Continua na próxima parte...



// Página de Estudos
function EstudosPage() {
  const [selectedEstudo, setSelectedEstudo] = useState(null)

  const escolaSabatina = estudos.filter(e => e.tipo === 'Escola Sabatina')
  const outrosEstudos = estudos.filter(e => e.tipo !== 'Escola Sabatina')

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
          <TabsList>
            <TabsTrigger value="escola-sabatina">Escola Sabatina</TabsTrigger>
            <TabsTrigger value="estudos-tematicos">Estudos Temáticos</TabsTrigger>
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
              {outrosEstudos.map((estudo, index) => (
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
                <div className="aspect-video overflow-hidden relative group">
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
function App() {
  const [user, setUser] = useState(null)

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
      <div className="min-h-screen bg-background">
        <Navigation user={user} onLogout={handleLogout} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/devocional" element={<DevocionalPage />} />
            <Route path="/hinario" element={<HinarioPage />} />
            <Route path="/biblia" element={<BibliaPageNova />} />
            <Route path="/estudos" element={<EstudosPage />} />
            <Route path="/projetos" element={<ProjetosPage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/conquistas" element={<ConquistasPage />} />
          </Routes>
        </AnimatePresence>
        
        {/* Footer */}
        <motion.footer 
          className="bg-primary text-primary-foreground py-12 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Sobre */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <BookOpen className="h-6 w-6" />
                  </motion.div>
                  <span className="font-bold text-xl">Portal Adventista</span>
                </div>
                <p className="text-sm opacity-80">
                  Fortalecendo a fé e conectando corações com a Palavra de Deus
                </p>
              </div>

              {/* Links Rápidos */}
              <div>
                <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
                <div className="space-y-2 text-sm opacity-80">
                  <Link to="/devocional" className="block hover:opacity-100 transition-opacity">Devocional</Link>
                  <Link to="/hinario" className="block hover:opacity-100 transition-opacity">Hinário</Link>
                  <Link to="/biblia" className="block hover:opacity-100 transition-opacity">Bíblia</Link>
                  <Link to="/estudos" className="block hover:opacity-100 transition-opacity">Estudos</Link>
                  <Link to="/projetos" className="block hover:opacity-100 transition-opacity">Projetos</Link>
                </div>
              </div>

              {/* Contato */}
              <div>
                <h3 className="font-bold text-lg mb-4">Contato</h3>
                <div className="space-y-2 text-sm opacity-80">
                  <a href="mailto:wallisonpereiradev@gmail.com" className="block hover:opacity-100 transition-opacity flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>wallisonpereiradev@gmail.com</span>
                  </a>
                  <a href="tel:+5562994791745" className="block hover:opacity-100 transition-opacity flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>(62) 99479-1745</span>
                  </a>
                  <Link to="/contato" className="block hover:opacity-100 transition-opacity flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Formulário de Contato</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-primary-foreground/20 pt-6 text-center">
              <p className="text-xs opacity-60">
                © 2025 Portal Adventista. Todos os direitos reservados. | Desenvolvido por Wallison Pereira
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </Router>
  )
}

export default App

