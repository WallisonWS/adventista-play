import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Search, Moon, Sun, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Heart, Share2, Bookmark } from 'lucide-react';
import { bibliaApiService, getBibleBooks } from '../../services/bibliaApiService';
import Sidebar from './Sidebar';
import EnhancedDock from './EnhancedDock';

/**
 * Página da Bíblia Mobile com componentes 21st.dev e carregamento otimizado
 */
export default function MobileBiblePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const books = getBibleBooks();

  // Carrega capítulo
  useEffect(() => {
    if (selectedBook) {
      loadChapter(selectedBook.abbrev, selectedChapter);
    }
  }, [selectedBook, selectedChapter]);

  async function loadChapter(bookAbbrev, chapter) {
    setLoading(true);
    setError(null);

    try {
      // Usando padrão NVI por enquanto, ou poderia vir de config
      const data = await bibliaApiService.buscarCapitulo('nvi', bookAbbrev, chapter);

      if (!data) throw new Error('Capítulo não encontrado');

      setChapterData(data);
    } catch (err) {
      setError('Erro ao carregar capítulo. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleBookSelect(book) {
    setSelectedBook(book);
    setSelectedChapter(1);
    setSidebarOpen(false);
  }

  function handlePreviousChapter() {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
  }

  function handleNextChapter() {
    if (selectedBook && selectedChapter < selectedBook.chapters) {
      setSelectedChapter(selectedChapter + 1);
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Book size={24} />
          </button>

          {/* Title */}
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bíblia Sagrada
          </h1>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {!selectedBook ? (
          /* Seleção de Livro */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mb-6">
              <Book size={64} className="mx-auto text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Selecione um livro para começar</h2>
            <p className="text-gray-500 mb-8">
              Escolha um livro da Bíblia na lista ao lado para iniciar sua leitura
            </p>
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Abrir Lista de Livros
            </button>
          </motion.div>
        ) : loading ? (
          /* Loading */
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Carregando capítulo {selectedChapter} de {selectedBook.name}...</p>
          </div>
        ) : error ? (
          /* Error */
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => loadChapter(selectedBook.abbrev, selectedChapter)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        ) : chapterData ? (
          /* Chapter Content */
          <motion.div
            key={`${selectedBook.abbrev}-${selectedChapter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Chapter Header */}
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold mb-2">
                {chapterData.book.name} {chapterData.chapter.number}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Bookmark size={20} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Verses */}
            <div className="max-w-2xl mx-auto">
              {chapterData.verses.map((verse) => (
                <motion.p
                  key={verse.number}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: verse.number * 0.02 }}
                  className="mb-4 leading-relaxed"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  <sup className="text-blue-600 font-bold mr-1">{verse.number}</sup>
                  {verse.text}
                </motion.p>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-300 dark:border-gray-700">
              <button
                onClick={handlePreviousChapter}
                disabled={selectedChapter === 1}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                <ChevronLeft size={20} />
                Anterior
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">Capítulo</p>
                <p className="font-bold text-lg">
                  {selectedChapter} de {selectedBook.chapters}
                </p>
              </div>

              <button
                onClick={handleNextChapter}
                disabled={selectedChapter === selectedBook.chapters}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Próximo
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        books={books}
        onBookSelect={handleBookSelect}
      />

      {/* Enhanced Dock for Bible */}
      <EnhancedDock variant="bible" />
    </div>
  );
}
