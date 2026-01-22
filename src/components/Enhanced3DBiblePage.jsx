import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  BookOpen, Search, ChevronLeft, ChevronRight,
  Heart, Share2, Menu, ZoomIn, ZoomOut,
  X, Copy, PlayCircle, PauseCircle,
  Bookmark, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { bibliaApiService, versoesDisponiveis } from '../services/bibliaApiService';
import { useDarkMode } from '../contexts/DarkModeContext';
import { BibleNavigationModal } from './BibleNavigationModal'; // Importando o novo modal

// Configuração dos livros para o menu lateral
const bibleStructure = {
  antigoTestamento: [
    { name: 'Gênesis', chapters: 50, abbrev: 'gn' },
    { name: 'Êxodo', chapters: 40, abbrev: 'ex' },
    { name: 'Levítico', chapters: 27, abbrev: 'lv' },
    { name: 'Números', chapters: 36, abbrev: 'nm' },
    { name: 'Deuteronômio', chapters: 34, abbrev: 'dt' },
    { name: 'Josué', chapters: 24, abbrev: 'js' },
    { name: 'Juízes', chapters: 21, abbrev: 'jz' },
    { name: 'Rute', chapters: 4, abbrev: 'rt' },
    { name: '1 Samuel', chapters: 31, abbrev: '1sm' },
    { name: '2 Samuel', chapters: 24, abbrev: '2sm' },
    { name: '1 Reis', chapters: 22, abbrev: '1rs' },
    { name: '2 Reis', chapters: 25, abbrev: '2rs' },
    { name: '1 Crônicas', chapters: 29, abbrev: '1cr' },
    { name: '2 Crônicas', chapters: 36, abbrev: '2cr' },
    { name: 'Esdras', chapters: 10, abbrev: 'ed' },
    { name: 'Neemias', chapters: 13, abbrev: 'ne' },
    { name: 'Ester', chapters: 10, abbrev: 'et' },
    { name: 'Jó', chapters: 42, abbrev: 'jb' },
    { name: 'Salmos', chapters: 150, abbrev: 'sl' },
    { name: 'Provérbios', chapters: 31, abbrev: 'pv' },
    { name: 'Eclesiastes', chapters: 12, abbrev: 'ec' },
    { name: 'Cantares', chapters: 8, abbrev: 'ct' },
    { name: 'Isaías', chapters: 66, abbrev: 'is' },
    { name: 'Jeremias', chapters: 52, abbrev: 'jr' },
    { name: 'Lamentações', chapters: 5, abbrev: 'lm' },
    { name: 'Ezequiel', chapters: 48, abbrev: 'ez' },
    { name: 'Daniel', chapters: 12, abbrev: 'dn' },
    { name: 'Oseias', chapters: 14, abbrev: 'os' },
    { name: 'Joel', chapters: 3, abbrev: 'jl' },
    { name: 'Amós', chapters: 9, abbrev: 'am' },
    { name: 'Obadias', chapters: 1, abbrev: 'ob' },
    { name: 'Jonas', chapters: 4, abbrev: 'jn' },
    { name: 'Miqueias', chapters: 7, abbrev: 'mq' },
    { name: 'Naum', chapters: 3, abbrev: 'na' },
    { name: 'Habacuque', chapters: 3, abbrev: 'hc' },
    { name: 'Sofonias', chapters: 3, abbrev: 'sf' },
    { name: 'Ageu', chapters: 2, abbrev: 'ag' },
    { name: 'Zacarias', chapters: 14, abbrev: 'zc' },
    { name: 'Malaquias', chapters: 4, abbrev: 'ml' },
  ],
  novoTestamento: [
    { name: 'Mateus', chapters: 28, abbrev: 'mt' },
    { name: 'Marcos', chapters: 16, abbrev: 'mc' },
    { name: 'Lucas', chapters: 24, abbrev: 'lc' },
    { name: 'João', chapters: 21, abbrev: 'jo' },
    { name: 'Atos', chapters: 28, abbrev: 'at' },
    { name: 'Romanos', chapters: 16, abbrev: 'rm' },
    { name: '1 Coríntios', chapters: 16, abbrev: '1co' },
    { name: '2 Coríntios', chapters: 13, abbrev: '2co' },
    { name: 'Gálatas', chapters: 6, abbrev: 'gl' },
    { name: 'Efésios', chapters: 6, abbrev: 'ef' },
    { name: 'Filipenses', chapters: 4, abbrev: 'fp' },
    { name: 'Colossenses', chapters: 4, abbrev: 'cl' },
    { name: '1 Tessalonicenses', chapters: 5, abbrev: '1ts' },
    { name: '2 Tessalonicenses', chapters: 3, abbrev: '2ts' },
    { name: '1 Timóteo', chapters: 6, abbrev: '1tm' },
    { name: '2 Timóteo', chapters: 4, abbrev: '2tm' },
    { name: 'Tito', chapters: 3, abbrev: 'tt' },
    { name: 'Filemom', chapters: 1, abbrev: 'fm' },
    { name: 'Hebreus', chapters: 13, abbrev: 'hb' },
    { name: 'Tiago', chapters: 5, abbrev: 'tg' },
    { name: '1 Pedro', chapters: 5, abbrev: '1pe' },
    { name: '2 Pedro', chapters: 3, abbrev: '2pe' },
    { name: '1 João', chapters: 5, abbrev: '1jo' },
    { name: '2 João', chapters: 1, abbrev: '2jo' },
    { name: '3 João', chapters: 1, abbrev: '3jo' },
    { name: 'Judas', chapters: 1, abbrev: 'jd' },
    { name: 'Apocalipse', chapters: 22, abbrev: 'ap' },
  ]
};

