import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Book, 
  User, 
  Heart,
  Music,
  GraduationCap,
  BookOpen,
  Calendar,
  Trophy,
  Globe,
  Play,
  MessageSquare,
  Bookmark,
  Clock,
  Star,
  Share2
} from 'lucide-react';

/**
 * Enhanced Dock Component com suporte a itens personalizados por página
 */
const EnhancedDock = ({ items, variant = 'default' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // Variantes predefinidas para diferentes seções
  const variants = {
    default: [
      { icon: Home, label: "Início", path: "/" },
      { icon: Search, label: "Buscar", path: "/biblia" },
      { icon: Book, label: "Bíblia", path: "/biblia" },
      { icon: Heart, label: "Favoritos", path: "/perfil" },
      { icon: User, label: "Perfil", path: "/perfil" },
    ],
    bible: [
      { icon: Home, label: "Início", path: "/" },
      { icon: Book, label: "Bíblia", path: "/biblia" },
      { icon: Bookmark, label: "Favoritos", path: "/perfil" },
      { icon: Clock, label: "Histórico", path: "/perfil" },
      { icon: Share2, label: "Compartilhar", action: 'share' },
    ],
    devotional: [
      { icon: Home, label: "Início", path: "/" },
      { icon: Heart, label: "Devocional", path: "/devocional" },
      { icon: Book, label: "Bíblia", path: "/biblia" },
      { icon: Calendar, label: "Planos", path: "/planos" },
      { icon: User, label: "Perfil", path: "/perfil" },
    ],
    hymnal: [
      { icon: Home, label: "Início", path: "/" },
      { icon: Music, label: "Hinário", path: "/hinario" },
      { icon: Search, label: "Buscar", action: 'search' },
      { icon: Star, label: "Favoritos", path: "/perfil" },
      { icon: Play, label: "Tocar", action: 'play' },
    ],
    studies: [
      { icon: Home, label: "Início", path: "/" },
      { icon: GraduationCap, label: "Estudos", path: "/estudos" },
      { icon: BookOpen, label: "Ellen White", path: "/ellen-white" },
      { icon: Trophy, label: "Quiz", path: "/quiz" },
      { icon: User, label: "Perfil", path: "/perfil" },
    ],
    missions: [
      { icon: Home, label: "Início", path: "/" },
      { icon: Globe, label: "Projetos", path: "/projetos" },
      { icon: Heart, label: "Doar", path: "/doacao" },
      { icon: MessageSquare, label: "Oração", path: "/oracao" },
      { icon: User, label: "Perfil", path: "/perfil" },
    ],
    pathfinders: [
      { icon: Home, label: "Início", path: "/" },
      { icon: Star, label: "Desbravadores", path: "/desbravadores" },
      { icon: Trophy, label: "Conquistas", path: "/conquistas" },
      { icon: GraduationCap, label: "Especialidades", path: "/desbravadores" },
      { icon: User, label: "Perfil", path: "/perfil" },
    ],
  };

  // Usa itens personalizados ou variante predefinida
  const dockItems = items || variants[variant] || variants.default;

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      // Ações personalizadas
      switch (item.action) {
        case 'share':
          if (navigator.share) {
            navigator.share({
              title: 'Adventista Play',
              text: 'Confira este conteúdo!',
              url: window.location.href
            });
          }
          break;
        case 'search':
          // Implementar busca
          console.log('Buscar...');
          break;
        case 'play':
          // Implementar reprodução
          console.log('Tocar...');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      >
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;
          const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
          
          // Calculate scale based on distance from hovered item (magnification effect)
          const scale = hoveredIndex !== null
            ? distance === 0
              ? 1.6
              : distance === 1
              ? 1.3
              : distance === 2
              ? 1.1
              : 1
            : 1;

          return (
            <motion.button
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleItemClick(item)}
              className="relative group"
              whileTap={{ scale: 0.85 }}
            >
              {/* Icon Container */}
              <motion.div
                animate={{
                  scale,
                  y: isHovered ? -12 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow"
              >
                <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Label Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? -75 : -65,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold whitespace-nowrap pointer-events-none shadow-xl"
              >
                {item.label}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-gray-900 dark:bg-white" />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity -z-10"
                animate={{
                  scale: isHovered ? 1.3 : 1,
                }}
              />

              {/* Ripple Effect on Click */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/30"
                initial={{ scale: 0, opacity: 1 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default EnhancedDock;
