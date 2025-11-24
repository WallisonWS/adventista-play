import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, ChevronLeft, ChevronRight, 
  Bookmark, Heart, Share2, Volume2, TextCursor,
  Moon, Sun, ZoomIn, ZoomOut, Menu, X
} from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';

/**
 * Enhanced3DBiblePage
 * Página da Bíblia melhorada com design moderno, ícones bonitos e animações fluidas
 */
export function Enhanced3DBiblePage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Livros da Bíblia organizados
  const bibleBooks = {
    antigoTestamento: [
      { name: 'Gênesis', chapters: 50, icon: '📜' },
      { name: 'Êxodo', chapters: 40, icon: '🌊' },
      { name: 'Levítico', chapters: 27, icon: '🕯️' },
      { name: 'Números', chapters: 36, icon: '🔢' },
      { name: 'Deuteronômio', chapters: 34, icon: '📖' },
      { name: 'Josué', chapters: 24, icon: '⚔️' },
      { name: 'Juízes', chapters: 21, icon: '⚖️' },
      { name: 'Rute', chapters: 4, icon: '🌾' },
      { name: '1 Samuel', chapters: 31, icon: '👑' },
      { name: '2 Samuel', chapters: 24, icon: '👑' },
      { name: '1 Reis', chapters: 22, icon: '🏰' },
      { name: '2 Reis', chapters: 25, icon: '🏰' },
      { name: '1 Crônicas', chapters: 29, icon: '📚' },
      { name: '2 Crônicas', chapters: 36, icon: '📚' },
      { name: 'Esdras', chapters: 10, icon: '🏛️' },
      { name: 'Neemias', chapters: 13, icon: '🧱' },
      { name: 'Ester', chapters: 10, icon: '👸' },
      { name: 'Jó', chapters: 42, icon: '💭' },
      { name: 'Salmos', chapters: 150, icon: '🎵' },
      { name: 'Provérbios', chapters: 31, icon: '💡' },
    ],
    novoTestamento: [
      { name: 'Mateus', chapters: 28, icon: '✍️' },
      { name: 'Marcos', chapters: 16, icon: '🦁' },
      { name: 'Lucas', chapters: 24, icon: '👨‍⚕️' },
      { name: 'João', chapters: 21, icon: '🦅' },
      { name: 'Atos', chapters: 28, icon: '🔥' },
      { name: 'Romanos', chapters: 16, icon: '💌' },
      { name: '1 Coríntios', chapters: 16, icon: '⛪' },
      { name: '2 Coríntios', chapters: 13, icon: '⛪' },
      { name: 'Gálatas', chapters: 6, icon: '🕊️' },
      { name: 'Efésios', chapters: 6, icon: '🛡️' },
      { name: 'Filipenses', chapters: 4, icon: '😊' },
      { name: 'Colossenses', chapters: 4, icon: '⭐' },
      { name: '1 Tessalonicenses', chapters: 5, icon: '📯' },
      { name: '2 Tessalonicenses', chapters: 3, icon: '📯' },
      { name: '1 Timóteo', chapters: 6, icon: '👨‍🏫' },
      { name: '2 Timóteo', chapters: 4, icon: '👨‍🏫' },
      { name: 'Tito', chapters: 3, icon: '🌟' },
      { name: 'Filemom', chapters: 1, icon: '💝' },
      { name: 'Hebreus', chapters: 13, icon: '⚓' },
      { name: 'Tiago', chapters: 5, icon: '🌱' },
      { name: '1 Pedro', chapters: 5, icon: '🗝️' },
      { name: '2 Pedro', chapters: 3, icon: '🗝️' },
      { name: '1 João', chapters: 5, icon: '❤️' },
      { name: '2 João', chapters: 1, icon: '💖' },
      { name: '3 João', chapters: 1, icon: '💕' },
      { name: 'Judas', chapters: 1, icon: '⚡' },
      { name: 'Apocalipse', chapters: 22, icon: '🌅' },
    ]
  };

  const toggleFavorite = (book, chapter) => {
    const key = `${book}-${chapter}`;
    setFavorites(prev => 
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
    >
      {/* Header Moderno */}
      <motion.header 
        className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
          isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo e Título */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <BookOpen size={32} className="text-[#5B7FDB]" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2D4059] to-[#5B7FDB] bg-clip-text text-transparent">
                  Bíblia Sagrada
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Escolha um livro para começar sua leitura
                </p>
              </div>
            </motion.div>

            {/* Ferramentas */}
            <div className="flex items-center gap-2">
              {/* Busca */}
              <div className="hidden md:block relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar versículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 rounded-full"
                />
              </div>

              {/* Controles de Fonte */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <ZoomOut size={18} />
                </motion.button>
                <span className="text-sm font-medium w-8 text-center">{fontSize}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <ZoomIn size={18} />
                </motion.button>
              </div>

              {/* Modo Escuro */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Menu Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {showMenu ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lista de Livros */}
          <div className="lg:col-span-1">
            {/* Antigo Testamento */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📜</span>
                Antigo Testamento
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {bibleBooks.antigoTestamento.map((book, index) => (
                  <BookCard
                    key={book.name}
                    book={book}
                    index={index}
                    isSelected={selectedBook?.name === book.name}
                    onClick={() => setSelectedBook(book)}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </motion.div>

            {/* Novo Testamento */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">✝️</span>
                Novo Testamento
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {bibleBooks.novoTestamento.map((book, index) => (
                  <BookCard
                    key={book.name}
                    book={book}
                    index={index}
                    isSelected={selectedBook?.name === book.name}
                    onClick={() => setSelectedBook(book)}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Área de Leitura */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedBook ? (
                <ReadingArea
                  book={selectedBook}
                  chapter={selectedChapter}
                  setChapter={setSelectedChapter}
                  fontSize={fontSize}
                  isDarkMode={isDarkMode}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ) : (
                <EmptyState isDarkMode={isDarkMode} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Card de Livro
function BookCard({ book, index, isSelected, onClick, isDarkMode }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-4 rounded-xl text-left transition-all ${
        isSelected
          ? 'bg-gradient-to-br from-[#5B7FDB] to-[#507D6D] text-white shadow-lg'
          : isDarkMode
          ? 'bg-gray-800 hover:bg-gray-700'
          : 'bg-white hover:bg-gray-50 shadow-md'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{book.icon}</span>
        <span className="font-semibold text-sm">{book.name}</span>
      </div>
      <p className={`text-xs ${isSelected ? 'text-white/80' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {book.chapters} capítulos
      </p>
    </motion.button>
  );
}

// Área de Leitura
function ReadingArea({ book, chapter, setChapter, fontSize, isDarkMode, favorites, toggleFavorite }) {
  const isFavorite = favorites.includes(`${book.name}-${chapter}`);

  return (
    <motion.div
      key={`${book.name}-${chapter}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-8 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-xl'
      }`}
    >
      {/* Cabeçalho do Capítulo */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {book.name} {chapter}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {book.chapters} capítulos disponíveis
          </p>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(book.name, chapter)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-100 text-red-600' 
                : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
          >
            <Volume2 size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </div>

      {/* Conteúdo do Capítulo (Placeholder) */}
      <div 
        className={`prose max-w-none mb-8 ${isDarkMode ? 'prose-invert' : ''}`}
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
      >
        <p className="mb-4">
          <span className="font-bold text-[#5B7FDB]">1</span> No princípio, criou Deus os céus e a terra.
        </p>
        <p className="mb-4">
          <span className="font-bold text-[#5B7FDB]">2</span> A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.
        </p>
        <p className="mb-4">
          <span className="font-bold text-[#5B7FDB]">3</span> Disse Deus: Haja luz; e houve luz.
        </p>
      </div>

      {/* Navegação de Capítulos */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChapter(Math.max(1, chapter - 1))}
          disabled={chapter === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            chapter === 1
              ? 'opacity-50 cursor-not-allowed'
              : isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={20} />
          Anterior
        </motion.button>

        <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Capítulo {chapter} de {book.chapters}
        </span>

        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChapter(Math.min(book.chapters, chapter + 1))}
          disabled={chapter === book.chapters}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            chapter === book.chapters
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#5B7FDB] to-[#507D6D] text-white hover:shadow-lg'
          }`}
        >
          Próximo
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// Estado Vazio
function EmptyState({ isDarkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-16 text-center ${
        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-xl'
      }`}
    >
      <motion.div
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="text-8xl mb-6"
      >
        📖
      </motion.div>
      <h3 className="text-2xl font-bold mb-4">
        Selecione um livro para começar
      </h3>
      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Escolha um livro da Bíblia na lista ao lado para iniciar sua leitura
      </p>
    </motion.div>
  );
}
