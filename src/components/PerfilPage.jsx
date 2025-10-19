import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Church,
  Award,
  BookOpen,
  Heart,
  GraduationCap,
  TrendingUp,
  Settings,
  Bell,
  Moon,
  Sun,
  Save,
  Camera,
  Edit,
  BookMarked
} from 'lucide-react'
import { 
  getCurrentUser, 
  updateUserProfile, 
  updatePreferences,
  getUserStats,
  getReadingHistory,
  getBookmarks,
  getNotes
} from '../services/authService.js'
import { useTheme } from '../contexts/ThemeContext'

export function PerfilPage() {
  const { theme, toggleTheme, isDark, colorTheme, setColorTheme } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [history, setHistory] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [notes, setNotes] = useState([])
  const [activeTab, setActiveTab] = useState('info')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setFormData(currentUser)
      setStats(getUserStats())
      setHistory(getReadingHistory())
      setBookmarks(getBookmarks())
      setNotes(getNotes())
    }
    
    // Verificar parâmetro de aba na URL
    const tab = searchParams.get('tab')
    if (tab && ['info', 'history', 'bookmarks', 'notes', 'settings'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [])
  
  // Atualizar URL quando aba mudar
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  const handleSaveProfile = () => {
    // Validar campos obrigatórios
    if (!formData.nome || formData.nome.trim() === '') {
      alert('Por favor, preencha o nome')
      return
    }
    
    const result = updateUserProfile(formData)
    if (result.success) {
      setUser(result.user)
      setEditing(false)
      alert('✅ ' + result.message)
    } else {
      alert('❌ ' + result.message)
    }
  }

  const handleToggleTheme = () => {
    toggleTheme()
    // Também atualiza no perfil do usuário
    if (user && user.preferences) {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      const result = updatePreferences({ theme: newTheme })
      if (result.success) {
        setUser(result.user)
      }
    }
  }

  const handleUploadPhoto = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = updateUserProfile({ fotoPerfil: event.target.result })
          if (result.success) {
            setUser(result.user)
            setFormData(result.user)
            alert('✅ Foto atualizada com sucesso!')
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleToggleNotifications = () => {
    if (!user.preferences) {
      user.preferences = { notifications: true }
    }
    const newValue = !user.preferences.notifications
    const result = updatePreferences({ notifications: newValue })
    if (result.success) {
      setUser(result.user)
      alert(`✅ Notificações ${newValue ? 'ativadas' : 'desativadas'}!`)
    }
  }

  const handleChangeBibleVersion = () => {
    const versions = ['arc', 'acf', 'nvi']
    const versionNames = { arc: 'Almeida Revista e Corrigida', acf: 'Almeida Corrigida Fiel', nvi: 'Nova Versão Internacional' }
    const currentVersion = user.preferences?.bibleVersion || 'arc'
    const currentIndex = versions.indexOf(currentVersion)
    const nextVersion = versions[(currentIndex + 1) % versions.length]
    
    const result = updatePreferences({ bibleVersion: nextVersion })
    if (result.success) {
      setUser(result.user)
      alert(`✅ Versão alterada para: ${versionNames[nextVersion]}`)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Perfil não encontrado</p>
            <p className="text-sm text-muted-foreground mb-4">Você precisa fazer login para acessar seu perfil.</p>
            <Button onClick={() => window.location.href = '/login'}>Fazer Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header do Perfil */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Foto de Perfil */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl font-bold backdrop-blur-sm">
                    {user.fotoPerfil ? (
                      <img src={user.fotoPerfil} alt={user.nome} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.nome.charAt(0).toUpperCase()
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUploadPhoto}
                    className="absolute bottom-0 right-0 bg-white text-primary p-2 rounded-full shadow-lg cursor-pointer"
                    title="Alterar foto de perfil"
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                </motion.div>

                {/* Informações Básicas */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.nome}</h1>
                  <p className="text-lg opacity-90 mb-4">{user.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {user.cargo && (
                      <Badge variant="secondary" className="bg-white/20">
                        <Award className="h-3 w-3 mr-1" />
                        {user.cargo}
                      </Badge>
                    )}
                    {user.igreja && (
                      <Badge variant="secondary" className="bg-white/20">
                        <Church className="h-3 w-3 mr-1" />
                        {user.igreja}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/20">
                      <Calendar className="h-3 w-3 mr-1" />
                      Membro desde {new Date(user.dataCadastro).toLocaleDateString('pt-BR')}
                    </Badge>
                  </div>
                </div>

                {/* Botão de Editar */}
                <div>
                  <Button
                    variant="secondary"
                    onClick={() => setEditing(!editing)}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {editing ? 'Cancelar' : 'Editar Perfil'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              </motion.div>
              <div className="text-3xl font-bold text-primary">{stats?.daysActive || 0}</div>
              <div className="text-sm text-muted-foreground">Dias Ativos</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">{stats?.chaptersRead || 0}</div>
              <div className="text-sm text-muted-foreground">Capítulos Lidos</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">{stats?.studiesCompleted || 0}</div>
              <div className="text-sm text-muted-foreground">Estudos Concluídos</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">{stats?.devotionalsRead || 0}</div>
              <div className="text-sm text-muted-foreground">Devocionais Lidos</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs de Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="bookmarks">Marcadores</TabsTrigger>
              <TabsTrigger value="notes">Anotações</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            {/* Aba de Informações */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    {editing ? 'Edite suas informações abaixo' : 'Suas informações pessoais'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nome"
                          value={formData.nome || ''}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                          disabled={!editing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email || ''}
                          disabled
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="telefone"
                          value={formData.telefone || ''}
                          onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                          disabled={!editing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dataNascimento"
                          type="date"
                          value={formData.dataNascimento || ''}
                          onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                          disabled={!editing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="igreja">Igreja</Label>
                      <div className="relative">
                        <Church className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="igreja"
                          value={formData.igreja || ''}
                          onChange={(e) => setFormData({...formData, igreja: e.target.value})}
                          disabled={!editing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo/Função</Label>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="cargo"
                          value={formData.cargo || ''}
                          onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                          disabled={!editing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {editing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Button onClick={handleSaveProfile} className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Histórico */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Leitura</CardTitle>
                  <CardDescription>Suas leituras recentes</CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length > 0 ? (
                    <div className="space-y-3">
                      {history.slice(0, 10).map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              {item.type === 'bible' && <BookOpen className="h-4 w-4 text-primary" />}
                              {item.type === 'devotional' && <Heart className="h-4 w-4 text-primary" />}
                              {item.type === 'study' && <GraduationCap className="h-4 w-4 text-primary" />}
                            </div>
                            <div>
                              <div className="font-semibold">{item.title}</div>
                              <div className="text-sm text-muted-foreground">{item.reference}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('pt-BR')}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum histórico ainda</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Marcadores */}
            <TabsContent value="bookmarks">
              <Card>
                <CardHeader>
                  <CardTitle>Marcadores</CardTitle>
                  <CardDescription>Seus versículos e textos favoritos</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookmarks.length > 0 ? (
                    <div className="space-y-3">
                      {bookmarks.map((bookmark, index) => (
                        <motion.div
                          key={bookmark.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="font-semibold text-primary mb-2">{bookmark.reference}</div>
                          <div className="text-sm mb-2">{bookmark.text}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(bookmark.date).toLocaleDateString('pt-BR')}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookMarked className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum marcador ainda</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Anotações */}
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Anotações</CardTitle>
                  <CardDescription>Suas reflexões e estudos pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  {notes.length > 0 ? (
                    <div className="space-y-4">
                      {notes.map((note, index) => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{note.title}</div>
                            <Badge variant="outline">{note.reference}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{note.content}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(note.date).toLocaleDateString('pt-BR')}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Edit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma anotação ainda</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Configurações */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>Personalize sua experiência</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDark ? (
                        <Moon className="h-5 w-5 text-primary" />
                      ) : (
                        <Sun className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <div className="font-semibold">Modo Noturno</div>
                        <div className="text-sm text-muted-foreground">
                          {isDark ? 'Ativado' : 'Desativado'}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleToggleTheme}>
                      {isDark ? '🌙 Escuro' : '☀️ Claro'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Notificações</div>
                        <div className="text-sm text-muted-foreground">
                          Receber lembretes e atualizações
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleToggleNotifications}>
                      {user.preferences?.notifications ? 'Ativado' : 'Desativado'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Versão da Bíblia Padrão</div>
                        <div className="text-sm text-muted-foreground">
                          {user.preferences.bibleVersion.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleChangeBibleVersion}>Alterar</Button>
                  </div>

                  <div>
                    <div className="font-semibold mb-3">Tema de Cores</div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: 'blue', label: 'Azul', color: '#2563eb' },
                        { name: 'green', label: 'Verde', color: '#10b981' },
                        { name: 'purple', label: 'Roxo', color: '#8b5cf6' },
                        { name: 'pink', label: 'Rosa', color: '#ec4899' },
                        { name: 'orange', label: 'Laranja', color: '#f59e0b' },
                        { name: 'red', label: 'Vermelho', color: '#ef4444' }
                      ].map(t => (
                        <button
                          key={t.name}
                          onClick={() => setColorTheme(t.name)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            colorTheme === t.name ? 'border-primary scale-105' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: t.color }}
                        >
                          <div className="text-white font-semibold text-sm">{t.label}</div>
                          {colorTheme === t.name && (
                            <div className="text-white text-xs mt-1">✓ Ativo</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