export function Enhanced3DBiblePage() {
  const { isDarkMode } = useDarkMode();

  // Estados Principais
  const [selectedVersion, setSelectedVersion] = useState(() => localStorage.getItem('bible_version') || 'nvi');
  const [selectedBook, setSelectedBook] = useState(() => {
    const saved = localStorage.getItem('bible_book');
    return saved ? JSON.parse(saved) : bibleStructure.antigoTestamento[0];
  });
  const [selectedChapter, setSelectedChapter] = useState(() => parseInt(localStorage.getItem('bible_chapter') || '1'));
  const [chapterContent, setChapterContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de Interface
  const [fontSize, setFontSize] = useState(18);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bible_bookmarks') || '[]');
    } catch { return []; }
  });

  const speechRef = useRef(null);
  const containerRef = useRef(null);

  // Persistência
  useEffect(() => {
    localStorage.setItem('bible_version', selectedVersion);
    localStorage.setItem('bible_book', JSON.stringify(selectedBook));
    localStorage.setItem('bible_chapter', selectedChapter.toString());
    localStorage.setItem('bible_bookmarks', JSON.stringify(bookmarks));
  }, [selectedVersion, selectedBook, selectedChapter, bookmarks]);

  // Carregar Conteúdo
  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      cancelSpeech();
      try {
        const data = await bibliaApiService.buscarCapitulo(selectedVersion, selectedBook.abbrev, selectedChapter);
        setChapterContent(data);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      } finally {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    loadContent();
  }, [selectedBook, selectedChapter, selectedVersion]);

  // Funções de Navegação
  const handleNavigate = (book, chapter, verse = 1) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    // Future: Scroll to verse logic could be added here
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter(c => c + 1);
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(c => c - 1);
    }
  };

  // Funções Swipe
  const onDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNextChapter();
    } else if (info.offset.x > swipeThreshold) {
      handlePrevChapter();
    }
  };

  // Funções de Leitura/Audio (Mantidas igual)
  const toggleSpeech = () => isPlaying ? cancelSpeech() : startSpeech();

  const startSpeech = () => {
    if (!chapterContent) return;
    const text = `${chapterContent.book.name}, Capítulo ${chapterContent.chapter.number}. ` +
      chapterContent.verses.map(v => v.text).join(' ');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.onend = () => setIsPlaying(false);
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const cancelSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  useEffect(() => () => cancelSpeech(), []);

  const toggleVerseSelection = (verseNum) => {
    setSelectedVerses(prev =>
      prev.includes(verseNum) ? prev.filter(v => v !== verseNum) : [...prev, verseNum]
    );
  };

  const copySelectedVerses = () => {
    if (!chapterContent) return;
    const textToCopy = chapterContent.verses
      .filter(v => selectedVerses.includes(v.number))
      .map(v => `${v.number}. ${v.text}`)
      .join('\n');
    const citation = `\n\n${selectedBook.name} ${selectedChapter} (${selectedVersion.toUpperCase()})`;
    navigator.clipboard.writeText(textToCopy + citation);
    alert("Copiado!");
    setSelectedVerses([]);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-transparent text-gray-100' : 'bg-transparent text-gray-900'} transition-colors duration-300 font-sans pb-20`}>
      <TooltipProvider>
        {/* HEADER FLUTUANTE MODERNO */}
        <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDarkMode ? 'bg-[#0f1115]/80 border-gray-800' : 'bg-white/80 border-gray-200'} transition-all shadow-sm`}>
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">

            {/* Botão de Navegação Principal */}
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-primary/20 transition-all group"
              onClick={() => setIsNavModalOpen(true)}
            >
              <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="block text-xs text-muted-foreground uppercase tracking-wider font-semibold">Leitura Atual</span>
                <span className="text-lg font-bold leading-none flex items-center gap-1">
                  {selectedBook.name} {selectedChapter}
                  <Badge variant="secondary" className="ml-2 text-[10px] hidden sm:inline-flex">Toque para mudar</Badge>
                </span>
              </div>
            </Button>

            <div className="flex items-center gap-2">
              <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                <SelectTrigger className="w-[85px] h-9 text-xs font-medium bg-transparent border-none">
                  <SelectValue placeholder="Versão" />
                </SelectTrigger>
                <SelectContent>
                  {versoesDisponiveis.map(v => (
                    <SelectItem key={v.id} value={v.id}>{v.sigla}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={isPlaying ? "destructive" : "default"}
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={toggleSpeech}
              >
                {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* MODAL DE NAVEGAÇÃO GRID */}
        <BibleNavigationModal
          isOpen={isNavModalOpen}
          onClose={() => setIsNavModalOpen(false)}
          bibleStructure={bibleStructure}
          currentBook={selectedBook}
          currentChapter={selectedChapter}
          onNavigate={handleNavigate}
        />

        {/* ÁREA DE LEITURA COM GESTOS */}
        <main className="container mx-auto px-0 md:px-4 py-4 flex justify-center min-h-[85vh] overflow-hidden">
          <motion.div
            className="w-full max-w-4xl relative touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            {/* Navegação Lateral Desktop (Botões Discretos) */}
            <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevChapter}
                disabled={selectedChapter <= 1}
                className="p-4 rounded-full bg-slate-800/50 hover:bg-slate-700 text-white disabled:opacity-30 backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </motion.button>
            </div>
            <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextChapter}
                disabled={selectedChapter >= selectedBook.chapters}
                className="p-4 rounded-full bg-slate-800/50 hover:bg-slate-700 text-white disabled:opacity-30 backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Conteúdo do Texto */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 md:p-12 space-y-8"
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-4 w-full rounded animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} style={{ width: `${Math.random() * 40 + 60}%` }} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`${selectedBook.name}-${selectedChapter}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`
                      relative p-6 md:p-12 md:rounded-3xl shadow-2xl min-h-[70vh]
                      ${isDarkMode ? 'bg-[#151921]/90 shadow-black/20' : 'bg-white/90 shadow-slate-200/50'}
                      backdrop-blur-md border border-white/5
                    `}
                >
                  <div className="flex justify-between items-baseline mb-8 border-b border-gray-200/10 pb-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {chapterContent?.chapter.number}
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                      {chapterContent?.book.name}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: '1.8',
                      fontFamily: '"Merriweather", "Georgia", serif'
                    }}
                    className={`space-y-6 text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}
                  >
                    {chapterContent?.verses.map((verse) => {
                      const isSelected = selectedVerses.includes(verse.number);
                      return (
                        <span
                          key={verse.number}
                          onClick={() => toggleVerseSelection(verse.number)}
                          className={`
                            relative inline-block decoration-clone p-1 rounded-lg transition-colors cursor-pointer select-none
                            ${isSelected
                              ? 'bg-blue-500/20 text-blue-200 ring-1 ring-blue-500/50'
                              : 'hover:bg-gray-500/10'
                            }
                          `}
                        >
                          <sup className="text-[0.6em] font-bold text-blue-500 mr-2 opacity-70 select-none">
                            {verse.number}
                          </sup>
                          {verse.text}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dica de Gesto Mobile */}
            <div className="lg:hidden mt-8 flex justify-center text-xs text-muted-foreground opacity-50">
              <ArrowLeft className="w-3 h-3 mr-1" /> Deslize para mudar <ArrowRight className="w-3 h-3 ml-1" />
            </div>

          </motion.div>
        </main>
      </TooltipProvider>
    </div>
  );
}
