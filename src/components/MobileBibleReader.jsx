import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Settings, Heart, Share2, 
  Volume2, ChevronDown, ChevronUp, Home, 
  HandHeart, DollarSign
} from 'lucide-react';

/**
 * MobileBibleReader
 * Interface mobile da Bíblia com grid de capítulos e controles de leitura
 */
export function MobileBibleReader() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [expandedBook, setExpandedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [showSettings, setShowSettings] = useState(false);

  // Livros da Bíblia
  const bibleBooks = [
    { name: 'Gênesis', chapters: 50 },
    { name: 'Êxodo', chapters: 40 },
    { name: 'Levítico', chapters: 27 },
    { name: 'Números', chapters: 36 },
    { name: 'Deuteronômio', chapters: 34 },
    { name: 'Josué', chapters: 24 },
    { name: 'Juízes', chapters: 21 },
    { name: 'Rute', chapters: 4 },
    { name: '1 Samuel', chapters: 31 },
    { name: '2 Samuel', chapters: 24 },
    { name: '1 Reis', chapters: 22 },
    { name: '2 Reis', chapters: 25 },
    { name: '1 Crônicas', chapters: 29 },
    { name: '2 Crônicas', chapters: 36 },
    // ... adicionar mais livros conforme necessário
  ];

  // Gerar array de números de capítulos
  const generateChapters = (count) => {
    return Array.from({ length: count }, (_, i) => i + 1);
  };

  // Lidar com clique no livro
  const handleBookClick = (book) => {
    if (expandedBook?.name === book.name) {
      setExpandedBook(null);
    } else {
      setExpandedBook(book);
    }
  };

  // Lidar com clique no capítulo
  const handleChapterClick = (book, chapter) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setExpandedBook(null);
  };

  // Fechar grid de capítulos
  const handleCancel = () => {
    setExpandedBook(null);
  };

  // Voltar para lista de livros
  const handleBackToBooks = () => {
    setSelectedBook(null);
    setSelectedChapter(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-bold text-blue-600">Bíblia Sagrada</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" onClick={() => setShowSettings(!showSettings)} />
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="p-4">
        {!selectedBook ? (
          // Lista de Livros
          <div className="space-y-2">
            <AnimatePresence>
              {bibleBooks.map((book, index) => (
                <motion.div
                  key={book.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {/* Card do Livro */}
                  <div
                    onClick={() => handleBookClick(book)}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{book.name}</h3>
                          <p className="text-sm text-gray-500">{book.chapters} Capítulos</p>
                        </div>
                      </div>
                      {expandedBook?.name === book.name ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Grid de Capítulos (expandido) */}
                  <AnimatePresence>
                    {expandedBook?.name === book.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                          {/* Botão Cancelar */}
                          <div className="mb-4">
                            <button
                              onClick={handleCancel}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>

                          {/* Título */}
                          <h4 className="text-center font-bold text-lg mb-4">Livros</h4>

                          {/* Grid de Capítulos */}
                          <div className="grid grid-cols-4 gap-2">
                            {generateChapters(book.chapters).map((chapter) => (
                              <motion.button
                                key={chapter}
                                onClick={() => handleChapterClick(book, chapter)}
                                whileTap={{ scale: 0.95 }}
                                className="aspect-square flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:border-blue-500 hover:bg-blue-50 transition-colors"
                              >
                                {chapter}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // Área de Leitura
          <div>
            {/* Cabeçalho do Capítulo */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <button
                onClick={handleBackToBooks}
                className="text-blue-600 text-sm mb-2"
              >
                ← Voltar
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedBook.name} {selectedChapter}
              </h2>
              <div className="flex items-center space-x-2 mt-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Controles de Leitura */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm mb-4"
                >
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4"
                  >
                    Cancelar
                  </button>

                  {/* Tamanho do texto */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Tamanho do texto</h3>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => setFontSize(f => Math.max(12, f - 2))}
                        className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg text-xl font-bold"
                      >
                        −
                      </button>
                      <span className="text-2xl font-bold">aA</span>
                      <button
                        onClick={() => setFontSize(f => Math.min(24, f + 2))}
                        className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cor de fundo */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Cor de fundo</h3>
                    <div className="flex justify-center space-x-2">
                      {['#FFFFFF', '#F5F5F5', '#4A4A4A', '#000000'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setBgColor(color)}
                          className={`w-12 h-12 rounded-lg border-2 ${
                            bgColor === color ? 'border-blue-500' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Cor do texto */}
                  <div>
                    <h3 className="font-semibold mb-2">Cor do texto</h3>
                    <div className="flex justify-center space-x-2">
                      {['#FFFFFF', '#F5F5F5', '#4A4A4A', '#000000'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setTextColor(color)}
                          className={`w-12 h-12 rounded-lg border-2 ${
                            textColor === color ? 'border-blue-500' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Texto da Bíblia */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: bgColor, color: textColor, fontSize: `${fontSize}px` }}
            >
              <p className="leading-relaxed">
                <sup className="text-sm">1</sup> No princípio Deus criou os céus e a terra.
              </p>
              <p className="leading-relaxed mt-4">
                <sup className="text-sm">2</sup> Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.
              </p>
              <p className="leading-relaxed mt-4">
                <sup className="text-sm">3</sup> Disse Deus: "Haja luz", e houve luz.
              </p>
              {/* Adicionar mais versículos conforme necessário */}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center space-y-1 px-4 py-2">
            <Home className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600">Início</span>
          </button>
          <button className="flex flex-col items-center space-y-1 px-4 py-2">
            <HandHeart className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600">Oração</span>
          </button>
          <button className="flex flex-col items-center space-y-1 px-4 py-2 relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs text-blue-600 mt-6">Bíblia</span>
          </button>
          <button className="flex flex-col items-center space-y-1 px-4 py-2">
            <HandHeart className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600">Doe</span>
          </button>
          <button className="flex flex-col items-center space-y-1 px-4 py-2">
            <Settings className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600">Ajustes</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
