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
  BookMarked,
  LogOut
} from 'lucide-react'
import { 
  getCurrentUser, 
  updateUserProfile, 
  updatePreferences,
  getUserStats,
  getReadingHistory,
  getBookmarks,
  getNotes,
  logoutUser
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
    
    const tab = searchParams.get('tab')
    if (tab && ['info', 'history', 'bookmarks', 'notes', 'settings'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [])
  
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  const handleSaveProfile = () => {
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

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      const result = logoutUser()
      if (result.success) {
        alert('✅ ' + result.message)
        window.location.href = '/'
      }
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4 pb-24">
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

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setEditing(!editing)}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {editing ? 'Cancelar' : 'Editar Perfil'}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja sair?')) {
                        logoutUser()
                        window.location.href = '/login'
                      }
                    }}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
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
              <div className="text-3xl font-bold text-primary">{stats?.devotionalsCompleted || 0}</div>
              <div className="text-sm text-muted-foreground">Devocionais</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Abas de Navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {/* CORREÇÃO AQUI: Usando flex e overflow-x-auto para mobile */}
            <TabsList className="flex w-full justify-start overflow-x-auto gap-1 p-1 bg-muted/50 rounded-lg">
              <TabsTrigger value="info" className="flex-shrink-0 px-4 py-2 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Info</TabsTrigger>
              <TabsTrigger value="history" className="flex-shrink-0 px-4 py-2 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Histórico</TabsTrigger>
              <TabsTrigger value="bookmarks" className="flex-shrink-0 px-4 py-2 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Marcados</TabsTrigger>
              <TabsTrigger value="notes" className="flex-shrink-0 px-4 py-2 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Notas</TabsTrigger>
              <TabsTrigger value="settings" className="flex-shrink-0 px-4 py-2 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Config</TabsTrigger>
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
                    <Label htmlFor="theme-toggle" className="flex items-center gap-2">
                      {isDark ? <Moon /> : <Sun />} Tema Escuro
                    </Label>
                    <div 
                      id="theme-toggle"
                      onClick={handleToggleTheme} 
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${isDark ? 'bg-primary' : 'bg-gray-200'}`}>
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-toggle" className="flex items-center gap-2">
                      <Bell /> Notificações
                    </Label>
                    <div 
                      id="notifications-toggle"
                      onClick={handleToggleNotifications} 
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${user.preferences?.notifications ? 'bg-primary' : 'bg-gray-200'}`}>
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${user.preferences?.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <BookOpen /> Versão da Bíblia
                    </Label>
                    <Button variant="outline" onClick={handleChangeBibleVersion}>
                      {user.preferences?.bibleVersion?.toUpperCase() || 'ARC'}
                    </Button>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <Button variant="destructive" onClick={handleLogout} className="w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair da Conta
                    </Button>
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

