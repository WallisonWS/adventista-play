import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Book, User, Heart } from 'lucide-react';

const Dock = ({ items = [], onItemClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const defaultItems = [
    { icon: Home, label: "Início", id: "home" },
    { icon: Search, label: "Buscar", id: "search" },
    { icon: Book, label: "Bíblia", id: "bible" },
    { icon: Heart, label: "Favoritos", id: "favorites" },
    { icon: User, label: "Perfil", id: "profile" },
  ];

  const dockItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      >
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;
          const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
          
          // Calculate scale based on distance from hovered item
          const scale = hoveredIndex !== null
            ? distance === 0
              ? 1.5
              : distance === 1
              ? 1.2
              : 1
            : 1;

          return (
            <motion.button
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onItemClick?.(item.id)}
              className="relative group"
              whileTap={{ scale: 0.9 }}
            >
              {/* Icon Container */}
              <motion.div
                animate={{
                  scale,
                  y: isHovered ? -10 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow"
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Label Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? -70 : -60,
                }}
                className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium whitespace-nowrap pointer-events-none"
              >
                {item.label}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-white" />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10"
                animate={{
                  scale: isHovered ? 1.2 : 1,
                }}
              />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dock;
