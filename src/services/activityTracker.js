// Serviço para rastrear atividades do usuário

const ACTIVITY_KEY = 'user_activities'
const MAX_ACTIVITIES = 10

// Tipos de atividade
export const ActivityType = {
  DEVOCIONAL: 'devocional',
  BIBLIA: 'biblia',
  ESTUDO: 'estudo',
  HINARIO: 'hinario',
  ESPECIALIDADE: 'especialidade',
  CURSO: 'curso'
}

// Adicionar nova atividade
export function addActivity(type, title, description, metadata = {}) {
  try {
    const activities = getActivities()
    
    const newActivity = {
      id: Date.now(),
      type,
      title,
      description,
      timestamp: new Date().toISOString(),
      ...metadata
    }
    
    // Adiciona no início do array
    activities.unshift(newActivity)
    
    // Limita o número de atividades
    const limitedActivities = activities.slice(0, MAX_ACTIVITIES)
    
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(limitedActivities))
    
    return newActivity
  } catch (error) {
    console.error('Erro ao adicionar atividade:', error)
    return null
  }
}

// Obter todas as atividades
export function getActivities() {
  try {
    const stored = localStorage.getItem(ACTIVITY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Erro ao obter atividades:', error)
    return []
  }
}

// Limpar todas as atividades (usado no logout)
export function clearActivities() {
  try {
    localStorage.removeItem(ACTIVITY_KEY)
    return true
  } catch (error) {
    console.error('Erro ao limpar atividades:', error)
    return false
  }
}

// Formatar tempo relativo (ex: "há 2 horas", "ontem")
export function getRelativeTime(timestamp) {
  const now = new Date()
  const activityDate = new Date(timestamp)
  const diffMs = now - activityDate
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'agora mesmo'
  if (diffMins < 60) return `há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  if (diffDays === 1) return 'ontem'
  if (diffDays < 7) return `há ${diffDays} dias`
  
  // Formatar data completa
  return activityDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Obter ícone para cada tipo de atividade
export function getActivityIcon(type) {
  const icons = {
    [ActivityType.DEVOCIONAL]: '📖',
    [ActivityType.BIBLIA]: '📕',
    [ActivityType.ESTUDO]: '📚',
    [ActivityType.HINARIO]: '🎵',
    [ActivityType.ESPECIALIDADE]: '🏆',
    [ActivityType.CURSO]: '🎓'
  }
  return icons[type] || '📌'
}
