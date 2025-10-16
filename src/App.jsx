import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
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
  LogOut
} from 'lucide-react'
import './App.css'

// Importar imagens
import mission1 from './assets/06ODUmgeXDAv.jpg'
import mission2 from './assets/ceVxJtPGZzDg.jpeg'
import mission3 from './assets/HF6RqExkDpl0.jpg'
import mission4 from './assets/P07w5fmsquqm.jpg'
import mission5 from './assets/1jBZXZ4E8jtT.jpg'

// Dados de exemplo
const devocionais = [
  {
    id: 1,
    titulo: "A Graça de Deus",
    data: "15 de Outubro, 2025",
    versiculo: "Efésios 2:8",
    texto: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
    reflexao: "A graça de Deus é o fundamento da nossa salvação. Não há nada que possamos fazer para merecê-la, pois é um presente divino. Hoje, reflita sobre como a graça transformou sua vida e agradeça a Deus por Seu amor incondicional."
  },
  {
    id: 2,
    titulo: "Confiança em Deus",
    data: "14 de Outubro, 2025",
    versiculo: "Provérbios 3:5-6",
    texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
    reflexao: "Em tempos de incerteza, somos chamados a confiar plenamente em Deus. Ele conhece o caminho e guiará nossos passos quando depositamos nossa fé Nele."
  }
]

const hinos = [
  { numero: 1, titulo: "Santo, Santo, Santo", categoria: "Adoração" },
  { numero: 2, titulo: "Ó Adorai o Senhor", categoria: "Adoração" },
  { numero: 3, titulo: "O Deus de Abraão Louvai", categoria: "Adoração" },
  { numero: 4, titulo: "Vinde, Cristãos", categoria: "Louvor" },
  { numero: 5, titulo: "Ao Deus de Abraão Louvai", categoria: "Louvor" },
  { numero: 182, titulo: "Cristo Te Chama", categoria: "Convite" },
  { numero: 183, titulo: "Dá Teu Coração a Jesus", categoria: "Convite" },
  { numero: 184, titulo: "Deixa a Luz do Céu Entrar", categoria: "Consagração" }
]

const livrosBiblia = [
  { nome: "Gênesis", capitulos: 50 },
  { nome: "Êxodo", capitulos: 40 },
  { nome: "Levítico", capitulos: 27 },
  { nome: "Números", capitulos: 36 },
  { nome: "Deuteronômio", capitulos: 34 },
  { nome: "Mateus", capitulos: 28 },
  { nome: "Marcos", capitulos: 16 },
  { nome: "Lucas", capitulos: 24 },
  { nome: "João", capitulos: 21 },
  { nome: "Apocalipse", capitulos: 22 }
]

const estudos = [
  {
    id: 1,
    titulo: "Lições de Fé no Livro de Josué",
    trimestre: "4º Trimestre 2025",
    descricao: "Estudos sobre fé, coragem e conquista através da história de Josué e a entrada em Canaã."
  },
  {
    id: 2,
    titulo: "O Livro de Êxodo",
    trimestre: "3º Trimestre 2025",
    descricao: "A libertação do povo de Israel e as lições sobre liberdade e obediência a Deus."
  },
  {
    id: 3,
    titulo: "Jesus e as Escrituras Sagradas",
    tipo: "Estudo Bíblico",
    descricao: "Como Jesus utilizava e ensinava as Escrituras, revelando o plano da salvação."
  },
  {
    id: 4,
    titulo: "O Santuário - O Caminho de Deus",
    tipo: "Estudo Temático",
    descricao: "Compreendendo o plano da salvação através do santuário terrestre e celestial."
  }
]

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

// Componente de Navegação
function Navigation({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>Portal Adventista</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-accent transition-colors flex items-center space-x-1">
              <HomeIcon className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <Link to="/devocional" className="hover:text-accent transition-colors flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>Devocional</span>
            </Link>
            <Link to="/hinario" className="hover:text-accent transition-colors flex items-center space-x-1">
              <Music className="h-4 w-4" />
              <span>Hinário</span>
            </Link>
            <Link to="/biblia" className="hover:text-accent transition-colors flex items-center space-x-1">
              <BookText className="h-4 w-4" />
              <span>Bíblia</span>
            </Link>
            <Link to="/estudos" className="hover:text-accent transition-colors flex items-center space-x-1">
              <GraduationCap className="h-4 w-4" />
              <span>Estudos</span>
            </Link>
            <Link to="/projetos" className="hover:text-accent transition-colors flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>Projetos</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{user.nome}</span>
                </span>
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
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-accent transition-colors">Início</Link>
            <Link to="/devocional" className="block py-2 hover:text-accent transition-colors">Devocional</Link>
            <Link to="/hinario" className="block py-2 hover:text-accent transition-colors">Hinário</Link>
            <Link to="/biblia" className="block py-2 hover:text-accent transition-colors">Bíblia</Link>
            <Link to="/estudos" className="block py-2 hover:text-accent transition-colors">Estudos</Link>
            <Link to="/projetos" className="block py-2 hover:text-accent transition-colors">Projetos</Link>
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
          </div>
        )}
      </div>
    </nav>
  )
}

