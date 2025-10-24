// Serviço de Progresso de Cursos
import { getCurrentUser } from './authService'

const STORAGE_KEY = 'portal_adventista_curso_progresso'

// Inicializar progresso do usuário
function initUserProgress(userId) {
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  
  if (!allProgress[userId]) {
    allProgress[userId] = {
      cursosEmAndamento: [],
      cursosConcluidos: [],
      licoesCompletadas: {},
      horasEstudadas: 0,
      ultimaAtualizacao: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
  }
  
  return allProgress[userId]
}

// Obter progresso do usuário logado
export function getUserProgress() {
  const user = getCurrentUser()
  if (!user) return null
  
  return initUserProgress(user.id)
}

// Marcar lição como completada
export function marcarLicaoCompletada(cursoId, licaoNumero, tempoEstudo = 0) {
  const user = getCurrentUser()
  if (!user) return { success: false, message: 'Usuário não autenticado' }
  
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  const userProgress = initUserProgress(user.id)
  
  // Inicializar progresso do curso se não existir
  if (!userProgress.licoesCompletadas[cursoId]) {
    userProgress.licoesCompletadas[cursoId] = []
  }
  
  // Adicionar lição se não estiver completada
  if (!userProgress.licoesCompletadas[cursoId].includes(licaoNumero)) {
    userProgress.licoesCompletadas[cursoId].push(licaoNumero)
    userProgress.horasEstudadas += tempoEstudo
    userProgress.ultimaAtualizacao = new Date().toISOString()
    
    // Adicionar curso em andamento se não estiver
    if (!userProgress.cursosEmAndamento.includes(cursoId) && 
        !userProgress.cursosConcluidos.includes(cursoId)) {
      userProgress.cursosEmAndamento.push(cursoId)
    }
    
    allProgress[user.id] = userProgress
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
    
    return { success: true, message: 'Lição completada!' }
  }
  
  return { success: false, message: 'Lição já completada' }
}

// Marcar curso como concluído
export function marcarCursoConcluido(cursoId) {
  const user = getCurrentUser()
  if (!user) return { success: false, message: 'Usuário não autenticado' }
  
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  const userProgress = initUserProgress(user.id)
  
  // Remover de em andamento
  userProgress.cursosEmAndamento = userProgress.cursosEmAndamento.filter(id => id !== cursoId)
  
  // Adicionar em concluídos se não estiver
  if (!userProgress.cursosConcluidos.includes(cursoId)) {
    userProgress.cursosConcluidos.push(cursoId)
    userProgress.ultimaAtualizacao = new Date().toISOString()
    
    allProgress[user.id] = userProgress
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
    
    return { success: true, message: 'Curso concluído! Parabéns! 🎉' }
  }
  
  return { success: false, message: 'Curso já concluído' }
}

// Obter estatísticas do usuário
export function getProgressStats() {
  const user = getCurrentUser()
  if (!user) {
    return {
      concluidos: 0,
      emAndamento: 0,
      horasEstudadas: 0
    }
  }
  
  const userProgress = initUserProgress(user.id)
  
  return {
    concluidos: userProgress.cursosConcluidos.length,
    emAndamento: userProgress.cursosEmAndamento.length,
    horasEstudadas: Math.round(userProgress.horasEstudadas)
  }
}

// Obter progresso de um curso específico
export function getCursoProgress(cursoId, totalLicoes) {
  const user = getCurrentUser()
  if (!user) return 0
  
  const userProgress = initUserProgress(user.id)
  const licoesCompletadas = userProgress.licoesCompletadas[cursoId] || []
  
  return Math.round((licoesCompletadas.length / totalLicoes) * 100)
}

// Verificar se curso está concluído
export function isCursoConcluido(cursoId) {
  const user = getCurrentUser()
  if (!user) return false
  
  const userProgress = initUserProgress(user.id)
  return userProgress.cursosConcluidos.includes(cursoId)
}

// Verificar se curso está em andamento
export function isCursoEmAndamento(cursoId) {
  const user = getCurrentUser()
  if (!user) return false
  
  const userProgress = initUserProgress(user.id)
  return userProgress.cursosEmAndamento.includes(cursoId)
}

// Adicionar tempo de estudo
export function adicionarTempoEstudo(minutos) {
  const user = getCurrentUser()
  if (!user) return { success: false }
  
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  const userProgress = initUserProgress(user.id)
  
  userProgress.horasEstudadas += minutos / 60
  userProgress.ultimaAtualizacao = new Date().toISOString()
  
  allProgress[user.id] = userProgress
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
  
  return { success: true }
}

// Resetar progresso (para testes)
export function resetarProgresso() {
  const user = getCurrentUser()
  if (!user) return { success: false }
  
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  delete allProgress[user.id]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
  
  return { success: true, message: 'Progresso resetado!' }
}

