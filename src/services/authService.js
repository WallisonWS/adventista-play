// Serviço de autenticação simplificado com gamificação

const STORAGE_KEYS = {
  USER: 'portal_adventista_user',
  USERS_DB: 'portal_adventista_users',
  PREFERENCES: 'portal_adventista_preferences',
  READING_HISTORY: 'portal_adventista_reading_history',
  BOOKMARKS: 'portal_adventista_bookmarks',
  NOTES: 'portal_adventista_notes',
  STUDY_PROGRESS: 'portal_adventista_study_progress',
  ACHIEVEMENTS: 'portal_adventista_achievements',
  DAILY_GOALS: 'portal_adventista_daily_goals',
  STREAKS: 'portal_adventista_streaks'
}

// Conquistas disponíveis
export const ACHIEVEMENTS = [
  { id: 'first_login', title: 'Bem-vindo!', description: 'Fez seu primeiro login', icon: '👋', points: 10 },
  { id: 'read_bible_1', title: 'Leitor Iniciante', description: 'Leu 1 capítulo da Bíblia', icon: '📖', points: 20 },
  { id: 'read_bible_10', title: 'Leitor Dedicado', description: 'Leu 10 capítulos da Bíblia', icon: '📚', points: 50 },
  { id: 'read_bible_50', title: 'Estudioso', description: 'Leu 50 capítulos da Bíblia', icon: '🎓', points: 100 },
  { id: 'read_bible_100', title: 'Mestre da Palavra', description: 'Leu 100 capítulos da Bíblia', icon: '👑', points: 200 },
  { id: 'devotional_7', title: 'Semana Devocional', description: 'Leu devocionais por 7 dias seguidos', icon: '🔥', points: 75 },
  { id: 'devotional_30', title: 'Mês Devocional', description: 'Leu devocionais por 30 dias seguidos', icon: '⭐', points: 150 },
  { id: 'study_complete_1', title: 'Primeiro Estudo', description: 'Completou seu primeiro estudo', icon: '✅', points: 50 },
  { id: 'study_complete_5', title: 'Estudante Aplicado', description: 'Completou 5 estudos', icon: '🏆', points: 150 },
  { id: 'bookmark_10', title: 'Colecionador', description: 'Salvou 10 versículos', icon: '💾', points: 30 },
  { id: 'share_5', title: 'Evangelista Digital', description: 'Compartilhou 5 versículos', icon: '📤', points: 40 },
  { id: 'streak_7', title: 'Consistente', description: '7 dias consecutivos de acesso', icon: '🔥', points: 60 },
  { id: 'streak_30', title: 'Fiel', description: '30 dias consecutivos de acesso', icon: '💪', points: 200 },
  { id: 'early_bird', title: 'Madrugador', description: 'Acessou antes das 6h', icon: '🌅', points: 25 },
  { id: 'night_owl', title: 'Coruja', description: 'Estudou depois das 22h', icon: '🦉', points: 25 }
]

// Inicializar banco de dados de usuários
function initUsersDB() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS_DB)
  if (!users) {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify([]))
  }
}

// Registrar novo usuário (SIMPLIFICADO)
export function registerUser(userData) {
  initUsersDB()
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  
  // Verificar se email já existe
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'Este email já está cadastrado!' }
  }
  
  // Criar novo usuário com dados simplificados
  const newUser = {
    id: Date.now().toString(),
    nome: userData.nome,
    email: userData.email,
    idade: userData.idade,
    senha: btoa(userData.senha), // Codificação simples
    dataCadastro: new Date().toISOString(),
    ultimoAcesso: new Date().toISOString(),
    fotoPerfil: '',
    nivel: 1,
    pontos: 0,
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      bibleVersion: 'arc',
      notifications: true,
      dailyDevotional: true,
      dailyGoal: 15 // minutos por dia
    },
    stats: {
      daysActive: 1,
      chaptersRead: 0,
      studiesCompleted: 0,
      devotionalsRead: 0,
      versesShared: 0,
      notesCreated: 0,
      totalMinutes: 0
    },
    achievements: ['first_login'],
    streak: {
      current: 1,
      longest: 1,
      lastAccess: new Date().toISOString()
    }
  }
  
  users.push(newUser)
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  
  // Dar conquista de primeiro login
  unlockAchievement(newUser.id, 'first_login')
  
  return { success: true, message: 'Cadastro realizado com sucesso!', user: newUser }
}

