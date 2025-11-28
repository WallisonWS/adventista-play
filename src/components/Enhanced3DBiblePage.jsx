import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, ChevronLeft, ChevronRight, 
  Bookmark, Heart, Share2, Volume2, TextCursor,
  Moon, Sun, ZoomIn, ZoomOut, Menu, X, Book,
  Scroll, Sparkles, Star, Crown, Shield, Flame,
  Feather, Zap, Award, Target
} from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import Sidebar from './21st-dev/Sidebar';

/**
 * Enhanced3DBiblePage
 * Página da Bíblia melhorada com design moderno e ícones SVG (SEM EMOJIS)
 */
export function Enhanced3DBiblePage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('antigo');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Livros da Bíblia organizados com ícones Lucide
  const bibleBooks = {
    antigoTestamento: [
      { name: 'Gênesis', chapters: 50, icon: Scroll, color: '#8B4513' },
      { name: 'Êxodo', chapters: 40, icon: Flame, color: '#FF6347' },
      { name: 'Levítico', chapters: 27, icon: Sparkles, color: '#FFD700' },
      { name: 'Números', chapters: 36, icon: Target, color: '#4169E1' },
      { name: 'Deuteronômio', chapters: 34, icon: Book, color: '#2E8B57' },
      { name: 'Josué', chapters: 24, icon: Shield, color: '#CD853F' },
      { name: 'Juízes', chapters: 21, icon: Award, color: '#8B008B' },
      { name: 'Rute', chapters: 4, icon: Heart, color: '#FF1493' },
      { name: '1 Samuel', chapters: 31, icon: Crown, color: '#DAA520' },
      { name: '2 Samuel', chapters: 24, icon: Crown, color: '#B8860B' },
      { name: '1 Reis', chapters: 22, icon: Crown, color: '#FFD700' },
      { name: '2 Reis', chapters: 25, icon: Crown, color: '#FFA500' },
      { name: '1 Crônicas', chapters: 29, icon: BookOpen, color: '#8B4513' },
      { name: '2 Crônicas', chapters: 36, icon: BookOpen, color: '#A0522D' },
      { name: 'Esdras', chapters: 10, icon: Book, color: '#4682B4' },
      { name: 'Neemias', chapters: 13, icon: Shield, color: '#5F9EA0' },
      { name: 'Ester', chapters: 10, icon: Star, color: '#FF69B4' },
      { name: 'Jó', chapters: 42, icon: Feather, color: '#696969' },
      { name: 'Salmos', chapters: 150, icon: Sparkles, color: '#4169E1' },
      { name: 'Provérbios', chapters: 31, icon: Zap, color: '#FF8C00' },
    ],
    novoTestamento: [
      { name: 'Mateus', chapters: 28, icon: Feather, color: '#4169E1' },
      { name: 'Marcos', chapters: 16, icon: Zap, color: '#FF6347' },
      { name: 'Lucas', chapters: 24, icon: Heart, color: '#32CD32' },
      { name: 'João', chapters: 21, icon: Star, color: '#FFD700' },
      { name: 'Atos', chapters: 28, icon: Flame, color: '#FF4500' },
      { name: 'Romanos', chapters: 16, icon: Book, color: '#8B0000' },
      { name: '1 Coríntios', chapters: 16, icon: BookOpen, color: '#4682B4' },
      { name: '2 Coríntios', chapters: 13, icon: BookOpen, color: '#5F9EA0' },
      { name: 'Gálatas', chapters: 6, icon: Sparkles, color: '#FF8C00' },
      { name: 'Efésios', chapters: 6, icon: Shield, color: '#4169E1' },
      { name: 'Filipenses', chapters: 4, icon: Heart, color: '#FF1493' },
      { name: 'Colossenses', chapters: 4, icon: Star, color: '#DAA520' },
      { name: '1 Tessalonicenses', chapters: 5, icon: Flame, color: '#FF6347' },
      { name: '2 Tessalonicenses', chapters: 3, icon: Flame, color: '#FF4500' },
      { name: '1 Timóteo', chapters: 6, icon: Crown, color: '#B8860B' },
      { name: '2 Timóteo', chapters: 4, icon: Crown, color: '#DAA520' },
      { name: 'Tito', chapters: 3, icon: Award, color: '#FFD700' },
      { name: 'Filemom', chapters: 1, icon: Heart, color: '#FF69B4' },
      { name: 'Hebreus', chapters: 13, icon: Shield, color: '#8B0000' },
      { name: 'Tiago', chapters: 5, icon: Zap, color: '#32CD32' },
      { name: '1 Pedro', chapters: 5, icon: Book, color: '#4682B4' },
      { name: '2 Pedro', chapters: 3, icon: Book, color: '#5F9EA0' },
      { name: '1 João', chapters: 5, icon: Heart, color: '#FF1493' },
      { name: '2 João', chapters: 1, icon: Heart, color: '#FF69B4' },
      { name: '3 João', chapters: 1, icon: Heart, color: '#FFB6C1' },
      { name: 'Judas', chapters: 1, icon: Zap, color: '#FF8C00' },
      { name: 'Apocalipse', chapters: 22, icon: Sparkles, color: '#8B008B' },
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
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bíblia Sagrada
              </h1>
            </motion.div>

            <div className="flex items-center space-x-3">
              {/* Busca */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar versículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Controles */}
              <Button variant="ghost" size="icon" onClick={() => setFontSize(f => Math.max(12, f - 2))}>
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setFontSize(f => Math.min(24, f + 2))}>
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Livros */}
          <div className="lg:col-span-1">
            <motion.div
              className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-xl`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tabs */}
              <div className="flex space-x-2 mb-6">
                <Button
                  variant={activeTab === 'antigo' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('antigo')}
                  className="flex-1"
                >
                  Antigo Testamento
                </Button>
                <Button
                  variant={activeTab === 'novo' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('novo')}
                  className="flex-1"
                >
                  Novo Testamento
                </Button>
              </div>

              {/* Lista de livros */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {(activeTab === 'antigo' ? bibleBooks.antigoTestamento : bibleBooks.novoTestamento).map((book, index) => {
                  const Icon = book.icon;
                  return (
                    <motion.button
                      key={book.name}
                      onClick={() => {
                        setSelectedBook(book);
                        setSelectedChapter(1);
                      }}
                      className={`w-full p-4 rounded-xl flex items-center space-x-3 transition-all ${
                        selectedBook?.name === book.name
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                          : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="p-2 rounded-lg"
                        style={{ 
                          backgroundColor: selectedBook?.name === book.name ? 'rgba(255,255,255,0.2)' : `${book.color}20`
                        }}
                      >
                        <Icon 
                          className="h-5 w-5" 
                          style={{ color: selectedBook?.name === book.name ? 'white' : book.color }}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{book.name}</div>
                        <div className="text-xs opacity-70">{book.chapters} capítulos</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Área de Leitura */}
          <div className="lg:col-span-2">
            <motion.div
              className={`rounded-2xl p-8 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-xl min-h-[600px]`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedBook ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const Icon = selectedBook.icon;
                        return (
                          <div 
                            className="p-3 rounded-xl"
                            style={{ backgroundColor: `${selectedBook.color}20` }}
                          >
                            <Icon className="h-6 w-6" style={{ color: selectedBook.color }} />
                          </div>
                        );
                      })()}
                      <div>
                        <h2 className="text-2xl font-bold">{selectedBook.name}</h2>
                        <p className="text-sm opacity-70">Capítulo {selectedChapter}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(selectedBook.name, selectedChapter)}
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            favorites.includes(`${selectedBook.name}-${selectedChapter}`)
                              ? 'fill-red-500 text-red-500'
                              : ''
                          }`}
                        />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Volume2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Navegação de capítulos */}
                  <div className="flex items-center justify-between mb-8">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedChapter(c => Math.max(1, c - 1))}
                      disabled={selectedChapter === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Anterior
                    </Button>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm opacity-70">Capítulo</span>
                      <Input
                        type="number"
                        value={selectedChapter}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val >= 1 && val <= selectedBook.chapters) {
                            setSelectedChapter(val);
                          }
                        }}
                        className="w-20 text-center"
                        min={1}
                        max={selectedBook.chapters}
                      />
                      <span className="text-sm opacity-70">de {selectedBook.chapters}</span>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setSelectedChapter(c => Math.min(selectedBook.chapters, c + 1))}
                      disabled={selectedChapter === selectedBook.chapters}
                    >
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Conteúdo do capítulo */}
                  <div 
                    className="prose prose-lg max-w-none"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    <p className="text-center opacity-70 py-12">
                      Carregando capítulo {selectedChapter} de {selectedBook.name}...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <BookOpen className="h-24 w-24 opacity-20 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Selecione um livro para começar</h3>
                  <p className="opacity-70">
                    Escolha um livro da Bíblia na lista ao lado para iniciar sua leitura
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Sidebar de Navegação */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onSelectBook={(book) => {
          setSelectedBook(book);
          setSelectedChapter(1);
          setSidebarOpen(false);
        }}
      />
    </div>
  );
}