// Página Inicial
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            Bem-vindo ao Portal Adventista
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Seu espaço para crescimento espiritual com devocionais, hinário, bíblia, estudos e projetos missionários
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/devocional">
              <Button size="lg" className="text-lg">
                Devocional do Dia
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/estudos">
              <Button size="lg" variant="outline" className="text-lg">
                Explorar Estudos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/devocional">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <Heart className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Devocional Diário</CardTitle>
                  <CardDescription>
                    Meditações e reflexões para fortalecer sua fé todos os dias
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/hinario">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <Music className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Hinário Adventista</CardTitle>
                  <CardDescription>
                    Acesse todos os hinos do hinário adventista com letras completas
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/biblia">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <BookText className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Bíblia Sagrada</CardTitle>
                  <CardDescription>
                    Leia e estude a Palavra de Deus com ferramentas de busca
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/estudos">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Estudos Bíblicos</CardTitle>
                  <CardDescription>
                    Lições da Escola Sabatina e estudos temáticos aprofundados
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/projetos">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Projetos Missionários</CardTitle>
                  <CardDescription>
                    Conheça e apoie missões ao redor do mundo
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-primary to-secondary text-primary-foreground h-full">
              <CardHeader>
                <BookOpen className="h-12 w-12 mb-4" />
                <CardTitle className="text-primary-foreground">Comunidade</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Conecte-se com outros membros e compartilhe sua jornada de fé
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece sua jornada espiritual hoje
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Cadastre-se gratuitamente e tenha acesso a todos os recursos
          </p>
          <Link to="/login">
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg">
              Criar Conta Gratuita
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Página de Login/Cadastro
function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      // Simular login
      onLogin({ nome: formData.nome || 'Usuário', email: formData.email })
      navigate('/')
    } else {
      // Simular cadastro
      if (formData.senha === formData.confirmarSenha) {
        onLogin({ nome: formData.nome, email: formData.email })
        navigate('/')
      } else {
        alert('As senhas não coincidem')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
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
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input 
                  id="nome" 
                  type="text" 
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
            )}
            
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

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input 
                  id="confirmarSenha" 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                  required
                />
              </div>
            )}

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
    </div>
  )
}