// Login de usuário
export function loginUser(email, senha) {
  initUsersDB()
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const user = users.find(u => u.email === email && u.senha === btoa(senha))
  
  if (!user) {
    return { success: false, message: 'Email ou senha incorretos!' }
  }
  
  // Atualizar último acesso e streak
  const now = new Date()
  const lastAccess = new Date(user.ultimoAcesso)
  const hoursDiff = (now - lastAccess) / (1000 * 60 * 60)
  
  // Atualizar streak
  if (hoursDiff >= 24 && hoursDiff < 48) {
    // Mantém streak
    user.streak.current++
    if (user.streak.current > user.streak.longest) {
      user.streak.longest = user.streak.current
    }
    
    // Verificar conquistas de streak
    if (user.streak.current === 7 && !user.achievements.includes('streak_7')) {
      unlockAchievement(user.id, 'streak_7')
      user.achievements.push('streak_7')
      user.pontos += 60
    }
    if (user.streak.current === 30 && !user.achievements.includes('streak_30')) {
      unlockAchievement(user.id, 'streak_30')
      user.achievements.push('streak_30')
      user.pontos += 200
    }
  } else if (hoursDiff >= 48) {
    // Quebrou streak
    user.streak.current = 1
  }
  
  user.ultimoAcesso = now.toISOString()
  user.streak.lastAccess = now.toISOString()
  user.stats.daysActive++
  
  // Verificar conquistas de horário
  const hour = now.getHours()
  if (hour < 6 && !user.achievements.includes('early_bird')) {
    unlockAchievement(user.id, 'early_bird')
    user.achievements.push('early_bird')
    user.pontos += 25
  }
  if (hour >= 22 && !user.achievements.includes('night_owl')) {
    unlockAchievement(user.id, 'night_owl')
    user.achievements.push('night_owl')
    user.pontos += 25
  }
  
  // Atualizar nível baseado em pontos
  user.nivel = Math.floor(user.pontos / 100) + 1
  
  const userIndex = users.findIndex(u => u.id === user.id)
  users[userIndex] = user
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  
  // Salvar usuário logado
  const userToSave = { ...user }
  delete userToSave.senha
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userToSave))
  
  return { success: true, message: 'Login realizado com sucesso!', user: userToSave }
}

// Logout
export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.USER)
  return { success: true, message: 'Logout realizado com sucesso!' }
}

// Obter usuário logado
export function getCurrentUser() {
  const user = localStorage.getItem(STORAGE_KEYS.USER)
  return user ? JSON.parse(user) : null
}

// Verificar se está logado
export function isAuthenticated() {
  return getCurrentUser() !== null
}

// Atualizar perfil do usuário
export function updateUserProfile(updates) {
  const currentUser = getCurrentUser()
  if (!currentUser) return { success: false, message: 'Usuário não autenticado!' }
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  
  if (userIndex === -1) return { success: false, message: 'Usuário não encontrado!' }
  
  // Atualizar dados
  users[userIndex] = { ...users[userIndex], ...updates }
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  
  // Atualizar usuário logado
  const updatedUser = { ...users[userIndex] }
  delete updatedUser.senha
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
  
  return { success: true, message: 'Perfil atualizado com sucesso!', user: updatedUser }
}

// Desbloquear conquista
export function unlockAchievement(userId, achievementId) {
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId)
  if (!achievement) return
  
  const achievements = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) || '{}')
  
  if (!achievements[userId]) {
    achievements[userId] = []
  }
  
  if (!achievements[userId].find(a => a.id === achievementId)) {
    achievements[userId].push({
      ...achievement,
      unlockedAt: new Date().toISOString()
    })
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
  }
}

// Obter conquistas do usuário
export function getUserAchievements() {
  const currentUser = getCurrentUser()
  if (!currentUser) return []
  
  const achievements = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) || '{}')
  return achievements[currentUser.id] || []
}

// Incrementar capítulos lidos
export function incrementChaptersRead() {
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  
  if (userIndex !== -1) {
    users[userIndex].stats.chaptersRead++
    users[userIndex].pontos += 10
    
    const chaptersRead = users[userIndex].stats.chaptersRead
    
    // Verificar conquistas
    if (chaptersRead === 1) unlockAchievement(currentUser.id, 'read_bible_1')
    if (chaptersRead === 10) unlockAchievement(currentUser.id, 'read_bible_10')
    if (chaptersRead === 50) unlockAchievement(currentUser.id, 'read_bible_50')
    if (chaptersRead === 100) unlockAchievement(currentUser.id, 'read_bible_100')
    
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
    
    // Atualizar usuário logado
    const updatedUser = { ...users[userIndex] }
    delete updatedUser.senha
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
  }
}

// Incrementar devocionais lidos
export function incrementDevotionalsRead() {
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  
  if (userIndex !== -1) {
    users[userIndex].stats.devotionalsRead++
    users[userIndex].pontos += 5
    
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
    
    // Atualizar usuário logado
    const updatedUser = { ...users[userIndex] }
    delete updatedUser.senha
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
  }
}

// Adicionar ao histórico de leitura
export function addToReadingHistory(item) {
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_HISTORY) || '[]')
  
  const newItem = {
    id: Date.now().toString(),
    userId: currentUser.id,
    type: item.type,
    title: item.title,
    reference: item.reference,
    date: new Date().toISOString()
  }
  
  history.unshift(newItem)
  
  if (history.length > 100) history.pop()
  
  localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(history))
}

