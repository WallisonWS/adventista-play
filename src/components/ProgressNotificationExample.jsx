import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { BookOpen, CheckCircle, Trophy } from 'lucide-react';

/**
 * Componente de exemplo para demonstrar notificações de progresso
 * Este componente pode ser integrado em páginas de leitura, cursos, etc.
 */
export function ProgressNotificationExample() {
  const { 
    markChapterAsRead, 
    updateCourseProgress, 
    saveLastPosition,
    getCourseProgress 
  } = useReadingProgress();

  /**
   * Exemplo: Marcar capítulo como lido com notificação
   */
  const handleChapterComplete = (bookId, chapterId, chapterName) => {
    markChapterAsRead(bookId, chapterId);
    
    toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div>
          <p className="font-semibold">Capítulo concluído!</p>
          <p className="text-sm">{chapterName}</p>
        </div>
      </div>,
      {
        duration: 3000,
        position: 'top-center',
      }
    );
  };

  /**
   * Exemplo: Atualizar progresso do curso com notificação
   */
  const handleCourseProgress = (courseId, progress, courseName) => {
    updateCourseProgress(courseId, progress);
    
    // Notificação especial ao completar 100%
    if (progress === 100) {
      toast.success(
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <div>
            <p className="font-bold">🎉 Parabéns!</p>
            <p className="text-sm">Você completou: {courseName}</p>
          </div>
        </div>,
        {
          duration: 5000,
          position: 'top-center',
        }
      );
    } else {
      toast(
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <div>
            <p className="font-semibold">Progresso atualizado</p>
            <p className="text-sm">{progress}% de {courseName}</p>
          </div>
        </div>,
        {
          duration: 2000,
          position: 'top-center',
        }
      );
    }
  };

  /**
   * Exemplo: Salvar posição de leitura
   */
  const handleSavePosition = (contentId, position) => {
    saveLastPosition(contentId, position);
    
    toast.success('Posição salva!', {
      duration: 2000,
      icon: '💾',
    });
  };

  /**
   * Exemplo: Notificação de boas-vindas ao carregar a página
   */
  useEffect(() => {
    // Simular notificação de progresso ao carregar
    const timer = setTimeout(() => {
      toast(
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <div>
            <p className="font-semibold">Continue de onde parou</p>
            <p className="text-sm">Você está em 81% do plano de leitura</p>
          </div>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
        }
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-bold">Exemplos de Notificações de Progresso</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => handleChapterComplete('biblia', 1, 'Gênesis 1')}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Marcar Capítulo como Lido
        </button>
        
        <button
          onClick={() => handleCourseProgress('curso-1', 50, 'Fundamentos da Fé')}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Atualizar Progresso (50%)
        </button>
        
        <button
          onClick={() => handleCourseProgress('curso-1', 100, 'Fundamentos da Fé')}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Completar Curso (100%)
        </button>
        
        <button
          onClick={() => handleSavePosition('devocional-1', { page: 5, scroll: 120 })}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Salvar Posição de Leitura
        </button>
      </div>
    </div>
  );
}
