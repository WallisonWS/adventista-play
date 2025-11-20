import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Função auxiliar para calcular o progresso
const calculateProgress = (planId, completedDays, totalDays) => {
  if (totalDays === 0) return 0
  return Math.min(100, Math.round((completedDays / totalDays) * 100))
}

// Estado inicial com dados mockados para o plano "Bíblia em 1 Ano" (id: 'biblia-ano')
// O total de dias para 'biblia-ano' é 365.
const initialProgress = {
  'biblia-ano': {
    completedDays: 296, // 81% de 365 é ~295.65. Usando 296 para simular o 81% da imagem.
    totalDays: 365,
    lastRead: 'Lucas 9 a 11',
    progressPercent: calculateProgress('biblia-ano', 296, 365)
  },
  'devocional-diario': {
    completedDays: 296, // Simula o 296 de 365 da imagem
    totalDays: 365,
    lastRead: 'Reflexão diária',
    progressPercent: calculateProgress('devocional-diario', 296, 365)
  }
}

export const useReadingProgress = create(
  persist(
    (set, get) => ({
      progress: initialProgress,

      // Função para marcar um dia de leitura como concluído
      markDayAsCompleted: (planId, dayNumber, readingText) => {
        set((state) => {
          const plan = state.progress[planId]
          if (!plan) return state

          // Se o dia já foi marcado, não faz nada
          if (plan.completedDays >= dayNumber) return state

          const newCompletedDays = dayNumber
          const newProgressPercent = calculateProgress(planId, newCompletedDays, plan.totalDays)

          return {
            progress: {
              ...state.progress,
              [planId]: {
                ...plan,
                completedDays: newCompletedDays,
                lastRead: readingText,
                progressPercent: newProgressPercent
              }
            }
          }
        })
      },

      // Função para obter o progresso de um plano específico
      getProgress: (planId) => {
        return get().progress[planId] || { completedDays: 0, totalDays: 0, lastRead: 'Nenhum progresso', progressPercent: 0 }
      },

      // Função para inicializar um novo plano de leitura
      initializePlan: (planId, totalDays) => {
        set((state) => {
          if (state.progress[planId]) return state // Já existe

          return {
            progress: {
              ...state.progress,
              [planId]: {
                completedDays: 0,
                totalDays: totalDays,
                lastRead: 'Comece sua jornada',
                progressPercent: 0
              }
            }
          }
        })
      },

      // Função para resetar o progresso (apenas para testes)
      resetProgress: () => set({ progress: initialProgress })
    }),
    {
      name: 'adventista-play-reading-progress', // Nome no localStorage
      storage: createJSONStorage(() => localStorage), // Usar localStorage
    }
  )
)

// Exemplo de uso:
// const { getProgress, markDayAsCompleted } = useReadingProgress()
// const bibliaProgress = getProgress('biblia-ano')
// markDayAsCompleted('biblia-ano', 297, 'Lucas 12 a 14')
