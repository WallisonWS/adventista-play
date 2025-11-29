import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Bookmark, History, Settings, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, books, onBookSelect }) => {
  const [activeSection, setActiveSection] = useState(null);

  // Se books não for fornecido, usa dados padrão
  const defaultSections = [
    {
      title: "Antigo Testamento",
      icon: Book,
      books: books?.oldTestament || [],
    },
    {
      title: "Novo Testamento",
      icon: Book,
      books: books?.newTestament || [],
    },
    {
      title: "Favoritos",
      icon: Bookmark,
      books: [],
    },
    {
      title: "Histórico",
      icon: History,
      books: [],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Bíblia Sagrada
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100vh-88px)] p-4">
              <div className="space-y-2">
                {defaultSections.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSection === index;

                  return (
                    <div key={index}>
                      {/* Section Header */}
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => setActiveSection(isActive ? null : index)}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {section.title}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isActive ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </motion.div>
                      </motion.button>

                      {/* Books List */}
                      <AnimatePresence>
                        {isActive && section.books.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pt-2 space-y-1 max-h-96 overflow-y-auto">
                              {section.books.map((book, bookIndex) => (
                                <motion.button
                                  key={book.abbrev || bookIndex}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: bookIndex * 0.02 }}
                                  whileHover={{ x: 4 }}
                                  onClick={() => {
                                    if (onBookSelect) {
                                      onBookSelect(book);
                                    }
                                  }}
                                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                                >
                                  {book.name} {book.chapters && `(${book.chapters} cap.)`}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Settings Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Settings className="w-5 h-5" />
                Configurações
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
