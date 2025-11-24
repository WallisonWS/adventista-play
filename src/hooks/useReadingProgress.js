import { create } from 'zustand';

/**
 * Hook para gerenciar o progresso de leitura do usuário
 * Armazena informações sobre capítulos lidos, progresso de cursos, etc.
 */
export const useReadingProgress = create((set, get) => ({
  // Estado do progresso
  readChapters: {},
  courseProgress: {},
  lastReadPosition: {},
  
  /**
   * Marca um capítulo como lido
   * @param {string} bookId - ID do livro
   * @param {number} chapterId - ID do capítulo
   */
  markChapterAsRead: (bookId, chapterId) => {
    set((state) => ({
      readChapters: {
        ...state.readChapters,
        [bookId]: {
          ...(state.readChapters[bookId] || {}),
          [chapterId]: true
        }
      }
    }));
  },
  
  /**
   * Atualiza o progresso de um curso
   * @param {string} courseId - ID do curso
   * @param {number} progress - Progresso (0-100)
   */
  updateCourseProgress: (courseId, progress) => {
    set((state) => ({
      courseProgress: {
        ...state.courseProgress,
        [courseId]: progress
      }
    }));
  },
  
  /**
   * Salva a última posição de leitura
   * @param {string} contentId - ID do conteúdo
   * @param {object} position - Posição (página, scroll, etc.)
   */
  saveLastPosition: (contentId, position) => {
    set((state) => ({
      lastReadPosition: {
        ...state.lastReadPosition,
        [contentId]: {
          ...position,
          timestamp: new Date().toISOString()
        }
      }
    }));
  },
  
  /**
   * Obtém a última posição de leitura
   * @param {string} contentId - ID do conteúdo
   * @returns {object|null} Última posição ou null
   */
  getLastPosition: (contentId) => {
    return get().lastReadPosition[contentId] || null;
  },
  
  /**
   * Verifica se um capítulo foi lido
   * @param {string} bookId - ID do livro
   * @param {number} chapterId - ID do capítulo
   * @returns {boolean} True se foi lido
   */
  isChapterRead: (bookId, chapterId) => {
    const state = get();
    return state.readChapters[bookId]?.[chapterId] || false;
  },
  
  /**
   * Obtém o progresso de um curso
   * @param {string} courseId - ID do curso
   * @returns {number} Progresso (0-100)
   */
  getCourseProgress: (courseId) => {
    return get().courseProgress[courseId] || 0;
  },
  
  /**
   * Limpa todo o progresso
   */
  clearProgress: () => {
    set({
      readChapters: {},
      courseProgress: {},
      lastReadPosition: {}
    });
  }
}));
