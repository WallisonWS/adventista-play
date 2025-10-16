// Serviço de autenticação com localStorage

const STORAGE_KEYS = {
  USER: 'portal_adventista_user',
  USERS_DB: 'portal_adventista_users',
  PREFERENCES: 'portal_adventista_preferences',
  READING_HISTORY: 'portal_adventista_reading_history',
  BOOKMARKS: 'portal_adventista_bookmarks',
  NOTES: 'portal_adventista_notes',
  STUDY_PROGRESS: 'portal_adventista_study_progress'
}

// Inicializar banco de dados de usuários
function initUsersDB() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS_DB)
  if (!users) {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify([]))
  }
}

// Registrar novo usuário
export function registerUser(userData) {
  initUsersDB()
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  
  // Verificar se email já existe
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'Este email já está cadastrado!' }
  }
  
  // Criar novo usuário
  const newUser = {
    id: Date.now().toString(),
    nome: userData.nome,
    email: userData.email,
    senha: btoa(userData.senha), // Codificação simples (em produção usar hash real)
    telefone: userData.telefone || '',
    dataNascimento: userData.dataNascimento || '',
    igreja: userData.igreja || '',
    cargo: userData.cargo || '',
    fotoPerfil: userData.fotoPerfil || '',
    dataCadastro: new Date().toISOString(),
    ultimoAcesso: new Date().toISOString(),
    preferences: {
      theme: 'light',
      fontSize: 'medium',
      bibleVersion: 'arc',
      notifications: true,
      dailyDevotional: true
    },
    stats: {
      daysActive: 0,
      chaptersRead: 0,
      studiesCompleted: 0,
      devotionalsRead: 0
    }
  }
  
  users.push(newUser)
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  
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
  
  // Atualizar último acesso
  user.ultimoAcesso = new Date().toISOString()
  user.stats.daysActive++
  
  const userIndex = users.findIndex(u => u.id === user.id)
  users[userIndex] = user
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  
  // Salvar usuário logado
  const userToSave = { ...user }
  delete userToSave.senha // Não salvar senha no storage do usuário logado
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

// Atualizar preferências
export function updatePreferences(preferences) {
  const currentUser = getCurrentUser()
  if (!currentUser) return { success: false, message: 'Usuário não autenticado!' }
  
  return updateUserProfile({ preferences: { ...currentUser.preferences, ...preferences } })
}

// Adicionar ao histórico de leitura
export function addToReadingHistory(item) {
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_HISTORY) || '[]')
  
  const newItem = {
    id: Date.now().toString(),
    userId: currentUser.id,
    type: item.type, // 'bible', 'devotional', 'study', 'hymn'
    title: item.title,
    reference: item.reference,
    date: new Date().toISOString()
  }
  
  history.unshift(newItem)
  
  // Manter apenas os últimos 100 itens
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
  
  return { success: true, message: 'Marcador adicionado!', bookmark: newBookmark }
}

// Remover marcador
export function removeBookmark(bookmarkId) {
  const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]')
  const filtered = bookmarks.filter(b => b.id !== bookmarkId)
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered))
  return { success: true, message: 'Marcador removido!' }
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
  
  // Atualizar estatísticas do usuário
  if (completed) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex].stats.studiesCompleted++
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

// Incrementar capítulos lidos
export function incrementChaptersRead() {
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB))
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  
  if (userIndex !== -1) {
    users[userIndex].stats.chaptersRead++
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
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
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  }
}

