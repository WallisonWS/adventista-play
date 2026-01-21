import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Music, GraduationCap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

/**
 * Componente de Carrossel de Destaques Dinâmicos
 * Exibe conteúdos em destaque na HomePage (versão desktop)
 */
export function DestaquesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Destaques do dia
  const destaques = [
    {
      id: 1,
      titulo: 'Devocional do Dia',
      descricao: 'Comece seu dia com uma mensagem inspiradora',
      imagem: 'https://images.unsplash.com/photo-1470252649378-9c2974247fa8?q=80&w=1600&auto=format&fit=crop', // Morning light landscape premium
      link: '/devocional',
      icon: Heart,
      cor: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      titulo: 'Escola Sabatina',
      descricao: 'Estude a lição de hoje com comentários',
      imagem: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1600&auto=format&fit=crop', // Bible study warm light
      link: '/escola-sabatina',
      icon: BookOpen,
      cor: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      titulo: 'Hinário Adventista',
      descricao: 'Louve a Deus com os hinos tradicionais',
      imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop', // Piano/Music artistic
      link: '/hinario',
      icon: Music,
      cor: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      titulo: 'Cursos Online',
      descricao: 'Aprenda mais sobre a Bíblia e doutrina',
      imagem: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop', // Library/Education premium
      link: '/cursos',
      icon: GraduationCap,
      cor: 'from-green-500 to-teal-500'
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destaques.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, destaques.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + destaques.length) % destaques.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % destaques.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentDestaque = destaques[currentIndex];
  // Ensure we have a valid component before rendering
  const IconComponent = currentDestaque?.icon || Star;

  if (!currentDestaque) return null;

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Imagem de fundo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentDestaque.imagem})`,
            }}
          >
            {/* Overlay gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentDestaque.cor} opacity-80`} />
          </div>

          {/* Conteúdo */}
          <div className="relative h-full flex flex-col justify-end p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 mb-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentDestaque.titulo}</h3>
                <p className="text-sm opacity-90">{currentDestaque.descricao}</p>
              </div>
            </motion.div>

            <Link to={currentDestaque.link}>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                Acessar Agora
              </Button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botões de navegação */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white cursor-pointer z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white cursor-pointer z-10"
        aria-label="Próximo"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {destaques.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${index === currentIndex
              ? 'bg-white w-8'
              : 'bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Ir para destaque ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
