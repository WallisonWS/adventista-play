import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Music, Search, Play, Pause, Volume2,
    Heart, Share2, ChevronLeft, Mic2, Sparkles
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hinos, pesquisarHinos } from '../data/hinario';
import { TextToSpeech } from './TextToSpeech';
import AuroraBackground from './21st-dev/AuroraBackground'; // Using existing aurora
import { Card3D, Button3D } from './3DAnimations';
import { useDarkMode } from '../contexts/DarkModeContext';

export function EnhancedHinarioPage() {
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedHino, setSelectedHino] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('hinario_favorites') || '[]');
        } catch { return []; }
    });

    const [filteredHinos, setFilteredHinos] = useState(hinos);

    // Filter effect
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredHinos(hinos);
        } else {
            setFilteredHinos(pesquisarHinos(searchQuery));
        }
    }, [searchQuery]);

    // Persist favorites
    useEffect(() => {
        localStorage.setItem('hinario_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (hinoNum) => {
        setFavorites(prev =>
            prev.includes(hinoNum)
                ? prev.filter(n => n !== hinoNum)
                : [...prev, hinoNum]
        );
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Ideal: Toast notification
        alert("Letra copiada!");
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-slate-900'} font-sans`}>

            {/* Detail View */}
            <AnimatePresence mode="wait">
                {selectedHino ? (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-md"
                    >
                        <div className="container mx-auto px-4 py-8 max-w-3xl">
                            <button
                                onClick={() => setSelectedHino(null)}
                                className="flex items-center gap-2 mb-6 text-primary hover:underline"
                            >
                                <ChevronLeft size={20} /> Voltar ao Hinário
                            </button>

                            <Card3D className="bg-card text-card-foreground">
                                <div className="p-6 md:p-10 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6"
                                    >
                                        <span className="text-3xl font-bold text-primary">{selectedHino.numero}</span>
                                    </motion.div>

                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                                        {selectedHino.titulo}
                                    </h1>
                                    <p className="text-muted-foreground mb-8 uppercase tracking-widest text-sm">
                                        {selectedHino.categoria}
                                    </p>

                                    <div className="flex justify-center gap-4 mb-8">
                                        <Button3D
                                            color={favorites.includes(selectedHino.numero) ? "#ef4444" : "#64748b"}
                                            onClick={() => toggleFavorite(selectedHino.numero)}
                                            className="px-4"
                                        >
                                            <Heart size={20} fill={favorites.includes(selectedHino.numero) ? "currentColor" : "none"} />
                                        </Button3D>

                                        <Button3D
                                            color="#3b82f6"
                                            onClick={() => copyToClipboard(selectedHino.letra)}
                                            className="px-4"
                                        >
                                            <Share2 size={20} />
                                        </Button3D>
                                    </div>

                                    <div className="mb-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
                                        <p className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
                                            <Volume2 size={16} /> Ouvir Letra
                                        </p>
                                        <TextToSpeech text={selectedHino.letra} />
                                    </div>

                                    <div className="text-lg leading-relaxed whitespace-pre-line font-serif opacity-90">
                                        {selectedHino.letra}
                                    </div>
                                </div>
                            </Card3D>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        className="pb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Header / Hero */}
                        <div className="pt-24 pb-12 px-4 text-center relative overflow-hidden">
                            <AuroraBackground absolute={true} className="opacity-30 pointer-events-none" />
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <span className="inline-block p-3 rounded-2xl bg-primary/10 mb-4">
                                        <Music className="w-8 h-8 text-primary" />
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                        Hinário Adventista
                                    </h1>
                                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                        600+ hinos de louvor e adoração para inspirar sua caminhada.
                                    </p>
                                </motion.div>

                                {/* Search Bar */}
                                <motion.div
                                    className="mt-8 max-w-xl mx-auto relative"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por número, título ou letra..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl focus:border-primary focus:bg-white/20 focus:outline-none text-lg transition-all text-white placeholder:text-white/50"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="container mx-auto px-4 max-w-5xl">
                            {filteredHinos.length === 0 ? (
                                <div className="text-center py-20 opacity-50 text-white">
                                    <p>Nenhum hino encontrado.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredHinos.map((hino) => (
                                        <motion.div
                                            key={hino.numero}
                                            layoutId={`hino-${hino.numero}`}
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedHino(hino)}
                                            className="cursor-pointer group perspective-1000"
                                        >
                                            <div className={`
                         bg-black/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-black/40 transition-all relative overflow-hidden h-full
                         ${favorites.includes(hino.numero) ? 'ring-1 ring-red-400/50 bg-red-500/5' : ''}
                      `}>
                                                {favorites.includes(hino.numero) && (
                                                    <div className="absolute top-3 right-3 text-red-400">
                                                        <Heart size={16} fill="currentColor" />
                                                    </div>
                                                )}
                                                <div className="flex items-start justify-between mb-4">
                                                    <span className="text-2xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                                                        #{hino.numero}
                                                    </span>
                                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                                        {hino.categoria}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-1 truncate">{hino.titulo}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {hino.letra.substring(0, 60)}...
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