// Página de Devocional
function DevocionalPage() {
  const [selectedDevocional, setSelectedDevocional] = useState(devocionais[0])

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Devocional Diário</h1>
          <p className="text-muted-foreground">Fortaleça sua fé com reflexões diárias</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Devocionais */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Devocionais Recentes</h2>
            {devocionais.map((dev) => (
              <Card 
                key={dev.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedDevocional.id === dev.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedDevocional(dev)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{dev.titulo}</CardTitle>
                  <CardDescription>{dev.data}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Devocional Selecionado */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Heart className="h-4 w-4" />
                  <span>{selectedDevocional.data}</span>
                </div>
                <CardTitle className="text-3xl mb-4">{selectedDevocional.titulo}</CardTitle>
                <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-semibold text-primary mb-2">{selectedDevocional.versiculo}</p>
                  <p className="italic">{selectedDevocional.texto}</p>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-3">Reflexão</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedDevocional.reflexao}</p>
                
                <div className="mt-6 pt-6 border-t">
                  <Button className="w-full md:w-auto">
                    <Heart className="mr-2 h-4 w-4" />
                    Adicionar aos Favoritos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Página de Hinário
function HinarioPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = ['Todos', 'Adoração', 'Louvor', 'Convite', 'Consagração']
  
  const filteredHinos = hinos.filter(hino => {
    const matchesSearch = hino.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hino.numero.toString().includes(searchTerm)
    const matchesCategory = selectedCategory === 'Todos' || hino.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Hinário Adventista</h1>
          <p className="text-muted-foreground">Explore e cante os hinos da nossa fé</p>
        </div>

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
                <TabsList>
                  {categories.map(cat => (
                    <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Hinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHinos.map((hino) => (
            <Card key={hino.numero} className="hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Music className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">Hino {hino.numero}</span>
                    </div>
                    <CardTitle className="text-lg">{hino.titulo}</CardTitle>
                    <CardDescription className="mt-1">{hino.categoria}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filteredHinos.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum hino encontrado</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Página da Bíblia
function BibliaPage() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(1)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Bíblia Sagrada</h1>
          <p className="text-muted-foreground">Leia e estude a Palavra de Deus</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seleção de Livro */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Livros da Bíblia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {livrosBiblia.map((livro) => (
                  <button
                    key={livro.nome}
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
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo */}
          <div className="lg:col-span-2">
            {selectedBook ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedBook.nome} {selectedChapter}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {Array.from({ length: selectedBook.capitulos }, (_, i) => i + 1).map((cap) => (
                      <Button
                        key={cap}
                        variant={cap === selectedChapter ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedChapter(cap)}
                      >
                        {cap}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground italic mb-4">
                      Selecione um capítulo para ler o conteúdo completo.
                    </p>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <p className="mb-4">
                        <sup className="text-primary font-bold">1</sup> No princípio criou Deus os céus e a terra.
                      </p>
                      <p className="mb-4">
                        <sup className="text-primary font-bold">2</sup> E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.
                      </p>
                      <p className="text-sm text-muted-foreground italic mt-6">
                        * Conteúdo de exemplo. Integração com API de Bíblia será implementada.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <BookText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Selecione um livro para começar a leitura</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Página de Estudos
function EstudosPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Estudos Bíblicos</h1>
          <p className="text-muted-foreground">Aprofunde seu conhecimento da Palavra de Deus</p>
        </div>

        <Tabs defaultValue="escola-sabatina" className="mb-6">
          <TabsList>
            <TabsTrigger value="escola-sabatina">Escola Sabatina</TabsTrigger>
            <TabsTrigger value="estudos-tematicos">Estudos Temáticos</TabsTrigger>
          </TabsList>

          <TabsContent value="escola-sabatina" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {estudos.filter(e => e.trimestre).map((estudo) => (
                <Card key={estudo.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>{estudo.trimestre}</span>
                    </div>
                    <CardTitle>{estudo.titulo}</CardTitle>
                    <CardDescription>{estudo.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Acessar Lições
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="estudos-tematicos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {estudos.filter(e => e.tipo).map((estudo) => (
                <Card key={estudo.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{estudo.tipo}</span>
                    </div>
                    <CardTitle>{estudo.titulo}</CardTitle>
                    <CardDescription>{estudo.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Começar Estudo
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recursos Adicionais */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle>Recursos de Estudo</CardTitle>
            <CardDescription>Ferramentas para aprofundar seu aprendizado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Comentários Bíblicos</h3>
                  <p className="text-sm text-muted-foreground">Análises detalhadas de cada livro</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Guias de Estudo</h3>
                  <p className="text-sm text-muted-foreground">Roteiros estruturados de aprendizado</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Grupos de Estudo</h3>
                  <p className="text-sm text-muted-foreground">Conecte-se com outros estudantes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Projetos Missionários</h1>
          <p className="text-muted-foreground">Conheça e apoie missões ao redor do mundo</p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projetos.map((projeto) => (
            <Card 
              key={projeto.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedProjeto(projeto)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={projeto.imagem} 
                  alt={projeto.titulo}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                  <Globe className="h-4 w-4" />
                  <span>{projeto.localizacao}</span>
                </div>
                <CardTitle>{projeto.titulo}</CardTitle>
                <CardDescription>{projeto.descricao}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Detalhes do Projeto Selecionado */}
        {selectedProjeto && (
          <Card className="mb-8">
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
        )}

        {/* Informações sobre Missão Global */}
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
              <div>
                <h3 className="font-bold text-lg mb-2">Ore</h3>
                <p className="text-sm opacity-90">
                  Interceda pelos missionários e pelos que ainda não conhecem o evangelho
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Contribua</h3>
                <p className="text-sm opacity-90">
                  Apoie financeiramente os projetos missionários ao redor do mundo
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Vá</h3>
                <p className="text-sm opacity-90">
                  Considere ser um missionário voluntário e levar esperança a outros povos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Componente Principal
function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/devocional" element={<DevocionalPage />} />
          <Route path="/hinario" element={<HinarioPage />} />
          <Route path="/biblia" element={<BibliaPage />} />
          <Route path="/estudos" element={<EstudosPage />} />
          <Route path="/projetos" element={<ProjetosPage />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">Portal Adventista</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Fortalecendo a fé e conectando corações com a Palavra de Deus
            </p>
            <p className="text-xs opacity-60">
              © 2025 Portal Adventista. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

