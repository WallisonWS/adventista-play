import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Book, Calendar, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function BibleNavigationModal({
    isOpen,
    onClose,
    bibleStructure,
    currentBook,
    currentChapter,
    onNavigate
}) {
    const [view, setView] = useState('books'); // 'books', 'chapters', 'verses'
    const [selectedBookTemp, setSelectedBookTemp] = useState(currentBook);
    const [selectedChapterTemp, setSelectedChapterTemp] = useState(currentChapter);

    // Reset view when opening
    React.useEffect(() => {
        if (isOpen) {
            setView('books');
            setSelectedBookTemp(currentBook);
            setSelectedChapterTemp(currentChapter);
        }
    }, [isOpen, currentBook, currentChapter]);

    const handleBookSelect = (book) => {
        setSelectedBookTemp(book);
        setView('chapters');
    };

    const handleChapterSelect = (chapter) => {
        setSelectedChapterTemp(chapter);
        setView('verses');
    };

    const handleVerseSelect = (verse) => {
        onNavigate(selectedBookTemp, selectedChapterTemp, verse);
        onClose();
    };

    const handleDirectChapterNavigate = (chapter) => {
        onNavigate(selectedBookTemp, chapter, 1);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-xl border-slate-800 text-white p-0 overflow-hidden">
                <DialogHeader className="p-4 border-b border-slate-800 bg-slate-900/50">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        {view === 'books' && <><Book className="w-5 h-5 text-blue-400" /> Selecione o Livro</>}
                        {view === 'chapters' && <><Hash className="w-5 h-5 text-purple-400" /> {selectedBookTemp.name} - Capítulo</>}
                        {view === 'verses' && <><Hash className="w-5 h-5 text-green-400" /> {selectedBookTemp.name} {selectedChapterTemp} - Versículo</>}
                    </DialogTitle>
                </DialogHeader>

                <div className="h-[60vh] md:h-[500px] relative">
                    <ScrollArea className="h-full w-full p-4">
                        <AnimatePresence mode="wait">
                            {view === 'books' && (
                                <motion.div
                                    key="books"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Antigo Testamento</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {bibleStructure.antigoTestamento.map((book) => (
                                                <Button
                                                    key={book.abbrev}
                                                    variant={currentBook.abbrev === book.abbrev ? "default" : "outline"}
                                                    className={`justify-start ${currentBook.abbrev === book.abbrev ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700'}`}
                                                    onClick={() => handleBookSelect(book)}
                                                >
                                                    {book.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Novo Testamento</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {bibleStructure.novoTestamento.map((book) => (
                                                <Button
                                                    key={book.abbrev}
                                                    variant={currentBook.abbrev === book.abbrev ? "default" : "outline"}
                                                    className={`justify-start ${currentBook.abbrev === book.abbrev ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700'}`}
                                                    onClick={() => handleBookSelect(book)}
                                                >
                                                    {book.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {view === 'chapters' && (
                                <motion.div
                                    key="chapters"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="mb-4 text-slate-400 hover:text-white pl-0"
                                        onClick={() => setView('books')}
                                    >
                                        ← Voltar aos Livros
                                    </Button>
                                    <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
                                        {[...Array(selectedBookTemp.chapters)].map((_, i) => (
                                            <Button
                                                key={i}
                                                variant="outline"
                                                className={`h-12 w-full text-lg font-medium ${currentBook.abbrev === selectedBookTemp.abbrev && currentChapter === i + 1
                                                        ? 'bg-purple-600 hover:bg-purple-700 border-transparent'
                                                        : 'bg-slate-800/50 hover:bg-slate-700 border-slate-700'
                                                    }`}
                                                onClick={() => handleChapterSelect(i + 1)}
                                                onDoubleClick={() => handleDirectChapterNavigate(i + 1)} // Double click shortcut
                                            >
                                                {i + 1}
                                            </Button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {view === 'verses' && (
                                <motion.div
                                    key="verses"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex gap-2 mb-4">
                                        <Button
                                            variant="ghost"
                                            className="text-slate-400 hover:text-white pl-0"
                                            onClick={() => setView('books')}
                                        >
                                            Livros
                                        </Button>
                                        <span className="text-slate-600">/</span>
                                        <Button
                                            variant="ghost"
                                            className="text-slate-400 hover:text-white"
                                            onClick={() => setView('chapters')}
                                        >
                                            Capítulo {selectedChapterTemp}
                                        </Button>
                                    </div>

                                    <div className="flex justify-center mb-6">
                                        <Button
                                            className="w-full max-w-sm bg-green-600 hover:bg-green-700"
                                            onClick={() => handleDirectChapterNavigate(selectedChapterTemp)}
                                        >
                                            Ler Capítulo Inteiro
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                                        {/* Assuming ~50 verses max for generic display or we could just link to top */}
                                        {[...Array(50)].map((_, i) => ( // Placeholder mostly, usually we just go to chapter
                                            <Button
                                                key={i}
                                                variant="outline"
                                                className="h-10 w-full bg-slate-800/50 hover:bg-slate-700 border-slate-700"
                                                onClick={() => handleVerseSelect(i + 1)}
                                            >
                                                {i + 1}
                                            </Button>
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-slate-500 mt-4">Selecione o versículo para rolar diretamente até ele.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
