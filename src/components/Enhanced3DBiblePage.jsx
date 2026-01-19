import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, ChevronLeft, ChevronRight,
  Heart, Share2, Menu, ZoomIn, ZoomOut,
  X, Copy, PlayCircle, PauseCircle, Volume2,
  Bookmark, Settings
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buscarCapitulo, versoesDisponiveis } from '../services/bibliaService';
import { useDarkMode } from '../contexts/DarkModeContext';

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

  // Estados de Interface e Funcionalidades
  const [fontSize, setFontSize] = useState(18);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bible_bookmarks') || '[]');
    } catch { return []; }
  });

  const speechRef = useRef(null);

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
      cancelSpeech(); // Parar áudio anterior se houver
      try {
        const data = await buscarCapitulo(selectedVersion, selectedBook.name, selectedChapter);
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

  // Audio TTS Logic
  const toggleSpeech = () => {
    if (isPlaying) {
      cancelSpeech();
    } else {
      startSpeech();
    }
  };

  const startSpeech = () => {
    if (!chapterContent) return;

    // Concatenar texto
    const text = `${chapterContent.book.name}, Capítulo ${chapterContent.chapter.number}. ` +
      chapterContent.verses.map(v => v.text).join(' ');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const cancelSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  // Handlers
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

  const toggleVerseSelection = (verseNum) => {
    setSelectedVerses(prev =>
      prev.includes(verseNum)
        ? prev.filter(v => v !== verseNum)
        : [...prev, verseNum]
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
    // Idealmente Toast success
    alert("Copiado!");
    setSelectedVerses([]);
  };

  const toggleBookmark = () => {
    if (selectedVerses.length === 0) return;

    const newBookmarks = selectedVerses.map(vNum => {
      const verseText = chapterContent.verses.find(v => v.number === vNum)?.text;
      return {
        id: `${selectedBook.abbrev}-${selectedChapter}-${vNum}-${Date.now()}`,
        ref: `${selectedBook.name} ${selectedChapter}:${vNum}`,
        text: verseText,
        date: new Date().toLocaleDateString()
      };
    });

    setBookmarks(prev => [...newBookmarks, ...prev]);
    setSelectedVerses([]);
    alert("Versículos salvos nos favoritos!");
  };

  const shareVerses = async () => {
    if (!chapterContent) return;
    const textToShare = chapterContent.verses
      .filter(v => selectedVerses.includes(v.number))
      .map(v => `${v.number}. ${v.text}`)
      .join('\n');
    const citation = `\n${selectedBook.name} ${selectedChapter} - Adventista Play`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo Bíblico',
          text: textToShare + citation,
        });
      } catch (err) {
        console.log('Erro ao compartilhar', err);
      }
    } else {
      copySelectedVerses();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f1115] text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 font-sans`}>
      <TooltipProvider>

        {/* HEADER PRINCIPAL */}
        <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDarkMode ? 'bg-[#0f1115]/90 border-gray-800' : 'bg-white/90 border-gray-200'} transition-all shadow-sm`}>
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">

            <div className="flex items-center gap-2 md:gap-4">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={`w-[320px] p-0 border-r ${isDarkMode ? 'bg-[#151921] border-gray-800 text-white' : 'bg-white border-gray-200'}`}>
                  <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                      Navegação
                    </h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar livro..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`pl-9 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100'}`}
                      />
                    </div>
                  </div>

                  <ScrollArea className="h-[calc(100vh-140px)]">
                    <div className="p-4 space-y-6">
                      {/* Favoritos Rápidos na Sidebar */}
                      {bookmarks.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Favoritos Recentes
                          </h3>
                          <div className="space-y-2">
                            {bookmarks.slice(0, 3).map(bm => (
                              <div key={bm.id} className={`p-2 rounded text-xs truncate border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                                {bm.ref}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Antigo Testamento</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {bibleStructure.antigoTestamento
                            .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(book => (
                              <Button
                                key={book.name}
                                variant={selectedBook.name === book.name ? "secondary" : "ghost"}
                                size="sm"
                                className="justify-start font-medium h-9"
                                onClick={() => {
                                  setSelectedBook(book);
                                  setSelectedChapter(1);
                                  setIsSidebarOpen(false);
                                }}
                              >
                                {book.name}
                              </Button>
                            ))}
                        </div>
                      </div>

                      <Separator className={isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} />

                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Novo Testamento</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {bibleStructure.novoTestamento
                            .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(book => (
                              <Button
                                key={book.name}
                                variant={selectedBook.name === book.name ? "secondary" : "ghost"}
                                size="sm"
                                className="justify-start font-medium h-9"
                                onClick={() => {
                                  setSelectedBook(book);
                                  setSelectedChapter(1);
                                  setIsSidebarOpen(false);
                                }}
                              >
                                {book.name}
                              </Button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-bold leading-none tracking-tight">
                    {selectedBook.name}
                  </h1>
                  <Badge variant="outline" className={`text-base px-2 py-0 h-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {selectedChapter}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">

              {/* Controles Desktop */}
              <div className="hidden md:flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(s => Math.max(14, s - 1))}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Diminuir fonte</TooltipContent>
                </Tooltip>

                <span className="text-xs w-8 text-center font-mono">{fontSize}px</span>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(s => Math.min(32, s + 1))}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Aumentar fonte</TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" className={`hidden md:block h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

              <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                <SelectTrigger className="w-[85px] md:w-[130px] h-9 text-xs md:text-sm font-medium bg-transparent">
                  <SelectValue placeholder="Versão" />
                </SelectTrigger>
                <SelectContent>
                  {versoesDisponiveis.map(v => (
                    <SelectItem key={v.id} value={v.id}>
                      <span className="font-bold">{v.sigla}</span> <span className="hidden md:inline text-muted-foreground">- {v.nome.split('(')[0]}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={isPlaying ? "destructive" : "default"}
                size="icon"
                className="h-9 w-9 shadow-sm transition-all hover:scale-105"
                onClick={toggleSpeech}
              >
                {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL (LAYOUT DESKTOP OTIMIZADO) */}
        <main className="container mx-auto px-4 py-8 flex justify-center min-h-[85vh]">
          <div className="w-full max-w-4xl relative">

            {/* Navegação Flutuante Lateral (Desktop) */}
            <div className="hidden lg:block absolute -left-24 top-1/2 -translate-y-1/2 space-y-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevChapter}
                disabled={selectedChapter <= 1}
                className="h-12 w-12 rounded-full shadow-lg border-2 hover:border-primary hover:text-primary transition-all bg-background"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="hidden lg:block absolute -right-24 top-1/2 -translate-y-1/2 space-y-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextChapter}
                disabled={selectedChapter >= selectedBook.chapters}
                className="h-12 w-12 rounded-full shadow-lg border-2 hover:border-primary hover:text-primary transition-all bg-background"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Área de Leitura (Papel) */}
            <motion.div
              layout
              className={`
              relative p-6 md:p-12 rounded-2xl shadow-xl transition-all duration-300
              ${isDarkMode ? 'bg-[#151921] shadow-black/20' : 'bg-white shadow-xl shadow-slate-200/50'}
            `}
            >
              {/* Loading Skeleton */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`h-4 w-full rounded animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
                      ))}
                    </div>
                    <div className="space-y-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`h-4 w-full rounded animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} style={{ width: `${Math.random() * 40 + 60}%` }} />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${selectedBook.name}-${selectedChapter}-${selectedVersion}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif tracking-tight">
                      {chapterContent?.book.name} {chapterContent?.chapter.number}
                    </h2>

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
                            relative inline decoration-clone box-decoration-clone px-1 rounded transition-colors cursor-pointer
                            ${isSelected
                                ? 'bg-primary/20 text-primary-foreground font-medium'
                                : 'hover:bg-primary/5'
                              }
                          `}
                          >
                            <sup className="text-[0.6em] font-bold text-primary mr-1 select-none opacity-50 align-super font-sans">
                              {verse.number}
                            </sup>
                            <span>
                              {verse.text}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Navegação Mobile (Abaixo do texto) */}
            <div className="flex lg:hidden justify-between items-center mt-8 gap-4">
              <Button
                variant="outline"
                onClick={handlePrevChapter}
                disabled={selectedChapter <= 1}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={handleNextChapter}
                disabled={selectedChapter >= selectedBook.chapters}
                className="flex-1"
              >
                Próximo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

          </div>
        </main>

        {/* TOOLBAR FLUTUANTE DE AÇÃO */}
        <AnimatePresence>
          {selectedVerses.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
              <div className={`
              flex items-center gap-2 p-2 rounded-full shadow-2xl border backdrop-blur-md
              ${isDarkMode ? 'bg-gray-900/90 border-gray-700 text-white' : 'bg-white/90 border-gray-200 text-gray-900'}
            `}>
                <span className="text-sm font-bold px-4 border-r border-gray-500/30">
                  {selectedVerses.length}
                </span>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20" onClick={copySelectedVerses}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copiar</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20" onClick={toggleBookmark}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Favoritar</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20" onClick={shareVerses}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Compartilhar</TooltipContent>
                </Tooltip>

                <Separator orientation="vertical" className="h-6 mx-1" />

                <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-500/20 text-red-500" onClick={() => setSelectedVerses([])}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>

    </div>
  );
}