// Obter histórico de leitura
export function getReadingHistory() {
  const currentUser = getCurrentUser()
  if (!currentUser) return []
  
  const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_HISTORY) || '[]')
  return history.filter(item => item.userId === currentUser.id)
}

// Adicionar marcador
export function addBookmark(bookmark) {
  const currentUser = getCurrentUser()
  if (!currentUser) return { success: false, message: 'Usuário não autenticado!' }
  
  const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]')
  
  const newBookmark = {
    id: Date.now().toString(),
    userId: currentUser.id,
    type: bookmark.type,
    title: bookmark.title,
    reference: bookmark.reference,
    text: bookmark.text || '',
    date: new Date().toISOString()
  }
  
  bookmarks.push(newBookmark)
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks))
  
  // Atualizar pontos
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  if (userIndex !== -1) {
    users[userIndex].pontos += 2
    
    // Verificar conquista
    const userBookmarks = bookmarks.filter(b => b.userId === currentUser.id)
    if (userBookmarks.length === 10) {
      unlockAchievement(currentUser.id, 'bookmark_10')
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  }
  
  return { success: true, message: 'Marcador adicionado!', bookmark: newBookmark }
}

// Obter marcadores
export function getBookmarks() {
  const currentUser = getCurrentUser()
  if (!currentUser) return []
  
  const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]')
  return bookmarks.filter(b => b.userId === currentUser.id)
}

// Adicionar anotação
export function addNote(note) {
  const currentUser = getCurrentUser()
  if (!currentUser) return { success: false, message: 'Usuário não autenticado!' }
  
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '[]')
  
  const newNote = {
    id: Date.now().toString(),
    userId: currentUser.id,
    type: note.type,
    reference: note.reference,
    title: note.title,
    content: note.content,
    date: new Date().toISOString()
  }
  
  notes.push(newNote)
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes))
  
  // Atualizar stats
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  if (userIndex !== -1) {
    users[userIndex].stats.notesCreated++
    users[userIndex].pontos += 3
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  }
  
  return { success: true, message: 'Anotação salva!', note: newNote }
}

// Obter anotações
export function getNotes() {
  const currentUser = getCurrentUser()
  if (!currentUser) return []
  
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '[]')
  return notes.filter(n => n.userId === currentUser.id)
}

// Atualizar progresso de estudo
export function updateStudyProgress(studyId, lessonNumber, completed = true) {
  const currentUser = getCurrentUser()
  if (!currentUser) return { success: false, message: 'Usuário não autenticado!' }
  
  const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS) || '{}')
  
  if (!progress[currentUser.id]) {
    progress[currentUser.id] = {}
  }
  
  if (!progress[currentUser.id][studyId]) {
    progress[currentUser.id][studyId] = {
      startedAt: new Date().toISOString(),
      lessons: {}
    }
  }
  
  progress[currentUser.id][studyId].lessons[lessonNumber] = {
    completed,
    completedAt: completed ? new Date().toISOString() : null
  }
  
  progress[currentUser.id][studyId].lastAccess = new Date().toISOString()
  
  localStorage.setItem(STORAGE_KEYS.STUDY_PROGRESS, JSON.stringify(progress))
  
  // Atualizar estatísticas
  if (completed) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex].stats.studiesCompleted++
      users[userIndex].pontos += 20
      
      const studiesCompleted = users[userIndex].stats.studiesCompleted
      if (studiesCompleted === 1) unlockAchievement(currentUser.id, 'study_complete_1')
      if (studiesCompleted === 5) unlockAchievement(currentUser.id, 'study_complete_5')
      
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
    }
  }
  
  return { success: true, message: 'Progresso atualizado!' }
}

// Obter progresso de estudo
export function getStudyProgress(studyId) {
  const currentUser = getCurrentUser()
  if (!currentUser) return null
  
  const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_PROGRESS) || '{}')
  return progress[currentUser.id]?.[studyId] || null
}

// Obter estatísticas do usuário
export function getUserStats() {
  const currentUser = getCurrentUser()
  if (!currentUser) return null
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const user = users.find(u => u.id === currentUser.id)
  
  return user?.stats || null
}

// Obter ranking de usuários
export function getUserRanking() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]')
  return users
    .map(u => ({
      id: u.id,
      nome: u.nome,
      pontos: u.pontos,
      nivel: u.nivel,
      streak: u.streak.current
    }))
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 10)
}

// Atualizar preferências
export function updatePreferences(preferences) {
  const currentUser = getCurrentUser()
  if (!currentUser) return { success: false, message: 'Usuário não autenticado!' }
  
  return updateUserProfile({ preferences: { ...currentUser.preferences, ...preferences } })
}

